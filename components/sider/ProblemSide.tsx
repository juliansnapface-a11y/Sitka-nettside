// Siden «Problemet og løsningen» på norsk og engelsk.
// Siden er med vilje rolig: ingen animasjoner eller scroll-effekter.
// Tekst med **stjerner** rundt blir fet skrift.

import type { BildeNavn } from "@/components/bilder";
import type { Sprak } from "@/lib/sprak";
import { Bilde, Faktaboks, Kapittel, KontaktBlokk, Rik, SideFooter, SideHeader } from "./Felles";

type Blokk =
  | { type: "p"; tekst: string }
  | { type: "fakta"; tittel: string; punkter: string[] }
  | { type: "bilde"; navn: BildeNavn; position?: string }
  | { type: "steg"; punkter: string[] };

type Tekst = {
  kicker: string;
  tittelA: string;
  tittelB: string;
  ingress: string;
  innholdsliste: string;
  kapitler: { id: string; nr: string; kicker: string; tittel: string; blokker: Blokk[] }[];
};

const tekst: Record<Sprak, Tekst> = {
  no: {
    kicker: "Strø med biokull, grundig forklart",
    tittelA: "Problemet",
    tittelB: "og løsningen.",
    ingress:
      "Sitka handler om to problemer som ikke ser ut til å ha noe med hverandre å gjøre: dårlig luft i staller og hønsehus, og et fremmed tre som sprer seg i norsk natur. Her forklarer vi begge, og hvordan biokull (på engelsk: biochar) kan koble dem sammen.",
    innholdsliste: "Innhold",
    kapitler: [
      {
        id: "ammoniakk",
        nr: "01",
        kicker: "Problem 1",
        tittel: "Ammoniakk i stallen",
        blokker: [
          {
            type: "p",
            tekst:
              "Når dyr står inne, havner urin og møkk i strøet. Der bryter bakterier ned nitrogenet i avfallet, og da dannes **ammoniakk (NH₃)**. Det er gassen som gir den skarpe, stikkende lukten mange kjenner fra staller og hønsehus.",
          },
          {
            type: "p",
            tekst:
              "Hvor mye ammoniakk som dannes, avhenger blant annet av **fukt og varme**. Vått strø og varm luft gir mer gass. Derfor er det viktig at strøet holder seg tørt, og at det skiftes ofte nok.",
          },
          {
            type: "fakta",
            tittel: "Hvorfor det er et problem",
            punkter: [
              "Ammoniakk irriterer øyne og luftveier, både hos dyr og hos folk som jobber i stallen.",
              "Vått strø er dårlig for dyrenes bein og hover. Hos fjørfe er vått strø knyttet til sår under føttene.",
              "Ammoniakk som slipper ut, er nitrogen som går tapt. Det kunne ellers vært gjødsel.",
              "Jordbruket er den største kilden til ammoniakkutslipp i Norge. I naturen kan ammoniakk gi overgjødsling og forsuring.",
            ],
          },
          { type: "bilde", navn: "honer", position: "center 75%" },
        ],
      },
      {
        id: "sitkagran",
        nr: "02",
        kicker: "Problem 2",
        tittel: "Sitkagran i naturen",
        blokker: [
          {
            type: "p",
            tekst:
              "Sitkagran kommer opprinnelig fra vestkysten av Nord-Amerika. I Norge ble den plantet langs kysten gjennom store deler av 1900-tallet, både for tømmer og som le mot vind. Treet vokser fort og tåler salt og vind godt.",
          },
          {
            type: "p",
            tekst:
              "Problemet er at sitkagranen **sprer seg av seg selv** ut fra plantefeltene. Den frøsår seg inn i åpne landskap som kystlynghei og myr. Der den vokser tett, stenger den ute lyset, og plantene som hører hjemme der, forsvinner. Etter dem forsvinner insekter og fugler som lever av dem.",
          },
          { type: "bilde", navn: "sitkagran" },
          {
            type: "p",
            tekst:
              "Sitkagran står på **Fremmedartslista** til Artsdatabanken i kategorien for svært høy risiko. Kystlyngheia, en av naturtypene den truer, er regnet som sterkt truet i Norge. Mange steder blir trærne derfor hogd av kommuner, grunneiere og frivillige.",
          },
          {
            type: "fakta",
            tittel: "Det vi vil gjøre noe med",
            punkter: [
              "Når sitkagran fjernes, blir trærne ofte liggende igjen eller brent på stedet.",
              "Da går både treet og karbonet i det tapt, og karbonet havner i lufta.",
              "Vi vil heller bruke treet som råvare til noe nyttig.",
            ],
          },
        ],
      },
      {
        id: "biokull",
        nr: "03",
        kicker: "Løsningen",
        tittel: "Hva er biokull?",
        blokker: [
          {
            type: "p",
            tekst:
              "Biokull lages ved **pyrolyse**. Tre varmes opp til rundt 600 grader nesten uten oksygen. Uten oksygen brenner ikke treet opp. I stedet drives vann og gasser ut, og igjen blir et svart, lett og veldig porøst kull.",
          },
          {
            type: "p",
            tekst:
              "Det spesielle med biokull er **porene**. Et lite korn er fullt av bittesmå hulrom, og til sammen gir de en enorm overflate. Den overflaten kan holde på vann og binde gasser og stoffer, omtrent som en svamp.",
          },
          { type: "bilde", navn: "biokull" },
          {
            type: "p",
            tekst:
              "Biokull er også en **stabil form for karbon**. Mye av karbonet som var i treet, blir værende i kullet i stedet for å gå ut i lufta, slik det ville gjort om treet ble brent eller råtnet.",
          },
        ],
      },
      {
        id: "stro",
        nr: "04",
        kicker: "Løsningen",
        tittel: "Strø med biokull",
        blokker: [
          {
            type: "p",
            tekst:
              "Sitka blander biokull fra sitkagran med **flis**. Flisen gir et mykt og tørt underlag, slik vanlig strø gjør. Biokullet skal gjøre jobben vanlig flis ikke klarer så godt: binde fukt og ammoniakk før det havner i lufta.",
          },
          { type: "bilde", navn: "flis" },
          {
            type: "fakta",
            tittel: "Det strøet skal gi",
            punkter: [
              "Mindre stikkende lukt og bedre luft for dyr og folk.",
              "Et tørrere underlag som er bedre for bein, hover og føtter.",
              "Mindre nitrogen som går tapt, og mer som blir igjen i møkka som gjødsel.",
            ],
          },
          {
            type: "p",
            tekst:
              "Strøet kan brukes alene, eller som en tilsetning i strøet staller og hønsehus allerede bruker. Vi har ikke testet strøet i en ekte stall ennå. Det er neste steg, og vi vil gjerne høre fra deg som har en stall eller et hønsehus.",
          },
        ],
      },
      {
        id: "kretslop",
        nr: "05",
        kicker: "Bærekraft",
        tittel: "Tilbake til jorda",
        blokker: [
          {
            type: "p",
            tekst:
              "Når strøet er brukt, er det ikke avfall. Brukt strø med møkk kan **komposteres** og bli jordforbedring. Biokullet følger med ut i jorda, og der kan det fortsette å holde på vann og næring.",
          },
          { type: "bilde", navn: "biokullIJord" },
          {
            type: "p",
            tekst:
              "Karbonet i biokullet blir liggende i jorda svært lenge. Slik ender et tre som var et problem i naturen, som karbon lagret i jorda, etter å ha gjort nytte i stallen på veien.",
          },
          { type: "steg", punkter: ["Sitkagran fjernes", "Pyrolyse til biokull", "Strø i stallen", "Kompost og jord"] },
        ],
      },
    ],
  },
  en: {
    kicker: "Biochar bedding, explained in depth",
    tittelA: "The problem",
    tittelB: "and the solution.",
    ingress:
      "Sitka is about two problems that don't seem to have anything to do with each other: poor air in stables and poultry houses, and an invasive tree spreading through Norwegian nature. Here we explain both, and how biochar can connect them.",
    innholdsliste: "Contents",
    kapitler: [
      {
        id: "ammoniakk",
        nr: "01",
        kicker: "Problem 1",
        tittel: "Ammonia in the stable",
        blokker: [
          {
            type: "p",
            tekst:
              "When animals are kept indoors, urine and manure end up in the bedding. There, bacteria break down the nitrogen in the waste, and **ammonia (NH₃)** is formed. It is the gas behind the sharp, stinging smell many people know from stables and poultry houses.",
          },
          {
            type: "p",
            tekst:
              "How much ammonia is formed depends on, among other things, **moisture and heat**. Wet bedding and warm air produce more gas. That is why it matters that the bedding stays dry and is changed often enough.",
          },
          {
            type: "fakta",
            tittel: "Why it is a problem",
            punkter: [
              "Ammonia irritates the eyes and airways of both animals and the people who work in the stable.",
              "Wet bedding is bad for the animals' legs and hooves. In poultry, wet bedding is linked to sores on the feet.",
              "Ammonia that escapes is nitrogen that is lost. It could otherwise have been fertiliser.",
              "Agriculture is the largest source of ammonia emissions in Norway. In nature, ammonia can cause over-fertilisation and acidification.",
            ],
          },
          { type: "bilde", navn: "honer", position: "center 75%" },
        ],
      },
      {
        id: "sitkagran",
        nr: "02",
        kicker: "Problem 2",
        tittel: "Sitka spruce in nature",
        blokker: [
          {
            type: "p",
            tekst:
              "Sitka spruce originally comes from the west coast of North America. In Norway it was planted along the coast through much of the 20th century, both for timber and as shelter from the wind. The tree grows fast and copes well with salt and wind.",
          },
          {
            type: "p",
            tekst:
              "The problem is that Sitka spruce **spreads on its own** from the plantations. It seeds itself into open landscapes such as coastal heathland and bogs. Where it grows densely, it blocks out the light, and the native plants disappear. The insects and birds that depend on them follow.",
          },
          { type: "bilde", navn: "sitkagran" },
          {
            type: "p",
            tekst:
              "Sitka spruce is on the Norwegian **Alien Species List** from the Norwegian Biodiversity Information Centre, in the category for very high risk. Coastal heathland, one of the habitats it threatens, is classified as endangered in Norway. In many places the trees are therefore cut down by municipalities, landowners and volunteers.",
          },
          {
            type: "fakta",
            tittel: "What we want to change",
            punkter: [
              "When Sitka spruce is removed, the trees are often left on site or burned.",
              "Both the wood and the carbon in it are then lost, and the carbon ends up in the air.",
              "We would rather use the tree as a raw material for something useful.",
            ],
          },
        ],
      },
      {
        id: "biokull",
        nr: "03",
        kicker: "The solution",
        tittel: "What is biochar?",
        blokker: [
          {
            type: "p",
            tekst:
              "Biochar is made through **pyrolysis**. Wood is heated to around 600 degrees with almost no oxygen. Without oxygen, the wood does not burn up. Instead, water and gases are driven out, leaving a black, light and very porous char.",
          },
          {
            type: "p",
            tekst:
              "What makes biochar special is its **pores**. A small grain is full of tiny cavities that together add up to a huge surface area. That surface can hold water and bind gases and other substances, a bit like a sponge.",
          },
          { type: "bilde", navn: "biokull" },
          {
            type: "p",
            tekst:
              "Biochar is also a **stable form of carbon**. Much of the carbon that was in the tree stays in the char instead of escaping into the air, as it would if the tree were burned or left to rot.",
          },
        ],
      },
      {
        id: "stro",
        nr: "04",
        kicker: "The solution",
        tittel: "Biochar bedding",
        blokker: [
          {
            type: "p",
            tekst:
              "Sitka mixes biochar from Sitka spruce with **wood shavings**. The shavings give a soft, dry base, just like regular bedding. The biochar is meant to do what plain shavings can't do as well: bind moisture and ammonia before it reaches the air.",
          },
          { type: "bilde", navn: "flis" },
          {
            type: "fakta",
            tittel: "What the bedding should deliver",
            punkter: [
              "Less stinging odour and better air for animals and people.",
              "A drier surface that is better for legs, hooves and feet.",
              "Less nitrogen lost, and more of it kept in the manure as fertiliser.",
            ],
          },
          {
            type: "p",
            tekst:
              "The bedding can be used on its own, or as an additive to the bedding stables and poultry houses already use. We have not tested it in a real stable yet. That is the next step, and we would love to hear from you if you have a stable or a poultry house.",
          },
        ],
      },
      {
        id: "kretslop",
        nr: "05",
        kicker: "Sustainability",
        tittel: "Back to the soil",
        blokker: [
          {
            type: "p",
            tekst:
              "Used bedding is not waste. Bedding mixed with manure can be **composted** and become a soil improver. The biochar goes with it into the soil, where it can keep holding on to water and nutrients.",
          },
          { type: "bilde", navn: "biokullIJord" },
          {
            type: "p",
            tekst:
              "The carbon in the biochar stays in the soil for a very long time. That is how a tree that was a problem in nature ends up as carbon stored in the soil, after doing a useful job in the stable along the way.",
          },
          { type: "steg", punkter: ["Sitka spruce is removed", "Pyrolysis into biochar", "Bedding in the stable", "Compost and soil"] },
        ],
      },
    ],
  },
};

function Blokker({ blokker, lang }: { blokker: Blokk[]; lang: Sprak }) {
  return (
    <>
      {blokker.map((b, i) => {
        if (b.type === "p")
          return (
            <p key={i}>
              <Rik tekst={b.tekst} />
            </p>
          );
        if (b.type === "fakta") return <Faktaboks key={i} tittel={b.tittel} punkter={b.punkter} />;
        if (b.type === "bilde") return <Bilde key={i} navn={b.navn} lang={lang} position={b.position} />;
        return (
          <ol key={i} className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {b.punkter.map((s, k) => (
              <li key={s} className="rounded-xl border border-off/15 p-4">
                <span className="font-display text-xs text-red">0{k + 1}</span>
                <span className="mt-1 block font-display text-lg uppercase leading-tight">{s}</span>
              </li>
            ))}
          </ol>
        );
      })}
    </>
  );
}

export default function ProblemSide({ lang }: { lang: Sprak }) {
  const t = tekst[lang];
  return (
    <div className="min-h-svh bg-ink text-off">
      <SideHeader lang={lang} side="problem" />

      <main className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="py-16 md:py-24">
          <p className="font-display text-xs uppercase tracking-[0.35em] text-red md:text-sm">{t.kicker}</p>
          <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.9] sm:text-6xl md:text-8xl">
            {t.tittelA}
            <br />
            <span className="text-red">{t.tittelB}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-off/75">{t.ingress}</p>

          <nav aria-label={t.innholdsliste} className="mt-12 grid gap-2 sm:grid-cols-2 md:grid-cols-5">
            {t.kapitler.map((k) => (
              <a
                key={k.id}
                href={`#${k.id}`}
                className="rounded-xl border border-off/15 px-4 py-3 transition-colors hover:border-red hover:text-red"
              >
                <span className="block font-display text-xs text-red">{k.nr}</span>
                <span className="font-display text-base uppercase tracking-wide">{k.tittel}</span>
              </a>
            ))}
          </nav>
        </div>

        {t.kapitler.map((k) => (
          <Kapittel key={k.id} id={k.id} nr={k.nr} kicker={k.kicker} tittel={k.tittel}>
            <Blokker blokker={k.blokker} lang={lang} />
          </Kapittel>
        ))}

        <KontaktBlokk lang={lang} />
      </main>

      <SideFooter lang={lang} />
    </div>
  );
}
