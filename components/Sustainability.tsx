"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ringPoints } from "./rings";

// Årringene fra logoen, med sentrum i (0, 0)
const rings = ringPoints(0, 0, 480, 8);
const RED = "#E0201A";

const punkter = [
  { tittel: "Fjerner en fremmed art", tekst: "Råvaren er sitkagran, et tre som fortrenger norsk natur." },
  { tittel: "Lagrer karbon i jorda", tekst: "Biokull er en stabil form for karbon som kan bli liggende i jorda lenge." },
  { tittel: "Ingenting går til spille", tekst: "Brukt strø blir kompost og jordforbedring. Sirkelen sluttes." },
];

// Tegner årringene på et lerret. De vokser, snur seg og tennes én etter én mens du scroller.
function RingCanvas({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const draw = () => {
      const p = progress.get();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const unit = (Math.min(w, h) * 1.2) / 1000;
      const scale = 0.35 + p * 2.05;
      ctx.translate(w / 2, h / 2);
      ctx.rotate((p * 140 * Math.PI) / 180);
      ctx.scale(unit * scale, unit * scale);
      ctx.strokeStyle = RED;
      ctx.lineJoin = "round";

      ctx.globalAlpha = 0.9;
      ctx.lineWidth = 40;
      ctx.beginPath();
      ctx.arc(0, 0, 459, 0, Math.PI * 2);
      ctx.stroke();

      ctx.lineWidth = 18;
      rings.forEach((ring, i) => {
        const start = 0.02 + (rings.length - 1 - i) * 0.03;
        const t = Math.min(1, Math.max(0, (p - start) / 0.06));
        ctx.globalAlpha = 0.15 + 0.85 * t;
        ctx.beginPath();
        ring.points.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      ctx.fillStyle = RED;
      ctx.beginPath();
      ctx.arc(-38.4, 24, 24, 0, Math.PI * 2);
      ctx.fill();
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    const stop = progress.on("change", draw);
    return () => {
      ro.disconnect();
      stop();
    };
  }, [progress]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

function Phrase({ p, i, progress }: { p: (typeof punkter)[number]; i: number; progress: MotionValue<number> }) {
  const n = punkter.length;
  const a = 0.15 + (i / n) * 0.75;
  const b = a + 0.75 / n;
  const last = i === n - 1;
  const opacity = useTransform(progress, [a - 0.05, a + 0.03, b - 0.05, b + 0.02], [0, 1, 1, last ? 1 : 0]);
  const y = useTransform(progress, [a - 0.05, a + 0.03, b - 0.05, b + 0.02], [60, 0, 0, last ? 0 : -60]);
  const blur = useTransform(opacity, (o) => (o > 0.99 ? "none" : `blur(${((1 - o) * 10).toFixed(1)}px)`));
  return (
    <motion.div style={{ opacity, y, filter: blur }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <span className="font-display text-sm tracking-[0.4em] text-red">
        0{i + 1} / 0{n}
      </span>
      <h3 className="mt-4 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.95] md:text-8xl">{p.tittel}</h3>
      <p className="mt-6 max-w-md text-lg text-off/70">{p.tekst}</p>
    </motion.div>
  );
}

export default function Sustainability() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const introOpacity = useTransform(scrollYProgress, [0, 0.08, 0.14], [1, 1, 0]);
  const introScale = useTransform(scrollYProgress, [0, 0.14], [1, 0.85]);

  return (
    <section id="baerekraft" ref={ref} className="relative h-[400vh] bg-ink">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <RingCanvas progress={scrollYProgress} />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(12,5,5,0.85)_0%,rgba(12,5,5,0.55)_45%,transparent_75%)]" />

        <motion.div style={{ opacity: introOpacity, scale: introScale }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span className="font-display text-sm uppercase tracking-[0.4em] text-red">Bærekraft</span>
          <h2 className="mt-4 font-display text-6xl font-bold uppercase leading-[0.9] md:text-[10vw]">
            Hver ring
            <br />
            <span className="outline-text">teller.</span>
          </h2>
        </motion.div>

        {punkter.map((p, i) => (
          <Phrase key={i} p={p} i={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
