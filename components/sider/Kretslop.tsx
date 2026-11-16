"use client";

// Kretsløpet tegnet som en sirkel: et lyspunkt går rundt og tenner stegene ett etter ett.
// Man kan også trykke på et steg for å lese om det.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";

export type KretslopSteg = { tittel: string; tekst: string };

const RED = "#E0201A";
const ease = [0.22, 1, 0.36, 1] as const;

export default function Kretslop({ steg, hint }: { steg: KretslopSteg[]; hint: string }) {
  const [aktiv, setAktiv] = useState(0);
  const [rort, setRort] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const synlig = useInView(ref, { margin: "-10% 0px" });
  const rolig = useReducedMotion();
  const n = steg.length;

  useEffect(() => {
    if (!synlig || rort || rolig) return;
    const id = setInterval(() => setAktiv((a) => (a + 1) % n), 3200);
    return () => clearInterval(id);
  }, [synlig, rort, rolig, n]);

  const C = 250;
  const RR = 190;
  const pos = (i: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: C + Math.cos(a) * RR, y: C + Math.sin(a) * RR, a };
  };
  const vinkel = (aktiv / n) * 360;

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="relative mx-auto w-full max-w-[520px]">
        <svg viewBox="0 0 500 500" className="w-full overflow-visible">
          <circle cx={C} cy={C} r={RR} fill="none" stroke="#F4EEEE" strokeOpacity="0.12" strokeWidth="2" />
          {/* den røde buen fram til aktivt steg */}
          <motion.circle
            cx={C}
            cy={C}
            r={RR}
            fill="none"
            stroke={RED}
            strokeWidth="4"
            strokeLinecap="round"
            style={{ rotate: -90, transformOrigin: "250px 250px", transformBox: "view-box" }}
            animate={{ pathLength: aktiv === 0 ? 0.02 : aktiv / n }}
            transition={{ duration: 0.9, ease }}
          />
          {/* lyspunktet */}
          <motion.g
            style={{ transformOrigin: "250px 250px", transformBox: "view-box" }}
            animate={{ rotate: vinkel }}
            transition={{ duration: 0.9, ease }}
          >
            <circle cx={C} cy={C - RR} r="16" fill={RED} opacity="0.25" />
            <circle cx={C} cy={C - RR} r="7" fill={RED} />
          </motion.g>
          {steg.map((s, i) => {
            const p = pos(i);
            const on = i === aktiv;
            return (
              <g
                key={s.tittel}
                role="button"
                tabIndex={0}
                aria-label={s.tittel}
                aria-pressed={on}
                className="cursor-pointer outline-none"
                onClick={() => {
                  setRort(true);
                  setAktiv(i);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setRort(true);
                    setAktiv(i);
                  }
                }}
              >
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={30}
                  animate={{ fill: on ? RED : "#0C0505", scale: on ? 1.12 : 1 }}
                  stroke={RED}
                  strokeWidth={2.5}
                  style={{ transformOrigin: `${p.x}px ${p.y}px`, transformBox: "view-box" }}
                  transition={{ duration: 0.4 }}
                />
                <text
                  x={p.x}
                  y={p.y + 7}
                  textAnchor="middle"
                  fill="#F4EEEE"
                  fontSize="20"
                  fontWeight="700"
                  style={{ fontFamily: "var(--font-oswald)", pointerEvents: "none" }}
                >
                  0{i + 1}
                </text>
              </g>
            );
          })}
          {/* teksten i midten */}
          <foreignObject x={C - 120} y={C - 70} width={240} height={140} style={{ pointerEvents: "none" }}>
            <div className="flex h-full items-center justify-center text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={aktiv}
                  className="font-display text-2xl font-bold uppercase leading-tight text-off"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                >
                  {steg[aktiv].tittel}
                </motion.p>
              </AnimatePresence>
            </div>
          </foreignObject>
        </svg>
        <p className="mt-2 text-center font-display text-xs uppercase tracking-[0.3em] text-off/40">{hint}</p>
      </div>

      <ol className="space-y-3">
        {steg.map((s, i) => (
          <li key={s.tittel}>
            <button
              onClick={() => {
                setRort(true);
                setAktiv(i);
              }}
              className={`w-full rounded-2xl border p-5 text-left transition-colors ${
                i === aktiv ? "border-red bg-red/10" : "border-off/10 hover:border-off/30"
              }`}
            >
              <span className="font-display text-xs text-red">0{i + 1}</span>
              <span className="ml-3 font-display text-xl uppercase tracking-wide">{s.tittel}</span>
              <span className={`mt-2 block text-off/70 ${i === aktiv ? "" : "hidden md:block md:text-off/45"}`}>{s.tekst}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
