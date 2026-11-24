"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { PlakatTittel } from "./Text";
import { innhold } from "./innhold";
import { useSprak } from "./Sprak";
import { Etikett } from "./Plakat";

// Hvem strøet er for, i plakat-stil: mørk bakgrunn, stor rød årring som snurrer når du scroller
export default function Customers() {
  const t = innhold[useSprak()].kunder;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink px-5 py-24 text-off md:px-10 md:py-36">
      {/* stor rød årring, med uskarpe kopier bak (som på plakaten «Rent, tørt og luktfritt») */}
      <motion.div
        aria-hidden
        style={{ rotate }}
        className="pointer-events-none absolute -right-[30vw] top-1/2 h-[90vw] w-[90vw] -translate-y-1/2 opacity-40 md:-right-[12vw] md:h-[52vw] md:w-[52vw] md:opacity-100"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/sitka-ikon-rod.svg" alt="" className="absolute inset-0 h-full w-full -translate-x-[8%] opacity-30 blur-2xl" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/sitka-ikon-rod.svg" alt="" className="absolute inset-0 h-full w-full opacity-90" />
      </motion.div>

      <div className="relative md:w-[58%]">
        <Etikett className="text-red">{t.kicker}</Etikett>
        <PlakatTittel deler={t.tittel} className="mt-6 text-[17vw] md:text-[9vw]" farger={["text-off", "text-off/80", "text-red"]} />

        <ul className="mt-12 border-t border-off/20 md:mt-16">
          {t.liste.map((k, i) => (
            <motion.li
              key={k.navn}
              className="group flex flex-col gap-1 border-b border-off/20 py-5 md:flex-row md:items-baseline md:justify-between md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="flex items-baseline gap-4">
                <span className="font-display text-sm text-red">0{i + 1}</span>
                <span className="font-display text-3xl font-bold uppercase transition-colors group-hover:text-red md:text-4xl">
                  {k.navn}
                </span>
              </span>
              <span className="text-sm text-off/70 md:max-w-xs md:text-right md:text-base">{k.tekst}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
