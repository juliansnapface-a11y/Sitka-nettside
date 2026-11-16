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
  // Bildeteksten på engelsk
  en: { alt: string; tekst: string; lisens?: string };
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
    en: { alt: "Dense plantation of tall Sitka spruce. The forest floor below is almost bare because little light gets through.", tekst: "Planted Sitka spruce in Haugesund, Norway" },
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
    en: { alt: "Close-up of a pile of black biochar in small pieces.", tekst: "Biochar" },
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
    en: { alt: "Large piles of light wood shavings in a warehouse, with conveyor belts adding more.", tekst: "Wood shavings for bedding", lisens: "Public domain" },
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
    en: { alt: "Many brown hens resting on the bedding in a poultry house, around a red drinker.", tekst: "Hens in a poultry house" },
  },
  biokullIJord: {
    src: "/foto/biokull-i-jord.webp",
    bredde: 1600,
    hoyde: 1068,
    alt: "En mann heller biokull fra en bøtte ut på jorda i en åker.",
    tekst: "Biokull blir lagt i jorda",
    fotograf: "GIZ Bush Control and Biomass Utilisation Project",
    lisens: "CC BY-SA 4.0",
    lisensUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.no",
    kilde: "https://commons.wikimedia.org/wiki/File:Application_of_biochar.jpg",
    en: { alt: "A man pours biochar from a bucket onto the soil in a field.", tekst: "Biochar being added to the soil" },
  },
  ungSitkagran: {
    src: "/foto/ung-sitkagran.webp",
    bredde: 1600,
    hoyde: 900,
    alt: "Unge sitkagraner vokser tett foran et eldre plantefelt med sitkagran.",
    tekst: "Sitkagran i Haugesund",
    fotograf: "Ryan Hodnett",
    lisens: "CC BY-SA 4.0",
    lisensUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.no",
    kilde: "https://commons.wikimedia.org/wiki/File:Sitka_Spruce_(Picea_sitchensis)_plantation_-_Haugesund,_Norway_2021-08-04.jpg",
    en: { alt: "Young Sitka spruce growing densely in front of an older Sitka spruce plantation.", tekst: "Sitka spruce in Haugesund, Norway" },
  },
} satisfies Record<string, Bilde>;

export type BildeNavn = keyof typeof bilder;

// Gir alt-tekst, bildetekst og lisens på riktig språk
export function bildeTekst(b: Bilde, lang: "no" | "en") {
  return lang === "en" ? { alt: b.en.alt, tekst: b.en.tekst, lisens: b.en.lisens ?? b.lisens } : { alt: b.alt, tekst: b.tekst, lisens: b.lisens };
}
