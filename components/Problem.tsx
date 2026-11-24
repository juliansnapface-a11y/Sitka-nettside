"use client";

import { useRef } from "react";
import Image from "next/image";
import { innhold } from "./innhold";
import { useSprak } from "./Sprak";
import { sider } from "@/lib/sprak";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, useScroll, useTransform } from "motion/react";
import { PlakatTittel, ScrubText } from "./Text";
import Photo, { Kreditt } from "./Photo";
import { bilder, bildeTekst } from "./bilder";
import { Etikett, Merke, PilKnapp } from "./Plakat";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Problemet, i plakat-stil: først lys side om ammoniakk, så et stort skogbilde om sitkagrana
export default function Problem() {
  const ref = useRef<HTMLElement>(null);
  const skog = useRef<HTMLDivElement>(null);
  const lang = useSprak();
  const t = innhold[lang].problem;
  const gran = bilder.sitkagran;

  // Skogbildet glir litt saktere enn siden (parallakse)
  const { scrollYProgress } = useScroll({ target: skog, offset: ["start end", "end start"] });
  const bildeY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  useGSAP(
    () => {
      // Den store «NH3» i bakgrunnen glir sidelengs mens du scroller
      gsap.to(".nh3-big", {
        xPercent: -25,
        ease: "none",
        scrollTrigger: { trigger: ".ammo", start: "top bottom", end: "bottom top", scrub: 1 },
      });
    },
    { scope: ref },
  );

  return (
    <section id="problemet" ref={ref} className="relative">
      {/* Del 1: ammoniakk, på lys bakgrunn */}
      <div className="ammo relative overflow-hidden bg-off px-5 py-24 text-ink md:px-10 md:py-36">
        <div
          aria-hidden
          className="nh3-big pointer-events-none absolute -right-[12vw] top-[4%] select-none font-display text-[46vw] font-bold leading-none opacity-25 outline-red md:top-[2%] md:text-[30vw]"
        >
          NH<span className="relative top-[0.12em] text-[0.55em]">3</span>
        </div>

        <div className="relative">
          <Etikett className="text-red">{t.ord} · 01</Etikett>
          <PlakatTittel
            deler={t.ammoniakkTittel}
            className="mt-6 text-[13vw] md:text-[9.5vw]"
            farger={["text-ink", "text-ink/70", "text-red"]}
          />
        </div>

        <div className="relative mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:items-center md:gap-16">
          <div className="relative md:col-span-7">
            <Photo
              navn="honer"
              natur
              frame="aspect-[16/11]"
              position="center 70%"
              tekstFarge="text-ink/50"
              sizes="(min-width: 768px) 55vw, 100vw"
            />
            <Merke className="-right-2 -top-12 bg-red text-off md:-right-10 md:-top-16" vinkel={10}>
              <span className="block text-4xl md:text-6xl">
                NH<span className="text-[0.55em]">3</span>
              </span>
              <span className="mt-1 block text-[11px] tracking-[0.2em] md:text-sm">{t.ammoniakkMerke}</span>
            </Merke>
          </div>
          <div className="md:col-span-5">
            <ScrubText
              className="text-2xl leading-snug md:text-[2.1vw] md:leading-[1.3]"
              text={t.ammoniakkTekst}
              highlight={t.ammoniakkUthev}
            />
          </div>
        </div>
      </div>

      {/* Del 2: sitkagran, stort bilde i ekte farger */}
      <div ref={skog} className="forest relative overflow-hidden bg-ink text-off">
        <motion.div style={{ y: bildeY }} className="absolute inset-x-0 -inset-y-[10%] will-change-transform">
          <Image src={gran.src} alt={bildeTekst(gran, lang).alt} fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/20 to-ink/90" />

        <div className="relative flex min-h-[105svh] flex-col justify-between gap-24 px-5 py-24 md:px-10 md:py-32">
          <div>
            <Etikett className="text-off">{t.ord} · 02</Etikett>
            <PlakatTittel
              deler={t.granTittel}
              className="mt-6 text-[17vw] md:text-[12vw]"
              farger={["text-off", "text-off/85", "text-red"]}
            />
          </div>

          <div className="max-w-3xl">
            <ScrubText
              className="text-2xl font-light leading-snug md:text-4xl"
              text={t.granTekst}
              highlight={t.granUthev}
            />
            <p className="mt-6 max-w-md text-sm text-off/70">{t.granNotat}</p>
            <PilKnapp href={sider.problem[lang]} className="mt-10 bg-red text-off">
              {t.lesMer}
            </PilKnapp>
          </div>
        </div>

        <Merke className="right-4 top-[5%] bg-red text-off md:right-16 md:top-[38%]" vinkel={-12}>
          {t.granMerke}
        </Merke>
        <p className="absolute bottom-4 right-5 text-[11px] text-off/55 md:right-10">
          <Kreditt b={gran} />
        </p>
      </div>
    </section>
  );
}
