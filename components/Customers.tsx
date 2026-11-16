"use client";

import { motion } from "motion/react";
import { Kicker, RevealWords } from "./Text";
import { innhold } from "./innhold";
import { useSprak } from "./Sprak";
import Photo from "./Photo";

// Kort liste over hvem strøet er for, med bilde ved siden av
export default function Customers() {
  const t = innhold[useSprak()].kunder;
  return (
    <section className="relative bg-ink px-5 py-20 md:px-10 md:py-28">
      <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-16">
        <div className="md:col-span-7">
          <Kicker>{t.kicker}</Kicker>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.95] md:text-6xl">
            <RevealWords text={t.tittelA} /> <RevealWords text={t.tittelB} className="text-red" delay={0.1} />
          </h2>
          <ul className="mt-10 border-t border-off/15">
            {t.liste.map((k, i) => (
              <motion.li
                key={k.navn}
                className="group flex flex-col gap-1 border-b border-off/15 py-4 md:flex-row md:items-baseline md:justify-between md:gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-display text-xs text-red">0{i + 1}</span>
                  <span className="font-display text-2xl font-bold uppercase transition-colors group-hover:text-red md:text-3xl">
                    {k.navn}
                  </span>
                </span>
                <span className="text-sm text-off/60 md:max-w-xs md:text-right">{k.tekst}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        <Photo
          navn="honer"
          className="md:col-span-5"
          frame="aspect-[4/3]"
          position="center 75%"
          sizes="(min-width: 768px) 40vw, 100vw"
        />
      </div>
    </section>
  );
}
