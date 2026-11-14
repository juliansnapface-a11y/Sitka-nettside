"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { RevealWords, ScrubText, SplitLetters } from "./Text";
import Photo from "./Photo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Ammoniakk-molekylet (NH3) som SVG
function Molecule() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible">
      <g stroke="#F4EEEE" strokeWidth="14" strokeLinecap="round" opacity="0.6">
        <line x1="200" y1="200" x2="200" y2="40" className="bond" />
        <line x1="200" y1="200" x2="62" y2="300" className="bond" />
        <line x1="200" y1="200" x2="338" y2="300" className="bond" />
      </g>
      <circle cx="200" cy="200" r="78" fill="#E0201A" className="atom" />
      <text x="200" y="222" textAnchor="middle" fontSize="64" fontWeight="700" fill="#F4EEEE" style={{ fontFamily: "var(--font-oswald)" }}>
        N
      </text>
      {[
        [200, 40],
        [62, 300],
        [338, 300],
      ].map(([x, y], i) => (
        <g key={i} className="atom">
          <circle cx={x} cy={y} r="42" fill="#F4EEEE" />
          <text x={x} y={y + 15} textAnchor="middle" fontSize="40" fontWeight="700" fill="#0C0505" style={{ fontFamily: "var(--font-oswald)" }}>
            H
          </text>
        </g>
      ))}
    </svg>
  );
}

// Det store ordet «Problemet» med nummeret ved siden av
function ProblemWord({ nr }: { nr: string }) {
  return (
    <div className="flex items-start gap-3 md:gap-5">
      <h2 className="min-w-0 font-display text-[15vw] font-bold uppercase leading-[0.82] text-red md:text-[9.5vw]">
        <SplitLetters text="Problemet" stagger={0.04} />
      </h2>
      <span className="mt-[0.4em] font-display text-sm tracking-[0.3em] text-off/50 md:text-xl">{nr}</span>
    </div>
  );
}

export default function Problem() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Molekylet snurrer og vokser mens du scroller
      gsap.fromTo(
        ".mol",
        { rotate: -60, scale: 0.6 },
        {
          rotate: 120,
          scale: 1.1,
          ease: "none",
          scrollTrigger: { trigger: ".ammo", start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );
      gsap.to(".nh3-big", {
        xPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: ".ammo", start: "top bottom", end: "bottom top", scrub: 1 },
      });
    },
    { scope: ref },
  );

  return (
    <section id="problemet" ref={ref} className="relative bg-ink">
      {/* Del 1: ammoniakk */}
      <div className="ammo relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-40">
        <div className="nh3-big pointer-events-none absolute -right-[10vw] top-[80%] -translate-y-1/2 select-none font-display text-[42vw] font-bold leading-none outline-red opacity-30 md:top-1/2">
          NH<span className="relative top-[0.12em] text-[0.55em]">3</span>
        </div>
        <div className="relative grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <ProblemWord nr="01" />
            <h3 className="mt-8 font-display text-3xl font-bold uppercase leading-[0.95] md:text-5xl">
              <RevealWords text="Stikkende luft" />
              <br />
              <RevealWords text="i stallen." className="text-red" delay={0.15} />
            </h3>
            <ScrubText
              className="mt-10 max-w-2xl text-2xl font-light leading-snug md:text-4xl"
              text="Når urin og møkk brytes ned, dannes ammoniakk. Gassen lukter stikkende, gjør lufta tung og kan irritere luftveiene og øynene til både dyr og mennesker."
              highlight={["ammoniakk", "luftveiene"]}
            />
          </div>
          <div className="flex items-center justify-center md:col-span-5">
            <div className="mol aspect-square w-64 md:w-full md:max-w-md">
              <Molecule />
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-28 md:px-10 md:pb-40">
        <Photo navn="hest" frame="aspect-[4/3] md:aspect-[21/9]" position="center 25%" />
      </div>

      {/* Del 2: sitkagran */}
      <div className="forest relative overflow-hidden border-t border-off/10 px-5 py-28 md:px-10 md:py-40">
        <div className="relative grid gap-16 md:grid-cols-12 md:items-center">
          <div className="order-2 md:order-1 md:col-span-5">
            <Photo navn="sitkagran" frame="aspect-[4/5]" sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
          <div className="order-1 md:order-2 md:col-span-7">
            <ProblemWord nr="02" />
            <h3 className="mt-8 font-display text-3xl font-bold uppercase leading-[0.95] md:text-5xl">
              <RevealWords text="En gran" />
              <br />
              <RevealWords text="på avveie." className="text-red" delay={0.15} />
            </h3>
            <ScrubText
              className="mt-10 max-w-2xl text-2xl font-light leading-snug md:text-4xl"
              text="Sitkagran stenger ute lyset, så plantene som hører hjemme her forsvinner. Etter dem forsvinner insekter og fugler. Treet truer blant annet den sterkt truede kystlyngheia, og det sprer seg av seg selv."
              highlight={["lyset", "kystlynghei"]}
            />
            <motion.p
              className="mt-8 max-w-md text-sm text-off/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Sitkagran er en fremmed art i norsk natur. Vi ser treet som en ressurs i stedet for et problem.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
