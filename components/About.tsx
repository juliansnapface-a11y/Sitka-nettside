"use client";

import { motion } from "motion/react";
import { Kicker, RevealWords } from "./Text";
import { team } from "./innhold";

export default function About() {
  return (
    <section id="om-oss" className="relative bg-off px-5 py-28 text-ink md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:sticky md:top-28 md:col-span-5 md:self-start">
          <Kicker>Om oss</Kicker>
          <h2 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] md:text-7xl">
            <RevealWords text="Seks elever." />
            <br />
            <RevealWords text="Én idé." className="text-red" delay={0.1} />
          </h2>
          <motion.p
            className="mt-8 max-w-md text-lg text-ink/70"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            Sitka er en ungdomsbedrift startet av seks elever på Entreprenørskapslinjen ved Kongshavn videregående skole i Oslo.
          </motion.p>

          <motion.div
            className="relative mt-12 overflow-hidden rounded-2xl bg-ink p-7 text-off"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="rings-bg absolute -bottom-24 -right-24 h-64 w-64 rounded-full opacity-70" />
            <p className="relative font-display text-xs uppercase tracking-[0.35em] text-red">Samarbeidspartner</p>
            <p className="relative mt-3 font-display text-4xl font-bold">OBIO AS</p>
            <p className="relative mt-2 text-off/60">Vår samarbeidspartner på biokull.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:col-span-7 md:grid-cols-3">
          {team.map((p, i) => (
            <motion.div
              key={i}
              className="group"
              initial={{ opacity: 0, y: 60, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-ink">
                {p.bilde ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.bilde}
                    alt={p.navn}
                    className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                ) : (
                  <>
                    <div className="rings-bg absolute inset-[-20%] opacity-40 transition-transform duration-[1.2s] group-hover:rotate-12 group-hover:scale-125" />
                    <div className="absolute inset-0 flex items-center justify-center font-display text-7xl font-bold text-red/80 transition-transform duration-500 group-hover:scale-110">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </>
                )}
                <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-red transition-transform duration-500 group-hover:scale-x-100" />
              </div>
              {p.navn && <p className="mt-3 font-display text-lg font-semibold uppercase">{p.navn}</p>}
              {p.rolle && <p className="text-sm text-ink/60">{p.rolle}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
