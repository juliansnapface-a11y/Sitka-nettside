"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { innhold, kontakt } from "./innhold";
import { useSprak } from "./Sprak";
import { PlakatTittel } from "./Text";
import { Etikett } from "./Plakat";

// Knapp som trekkes mot musa (magnetisk)
function Magnetic({ children, href }: { children: React.ReactNode; href: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 12 });
  const sy = useSpring(y, { stiffness: 150, damping: 12 });
  return (
    <motion.a
      href={href}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.35);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.92 }}
      className="group relative flex h-44 w-44 items-center justify-center rounded-full bg-ink font-display text-lg uppercase tracking-[0.2em] text-off shadow-[0_30px_60px_rgba(12,5,5,0.35)] md:h-60 md:w-60"
      data-cursor=""
    >
      <span className="absolute inset-0 scale-0 rounded-full bg-off transition-transform duration-500 group-hover:scale-100" />
      <span className="relative transition-colors duration-500 group-hover:text-ink">{children}</span>
    </motion.a>
  );
}

export default function Contact() {
  const year = 2026;
  const t = innhold[useSprak()].kontakt;

  return (
    <section id="kontakt" className="relative overflow-hidden bg-red text-ink">
      {/* svake årringer i bakgrunnen */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[30vw] -left-[20vw] h-[80vw] w-[80vw] rounded-full opacity-[0.12] md:-bottom-[25vw] md:-left-[10vw] md:h-[55vw] md:w-[55vw]"
        style={{ background: "repeating-radial-gradient(circle, transparent 0 26px, #0C0505 26px 30px)" }}
      />
      <div className="relative grid gap-16 px-5 py-24 md:grid-cols-12 md:items-center md:px-10 md:py-36">
        <div className="md:col-span-8">
          <Etikett className="text-ink">{t.kicker}</Etikett>
          <PlakatTittel deler={t.tittel} className="mt-6 text-[13vw] md:text-[7.5vw]" farger={["text-ink", "text-ink/80", "text-off"]} />
          <p className="mt-8 max-w-md text-lg text-ink/85">
            {t.tekst}
          </p>
          <div className="mt-10 space-y-2 font-display text-xl md:text-2xl">
            {kontakt.epost ? (
              <a href={`mailto:${kontakt.epost}`} className="block w-fit border-b-2 border-ink pb-1 transition-colors hover:text-off">
                {kontakt.epost}
              </a>
            ) : (
              <p className="w-fit border-b-2 border-ink pb-1 text-ink/80">{t.epostSnart}</p>
            )}
            {kontakt.instagram && (
              <a
                href={`https://instagram.com/${kontakt.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="block w-fit transition-colors hover:text-off"
              >
                @{kontakt.instagram}
              </a>
            )}
          </div>
        </div>
        <div className="flex justify-center md:col-span-4 md:justify-end">
          {kontakt.epost ? (
            <Magnetic href={`mailto:${kontakt.epost}`}>{t.sendEpost}</Magnetic>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/media/sitka-ikon.svg" alt="" className="h-44 w-44 animate-[spin_24s_linear_infinite] md:h-56 md:w-56" />
          )}
        </div>
      </div>

      <footer className="relative bg-ink px-5 py-10 text-off md:px-10">
        <div className="flex flex-col justify-between gap-4 text-sm text-off/50 md:flex-row">
          <span>© {year} Sitka</span>
          <a href="#top" className="w-fit transition-colors hover:text-red">
            {t.tilToppen}
          </a>
        </div>
      </footer>
    </section>
  );
}
