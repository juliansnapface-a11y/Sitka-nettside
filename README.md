# Sitka-nettsiden

Nettsiden til Sitka: bærekraftig strø med biokull fra sitkagran.
Live på https://sitka-nettside.vercel.app (oppdateres automatisk når noe pushes til `main`).

## Endre tekst

Nesten all tekst du trenger å endre ligger i **én fil**: `components/innhold.ts`.

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
| `app/page.tsx` | Rekkefølgen på seksjonene på forsiden |
| `app/globals.css` | Farger og fonter |
| `components/innhold.ts` | Tekst og kontaktinfo |
| `components/bilder.ts` + `Photo.tsx` | Bildene, bildetekstene og animasjonen når de dukker opp |
| `components/Preloader.tsx` | Åpningsanimasjonen (årringene som tegnes) |
| `components/Hero.tsx` + `RingScene.tsx` | Toppen av siden med 3D-årringen |
| `components/Problem.tsx` | Ammoniakk og sitkagran |
| `components/Solution.tsx` | Løsningen, med biokullkornet og kortene |
| `components/Process.tsx` | De fire stegene som scroller sidelengs |
| `components/Sustainability.tsx` | Årringene som vokser mens du scroller |
| `components/Customers.tsx` | Hvem strøet er for |
| `components/Contact.tsx` | Kontakt og bunnen av siden |

## Verktøy

Next.js, Tailwind CSS, GSAP + ScrollTrigger (scroll-animasjoner), Lenis (myk scrolling),
Motion (animasjoner) og Three.js / React Three Fiber (3D).
