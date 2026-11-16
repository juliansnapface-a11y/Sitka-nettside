// Siden «Bærekraft» på norsk og engelsk.
// Her er tre interaktive figurer: trippel bunnlinje (tre ringer), karbonet (brenne/råtne/biokull)
// og kretsløpet. Resten er vanlig tekst. Tekst med **stjerner** rundt blir fet skrift.

import type { Sprak } from "@/lib/sprak";
import { Bilde, Faktaboks, KontaktBlokk, Rik, SideFooter, SideHeader } from "./Felles";
import TrippelBunnlinje, { type TrippelTekst } from "./TrippelBunnlinje";
import Karbonvalg, { type KarbonValg } from "./Karbonvalg";
import Kretslop, { type KretslopSteg } from "./Kretslop";

type Tekst = {
  kicker: string;
  tittel: string[];
  ingress: string;
  stikkord: string[];
  innholdsliste: string;
  deler: { id: string; tittel: string }[];
  trippel: { kicker: string; tittel: string; ingress: string; figur: TrippelTekst };
  karbon: {
    kicker: string;
    tittel: string;
    avsnitt: string[];
    valg: KarbonValg[];
    hint: string;
    skala: string;
    fakta: { tittel: string; punkter: string[] };
  };
  nitrogen: {
    kicker: string;
    tittel: string;
    avsnitt: string[];
    uten: { tittel: string; punkter: string[] };
    med: { tittel: string; punkter: string[] };
  };
  natur: { kicker: string; tittel: string; avsnitt: string[]; fakta: { tittel: string; punkter: string[] } };
  kretslop: { kicker: string; tittel: string; ingress: string; steg: KretslopSteg[]; hint: string };
  dyr: { kicker: string; tittel: string; kort: { tittel: string; tekst: string }[] };
  mal: { kicker: string; tittel: string; ingress: string; liste: { nr: string; navn: string; tekst: string }[] };
  arlig: { kicker: string; tittel: string; avsnitt: string[]; punkter: string[] };
};

const tekst: Record<Sprak, Tekst> = {
  no: {
    kicker: "Bærekraft",
    tittel: ["Bra for naturen.", "Bra for stallen.", "Bra for jorda."],
    ingress:
      "Sitka er laget for å gjøre nytte flere ganger. Vi tar en fremmed tresort ut av norsk natur, gjør den om til biokull, bruker den som strø i stallen og sender den videre som gjødsel til jorda. Her er alt om hvorfor vi mener det er bærekraftig, og hva vi fortsatt må finne ut av.",
    stikkord: ["Lagrer karbon", "Tar vare på nitrogen", "Sirkulært", "Fjerner en fremmed art", "Bedre luft"],
    innholdsliste: "På denne siden",
    deler: [
      { id: "trippel", tittel: "Trippel bunnlinje" },
      { id: "karbon", tittel: "Karbon" },
      { id: "nitrogen", tittel: "Nitrogen" },
      { id: "natur", tittel: "Naturen" },
      { id: "kretslop", tittel: "Kretsløpet" },
      { id: "dyr", tittel: "Dyr og folk" },
      { id: "maal", tittel: "FNs mål" },
      { id: "arlig", tittel: "Det vi ikke vet" },
    ],
    trippel: {
      kicker: "01 · Trippel bunnlinje",
      tittel: "Tre ting på en gang",
      ingress:
        "Trippel bunnlinje betyr at en bedrift ikke bare skal se på penger, men på tre ting samtidig: **miljøet**, **menneskene** og **økonomien**. Er én av dem svak, er ikke bedriften bærekraftig. Trykk på ringene for å se hva Sitka gjør på hvert område.",
      figur: {
        hint: "Trykk på en ring",
        knappAlle: "Alle tre",
        alle: {
          navn: "Der ringene møtes",
          kort: "Midt i figuren er Sitka.",
          tekst:
            "Det er der alle tre ringene overlapper at en idé blir virkelig bærekraftig. Sitka skal være bra for naturen, bra for dyrene og folkene i stallen, og samtidig være noe bønder vil betale for. Hvis bare én av delene stemmer, holder det ikke.",
        },
        soyler: [
          {
            id: "miljo",
            navn: "Miljø",
            kort: "Planeten og naturen",
            punkter: [
              { tittel: "Fjerner en fremmed art", tekst: "Sitkagran står på Fremmedartslista med svært høy risiko. Vi vil bruke trær som uansett skal fjernes." },
              { tittel: "Lagrer karbon", tekst: "Biokull er en svært stabil form for karbon. Når det havner i jorda, kan det bli liggende der i hundrevis av år." },
              { tittel: "Tar vare på nitrogenet", tekst: "Biokullet skal binde ammoniakk, så mer nitrogen blir i gjødsla i stedet for å forsvinne ut i lufta." },
              { tittel: "Bedre jord", tekst: "Brukt strø kan komposteres og bli jordforbedring som holder på vann og næring." },
            ],
          },
          {
            id: "mennesker",
            navn: "Mennesker",
            kort: "Dyr, bønder og lokalsamfunn",
            punkter: [
              { tittel: "Bedre luft i stallen", tekst: "Mindre ammoniakk betyr mindre stikkende lukt for dem som jobber der hver dag." },
              { tittel: "Dyrevelferd", tekst: "Tørrere strø og renere luft er bedre for luftveier, bein, hover og føtter." },
              { tittel: "Natur folk bruker", tekst: "Kystlynghei og åpent landskap er natur folk går tur i. Når sitkagrana fjernes, kan den komme tilbake." },
              { tittel: "Lokal verdi", tekst: "Råvaren finnes i Norge. Da kan arbeidet og verdien bli igjen lokalt." },
            ],
          },
          {
            id: "okonomi",
            navn: "Økonomi",
            kort: "Det må lønne seg",
            punkter: [
              { tittel: "Råvare som ellers går til spille", tekst: "Mye fjernet sitkagran blir brent eller blir liggende. Vi vil gjøre den om til et produkt." },
              { tittel: "Strø som skal vare lenger", tekst: "Målet er at strøet holder seg tørt lenger, så det må skiftes sjeldnere." },
              { tittel: "Mer verdifull gjødsel", tekst: "Mer nitrogen i gjødsla kan bety at bonden trenger mindre kunstgjødsel." },
              { tittel: "Gjør nytte tre ganger", tekst: "Samme materiale fjerner et problem, brukes som strø og blir til slutt gjødsel." },
            ],
          },
        ],
      },
    },
    karbon: {
      kicker: "02 · Karbon",
      tittel: "Karbon som blir i jorda",
      avsnitt: [
        "Et tre er laget av karbon som det har hentet fra CO₂ i lufta. Spørsmålet er hva som skjer med karbonet når treet er hogd.",
        "Brenner man treet, går karbonet rett tilbake til lufta som CO₂. Lar man det råtne, skjer det samme, bare saktere. Men lager man **biokull**, varmes treet opp nesten uten oksygen (det kalles **pyrolyse**). Da blir mye av karbonet låst i en fast form som er svært vanskelig for bakterier å bryte ned.",
        "Når biokullet til slutt havner i jorda, kan en stor del av karbonet bli liggende der i hundrevis av år. Det er derfor biokull regnes som en måte å **ta CO₂ ut av lufta** på.",
      ],
      hint: "Velg hva som skjer med treet",
      skala: "Hvor lenge karbonet holdes unna lufta (illustrasjon)",
      valg: [
        { id: "brenne", navn: "Brenne", tid: "Tilbake i lufta med en gang", lagret: 4, tekst: "Når treet brennes, blir karbonet til CO₂ med en gang. Mye fjernet sitkagran blir brent i dag." },
        { id: "ratne", navn: "Råtne", tid: "Tilbake i lufta etter noen år", lagret: 22, tekst: "Når treet blir liggende og råtne, bryter sopp og bakterier det ned. Det meste av karbonet går tilbake til lufta, bare saktere." },
        { id: "biokull", navn: "Biokull", tid: "Kan bli i jorda i hundrevis av år", lagret: 92, tekst: "Når treet blir til biokull, låses mye av karbonet i en stabil form. Brukt i strø og så i jorda kan det bli liggende der svært lenge." },
      ],
      fakta: {
        tittel: "Kort om biokull og karbon",
        punkter: [
          "**Pyrolyse** betyr å varme opp biomasse til flere hundre grader nesten uten oksygen.",
          "Gassene som dannes, kan brukes som energi i selve prosessen.",
          "FNs klimapanel (IPCC) nevner biokull som en av måtene å fjerne CO₂ fra atmosfæren på.",
          "Hvor mye karbon som lagres, avhenger av råvaren og temperaturen. Det vil vi lære mer om sammen med biokullprodusenten vi samarbeider med.",
        ],
      },
    },
    nitrogen: {
      kicker: "03 · Nitrogen",
      tittel: "Nitrogenet skal bli der det hører hjemme",
      avsnitt: [
        "Møkk og urin inneholder mye **nitrogen**. Det er et av de viktigste næringsstoffene planter trenger, og grunnen til at husdyrgjødsel er så verdifull.",
        "Problemet er at mye av nitrogenet forsvinner som **ammoniakk** før gjødsla kommer ut på jordet. Det gir dårlig luft i stallen, og når ammoniakken lander i naturen, kan den gi overgjødsling og forsuring. Jordbruket står for det meste av ammoniakkutslippene i Norge.",
        "Biokull er porøst og har en enorm overflate. Tanken er at det skal **binde ammoniakk og fukt** i strøet. Da blir mer av nitrogenet igjen i gjødsla, der det gjør nytte, i stedet for å slippe ut.",
      ],
      uten: {
        tittel: "Vanlig strø",
        punkter: ["Nitrogen blir til ammoniakk", "Gassen slipper ut i stallen og naturen", "Gjødsla mister næring"],
      },
      med: {
        tittel: "Strø med biokull",
        punkter: ["Biokullet skal binde ammoniakk og fukt", "Bedre luft i stallen", "Mer nitrogen blir igjen i gjødsla"],
      },
    },
    natur: {
      kicker: "04 · Naturen",
      tittel: "Et tre som ikke hører hjemme her",
      avsnitt: [
        "Sitkagran kommer fra Nord-Amerika. Den ble plantet langs norskekysten fordi den vokser fort og tåler vind. Nå sprer den seg av seg selv, og står på **Fremmedartslista med svært høy risiko**.",
        "Der sitkagrana tar over, blir det mørkt og tett. Lyset forsvinner, og planter og insekter som trenger åpent landskap, får det vanskelig. Særlig utsatt er **kystlyngheia**, en gammel kulturnatur som selv er truet.",
        "Mange steder fjernes sitkagran derfor på dugnad og i naturprosjekter. Ofte blir trærne brent eller blir liggende. Vi vil heller at de blir til noe nyttig.",
      ],
      fakta: {
        tittel: "Hvorfor det betyr noe",
        punkter: [
          "Fremmede arter er en av de største truslene mot naturmangfoldet.",
          "Når sitkagran fjernes, får stedegne planter og dyr plass igjen.",
          "Hvis det finnes et marked for trærne, blir det lettere å få fjernet dem.",
        ],
      },
    },
    kretslop: {
      kicker: "05 · Kretsløpet",
      tittel: "Sirkulær bærekraft",
      ingress:
        "I en sirkulær økonomi blir ingenting avfall. Det som er ferdig brukt ett sted, blir råvare et annet sted. Slik er Sitka tenkt, fra treet blir hogd til det blir ny jord.",
      hint: "Trykk på et steg",
      steg: [
        { tittel: "Sitkagran fjernes", tekst: "Trær fra steder der de skal fjernes uansett, for å gi naturen plass igjen." },
        { tittel: "Pyrolyse", tekst: "Treet varmes opp nesten uten oksygen og blir til biokull. Karbonet låses fast." },
        { tittel: "Strø i stallen", tekst: "Biokullet blandes med flis til strø. Det skal binde ammoniakk og fukt." },
        { tittel: "Kompost og gjødsel", tekst: "Det brukte strøet, med møkk og nitrogen, komposteres til gjødsel." },
        { tittel: "Ny jord", tekst: "Gjødsla spres på jordet. Biokullet blir i jorda, holder på vann og næring og lagrer karbon." },
      ],
    },
    dyr: {
      kicker: "06 · Dyr og folk",
      tittel: "Bærekraft handler også om dem i stallen",
      kort: [
        { tittel: "Luftveier", tekst: "Ammoniakk irriterer øyne og luftveier hos både dyr og mennesker. Mindre gass gir bedre hverdag." },
        { tittel: "Bein og føtter", tekst: "Vått strø er dårlig for hover og bein, og hos fjørfe er det knyttet til sår under føttene." },
        { tittel: "Arbeidsmiljø", tekst: "De som jobber i stallen, puster inn lufta hver dag. Renere luft er bedre arbeidsmiljø." },
      ],
    },
    mal: {
      kicker: "07 · FNs bærekraftsmål",
      tittel: "Målene vi jobber mot",
      ingress: "FN har 17 bærekraftsmål. Sitka henger tettest sammen med disse tre.",
      liste: [
        { nr: "12", navn: "Ansvarlig forbruk og produksjon", tekst: "Vi lager et produkt av en råvare som ellers går til spille, og som brukes flere ganger." },
        { nr: "13", navn: "Stoppe klimaendringene", tekst: "Biokull lagrer karbon i jorda i stedet for at det går tilbake til lufta." },
        { nr: "15", navn: "Livet på land", tekst: "Vi vil hjelpe til med å fjerne en fremmed art og gi kystlynghei og stedegen natur plass igjen." },
      ],
    },
    arlig: {
      kicker: "08 · Ærlig talt",
      tittel: "Det vi ikke vet ennå",
      avsnitt: [
        "Vi tror på ideen, men vi vil ikke love mer enn vi kan stå for. Sitka er ikke testet i en ekte stall ennå. Derfor skriver vi at produktet **skal** og **kan**, ikke at det gjør det.",
        "Dette vil vi finne ut av når vi tester:",
      ],
      punkter: [
        "Hvor mye ammoniakken i stallen faktisk går ned.",
        "Hvor lenge strøet holder seg tørt sammenlignet med vanlig strø.",
        "Hvor mye karbon som lagres per kilo strø, og hvor lenge.",
        "Hva det koster å hente og frakte sitkagran, og hvor det lønner seg.",
      ],
    },
  },

  en: {
    kicker: "Sustainability",
    tittel: ["Good for nature.", "Good for the stable.", "Good for the soil."],
    ingress:
      "Sitka is designed to be useful more than once. We take an invasive tree out of Norwegian nature, turn it into biochar, use it as bedding in the stable and pass it on as fertiliser for the soil. Here is everything about why we think this is sustainable, and what we still need to find out.",
    stikkord: ["Stores carbon", "Keeps nitrogen", "Circular", "Removes an invasive species", "Cleaner air"],
    innholdsliste: "On this page",
    deler: [
      { id: "trippel", tittel: "Triple bottom line" },
      { id: "karbon", tittel: "Carbon" },
      { id: "nitrogen", tittel: "Nitrogen" },
      { id: "natur", tittel: "Nature" },
      { id: "kretslop", tittel: "The cycle" },
      { id: "dyr", tittel: "Animals and people" },
      { id: "maal", tittel: "UN goals" },
      { id: "arlig", tittel: "What we don't know" },
    ],
    trippel: {
      kicker: "01 · Triple bottom line",
      tittel: "Three things at once",
      ingress:
        "The triple bottom line means a business should not only look at money, but at three things at the same time: **the planet**, **people** and **profit**. If one of them is weak, the business is not sustainable. Tap the rings to see what Sitka does in each area.",
      figur: {
        hint: "Tap a ring",
        knappAlle: "All three",
        alle: {
          navn: "Where the rings meet",
          kort: "Sitka sits in the middle.",
          tekst:
            "An idea only becomes truly sustainable where all three rings overlap. Sitka should be good for nature, good for the animals and people in the stable, and also something farmers want to pay for. If only one part works, it is not enough.",
        },
        soyler: [
          {
            id: "miljo",
            navn: "Planet",
            kort: "The climate and nature",
            punkter: [
              { tittel: "Removes an invasive species", tekst: "Sitka spruce is on the Norwegian Alien Species List with a severe risk rating. We want to use trees that are being removed anyway." },
              { tittel: "Stores carbon", tekst: "Biochar is a very stable form of carbon. Once it is in the soil, it can stay there for hundreds of years." },
              { tittel: "Keeps the nitrogen", tekst: "The biochar is meant to bind ammonia, so more nitrogen stays in the manure instead of escaping into the air." },
              { tittel: "Better soil", tekst: "Used bedding can be composted into a soil improver that holds on to water and nutrients." },
            ],
          },
          {
            id: "mennesker",
            navn: "People",
            kort: "Animals, farmers and communities",
            punkter: [
              { tittel: "Cleaner air in the stable", tekst: "Less ammonia means less of that sharp smell for the people who work there every day." },
              { tittel: "Animal welfare", tekst: "Drier bedding and cleaner air are better for airways, legs, hooves and feet." },
              { tittel: "Nature people use", tekst: "Coastal heathland and open landscapes are places people go hiking. When the spruce is removed, they can come back." },
              { tittel: "Local value", tekst: "The raw material is found in Norway, so the work and the value can stay local." },
            ],
          },
          {
            id: "okonomi",
            navn: "Profit",
            kort: "It has to pay off",
            punkter: [
              { tittel: "A resource that would go to waste", tekst: "Much of the Sitka spruce that is removed is burned or left to rot. We want to turn it into a product." },
              { tittel: "Bedding that should last longer", tekst: "The goal is for the bedding to stay dry for longer, so it needs changing less often." },
              { tittel: "More valuable manure", tekst: "More nitrogen in the manure could mean farmers need less artificial fertiliser." },
              { tittel: "Useful three times", tekst: "The same material removes a problem, works as bedding and finally becomes fertiliser." },
            ],
          },
        ],
      },
    },
    karbon: {
      kicker: "02 · Carbon",
      tittel: "Carbon that stays in the soil",
      avsnitt: [
        "A tree is made of carbon that it has taken from CO₂ in the air. The question is what happens to that carbon once the tree is cut down.",
        "If the tree is burned, the carbon goes straight back into the air as CO₂. If it is left to rot, the same thing happens, only more slowly. But if it is made into **biochar**, the wood is heated with almost no oxygen (this is called **pyrolysis**). Much of the carbon is then locked into a solid form that bacteria find very hard to break down.",
        "When the biochar finally ends up in the soil, a large share of the carbon can stay there for hundreds of years. That is why biochar is seen as a way to **remove CO₂ from the air**.",
      ],
      hint: "Choose what happens to the tree",
      skala: "How long the carbon is kept out of the air (illustration)",
      valg: [
        { id: "brenne", navn: "Burn", tid: "Back in the air right away", lagret: 4, tekst: "When the tree is burned, the carbon becomes CO₂ straight away. A lot of removed Sitka spruce is burned today." },
        { id: "ratne", navn: "Rot", tid: "Back in the air after a few years", lagret: 22, tekst: "When the tree is left to rot, fungi and bacteria break it down. Most of the carbon returns to the air, just more slowly." },
        { id: "biokull", navn: "Biochar", tid: "Can stay in the soil for centuries", lagret: 92, tekst: "When the tree becomes biochar, much of the carbon is locked into a stable form. Used as bedding and then in the soil, it can stay there for a very long time." },
      ],
      fakta: {
        tittel: "Biochar and carbon in short",
        punkter: [
          "**Pyrolysis** means heating biomass to several hundred degrees with almost no oxygen.",
          "The gases that form can be used as energy for the process itself.",
          "The UN climate panel (IPCC) lists biochar as one of the ways to remove CO₂ from the atmosphere.",
          "How much carbon is stored depends on the raw material and the temperature. We want to learn more about this with the biochar producer we work with.",
        ],
      },
    },
    nitrogen: {
      kicker: "03 · Nitrogen",
      tittel: "Keeping nitrogen where it belongs",
      avsnitt: [
        "Manure and urine contain a lot of **nitrogen**. It is one of the most important nutrients plants need, and the reason animal manure is so valuable.",
        "The problem is that much of the nitrogen escapes as **ammonia** before the manure even reaches the field. That means poor air in the stable, and when the ammonia lands in nature it can cause over-fertilisation and acidification. Agriculture is the source of most ammonia emissions in Norway.",
        "Biochar is porous and has a huge surface area. The idea is that it will **bind ammonia and moisture** in the bedding. That way, more of the nitrogen stays in the manure, where it is useful, instead of escaping.",
      ],
      uten: {
        tittel: "Ordinary bedding",
        punkter: ["Nitrogen turns into ammonia", "The gas escapes into the stable and nature", "The manure loses nutrients"],
      },
      med: {
        tittel: "Biochar bedding",
        punkter: ["The biochar is meant to bind ammonia and moisture", "Cleaner air in the stable", "More nitrogen stays in the manure"],
      },
    },
    natur: {
      kicker: "04 · Nature",
      tittel: "A tree that doesn't belong here",
      avsnitt: [
        "Sitka spruce comes from North America. It was planted along the Norwegian coast because it grows fast and stands up to the wind. Now it spreads on its own, and it is on the **Norwegian Alien Species List with a severe risk rating**.",
        "Where Sitka spruce takes over, the forest becomes dark and dense. The light disappears, and plants and insects that need open landscapes struggle. **Coastal heathland**, an old cultural landscape that is itself threatened, is especially at risk.",
        "In many places, volunteers and nature projects are removing Sitka spruce. The trees are often burned or left where they fall. We would rather turn them into something useful.",
      ],
      fakta: {
        tittel: "Why it matters",
        punkter: [
          "Invasive species are one of the biggest threats to biodiversity.",
          "When Sitka spruce is removed, native plants and animals get their space back.",
          "If there is a market for the trees, it becomes easier to get them removed.",
        ],
      },
    },
    kretslop: {
      kicker: "05 · The cycle",
      tittel: "Circular sustainability",
      ingress:
        "In a circular economy, nothing becomes waste. What is used up in one place becomes a raw material somewhere else. That is how Sitka is designed, from the moment the tree is cut until it becomes new soil.",
      hint: "Tap a step",
      steg: [
        { tittel: "Spruce removed", tekst: "Trees from places where they are being removed anyway, to give nature its space back." },
        { tittel: "Pyrolysis", tekst: "The wood is heated with almost no oxygen and becomes biochar. The carbon is locked in." },
        { tittel: "Stable bedding", tekst: "The biochar is mixed with wood shavings into bedding. It is meant to bind ammonia and moisture." },
        { tittel: "Compost and fertiliser", tekst: "The used bedding, with manure and nitrogen, is composted into fertiliser." },
        { tittel: "New soil", tekst: "The fertiliser is spread on the field. The biochar stays in the soil, holds water and nutrients, and stores carbon." },
      ],
    },
    dyr: {
      kicker: "06 · Animals and people",
      tittel: "Sustainability is also about those in the stable",
      kort: [
        { tittel: "Airways", tekst: "Ammonia irritates the eyes and airways of both animals and people. Less gas makes every day better." },
        { tittel: "Legs and feet", tekst: "Wet bedding is bad for hooves and legs, and in poultry it is linked to sores on the feet." },
        { tittel: "Working conditions", tekst: "The people who work in the stable breathe that air every day. Cleaner air is a better workplace." },
      ],
    },
    mal: {
      kicker: "07 · UN Sustainable Development Goals",
      tittel: "The goals we work towards",
      ingress: "The UN has 17 Sustainable Development Goals. Sitka is most closely linked to these three.",
      liste: [
        { nr: "12", navn: "Responsible consumption and production", tekst: "We make a product from a resource that would otherwise go to waste, and it is used more than once." },
        { nr: "13", navn: "Climate action", tekst: "Biochar stores carbon in the soil instead of letting it return to the air." },
        { nr: "15", navn: "Life on land", tekst: "We want to help remove an invasive species and give coastal heathland and native nature its space back." },
      ],
    },
    arlig: {
      kicker: "08 · To be honest",
      tittel: "What we don't know yet",
      avsnitt: [
        "We believe in the idea, but we don't want to promise more than we can stand behind. Sitka has not been tested in a real stable yet. That is why we say the product **is designed to** and **can**, not that it does.",
        "This is what we want to find out when we test it:",
      ],
      punkter: [
        "How much the ammonia in the stable actually goes down.",
        "How long the bedding stays dry compared with ordinary bedding.",
        "How much carbon is stored per kilo of bedding, and for how long.",
        "What it costs to collect and transport Sitka spruce, and where it pays off.",
      ],
    },
  },
};

function Del({ id, kicker, tittel, children }: { id: string; kicker: string; tittel: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-off/10 py-20 md:py-28">
      <p className="font-display text-xs uppercase tracking-[0.35em] text-red md:text-sm">{kicker}</p>
      <h2 className="mt-4 max-w-4xl font-display text-4xl font-bold uppercase leading-[0.95] md:text-6xl">{tittel}</h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Avsnitt({ avsnitt }: { avsnitt: string[] }) {
  return (
    <div className="space-y-6 text-lg leading-relaxed text-off/75 [&_strong]:font-semibold [&_strong]:text-off">
      {avsnitt.map((a) => (
        <p key={a}>
          <Rik tekst={a} />
        </p>
      ))}
    </div>
  );
}

export default function BaerekraftSide({ lang }: { lang: Sprak }) {
  const t = tekst[lang];
  return (
    <div className="min-h-svh overflow-x-clip bg-ink text-off">
      <SideHeader lang={lang} side="baerekraft" />

      <main className="mx-auto max-w-6xl px-5 md:px-10">
        {/* toppen */}
        <div className="relative py-16 md:py-24">
          {/* årringer i bakgrunnen */}
          <svg
            viewBox="0 0 400 400"
            className="pointer-events-none absolute -right-40 top-0 -z-0 w-[560px] opacity-[0.12] md:-right-24 md:w-[640px]"
            aria-hidden="true"
          >
            {[190, 160, 132, 104, 78, 54, 32].map((r) => (
              <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#E0201A" strokeWidth={r === 190 ? 4 : 2} />
            ))}
          </svg>
          <div className="relative">
            <p className="font-display text-xs uppercase tracking-[0.35em] text-red md:text-sm">{t.kicker}</p>
            <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.92] sm:text-6xl md:text-8xl">
              {t.tittel.map((l, i) => (
                <span key={l} className={`block ${i === 1 ? "text-red" : ""}`}>
                  {l}
                </span>
              ))}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-off/75">{t.ingress}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {t.stikkord.map((s) => (
                <li key={s} className="rounded-full border border-red/50 bg-red/10 px-4 py-1.5 font-display text-sm uppercase tracking-[0.15em]">
                  {s}
                </li>
              ))}
            </ul>

            <nav aria-label={t.innholdsliste} className="mt-12">
              <p className="font-display text-xs uppercase tracking-[0.35em] text-off/50">{t.innholdsliste}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {t.deler.map((d, i) => (
                  <a
                    key={d.id}
                    href={`#${d.id}`}
                    className="rounded-xl border border-off/15 px-4 py-3 transition-colors hover:border-red hover:text-red"
                  >
                    <span className="block font-display text-xs text-red">0{i + 1}</span>
                    <span className="font-display text-base uppercase tracking-wide">{d.tittel}</span>
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* 01 trippel bunnlinje */}
        <Del id="trippel" kicker={t.trippel.kicker} tittel={t.trippel.tittel}>
          <div className="max-w-3xl text-lg leading-relaxed text-off/75 [&_strong]:font-semibold [&_strong]:text-off">
            <Rik tekst={t.trippel.ingress} />
          </div>
          <div className="mt-12">
            <TrippelBunnlinje tekst={t.trippel.figur} />
          </div>
        </Del>

        {/* 02 karbon */}
        <Del id="karbon" kicker={t.karbon.kicker} tittel={t.karbon.tittel}>
          <div className="grid gap-10 md:grid-cols-2">
            <Avsnitt avsnitt={t.karbon.avsnitt} />
            <Bilde navn="biokull" lang={lang} aspect="aspect-[4/3]" />
          </div>
          <div className="mt-12">
            <Karbonvalg valg={t.karbon.valg} hint={t.karbon.hint} skala={t.karbon.skala} />
          </div>
          <div className="mt-10">
            <Faktaboks tittel={t.karbon.fakta.tittel} punkter={t.karbon.fakta.punkter} />
          </div>
        </Del>

        {/* 03 nitrogen */}
        <Del id="nitrogen" kicker={t.nitrogen.kicker} tittel={t.nitrogen.tittel}>
          <div className="max-w-3xl">
            <Avsnitt avsnitt={t.nitrogen.avsnitt} />
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              { ...t.nitrogen.uten, god: false },
              { ...t.nitrogen.med, god: true },
            ].map((k) => (
              <div
                key={k.tittel}
                className={`rounded-3xl border p-6 md:p-8 ${k.god ? "border-red bg-red/10" : "border-off/15 bg-off/[0.03]"}`}
              >
                <div className="flex items-center gap-4">
                  {/* NH₃-molekyl: rødt og fanget, eller grått og på vei ut */}
                  <svg viewBox="0 0 64 64" className="h-14 w-14 shrink-0" aria-hidden="true">
                    {k.god && <circle cx="32" cy="32" r="29" fill="none" stroke="#E0201A" strokeWidth="2" strokeDasharray="3 5" />}
                    <circle cx="32" cy="30" r="9" fill={k.god ? "#E0201A" : "#F4EEEE"} fillOpacity={k.god ? 1 : 0.5} />
                    {[
                      [18, 40],
                      [46, 40],
                      [32, 48],
                    ].map(([x, y]) => (
                      <circle key={`${x}${y}`} cx={x} cy={y} r="5" fill="#F4EEEE" fillOpacity={k.god ? 0.9 : 0.35} />
                    ))}
                    {!k.god && <path d="M32 14 L32 4 M27 9 L32 4 L37 9" stroke="#F4EEEE" strokeOpacity="0.5" strokeWidth="2" fill="none" />}
                  </svg>
                  <h3 className="font-display text-2xl font-bold uppercase md:text-3xl">{k.tittel}</h3>
                </div>
                <ul className="mt-6 space-y-3">
                  {k.punkter.map((p) => (
                    <li key={p} className="flex gap-3 text-lg text-off/80">
                      <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${k.god ? "bg-red" : "bg-off/40"}`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Del>

        {/* 04 naturen */}
        <Del id="natur" kicker={t.natur.kicker} tittel={t.natur.tittel}>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-10">
              <Avsnitt avsnitt={t.natur.avsnitt} />
              <Faktaboks tittel={t.natur.fakta.tittel} punkter={t.natur.fakta.punkter} />
            </div>
            <Bilde navn="sitkagran" lang={lang} aspect="aspect-[3/4]" />
          </div>
        </Del>

        {/* 05 kretsløpet */}
        <Del id="kretslop" kicker={t.kretslop.kicker} tittel={t.kretslop.tittel}>
          <p className="max-w-3xl text-lg leading-relaxed text-off/75">{t.kretslop.ingress}</p>
          <div className="mt-12">
            <Kretslop steg={t.kretslop.steg} hint={t.kretslop.hint} />
          </div>
          <div className="mt-12">
            <Bilde navn="biokullIJord" lang={lang} aspect="aspect-[21/9]" />
          </div>
        </Del>

        {/* 06 dyr og folk */}
        <Del id="dyr" kicker={t.dyr.kicker} tittel={t.dyr.tittel}>
          <div className="grid gap-4 md:grid-cols-3">
            {t.dyr.kort.map((k, i) => (
              <div key={k.tittel} className="rounded-3xl border border-off/15 p-6 md:p-8">
                <span className="font-display text-5xl font-bold text-red">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl uppercase tracking-wide">{k.tittel}</h3>
                <p className="mt-3 text-off/70">{k.tekst}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Bilde navn="honer" lang={lang} aspect="aspect-[21/9]" position="center 70%" />
          </div>
        </Del>

        {/* 07 FNs mål */}
        <Del id="maal" kicker={t.mal.kicker} tittel={t.mal.tittel}>
          <p className="max-w-3xl text-lg leading-relaxed text-off/75">{t.mal.ingress}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {t.mal.liste.map((m) => (
              <div key={m.nr} className="flex flex-col rounded-3xl bg-red p-6 text-ink md:p-8">
                <span className="font-display text-7xl font-bold leading-none">{m.nr}</span>
                <h3 className="mt-4 font-display text-2xl font-bold uppercase leading-tight">{m.navn}</h3>
                <p className="mt-3 text-ink/80">{m.tekst}</p>
              </div>
            ))}
          </div>
        </Del>

        {/* 08 ærlig talt */}
        <Del id="arlig" kicker={t.arlig.kicker} tittel={t.arlig.tittel}>
          <div className="grid gap-10 md:grid-cols-2">
            <Avsnitt avsnitt={t.arlig.avsnitt} />
            <ol className="space-y-3">
              {t.arlig.punkter.map((p, i) => (
                <li key={p} className="flex gap-4 rounded-2xl border border-off/15 p-5">
                  <span className="font-display text-sm text-red">0{i + 1}</span>
                  <span className="text-off/80">{p}</span>
                </li>
              ))}
            </ol>
          </div>
        </Del>

        <KontaktBlokk lang={lang} />
      </main>

      <SideFooter lang={lang} />
    </div>
  );
}
