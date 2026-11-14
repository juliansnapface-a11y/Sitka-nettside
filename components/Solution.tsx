"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { Kicker, RevealWords } from "./Text";
import { losning } from "./innhold";
import Photo from "./Photo";

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Et biokullkorn med porer, og molekyler som trekkes inn i det
function Grain() {
  const { outline, pores, mols } = useMemo(() => {
    const rnd = rand(11);
    const cx = 250;
    const cy = 250;
    const R = 190;
    const harm = [
      [2, 0.04, rnd() * 6],
      [3, 0.035, rnd() * 6],
      [5, 0.025, rnd() * 6],
      [9, 0.012, rnd() * 6],
      [17, 0.008, rnd() * 6],
    ];
    const rad = (a: number) => R * (1 + harm.reduce((s, [k, m, p]) => s + m * Math.sin(k * a + p), 0));
    const pts: string[] = [];
    for (let i = 0; i < 200; i++) {
      const a = (i / 200) * Math.PI * 2;
      const r = rad(a);
      pts.push(`${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`);
    }
    const placed: [number, number, number][] = [];
    for (let i = 0; i < 4000 && placed.length < 70; i++) {
      const a = rnd() * Math.PI * 2;
      const d = Math.sqrt(rnd()) * (R - 16);
      const x = cx + Math.cos(a) * d;
      const y = cy + Math.sin(a) * d;
      const r = 3.5 + Math.pow(rnd(), 2.2) * 28;
      if (placed.some((p) => Math.hypot(p[0] - x, p[1] - y) < p[2] + r + 4)) continue;
      placed.push([x, y, r]);
    }
    const mols = Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * Math.PI * 2 + rnd() * 0.3;
      return {
        sx: cx + Math.cos(a) * 300,
        sy: cy + Math.sin(a) * 300,
        ex: cx + Math.cos(a + 0.5) * 70,
        ey: cy + Math.sin(a + 0.5) * 70,
        nh3: i % 2 === 0,
        delay: rnd() * 4,
      };
    });
    return { outline: "M" + pts.join(" L") + "Z", pores: placed, mols };
  }, []);

  return (
    <div className="relative h-full w-full">
      <svg viewBox="-50 -50 600 600" className="h-full w-full overflow-visible">
      <defs>
        <radialGradient id="ember" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E0201A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8E1410" stopOpacity="0" />
        </radialGradient>
        <clipPath id="grainClip">
          <path d={outline} />
        </clipPath>
      </defs>
      <circle cx="250" cy="250" r="290" fill="url(#ember)" opacity="0.35" />
      <path d={outline} fill="#1b0d0b" stroke="#E0201A" strokeWidth="3" />
      <g clipPath="url(#grainClip)">
        {pores.map(([x, y, r], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            fill={r > 16 ? "#E0201A" : "#050202"}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: r > 16 ? 0.55 : 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.015, type: "spring", stiffness: 200, damping: 15 }}
          />
        ))}
      </g>
      <g style={{ fontFamily: "var(--font-oswald)" }} fontSize="18" letterSpacing="3">
        <text x="-30" y="-10" fill="#E0201A">
          NH<tspan fontSize="12" dy="5">3</tspan>
        </text>
        <text x="470" y="530" fill="#F4EEEE" opacity="0.7">
          H<tspan fontSize="12" dy="5">2</tspan>
          <tspan dy="-5">O</tspan>
        </text>
      </g>
      </svg>
      <Molecules mols={mols} />
    </div>
  );
}

type Mol = { sx: number; sy: number; ex: number; ey: number; nh3: boolean; delay: number };

// Molekylene ligger som egne lag oppå tegningen, så de kan animeres uten at hele kornet tegnes på nytt
function Molecules({ mols }: { mols: Mol[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "20% 0px" });
  const [w, setW] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const k = w / 600; // piksler per enhet i tegningen
  const px = (v: number) => (v + 50) * k;

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      {w > 0 &&
        inView &&
        mols.map((m, i) => (
          <motion.div
            key={`${i}-${w}`}
            className="absolute left-0 top-0 will-change-transform"
            initial={{ x: px(m.sx), y: px(m.sy), opacity: 0, scale: 1 }}
            animate={{ x: [px(m.sx), px(m.ex)], y: [px(m.sy), px(m.ey)], opacity: [0, 1, 1, 0], scale: [1, 1, 0.3] }}
            transition={{ duration: 3.2, delay: m.delay, repeat: Infinity, repeatDelay: 0.6, ease: "easeIn" }}
          >
            <svg
              viewBox="-20 -20 40 40"
              style={{ width: 40 * k, height: 40 * k, marginLeft: -20 * k, marginTop: -20 * k }}
              className="block"
            >
              {m.nh3 ? (
                <>
                  <circle r="9" fill="#E0201A" />
                  <circle cx="-10" cy="-10" r="5" fill="#F4EEEE" />
                  <circle cx="12" cy="-6" r="5" fill="#F4EEEE" />
                  <circle cx="0" cy="13" r="5" fill="#F4EEEE" />
                </>
              ) : (
                <>
                  <circle r="8" fill="#F4EEEE" opacity="0.8" />
                  <circle cx="-10" cy="7" r="4.5" fill="#F4EEEE" opacity="0.5" />
                  <circle cx="10" cy="7" r="4.5" fill="#F4EEEE" opacity="0.5" />
                </>
              )}
            </svg>
          </motion.div>
        ))}
    </div>
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
  const bg = useMotionTemplate`radial-gradient(400px circle at ${gx} ${gy}, rgba(224,32,26,0.25), transparent 60%)`;

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
        className="group relative overflow-hidden rounded-2xl border border-off/10 bg-[#140a09] p-7 md:p-9"
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
        <p className="relative mt-3 text-off/65" style={{ transform: "translateZ(20px)" }}>
          {tekst}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Solution() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="losningen" ref={ref} className="relative overflow-hidden bg-ink px-5 py-28 md:px-10 md:py-40">
      <div className="grid items-center gap-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <Kicker>Løsningen</Kicker>
          <h2 className="mt-6 font-display text-6xl font-bold uppercase leading-[0.9] md:text-[9vw]">
            <RevealWords text="Strø med" />
            <br />
            <RevealWords text="biokull." className="text-red" delay={0.15} />
          </h2>
          <motion.p
            className="mt-8 max-w-lg text-lg text-off/70 md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Vi blander biokull fra sitkagran med flis. Biokullet skal fungere som en svamp i strøet og fange opp det som ellers ville lukte og fordampe.
          </motion.p>
          <Photo navn="biokull" className="mt-12 max-w-lg" frame="aspect-[16/10]" sizes="(min-width: 768px) 40vw, 100vw" />
        </div>
        <motion.div className="mx-auto aspect-square w-full max-w-xl md:col-span-6" style={{ rotate, y }}>
          <Grain />
        </motion.div>
      </div>

      <div className="mt-24 grid gap-5 md:mt-32 md:grid-cols-3">
        {losning.map((l, i) => (
          <TiltCard key={l.nr} {...l} i={i} />
        ))}
      </div>
    </section>
  );
}
