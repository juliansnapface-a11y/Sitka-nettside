// Felles byggeklosser for undersidene (Problemet og løsningen, Bærekraft)

import Image from "next/image";
import type { ReactNode } from "react";
import { bilder, bildeTekst, type BildeNavn } from "@/components/bilder";
import { Kreditt } from "@/components/Photo";
import { SprakBytter } from "@/components/Sprak";
import { kontakt } from "@/components/innhold";
import { sider, type Side, type Sprak } from "@/lib/sprak";

const meny = {
  no: { forside: "Forsiden", problem: "Problemet og løsningen", baerekraft: "Bærekraft", tilForsiden: "Til forsiden" },
  en: { forside: "Home", problem: "Problem and solution", baerekraft: "Sustainability", tilForsiden: "Back to home" },
};

// Gjør **slik** om til fet skrift i en tekst
export function Rik({ tekst }: { tekst: string }) {
  return (
    <>
      {tekst.split(/(\*\*[^*]+\*\*)/g).map((del, i) =>
        del.startsWith("**") ? <strong key={i}>{del.slice(2, -2)}</strong> : <span key={i}>{del}</span>,
      )}
    </>
  );
}

export function SideHeader({ lang, side }: { lang: Sprak; side: Side }) {
  const m = meny[lang];
  const lenker: { side: Side; tekst: string }[] = [
    { side: "problem", tekst: m.problem },
    { side: "baerekraft", tekst: m.baerekraft },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-off/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-10">
        <a href={sider.forside[lang]} className="flex shrink-0 items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/sitka-ikon.svg" alt="" className="h-8 w-8" />
          <span className="font-display text-xl font-bold tracking-[0.12em]">SITKA</span>
        </a>
        <nav className="flex items-center gap-4 md:gap-7">
          {lenker.map((l) => (
            <a
              key={l.side}
              href={sider[l.side][lang]}
              aria-current={l.side === side ? "page" : undefined}
              className={`hidden font-display text-sm uppercase tracking-[0.2em] transition-colors hover:text-red md:block ${
                l.side === side ? "text-red" : "text-off/70"
              }`}
            >
              {l.tekst}
            </a>
          ))}
          <SprakBytter side={side} className="text-off" />
        </nav>
      </div>
      {/* mobil: lenkene på egen rad */}
      <nav className="flex gap-5 overflow-x-auto border-t border-off/10 px-5 py-2.5 md:hidden">
        {[{ side: "forside" as Side, tekst: m.forside }, ...lenker].map((l) => (
          <a
            key={l.side}
            href={sider[l.side][lang]}
            className={`shrink-0 font-display text-xs uppercase tracking-[0.2em] ${l.side === side ? "text-red" : "text-off/70"}`}
          >
            {l.tekst}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function SideFooter({ lang }: { lang: Sprak }) {
  return (
    <footer className="border-t border-off/10">
      <div className="mx-auto flex max-w-6xl justify-between px-5 py-10 text-sm text-off/50 md:px-10">
        <span>© 2026 Sitka</span>
        <a href={sider.forside[lang]} className="hover:text-red">
          {meny[lang].tilForsiden}
        </a>
      </div>
    </footer>
  );
}

export function Bilde({
  navn,
  lang,
  className = "",
  position = "center",
  aspect = "aspect-[3/2]",
}: {
  navn: BildeNavn;
  lang: Sprak;
  className?: string;
  position?: string;
  aspect?: string;
}) {
  const b = bilder[navn];
  return (
    <figure className={className}>
      <div className={`relative w-full overflow-hidden rounded-2xl bg-[#1a0b09] ${aspect}`}>
        <Image
          src={b.src}
          alt={bildeTekst(b, lang).alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
      <figcaption className="mt-3 text-xs text-off/40">
        <Kreditt b={b} />
      </figcaption>
    </figure>
  );
}

export function Kapittel({ id, nr, kicker, tittel, children }: { id: string; nr: string; kicker: string; tittel: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-off/10 py-20 md:py-28">
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

export function Faktaboks({ tittel, punkter }: { tittel: string; punkter: string[] }) {
  return (
    <aside className="rounded-2xl border border-red/40 bg-red/[0.06] p-6 md:p-8">
      <p className="font-display text-sm uppercase tracking-[0.3em] text-red">{tittel}</p>
      <ul className="mt-4 space-y-3 text-base text-off/80">
        {punkter.map((p) => (
          <li key={p} className="flex gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
            <span>
              <Rik tekst={p} />
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function KontaktBlokk({ lang }: { lang: Sprak }) {
  const t =
    lang === "en"
      ? { a: "Want to try", b: "Sitka in your stable?", tekst: "Send us an email and we will get back to you." }
      : { a: "Vil du teste", b: "Sitka i stallen?", tekst: "Send oss en e-post, så tar vi kontakt." };
  return (
    <section className="border-t border-off/10 py-20 md:py-28">
      <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] md:text-6xl">
        {t.a}
        <br />
        <span className="text-red">{t.b}</span>
      </h2>
      <p className="mt-6 max-w-xl text-lg text-off/70">{t.tekst}</p>
      <a
        href={`mailto:${kontakt.epost}`}
        className="mt-8 inline-block rounded-full bg-red px-7 py-4 font-display text-sm uppercase tracking-[0.2em] text-off transition-colors hover:bg-off hover:text-ink"
      >
        {kontakt.epost}
      </a>
    </section>
  );
}
