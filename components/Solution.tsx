"use client";

import { innhold } from "./innhold";
import { useSprak } from "./Sprak";
import { sider } from "@/lib/sprak";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { PlakatTittel } from "./Text";
import Photo from "./Photo";
import { Etikett, Merke, PilKnapp } from "./Plakat";
import type { ReactNode } from "react";

// Liten hvit lapp oppå et bilde
function Lapp({ children }: { children: ReactNode }) {
  return (
    <span className="absolute bottom-4 left-4 rounded-full bg-off px-4 py-2 font-display text-sm font-semibold uppercase tracking-[0.15em] text-ink md:bottom-6 md:left-6 md:text-base">
      {children}
    </span>
  );
}

// Kort som vipper i 3D etter musa
function TiltCard({ nr, tittel, tekst, i }: { nr: string; tittel: string; tekst: string; i: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });
  const gx = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const gy = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);
  const bg = useMotionTemplate`radial-gradient(400px circle at ${gx} ${gy}, rgba(224,32,26,0.16), transparent 60%)`;

  return (
    <motion.div
      className="[perspective:1000px]"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative h-full overflow-hidden rounded-2xl bg-off p-7 text-ink shadow-[0_20px_50px_rgba(12,5,5,0.18)] md:p-9"
        data-cursor=""
      >
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: bg }} />
        <div className="relative flex items-start justify-between" style={{ transform: "translateZ(40px)" }}>
          <span className="font-display text-6xl font-bold text-red md:text-7xl">{nr}</span>
          <span className="mt-2 h-3 w-3 rounded-full border-2 border-red transition-colors group-hover:bg-red" />
        </div>
        <h3 className="relative mt-10 font-display text-2xl font-semibold uppercase tracking-wide md:text-3xl" style={{ transform: "translateZ(30px)" }}>
          {tittel}
        </h3>
        <p className="relative mt-3 text-ink/70" style={{ transform: "translateZ(20px)" }}>
          {tekst}
        </p>
      </motion.div>
    </motion.div>
  );
}

// Løsningen, i plakat-stil på rød bakgrunn: treflis + biokull = Sitka-strø
export default function Solution() {
  const lang = useSprak();
  const t = innhold[lang].losning;

  return (
    <section id="losningen" className="relative overflow-hidden bg-red px-5 py-24 text-ink md:px-10 md:py-36">
      {/* svake årringer i bakgrunnen */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[25vw] -top-[25vw] h-[80vw] w-[80vw] rounded-full opacity-[0.12] md:-right-[15vw] md:-top-[20vw] md:h-[60vw] md:w-[60vw]"
        style={{ background: "repeating-radial-gradient(circle, transparent 0 26px, #0C0505 26px 30px)" }}
      />

      <div className="relative grid gap-10 md:grid-cols-12 md:items-end md:gap-12">
        <div className="md:col-span-8">
          <Etikett className="text-ink">{t.kicker}</Etikett>
          <PlakatTittel
            deler={t.tittel}
            className="mt-6 text-[19vw] md:text-[12vw]"
            farger={["text-ink", "text-ink/80", "text-off"]}
          />
        </div>
        <motion.div
          className="md:col-span-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-lg text-ink/85 md:text-xl">{t.tekst}</p>
          <PilKnapp href={`${sider.problem[lang]}#biokull`} className="mt-8 bg-ink text-off">
            {t.lesMer}
          </PilKnapp>
        </motion.div>
      </div>

      {/* Oppskriften: treflis + biokull */}
      <div className="relative mt-16 grid items-center gap-4 md:mt-24 md:grid-cols-[1fr_auto_1fr] md:gap-8">
        <Photo navn="flis" natur frame="aspect-[4/3]" tekstFarge="text-ink/60" sizes="(min-width: 768px) 45vw, 100vw">
          <Lapp>{t.flis}</Lapp>
        </Photo>
        <motion.div
          aria-hidden
          className="text-center font-display text-7xl font-bold leading-none text-off md:text-9xl"
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 160, damping: 12, delay: 0.2 }}
        >
          +
        </motion.div>
        <div className="relative">
          <Photo navn="biokull" natur frame="aspect-[4/3]" tekstFarge="text-ink/60" sizes="(min-width: 768px) 45vw, 100vw">
            <Lapp>{t.biokull}</Lapp>
          </Photo>
          <Merke className="-right-1 -top-14 bg-ink text-off md:-right-8 md:-top-16" vinkel={-10}>
            <span className="block text-4xl leading-none text-red md:text-5xl">=</span>
            {t.resultat}
          </Merke>
        </div>
      </div>

      <div className="relative mt-20 grid gap-5 md:mt-28 md:grid-cols-3">
        {t.kort.map((l, i) => (
          <TiltCard key={l.nr} {...l} i={i} />
        ))}
      </div>
    </section>
  );
}
