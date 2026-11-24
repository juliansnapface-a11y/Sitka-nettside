# Lager teksturene til stammeskiva øverst på forsiden (public/media/treskive/).
# Kjør: python3 scripts/treskive.py public/media/treskive  (trenger numpy og Pillow)
import numpy as np, sys
from PIL import Image
OUT = sys.argv[1]
N = 1536
rng = np.random.default_rng(11)

def smooth_noise(n, cells, seed):
    r = np.random.default_rng(seed).random((cells, cells)).astype(np.float32)
    im = Image.fromarray(r, mode="F").resize((n, n), Image.BICUBIC)
    return np.asarray(im)

def fbm(n, base, octaves, seed, gain=0.5):
    tot = np.zeros((n, n), np.float32); amp = 1; s = 0
    for o in range(octaves):
        tot += amp * (smooth_noise(n, base * 2**o + 1, seed + o) - 0.5); s += amp; amp *= gain
    return tot / s  # ca -0.5..0.5

def smoothstep(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t)

ys, xs = np.mgrid[0:N, 0:N].astype(np.float32)
X = xs / (N - 1) * 2 - 1; Y = ys / (N - 1) * 2 - 1
Rd = np.sqrt(X**2 + Y**2)              # avstand fra midten av skiva (kanten = 1)
px, py = 0.07, -0.05                     # margen (pith) litt ute av senter, som i ekte trær
dx, dy = X - px, Y - py
r = np.sqrt(dx**2 + dy**2); a = np.arctan2(dy, dx)

n_lo = fbm(N, 3, 4, 1); n_mid = fbm(N, 10, 4, 2); n_hi = fbm(N, 60, 3, 3)
# årringer: brede inne ved margen, smale ytterst, med tilfeldig variasjon (som ekte vekstår)
rw = r * (1 + 0.07 * np.cos(a * 2 + 0.7) + 0.02 * np.cos(a * 3 - 1.1) + 0.02 * np.cos(a * 5 + 2)) + 0.03 * n_lo + 0.005 * n_mid
wid = []
rr = np.random.default_rng(3)
for k in range(60):
    base = 0.075 * np.exp(-k / 9) + 0.022
    wid.append(base * (0.6 + 0.8 * rr.random()))
edges = np.concatenate([[0], np.cumsum(wid)])
phase = np.interp(rw, edges, np.arange(len(edges)))
f = phase - np.floor(phase)
late = smoothstep(0.68, 0.9, f) * (1 - smoothstep(0.975, 1.0, f))   # mørkere senved
late *= (0.75 + 0.5 * smooth_noise(N, 40, 12)[..., None][..., 0] * 0 + 0.25 * (np.sin(phase * 2.3) * 0.5 + 0.5))
early = np.array([226, 196, 160], np.float32); latec = np.array([160, 98, 62], np.float32)
col = early * (1 - late[..., None]) + latec * late[..., None]
# kjerneved litt varmere og mørkere inn mot midten
heart = 1 - smoothstep(0.35, 0.65, r)
col *= (1 - heart[..., None] * np.array([0.10, 0.18, 0.24], np.float32))
# fibre som går ut fra midten + flekker
pol = smooth_noise(N, 400, 9)  # brukes som tilfeldig felt
fib = np.sin(a * 900 + 40 * n_mid) * 0.5 + 0.5
col *= (0.93 + 0.07 * fib[..., None] * (0.5 + n_hi[..., None]))
col *= (1 + 0.10 * n_mid[..., None] + 0.05 * n_hi[..., None] + 0.06 * n_lo[..., None])
# sagspor: svake buer fra et punkt langt unna
saw = np.sin(np.sqrt((X + 3.2)**2 + (Y - 2.1)**2) * 140 + 6 * n_lo)
col *= (1 - 0.018 * (saw[..., None] > 0.7) * (0.5 + n_mid[..., None] * 2))
# margen
col *= (1 - 0.45 * (1 - smoothstep(0.0, 0.025, r)))[..., None]

# tørkesprekker fra kanten og innover
bump = 0.5 + 0.25 * late * 0 - 0.05 * late + 0.06 * n_hi
crack = np.zeros((N, N), np.float32)
for ang, inner in [(0.4, 0.42), (2.1, 0.55), (2.9, 0.62), (4.3, 0.38), (5.4, 0.68)]:
    d = np.angle(np.exp(1j * (a - ang - 0.05 * fbm(N, 8, 3, int(ang * 10)) * 3)))
    width = 0.012 * smoothstep(inner, 1.0, Rd)
    c = (1 - smoothstep(0, 1, np.abs(d) * r / np.maximum(width, 1e-4))) * (Rd > inner)
    crack = np.maximum(crack, c)
col *= (1 - 0.75 * crack[..., None])

# --- forkulling: mest på den ene siden og langs kanten ---
a0 = 2.4
side = np.maximum(0, np.cos(np.arctan2(Y, X) - a0))
charf = Rd * 0.75 + 0.42 * side**1.5 + 0.16 * fbm(N, 6, 5, 21) + 0.05 * n_hi
char = smoothstep(0.735, 0.765, charf)
scorch = smoothstep(0.58, 0.75, charf) * (1 - char)
# krakelering i kullet: sprekker langs årringene og ut fra midten, som på ekte forkullet tre
ringgap = 1 - smoothstep(0.0, 0.06, np.minimum(f, 1 - f) + 0.03 * n_hi)
ringgap *= (np.floor(phase) % 2 == 0) | (smooth_noise(N, 30, 50) > 0.5)
K = 160
ang_jit = a * K / (2 * np.pi) + 1.5 * fbm(N, 20, 3, 51) + 0.6 * np.floor(phase) * 0.37
ag = ang_jit - np.floor(ang_jit)
radgap = 1 - smoothstep(0.0, 0.07, np.minimum(ag, 1 - ag) * (1 + 0.5 * r))
radgap *= smooth_noise(N, 90, 52) > 0.35
gap = np.clip(np.maximum(ringgap * 0.9, radgap), 0, 1)
edge = 1 - gap
charcol = np.array([17, 14, 13], np.float32) * (1 + 0.6 * n_hi[..., None] + 0.3 * n_mid[..., None])
charcol += np.array([11, 11, 12], np.float32) * (0.5 + n_hi[..., None] + n_mid[..., None])  # gråaktig glans
charcol *= (1 - 0.8 * gap[..., None])
scorchcol = np.array([78, 40, 22], np.float32) * (1 + 0.2 * n_hi[..., None])
col = col * (1 - scorch[..., None] * 0.85) + scorchcol * scorch[..., None] * 0.85
col = col * (1 - char[..., None]) + charcol * char[..., None]

# bark rundt hele kanten
bark_t = smoothstep(0.952, 0.958, Rd + 0.012 * n_mid + 0.01 * n_hi)
inner_bark = smoothstep(0.945, 0.952, Rd + 0.008 * n_mid) * (1 - bark_t)
barkcol = np.array([58, 38, 28], np.float32) * (1 + 0.6 * fbm(N, 80, 3, 30)[..., None])
barkcol = barkcol * (1 - char[..., None] * 0.7)
col = col * (1 - inner_bark[..., None]) + np.array([150, 96, 60], np.float32) * (0.8 + n_hi[..., None]) * inner_bark[..., None]
col = col * (1 - bark_t[..., None]) + barkcol * bark_t[..., None]

alpha = (Rd <= 1.0)
col = np.clip(col, 0, 255)
col[~alpha] = 0
Image.fromarray(col.astype(np.uint8)).resize((1024, 1024), Image.LANCZOS).save(f"{OUT}/treskive.webp", quality=88)

# glør: i sprekkene i kullet og langs grensen der det brenner
front = smoothstep(0.725, 0.745, charf) * (1 - smoothstep(0.752, 0.775, charf))
blink = np.clip(0.2 + 1.6 * (fbm(N, 14, 3, 40) + 0.1), 0, 1)
dyb = np.clip(charf - 0.75, 0, None)
glow = gap * char * np.exp(-dyb * 9) * (0.25 + 0.75 * blink) + front * blink * 0.9
glow = np.clip(glow, 0, 1) * (Rd <= 0.97)
gcol = np.stack([glow * 255, glow**1.6 * 120, glow**3 * 30], -1)
Image.fromarray(np.clip(gcol, 0, 255).astype(np.uint8)).resize((1024, 1024), Image.LANCZOS).save(f"{OUT}/treskive-glod.webp", quality=88)

# relieff (bump): senved litt høyere, sprekker og kullgap dype
b = 0.55 + 0.08 * late - 0.5 * crack - 0.35 * gap * char + 0.08 * n_hi + 0.2 * bark_t * fbm(N, 80, 3, 30)
b = b * (1 - char) + (0.5 + 0.15 * n_hi - 0.45 * gap) * char
Image.fromarray((np.clip(b, 0, 1) * 255).astype(np.uint8)).resize((1024, 1024), Image.LANCZOS).save(f"{OUT}/treskive-relieff.webp", quality=88)

# barken på siden (bred stripe): skjellete granbark, mørk og delvis forkullet
W, H = 2048, 256
rb = np.random.default_rng(5)
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
small = np.asarray(Image.fromarray(rb.random((H // 4, W // 4)).astype(np.float32), mode="F").resize((W, H), Image.BICUBIC))
mid = np.asarray(Image.fromarray(rb.random((16, 220)).astype(np.float32), mode="F").resize((W, H), Image.BICUBIC))
skjell = np.asarray(Image.fromarray(rb.random((6, 160)).astype(np.float32), mode="NEAREST" if False else "F").resize((W, H), Image.NEAREST))
bcol = np.array([66, 46, 36], np.float32) * (0.6 + 0.35 * skjell[..., None] + 0.25 * mid[..., None] + 0.15 * small[..., None])
bx = xx / W
charside = smoothstep(0.35, 0.5, np.sin(bx * np.pi * 2) * 0.5 + 0.5 + 0.15 * (mid - 0.5))
bcol = bcol * (1 - 0.7 * charside[..., None])
Image.fromarray(np.clip(bcol, 0, 255).astype(np.uint8)).save(f"{OUT}/bark.webp", quality=85)
bb = 0.35 + 0.35 * skjell + 0.2 * mid + 0.1 * small
Image.fromarray((np.clip(bb, 0, 1) * 255).astype(np.uint8)).save(f"{OUT}/bark-relieff.webp", quality=85)
print("ferdig")
