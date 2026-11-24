"use client";

import dynamic from "next/dynamic";
import { innhold } from "./innhold";
import { useSprak } from "./Sprak";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { RevealWords, SplitLetters, useLoaded } from "./Text";

// 3D-scenen lastes bare i nettleseren
const RingScene = dynamic(() => import("./RingScene"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const loaded = useLoaded();
  const t = innhold[useSprak()].hero;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-svh min-h-[640px] w-full overflow-hidden">
      {/* bakgrunn: svake årringer + rødt lys */}
      <div className="rings-bg absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(circle_at_70%_50%,black,transparent_70%)]" />
      <RingScene />

      <motion.div style={{ opacity: fade }} className="pointer-events-none relative z-10 flex h-full flex-col justify-between px-5 pb-6 pt-28 md:px-10 md:pb-8">
        <div className="max-w-xl">
          {/* Hovedoverskriften (h1) på forsiden: det Google leser som «hva siden handler om» */}
          <h1 className="font-display text-3xl font-medium uppercase leading-[1.05] md:text-5xl">
            <span className="sr-only">Sitka: </span>
            <RevealWords text={t.tittelA} play={loaded} delay={0.4} />
            <br />
            <RevealWords text={t.tittelB} play={loaded} delay={0.55} className="text-red" />
          </h1>
          <motion.p
            className="mt-6 max-w-sm text-sm leading-relaxed text-off/70 md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.9, duration: 1, ease }}
          >
            {t.ingress}
          </motion.p>
          <motion.div
            className="pointer-events-auto mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 1.05, duration: 1, ease }}
          >
            <a
              href="#prosessen"
              className="group relative overflow-hidden rounded-full bg-red px-6 py-3 font-display text-sm uppercase tracking-[0.2em] text-off"
            >
              <span className="relative z-10">{t.seHvordan}</span>
              <span className="absolute inset-0 translate-y-full rounded-full bg-off transition-transform duration-500 group-hover:translate-y-0" />
              <span className="absolute inset-0 z-10 flex translate-y-full items-center justify-center text-ink transition-transform duration-500 group-hover:translate-y-0">
                {t.seHvordan}
              </span>
            </a>
            <a
              href="#kontakt"
              className="rounded-full border border-off/30 px-6 py-3 font-display text-sm uppercase tracking-[0.2em] text-off transition-colors hover:border-red hover:text-red"
            >
              {t.taKontakt}
            </a>
          </motion.div>
        </div>

        <motion.div style={{ y: titleY }}>
          <div className="mb-2 flex items-end justify-end font-display text-[10px] uppercase tracking-[0.3em] text-off/50 md:text-xs">
            <motion.span
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={loaded ? { opacity: 1 } : undefined}
              transition={{ delay: 1.3 }}
            >
              {t.scroll}
              <motion.span
                className="inline-block h-6 w-px bg-red"
                animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.span>
          </div>
          <p aria-hidden className="font-display text-[27vw] font-bold leading-[0.8] tracking-[-0.01em] md:text-[23vw]">
            <SplitLetters text="SITKA" play={loaded} delay={0.1} stagger={0.08} />
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
