"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { Kicker, RevealWords, ScrubText } from "./Text";

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

// Omrisset av en gran med «etasjer» av greiner
function spruce(x: number, h: number, base = 300, tiers = 5) {
  const w = h * 0.24;
  const right: [number, number][] = [[x, base - h]];
  for (let t = 1; t <= tiers; t++) {
    const y = base - h + (h * t) / tiers;
    const out = (w * (t + 0.6)) / (tiers + 0.6);
    right.push([x + out, y]);
    if (t < tiers) right.push([x + out * 0.5, y]);
  }
  const left = right
    .slice(1)
    .reverse()
    .map(([px, py]) => [2 * x - px, py] as [number, number]);
  return [...right, ...left].map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
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
      // Granene «vokser» inn over bildet
      gsap.from(".tree", {
        scaleY: 0,
        transformOrigin: "bottom center",
        stagger: { each: 0.04, from: "random" },
        ease: "power3.out",
        scrollTrigger: { trigger: ".forest", start: "top 85%", end: "bottom 60%", scrub: 1 },
      });
    },
    { scope: ref },
  );

  return (
    <section id="problemet" ref={ref} className="relative bg-ink">
      {/* Del 1: ammoniakk */}
      <div className="ammo relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
        <div className="nh3-big pointer-events-none absolute -right-[10vw] top-[80%] -translate-y-1/2 select-none font-display text-[42vw] font-bold leading-none outline-red opacity-30 md:top-1/2">
          NH<span className="relative top-[0.12em] text-[0.55em]">3</span>
        </div>
        <div className="relative grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <Kicker>Problemet · 01</Kicker>
            <h2 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] md:text-8xl">
              <RevealWords text="Stikkende luft" />
              <br />
              <RevealWords text="i stallen." className="text-red" delay={0.15} />
            </h2>
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

      {/* Del 2: sitkagran */}
      <div className="forest relative overflow-hidden border-t border-off/10 px-5 py-28 md:px-10 md:py-40">
        <div className="relative grid gap-16 md:grid-cols-12">
          <div className="order-2 md:order-1 md:col-span-5">
            <svg viewBox="0 0 500 300" className="w-full">
              {Array.from({ length: 22 }).map((_, i) => {
                const x = 20 + ((i * 97) % 460);
                const h = 90 + ((i * 53) % 150);
                const red = i % 5 === 2;
                return (
                  <g key={i} className="tree">
                    <polygon
                      points={spruce(x, h)}
                      fill={red ? "#E0201A" : "#F4EEEE"}
                      opacity={red ? 1 : 0.08 + ((i * 7) % 10) / 40}
                    />
                  </g>
                );
              })}
              <line x1="0" y1="300" x2="500" y2="300" stroke="#E0201A" strokeWidth="2" />
            </svg>
          </div>
          <div className="order-1 md:order-2 md:col-span-7">
            <Kicker>Problemet · 02</Kicker>
            <h2 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] md:text-8xl">
              <RevealWords text="En gran" />
              <br />
              <RevealWords text="på avveie." className="text-red" delay={0.15} />
            </h2>
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
