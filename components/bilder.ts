// ============================================================
//  BILDER PÅ NETTSIDEN
//  Alle bildene er lånt fra Wikimedia Commons med en fri lisens.
//  Lisensen krever at vi oppgir hvem som tok bildet, og lenker til lisensen.
//  Det skjer automatisk i bildeteksten under hvert bilde.
//
//  Vil dere bytte til egne bilder? Legg bildet i public/foto/,
//  endre «src», og sett «fotograf» til den som tok det (lisens kan stå tom).
// ============================================================

export type Bilde = {
  src: string;
  bredde: number;
  hoyde: number;
  alt: string;
  tekst: string;
  fotograf: string;
  lisens: string;
  lisensUrl?: string;
  kilde?: string;
};

export const bilder = {
  sitkagran: {
    src: "/foto/sitkagran-haugesund.webp",
    bredde: 1600,
    hoyde: 1067,
    alt: "Tett plantefelt med høye sitkagraner. Skogbunnen under er nesten bar fordi lite lys slipper ned.",
    tekst: "Plantet sitkagran i Haugesund",
    fotograf: "Ryan Hodnett",
    lisens: "CC BY-SA 4.0",
    lisensUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.no",
    kilde: "https://commons.wikimedia.org/wiki/File:Sitka_Spruce_(Picea_sitchensis)_plantation_-_Haugesund,_Norway_2021-08-04_(01).jpg",
  },
  hest: {
    src: "/foto/hest-i-stall.webp",
    bredde: 1600,
    hoyde: 1319,
    alt: "En brun hest stikker hodet ut av boksen sin i en stall.",
    tekst: "Hest i stallen",
    fotograf: "Philippe Alès",
    lisens: "CC BY-SA 4.0",
    lisensUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.no",
    kilde: "https://commons.wikimedia.org/wiki/File:Horse_stables_in_France.jpg",
  },
  biokull: {
    src: "/foto/biokull.webp",
    bredde: 1600,
    hoyde: 1067,
    alt: "Nærbilde av en haug med svart biokull i små biter.",
    tekst: "Biokull",
    fotograf: "Oregon Department of Forestry",
    lisens: "CC BY 2.0",
    lisensUrl: "https://creativecommons.org/licenses/by/2.0/deed.no",
    kilde: "https://commons.wikimedia.org/wiki/File:Biochar_pile.jpg",
  },
  flis: {
    src: "/foto/flis.webp",
    bredde: 1600,
    hoyde: 1067,
    alt: "Store hauger med lys treflis i en lagerhall, med transportbånd som fyller på.",
    tekst: "Flis til strø",
    fotograf: "US Forest Service",
    lisens: "Fri bruk",
    kilde: "https://commons.wikimedia.org/wiki/File:Wood_Shavings_ET5A7982_(30567130696).jpg",
  },
  honer: {
    src: "/foto/honer-i-honsehus.webp",
    bredde: 1600,
    hoyde: 1424,
    alt: "Mange brune høner hviler på strøet i et hønsehus, rundt en rød drikkeautomat.",
    tekst: "Høner i et hønsehus",
    fotograf: "SteveStrummer",
    lisens: "CC0",
    lisensUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.no",
    kilde: "https://commons.wikimedia.org/wiki/File:Red_Hens_Coop.jpg",
  },
} satisfies Record<string, Bilde>;

export type BildeNavn = keyof typeof bilder;
