"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { innhold } from "./innhold";
import { useSprak } from "./Sprak";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PlakatTittel, SplitLetters, useLoaded } from "./Text";
import { Kreditt } from "./Photo";
import { bilder, bildeTekst } from "./bilder";
import { Etikett, Merke } from "./Plakat";

// 3D-scenen lastes bare i nettleseren
const RingScene = dynamic(() => import("./RingScene"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

// Toppen av forsiden, i plakat-stil: ekte skogbilde i bakgrunnen, den røde skiva foran og stor «SITKA» nederst
export default function Hero() {
  const loaded = useLoaded();
  const lang = useSprak();
  const t = innhold[lang].hero;
  const skog = bilder.ungSitkagran;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bildeY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bildeScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);

  return (
    <section id="top" ref={ref} className="relative h-svh min-h-[640px] w-full overflow-hidden bg-ink">
      {/* bakgrunn: ekte bilde av sitkagran, mørkere oppe og nede så teksten blir lett å lese */}
      <motion.div style={{ y: bildeY, scale: bildeScale }} className="absolute inset-0 will-change-transform">
        <Image src={skog.src} alt={bildeTekst(skog, lang).alt} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/30 to-ink/90" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(224,32,26,0.35),transparent_45%)]" />
      <RingScene />

      <motion.div style={{ opacity: fade }} className="pointer-events-none relative z-10 flex h-full flex-col justify-between px-5 pb-6 pt-28 md:px-10 md:pb-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={loaded ? { opacity: 1, x: 0 } : undefined}
            transition={{ delay: 0.3, duration: 0.8, ease }}
          >
            <Etikett className="text-off/85">{t.etikett}</Etikett>
          </motion.div>
          {/* Hovedoverskriften (h1) på forsiden: det Google leser som «hva siden handler om» */}
          <PlakatTittel
            som="h1"
            skjult="Sitka: "
            deler={t.tittel}
            play={loaded}
            delay={0.4}
            className="mt-5 text-[11vw] md:text-[5.6vw]"
            farger={["text-off", "text-off/85", "text-red"]}
          />
          <motion.p
            className="mt-6 max-w-sm text-sm leading-relaxed text-off/80 md:text-base"
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
              className="rounded-full border border-off/40 bg-ink/30 px-6 py-3 font-display text-sm uppercase tracking-[0.2em] text-off backdrop-blur-sm transition-colors hover:border-red hover:text-red"
            >
              {t.taKontakt}
            </a>
          </motion.div>
        </div>

        <motion.div style={{ y: titleY }}>
          <div className="mb-2 flex items-end justify-between gap-4 font-display text-[10px] uppercase tracking-[0.3em] text-off/60 md:text-xs">
            <span className="pointer-events-auto max-w-[60%] font-sans text-[10px] normal-case tracking-normal text-off/55 md:text-[11px]">
              <Kreditt b={skog} />
            </span>
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

      {/* rundt merke ved skiva */}
      <Merke className="bottom-[20%] right-4 bg-red text-off md:bottom-auto md:right-[8%] md:top-[18%]" vinkel={-12}>
        {t.merke}
      </Merke>
    </section>
  );
}
