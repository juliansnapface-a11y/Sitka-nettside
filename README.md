# Sitka-nettsiden

Nettsiden til Sitka: bærekraftig strø med biokull fra sitkagran.
Live på https://sitka-nettside.vercel.app (oppdateres automatisk når noe pushes til `main`).

## Endre tekst

Teksten på forsiden ligger i **én fil**: `components/innhold.ts`. Den har to deler:
`no` (norsk) og `en` (engelsk). Endrer du en tekst på norsk, husk å endre den engelske også.

Undersidene har teksten sin øverst i egne filer: `components/sider/ProblemSide.tsx`
og `components/sider/BaerekraftSide.tsx`.

- **E-post og Instagram:** står under `kontakt`.
- **Løsningen, prosessen og kundene:** tekstene står lenger ned i samme fil.

Lagre filen, og push til GitHub. Da oppdateres nettsiden av seg selv.

## Bilder

Bildene ligger i `public/foto/`, og listen over dem står i `components/bilder.ts`.
De er lånt fra Wikimedia Commons med fri lisens. Lisensen krever at fotografen og lisensen
vises, og det står automatisk i bildeteksten under hvert bilde. Bytter dere til egne bilder,
legg dem i `public/foto/` og endre `src` og `fotograf` i `bilder.ts`.

## Se siden på egen Mac

Åpne terminalen i VS Code og skriv:

```bash
npm install
npm run dev
```

Gå så til http://localhost:3000 i nettleseren.

## Hvor ligger hva?

| Fil | Hva det er |
| --- | --- |
| `components/Forside.tsx` | Rekkefølgen på seksjonene på forsiden (`app/page.tsx` er norsk, `app/en/page.tsx` engelsk) |
| `lib/sprak.ts` | Adressene til sidene på norsk og engelsk (brukes av språkvalget NO / EN) |
| `app/globals.css` | Farger og fonter |
| `components/innhold.ts` | Tekst og kontaktinfo på forsiden, både norsk (`no`) og engelsk (`en`) |
| `components/bilder.ts` + `Photo.tsx` | Bildene, bildetekstene og animasjonen når de dukker opp |
| `components/Preloader.tsx` | Åpningsanimasjonen (årringene som tegnes) |
| `components/Hero.tsx` + `RingScene.tsx` | Toppen av siden: 3D-stammeskive laget av et ekte foto (Crusier, CC BY-SA 3.0, kreditert nederst i toppen). Teksturene ligger i `public/media/treskive/`: forsiden lages med `scripts/fotoskive.py`, barken med `scripts/treskive.py` |
| `components/Problem.tsx` | Ammoniakk og sitkagran |
| `components/Solution.tsx` | Løsningen, med biokullkornet og kortene |
| `components/Process.tsx` | De fire stegene som scroller sidelengs |
| `components/Customers.tsx` | Hvem strøet er for |
| `components/sider/ProblemSide.tsx` | Siden «Problemet og løsningen» (/problem-og-losning og /en/problem-and-solution) |
| `components/sider/BaerekraftSide.tsx` | Siden «Bærekraft» (/baerekraft og /en/sustainability), med tekst på begge språk |
| `components/sider/TrippelBunnlinje.tsx`, `Karbonvalg.tsx`, `Kretslop.tsx` | De interaktive figurene på bærekraft-siden |
| `components/Contact.tsx` | Kontakt og bunnen av siden |

## Verktøy

Next.js, Tailwind CSS, GSAP + ScrollTrigger (scroll-animasjoner), Lenis (myk scrolling),
Motion (animasjoner) og Three.js / React Three Fiber (3D).
