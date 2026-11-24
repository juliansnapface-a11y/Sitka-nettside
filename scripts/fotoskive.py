# Lager teksturene til stammeskiva på forsiden fra et ekte foto av en tømmerstokk (Abies alba).
# Foto: Crusier, Wikimedia Commons, CC BY-SA 3.0. Tekstur = beskåret og rettet ut, delvis forkullet.
import numpy as np, sys
# Kilde: https://commons.wikimedia.org/wiki/File:Abies_alba_cross_section_Beskid_%C5%BBywiecki.JPG (1920 px-versjon)
# Kjør: python3 scripts/fotoskive.py foto.jpg public/media/treskive 0   (siste tall 1 = med forkulling)
from PIL import Image, ImageFilter
SRC, OUT, CHAR = sys.argv[1], sys.argv[2], sys.argv[3] == "1"
src = np.asarray(Image.open(SRC).convert("RGB")).astype(np.float32)
H, W, _ = src.shape
s = W / 1280
cx, cy, rx, ry = 637 * s, 423 * s, 395 * s, 372 * s
N = 1024
v, u = np.mgrid[0:N, 0:N].astype(np.float32)
u = u / (N - 1) * 2 - 1; v = v / (N - 1) * 2 - 1
k = 0.985
sx = cx + u * rx * k; sy = cy + v * ry * k
x0 = np.clip(np.floor(sx).astype(int), 0, W - 2); y0 = np.clip(np.floor(sy).astype(int), 0, H - 2)
fx = (sx - x0)[..., None]; fy = (sy - y0)[..., None]
col = (src[y0, x0] * (1 - fx) * (1 - fy) + src[y0, x0 + 1] * fx * (1 - fy) + src[y0 + 1, x0] * (1 - fx) * fy + src[y0 + 1, x0 + 1] * fx * fy)
R = np.sqrt(u**2 + v**2)

def sm(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t)
def noise(cells, seed):
    r = np.random.default_rng(seed).random((cells, cells)).astype(np.float32)
    return np.asarray(Image.fromarray(r, mode="F").resize((N, N), Image.BICUBIC)) - 0.5
def fbm(base, octs, seed):
    t = 0; a = 1; tot = 0
    for o in range(octs):
        t = t + a * noise(base * 2**o + 1, seed + o); tot += a; a *= 0.5
    return t / tot

# kanten: mørk bark utenfor årringene (fotoet har litt gress helt ytterst)
nb = fbm(40, 3, 7)
bark = sm(0.972, 0.985, R + 0.01 * nb)
col = col * (1 - bark[..., None]) + np.array([46, 32, 26], np.float32) * (0.8 + nb[..., None]) * bark[..., None]
lum = col.mean(-1)

glow = np.zeros((N, N), np.float32)
if CHAR:
    a = np.arctan2(v, u); a0 = 2.4
    side = np.maximum(0, np.cos(a - a0))
    charf = R * 0.75 + 0.42 * side**1.5 + 0.16 * fbm(6, 5, 21) + 0.04 * fbm(60, 3, 3)
    char = sm(0.735, 0.765, charf)
    scorch = sm(0.6, 0.75, charf) * (1 - char)
    # kullet beholder strukturen i treet (lysstyrken fra bildet), bare mye mørkere
    detail = (lum / 200.0)[..., None]
    charcol = np.array([20, 17, 15], np.float32) * (0.6 + 0.9 * detail)
    scorchcol = col * np.array([0.55, 0.38, 0.28], np.float32)
    col = col * (1 - scorch[..., None]) + scorchcol * scorch[..., None]
    col = col * (1 - char[..., None]) + charcol * char[..., None]
    # glør: smal, ujevn linje der det brenner + litt i mørke sprekker i kullet
    front = sm(0.728, 0.745, charf) * (1 - sm(0.752, 0.772, charf))
    blink = np.clip(0.2 + 1.6 * (fbm(14, 3, 40) + 0.1), 0, 1)
    darkcrack = np.clip((110 - lum) / 60, 0, 1) * char * np.exp(-np.clip(charf - 0.75, 0, None) * 10)
    glow = np.clip(front * blink * 0.95 + darkcrack * blink * 0.5, 0, 1)

Image.fromarray(col.clip(0, 255).astype(np.uint8)).save(f"{OUT}/treskive.webp", quality=90)
g = np.stack([glow * 255, glow**1.6 * 120, glow**3 * 30], -1)
Image.fromarray(g.clip(0, 255).astype(np.uint8)).save(f"{OUT}/treskive-glod.webp", quality=88)
# relieff fra bildet: fin struktur (høypass av lysstyrken)
L = Image.fromarray(lum.clip(0, 255).astype(np.uint8))
hp = np.asarray(L).astype(np.float32) - np.asarray(L.filter(ImageFilter.GaussianBlur(6))).astype(np.float32)
b = np.clip(0.5 + hp / 80, 0, 1)
Image.fromarray((b * 255).astype(np.uint8)).save(f"{OUT}/treskive-relieff.webp", quality=88)
print("ferdig")
