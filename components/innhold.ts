// ============================================================
//  INNHOLD PÅ FORSIDEN
//  Her kan du endre tekst uten å røre resten av koden.
//  All tekst står to ganger: først på norsk (no), så på engelsk (en).
//  Endrer du noe på norsk, husk å endre det på engelsk også.
//  Ting merket «FYLL INN» kan dere fylle ut senere.
// ============================================================

import type { Sprak } from "@/lib/sprak";
import type { BildeNavn } from "./bilder";

export const kontakt = {
  // E-postadressen som vises i kontakt-delen nederst på siden
  epost: "sitkabiokull@gmail.com",
  // FYLL INN: Instagram-brukernavn uten @ (la stå tom "" hvis dere ikke har)
  instagram: "",
};

type Steg = { nr: string; tittel: string; tekst: string; bilde?: BildeNavn; video?: boolean };

const no = {
  meny: {
    problemet: "Problemet",
    losningen: "Løsningen",
    prosessen: "Prosessen",
    baerekraft: "Bærekraft",
    lesMer: "Les mer",
    kontakt: "Kontakt",
    menyKnapp: "Meny",
  },
  preloader: "Sitka · Bærekraftig strø",
  hero: {
    tittelA: "Strø med biokull",
    tittelB: "fra sitkagran.",
    ingress: "Vi gjør en fremmed tresort om til biokull som skal binde lukt, fukt og ammoniakk i hønsehus og staller.",
    seHvordan: "Se hvordan",
    taKontakt: "Ta kontakt",
    scroll: "Scroll",
  },
  problem: {
    ord: "Problemet",
    ammoniakkA: "Stikkende luft",
    ammoniakkB: "i stallen.",
    ammoniakkTekst:
      "Når urin og møkk brytes ned, dannes ammoniakk. Gassen lukter stikkende, gjør lufta tung og kan irritere luftveiene og øynene til både dyr og mennesker.",
    ammoniakkUthev: ["ammoniakk", "luftveiene"],
    granA: "En gran",
    granB: "på avveie.",
    granTekst:
      "Sitkagran stenger ute lyset, så plantene som hører hjemme her forsvinner. Etter dem forsvinner insekter og fugler. Treet truer blant annet den sterkt truede kystlyngheia, og det sprer seg av seg selv.",
    granUthev: ["lyset", "kystlynghei"],
    granNotat: "Sitkagran er en fremmed art i norsk natur. Vi ser treet som en ressurs i stedet for et problem.",
    lesMer: "Les mer om problemet",
  },
  losning: {
    kicker: "Løsningen",
    tittelA: "Strø med",
    tittelB: "biokull.",
    tekst:
      "Vi blander biokull fra sitkagran med flis. Biokullet skal fungere som en svamp i strøet og fange opp det som ellers ville lukte og fordampe.",
    lesMer: "Les mer om løsningen",
    kort: [
      {
        nr: "01",
        tittel: "Porøs struktur",
        tekst: "Biokull er fullt av bittesmå porer. Det gir en enorm overflate som kan holde på væske og gasser.",
      },
      {
        nr: "02",
        tittel: "Binder fukt og ammoniakk",
        tekst: "Porene kan suge opp fuktighet og ammoniakk fra urin og møkk, slik at mindre havner i lufta.",
      },
      {
        nr: "03",
        tittel: "Tørrere inneklima",
        tekst: "Målet er mindre lukt og et tørrere underlag. Bedre for dyrene, og bedre for de som jobber i stallen.",
      },
    ],
  },
  prosess: {
    kicker: "Prosessen · fra tre til jord",
    tittelA: "Fra",
    tittelB: "problem",
    tittelC: "til ressurs.",
    ingress: "Fire steg fra en uønsket gran til et strø som gjør stallen bedre, og så tilbake til jorda.",
    scroll: "Scroll →",
    videoMerke: "ca. 600 °C · nesten uten O",
    steg: [
      {
        nr: "01",
        tittel: "Sitkagran fjernes",
        tekst:
          "Sitkagran fjernes allerede mange steder for å ta vare på naturen. I dag blir trærne ofte liggende igjen eller brent. Vi bruker dem som råvare i stedet.",
        bilde: "ungSitkagran",
      },
      {
        nr: "02",
        tittel: "Pyrolyse",
        tekst:
          "Treet varmes opp til rundt 600 grader nesten uten oksygen. Da brenner det ikke opp, men brytes ned og blir til biokull.",
        video: true,
      },
      {
        nr: "03",
        tittel: "Blandes til strø",
        tekst:
          "Biokullet blandes med flis. Resultatet er et strø, eller en tilsetning til vanlig strø, for hønsehus og staller.",
        bilde: "flis",
      },
      {
        nr: "04",
        tittel: "Tilbake til jorda",
        tekst:
          "Brukt strø kan komposteres og bli jordforbedring. Karbonet i biokullet blir liggende i jorda i stedet for å gå ut i lufta.",
        bilde: "biokullIJord",
      },
    ] as Steg[],
  },
  kunder: {
    kicker: "For hvem",
    tittelA: "Laget for",
    tittelB: "stallen.",
    liste: [
      { navn: "Hønsehus", tekst: "Lukt og ammoniakk er et kjent problem i hønsehus." },
      { navn: "Rideskoler", tekst: "Mange hester, mye strø og mange folk i stallen hver dag." },
      { navn: "Private staller", tekst: "Hesteeiere som vil ha et bedre stallmiljø." },
      { navn: "Trav og galopp", tekst: "Større anlegg med høyt forbruk av strø." },
    ],
  },
  kontakt: {
    kicker: "Kontakt",
    tittelA: "Vil du teste",
    tittelB: "Sitka i stallen?",
    tekst: "Har du en stall eller et hønsehus, eller vil du samarbeide med oss? Send oss en melding.",
    epostSnart: "E-post kommer snart",
    sendEpost: "Send e-post",
    tilToppen: "Til toppen ↑",
  },
  foto: "Foto",
};

export type Innhold = typeof no;

const en: Innhold = {
  meny: {
    problemet: "The problem",
    losningen: "The solution",
    prosessen: "The process",
    baerekraft: "Sustainability",
    lesMer: "Learn more",
    kontakt: "Contact",
    menyKnapp: "Menu",
  },
  preloader: "Sitka · Sustainable bedding",
  hero: {
    tittelA: "Biochar bedding",
    tittelB: "from Sitka spruce.",
    ingress:
      "We turn an invasive tree species into biochar, designed to bind odour, moisture and ammonia in poultry houses and stables.",
    seHvordan: "See how",
    taKontakt: "Get in touch",
    scroll: "Scroll",
  },
  problem: {
    ord: "Problem",
    ammoniakkA: "Stinging air",
    ammoniakkB: "in the stable.",
    ammoniakkTekst:
      "When urine and manure break down, ammonia is formed. The gas has a sharp smell, makes the air heavy and can irritate the airways and eyes of both animals and people.",
    ammoniakkUthev: ["ammonia", "airways"],
    granA: "A tree",
    granB: "out of place.",
    granTekst:
      "Sitka spruce blocks out the light, so the plants that belong here disappear. Insects and birds follow. Among other things, the tree threatens Norway's endangered coastal heathland, and it spreads on its own.",
    granUthev: ["light", "heathland"],
    granNotat: "Sitka spruce is an invasive species in Norway. We see the tree as a resource rather than a problem.",
    lesMer: "More about the problem",
  },
  losning: {
    kicker: "The solution",
    tittelA: "Bedding with",
    tittelB: "biochar.",
    tekst:
      "We mix biochar made from Sitka spruce with wood shavings. The biochar is meant to work like a sponge in the bedding, capturing what would otherwise smell and evaporate.",
    lesMer: "More about the solution",
    kort: [
      {
        nr: "01",
        tittel: "Porous structure",
        tekst: "Biochar is full of tiny pores. They add up to a huge surface area that can hold on to liquids and gases.",
      },
      {
        nr: "02",
        tittel: "Binds moisture and ammonia",
        tekst: "The pores can soak up moisture and ammonia from urine and manure, so less of it ends up in the air.",
      },
      {
        nr: "03",
        tittel: "Drier indoor climate",
        tekst: "The goal is less odour and drier bedding. Better for the animals, and better for the people who work in the stable.",
      },
    ],
  },
  prosess: {
    kicker: "The process · from tree to soil",
    tittelA: "From",
    tittelB: "problem",
    tittelC: "to resource.",
    ingress: "Four steps from an unwanted spruce to bedding that makes the stable better, and then back to the soil.",
    scroll: "Scroll →",
    videoMerke: "approx. 600 °C · almost no O",
    steg: [
      {
        nr: "01",
        tittel: "Sitka spruce is removed",
        tekst:
          "Sitka spruce is already being removed in many places to protect nature. Today the trees are often left on site or burned. We use them as raw material instead.",
        bilde: "ungSitkagran",
      },
      {
        nr: "02",
        tittel: "Pyrolysis",
        tekst:
          "The wood is heated to around 600 degrees with almost no oxygen. Instead of burning up, it breaks down and turns into biochar.",
        video: true,
      },
      {
        nr: "03",
        tittel: "Mixed into bedding",
        tekst:
          "The biochar is mixed with wood shavings. The result is a bedding, or an additive for regular bedding, for poultry houses and stables.",
        bilde: "flis",
      },
      {
        nr: "04",
        tittel: "Back to the soil",
        tekst:
          "Used bedding can be composted and become a soil improver. The carbon in the biochar stays in the soil instead of escaping into the air.",
        bilde: "biokullIJord",
      },
    ],
  },
  kunder: {
    kicker: "Who it's for",
    tittelA: "Made for",
    tittelB: "the stable.",
    liste: [
      { navn: "Poultry houses", tekst: "Odour and ammonia are a well-known problem in poultry houses." },
      { navn: "Riding schools", tekst: "Lots of horses, lots of bedding and lots of people in the stable every day." },
      { navn: "Private stables", tekst: "Horse owners who want a better stable environment." },
      { navn: "Racing stables", tekst: "Larger facilities that use a lot of bedding." },
    ],
  },
  kontakt: {
    kicker: "Contact",
    tittelA: "Want to try",
    tittelB: "Sitka in your stable?",
    tekst: "Do you have a stable or a poultry house, or would you like to work with us? Send us a message.",
    epostSnart: "Email coming soon",
    sendEpost: "Send email",
    tilToppen: "Back to top ↑",
  },
  foto: "Photo",
};

export const innhold: Record<Sprak, Innhold> = { no, en };
