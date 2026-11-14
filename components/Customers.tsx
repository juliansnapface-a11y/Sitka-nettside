"use client";

import { motion } from "motion/react";
import { Kicker, RevealWords } from "./Text";
import { kunder } from "./innhold";
import Marquee from "./Marquee";
import Photo from "./Photo";

// Liste over hvem strøet er for, med rød fyll som sveiper inn ved hover
export default function Customers() {
  return (
    <section className="relative overflow-x-clip bg-ink py-28 md:py-40">
      <div className="grid gap-12 px-5 md:grid-cols-12 md:items-end md:px-10">
        <div className="md:col-span-7">
          <Kicker>For hvem</Kicker>
          <h2 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] md:text-8xl">
            <RevealWords text="Laget for" /> <RevealWords text="stallen." className="text-red" delay={0.1} />
          </h2>
        </div>
        <Photo
          navn="honer"
          className="md:col-span-5"
          frame="aspect-[4/3]"
          position="center 75%"
          sizes="(min-width: 768px) 40vw, 100vw"
        />
      </div>
      <ul className="mt-16 border-t border-off/15">
        {kunder.map((k, i) => (
          <motion.li
            key={k.navn}
            className="group relative overflow-hidden border-b border-off/15"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            data-cursor="Sitka"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-red transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:scale-y-100" />
            <div className="relative flex flex-col gap-2 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10 md:py-10">
              <div className="flex items-baseline gap-6">
                <span className="font-display text-sm text-red transition-colors group-hover:text-ink">0{i + 1}</span>
                <span className="font-display text-4xl font-bold uppercase transition-transform duration-500 group-hover:translate-x-4 md:text-7xl">
                  {k.navn}
                </span>
              </div>
              <span className="max-w-sm text-off/60 transition-colors group-hover:text-off md:text-right">{k.tekst}</span>
            </div>
          </motion.li>
        ))}
      </ul>
      <div className="mt-28 overflow-x-clip py-6">
        <Marquee
          items={["Mindre lukt", "Mindre fukt", "Mindre ammoniakk", "Mer karbon i jorda"]}
          baseVelocity={-2.5}
          className="-mx-[5vw] bg-red py-4 text-5xl text-ink md:text-7xl"
          tilt={-2}
          outlineClass="outline-ink"
          dotClass="text-ink"
        />
      </div>
    </section>
  );
}
