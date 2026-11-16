import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { bilder, type BildeNavn } from "@/components/bilder";
import { Kreditt } from "@/components/Photo";
import { kontakt } from "@/components/innhold";

// En egen side som forklarer problemet og løsningen grundig.
// Siden er med vilje rolig: ingen animasjoner eller scroll-effekter.

export const metadata: Metadata = {
  title: "Biokull i strø: problemet og løsningen",
  description:
    "Hvorfor ammoniakk i fjøs, stall og hønsehus og sitkagran i naturen er to problemer, og hvordan strø med biokull (biochar) fra sitkagran kan løse begge.",
  alternates: { canonical: "/problem-og-losning" },
  openGraph: {
    title: "Biokull i strø: problemet og løsningen | Sitka",
    description:
      "Hvordan strø med biokull (biochar) fra sitkagran skal binde ammoniakk i stallen og gjøre en fremmed tresort til en ressurs.",
    url: "/problem-og-losning",
    locale: "nb_NO",
    type: "article",
    siteName: "Sitka",
  },
};

function Bilde({ navn, className = "", position = "center" }: { navn: BildeNavn; className?: string; position?: string }) {
  const b = bilder[navn];
  return (
    <figure className={className}>
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-[#1a0b09]">
        <Image src={b.src} alt={b.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" style={{ objectPosition: position }} />
      </div>
      <figcaption className="mt-3 text-xs text-off/40">
        <Kreditt b={b} />
      </figcaption>
    </figure>
  );
}

function Kapittel({ id, nr, kicker, tittel, children }: { id: string; nr: string; kicker: string; tittel: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-off/10 py-20 md:py-28">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="font-display text-7xl font-bold leading-none text-red md:text-8xl">{nr}</div>
          <p className="mt-4 font-display text-xs uppercase tracking-[0.35em] text-off/50">{kicker}</p>
        </div>
        <div className="md:col-span-8">
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] md:text-6xl">{tittel}</h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-off/75 [&_strong]:font-semibold [&_strong]:text-off">{children}</div>
        </div>
      </div>
    </section>
  );
}

function Faktaboks({ tittel, punkter }: { tittel: string; punkter: string[] }) {
  return (
    <aside className="rounded-2xl border border-red/40 bg-red/[0.06] p-6 md:p-8">
      <p className="font-display text-sm uppercase tracking-[0.3em] text-red">{tittel}</p>
      <ul className="mt-4 space-y-3 text-base text-off/80">
        {punkter.map((p) => (
          <li key={p} className="flex gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

const innhold = [
  { id: "ammoniakk", nr: "01", tittel: "Ammoniakk i stallen" },
  { id: "sitkagran", nr: "02", tittel: "Sitkagran i naturen" },
  { id: "biokull", nr: "03", tittel: "Hva er biokull?" },
  { id: "stro", nr: "04", tittel: "Strø med biokull" },
  { id: "kretslop", nr: "05", tittel: "Tilbake til jorda" },
];

export default function ProblemOgLosning() {
  return (
    <div className="min-h-svh bg-ink text-off">
      <header className="sticky top-0 z-40 border-b border-off/10 bg-ink/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-10">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/sitka-ikon.svg" alt="" className="h-8 w-8" />
            <span className="font-display text-xl font-bold tracking-[0.12em]">SITKA</span>
          </Link>
          <Link href="/" className="font-display text-sm uppercase tracking-[0.2em] text-off/70 hover:text-red">
            ← Til forsiden
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 md:px-10">
        {/* Innledning */}
        <div className="py-16 md:py-24">
          <p className="font-display text-xs uppercase tracking-[0.35em] text-red md:text-sm">Strø med biokull, grundig forklart</p>
          <h1 className="mt-6 font-display text-6xl font-bold uppercase leading-[0.9] md:text-8xl">
            Problemet
            <br />
            <span className="text-red">og løsningen.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-off/75">
            Sitka handler om to problemer som ikke ser ut til å ha noe med hverandre å gjøre: dårlig luft i staller og
            hønsehus, og et fremmed tre som sprer seg i norsk natur. Her forklarer vi begge, og hvordan biokull (på engelsk: biochar) kan
            koble dem sammen.
          </p>

          <nav aria-label="Innhold" className="mt-12 grid gap-2 sm:grid-cols-2 md:grid-cols-5">
            {innhold.map((k) => (
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

        {/* 01 Ammoniakk */}
        <Kapittel id="ammoniakk" nr="01" kicker="Problem 1" tittel="Ammoniakk i stallen">
          <p>
            Når dyr står inne, havner urin og møkk i strøet. Der bryter bakterier ned nitrogenet i avfallet, og da dannes
            <strong> ammoniakk (NH₃)</strong>. Det er gassen som gir den skarpe, stikkende lukten mange kjenner fra staller og
            hønsehus.
          </p>
          <p>
            Hvor mye ammoniakk som dannes, avhenger blant annet av <strong>fukt og varme</strong>. Vått strø og varm luft gir mer
            gass. Derfor er det viktig at strøet holder seg tørt, og at det skiftes ofte nok.
          </p>
          <Faktaboks
            tittel="Hvorfor det er et problem"
            punkter={[
              "Ammoniakk irriterer øyne og luftveier, både hos dyr og hos folk som jobber i stallen.",
              "Vått strø er dårlig for dyrenes bein og hover. Hos fjørfe er vått strø knyttet til sår under føttene.",
              "Ammoniakk som slipper ut, er nitrogen som går tapt. Det kunne ellers vært gjødsel.",
              "Jordbruket er den største kilden til ammoniakkutslipp i Norge. I naturen kan ammoniakk gi overgjødsling og forsuring.",
            ]}
          />
          <Bilde navn="honer" position="center 75%" />
        </Kapittel>

        {/* 02 Sitkagran */}
        <Kapittel id="sitkagran" nr="02" kicker="Problem 2" tittel="Sitkagran i naturen">
          <p>
            Sitkagran kommer opprinnelig fra vestkysten av Nord-Amerika. I Norge ble den plantet langs kysten gjennom store deler
            av 1900-tallet, både for tømmer og som le mot vind. Treet vokser fort og tåler salt og vind godt.
          </p>
          <p>
            Problemet er at sitkagranen <strong>sprer seg av seg selv</strong> ut fra plantefeltene. Den frøsår seg inn i åpne
            landskap som kystlynghei og myr. Der den vokser tett, stenger den ute lyset, og plantene som hører hjemme der, forsvinner.
            Etter dem forsvinner insekter og fugler som lever av dem.
          </p>
          <Bilde navn="sitkagran" />
          <p>
            Sitkagran står på <strong>Fremmedartslista</strong> til Artsdatabanken i kategorien for svært høy risiko. Kystlyngheia,
            en av naturtypene den truer, er regnet som sterkt truet i Norge. Mange steder blir trærne derfor hogd av kommuner,
            grunneiere og frivillige.
          </p>
          <Faktaboks
            tittel="Det vi vil gjøre noe med"
            punkter={[
              "Når sitkagran fjernes, blir trærne ofte liggende igjen eller brent på stedet.",
              "Da går både treet og karbonet i det tapt, og karbonet havner i lufta.",
              "Vi vil heller bruke treet som råvare til noe nyttig.",
            ]}
          />
        </Kapittel>

        {/* 03 Biokull */}
        <Kapittel id="biokull" nr="03" kicker="Løsningen" tittel="Hva er biokull?">
          <p>
            Biokull lages ved <strong>pyrolyse</strong>. Tre varmes opp til rundt 600 grader nesten uten oksygen. Uten oksygen
            brenner ikke treet opp. I stedet drives vann og gasser ut, og igjen blir et svart, lett og veldig porøst kull.
          </p>
          <p>
            Det spesielle med biokull er <strong>porene</strong>. Et lite korn er fullt av bittesmå hulrom, og til sammen gir de en
            enorm overflate. Den overflaten kan holde på vann og binde gasser og stoffer, omtrent som en svamp.
          </p>
          <Bilde navn="biokull" />
          <p>
            Biokull er også en <strong>stabil form for karbon</strong>. Mye av karbonet som var i treet, blir værende i kullet i
            stedet for å gå ut i lufta, slik det ville gjort om treet ble brent eller råtnet.
          </p>
        </Kapittel>

        {/* 04 Strø */}
        <Kapittel id="stro" nr="04" kicker="Løsningen" tittel="Strø med biokull">
          <p>
            Sitka blander biokull fra sitkagran med <strong>flis</strong>. Flisen gir et mykt og tørt underlag, slik vanlig strø gjør.
            Biokullet skal gjøre jobben vanlig flis ikke klarer så godt: binde fukt og ammoniakk før det havner i lufta.
          </p>
          <Bilde navn="flis" />
          <Faktaboks
            tittel="Det strøet skal gi"
            punkter={[
              "Mindre stikkende lukt og bedre luft for dyr og folk.",
              "Et tørrere underlag som er bedre for bein, hover og føtter.",
              "Mindre nitrogen som går tapt, og mer som blir igjen i møkka som gjødsel.",
            ]}
          />
          <p>
            Strøet kan brukes alene, eller som en tilsetning i strøet staller og hønsehus allerede bruker. Vi har ikke testet
            strøet i en ekte stall ennå. Det er neste steg, og vi vil gjerne høre fra deg som har en stall eller et hønsehus.
          </p>
        </Kapittel>

        {/* 05 Kretsløp */}
        <Kapittel id="kretslop" nr="05" kicker="Bærekraft" tittel="Tilbake til jorda">
          <p>
            Når strøet er brukt, er det ikke avfall. Brukt strø med møkk kan <strong>komposteres</strong> og bli jordforbedring.
            Biokullet følger med ut i jorda, og der kan det fortsette å holde på vann og næring.
          </p>
          <Bilde navn="biokullIJord" />
          <p>
            Karbonet i biokullet blir liggende i jorda svært lenge. Slik ender et tre som var et problem i naturen, som karbon
            lagret i jorda, etter å ha gjort nytte i stallen på veien.
          </p>
          <ol className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {["Sitkagran fjernes", "Pyrolyse til biokull", "Strø i stallen", "Kompost og jord"].map((s, i) => (
              <li key={s} className="rounded-xl border border-off/15 p-4">
                <span className="font-display text-xs text-red">0{i + 1}</span>
                <span className="mt-1 block font-display text-lg uppercase leading-tight">{s}</span>
              </li>
            ))}
          </ol>
        </Kapittel>

        {/* Kontakt */}
        <section className="border-t border-off/10 py-20 md:py-28">
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] md:text-6xl">
            Vil du teste
            <br />
            <span className="text-red">Sitka i stallen?</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-off/70">Send oss en e-post, så tar vi kontakt.</p>
          <a
            href={`mailto:${kontakt.epost}`}
            className="mt-8 inline-block rounded-full bg-red px-7 py-4 font-display text-sm uppercase tracking-[0.2em] text-off transition-colors hover:bg-off hover:text-ink"
          >
            {kontakt.epost}
          </a>
        </section>
      </main>

      <footer className="border-t border-off/10">
        <div className="mx-auto flex max-w-6xl justify-between px-5 py-10 text-sm text-off/50 md:px-10">
          <span>© 2026 Sitka</span>
          <Link href="/" className="hover:text-red">
            Til forsiden
          </Link>
        </div>
      </footer>
    </div>
  );
}
