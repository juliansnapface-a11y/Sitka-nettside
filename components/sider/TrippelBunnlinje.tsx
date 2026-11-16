"use client";

// Interaktiv figur: tre ringer for trippel bunnlinje (miljø, mennesker, økonomi).
// Hver ring er tegnet som årringer, som i logoen. Trykk på en ring for å lese mer.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";

export type Soyle = { id: string; navn: string; kort: string; punkter: { tittel: string; tekst: string }[] };
export type TrippelTekst = {
  hint: string;
  soyler: Soyle[]; // nøyaktig tre: miljø, mennesker, økonomi
  alle: { navn: string; kort: string; tekst: string };
  knappAlle: string;
};

const RED = "#E0201A";
const OFF = "#F4EEEE";
const SAND = "#E8A87C";

// Plassering og farge for de tre ringene
const ringer = [
  { cx: 300, cy: 200, farge: RED },
  { cx: 212, cy: 352, farge: OFF },
  { cx: 388, cy: 352, farge: SAND },
];
const R = 150;
const ease = [0.22, 1, 0.36, 1] as const;

export default function TrippelBunnlinje({ tekst }: { tekst: TrippelTekst }) {
  const [aktiv, setAktiv] = useState<number>(-1); // -1 = alle tre
  const [rort, setRort] = useState(false); // har brukeren trykket selv?
  const ref = useRef<HTMLDivElement>(null);
  const synlig = useInView(ref, { once: true, margin: "-15% 0px" });
  const roligBevegelse = useReducedMotion();

  // Går av seg selv gjennom ringene til brukeren tar over
  useEffect(() => {
    if (!synlig || rort || roligBevegelse) return;
    const id = setInterval(() => setAktiv((a) => (a >= 2 ? -1 : a + 1)), 4500);
    return () => clearInterval(id);
  }, [synlig, rort, roligBevegelse]);

  const velg = (i: number) => {
    setRort(true);
    setAktiv(i);
  };

  const s = aktiv >= 0 ? tekst.soyler[aktiv] : null;

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="relative mx-auto w-full max-w-[560px]">
        <svg viewBox="40 30 520 500" className="w-full overflow-visible" role="group" aria-label={tekst.hint}>
          <defs>
            <radialGradient id="tbl-glo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={RED} stopOpacity="0.35" />
              <stop offset="100%" stopColor={RED} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="260" fill="url(#tbl-glo)" />

          {ringer.map((r, i) => {
            const erAktiv = aktiv === i;
            const dempet = aktiv >= 0 && !erAktiv;
            return (
              <motion.g
                key={i}
                role="button"
                tabIndex={0}
                aria-label={tekst.soyler[i].navn}
                aria-pressed={erAktiv}
                onClick={() => velg(erAktiv ? -1 : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    velg(erAktiv ? -1 : i);
                  }
                }}
                onPointerEnter={(e) => e.pointerType === "mouse" && velg(i)}
                className="cursor-pointer outline-none"
                style={{ transformOrigin: `${r.cx}px ${r.cy}px`, transformBox: "view-box", mixBlendMode: "screen" }}
                animate={{ scale: erAktiv ? 1.07 : 1, opacity: dempet ? 0.3 : 1 }}
                transition={{ duration: 0.6, ease }}
              >
                {/* fyll */}
                <motion.circle
                  cx={r.cx}
                  cy={r.cy}
                  r={R}
                  fill={r.farge}
                  initial={{ fillOpacity: 0 }}
                  animate={{ fillOpacity: synlig ? (erAktiv ? 0.3 : 0.12) : 0 }}
                  transition={{ duration: 0.8 }}
                />
                {/* årringer */}
                {[1, 0.78, 0.56, 0.34].map((k, j) => (
                  <motion.circle
                    key={j}
                    cx={r.cx}
                    cy={r.cy}
                    r={R * k}
                    fill="none"
                    stroke={r.farge}
                    strokeWidth={j === 0 ? 4 : 2}
                    strokeOpacity={j === 0 ? 1 : 0.55}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: synlig ? 1 : 0 }}
                    transition={{ duration: 1.6, delay: 0.2 + i * 0.25 + j * 0.12, ease }}
                  />
                ))}
                {/* stiplet ring som snurrer rolig */}
                <circle
                  cx={r.cx}
                  cy={r.cy}
                  r={R + 12}
                  fill="none"
                  stroke={r.farge}
                  strokeOpacity={erAktiv ? 0.9 : 0.35}
                  strokeWidth={1.5}
                  strokeDasharray="2 10"
                  className={roligBevegelse ? "" : "animate-[spin_30s_linear_infinite]"}
                  style={{ transformOrigin: `${r.cx}px ${r.cy}px`, transformBox: "view-box", animationDirection: i % 2 ? "reverse" : "normal" }}
                />
                {/* navn */}
                <text
                  x={r.cx + (i === 0 ? 0 : i === 1 ? -55 : 55)}
                  y={r.cy + (i === 0 ? -62 : 62)}
                  textAnchor="middle"
                  fill={OFF}
                  fontSize="24"
                  fontWeight="700"
                  letterSpacing="2"
                  style={{ fontFamily: "var(--font-oswald)", textTransform: "uppercase", pointerEvents: "none" }}
                >
                  {tekst.soyler[i].navn}
                </text>
              </motion.g>
            );
          })}

          {/* midten: Sitka */}
          <g
            role="button"
            tabIndex={0}
            aria-label={tekst.alle.navn}
            aria-pressed={aktiv === -1}
            onClick={() => velg(-1)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                velg(-1);
              }
            }}
            className="cursor-pointer outline-none"
          >
            <motion.circle
              cx={300}
              cy={302}
              r={34}
              fill="#0C0505"
              stroke={RED}
              strokeWidth={3}
              animate={{ scale: aktiv === -1 ? [1, 1.08, 1] : 1 }}
              transition={{ duration: 2.4, repeat: aktiv === -1 && !roligBevegelse ? Infinity : 0 }}
              style={{ transformOrigin: "300px 302px", transformBox: "view-box" }}
            />
            <text
              x={300}
              y={309}
              textAnchor="middle"
              fill={OFF}
              fontSize="17"
              fontWeight="700"
              letterSpacing="2"
              style={{ fontFamily: "var(--font-oswald)", pointerEvents: "none" }}
            >
              SITKA
            </text>
          </g>
        </svg>
        <p className="mt-2 text-center font-display text-xs uppercase tracking-[0.3em] text-off/40">{tekst.hint}</p>
      </div>

      <div>
        {/* knapper, også fine for tastatur og skjermlesere */}
        <div className="flex flex-wrap gap-2">
          {tekst.soyler.map((so, i) => (
            <button
              key={so.id}
              onClick={() => velg(i)}
              aria-pressed={aktiv === i}
              className={`rounded-full border px-4 py-2 font-display text-sm uppercase tracking-[0.15em] transition-colors ${
                aktiv === i ? "border-red bg-red text-off" : "border-off/20 text-off/70 hover:border-red hover:text-off"
              }`}
            >
              {so.navn}
            </button>
          ))}
          <button
            onClick={() => velg(-1)}
            aria-pressed={aktiv === -1}
            className={`rounded-full border px-4 py-2 font-display text-sm uppercase tracking-[0.15em] transition-colors ${
              aktiv === -1 ? "border-red bg-red text-off" : "border-off/20 text-off/70 hover:border-red hover:text-off"
            }`}
          >
            {tekst.knappAlle}
          </button>
        </div>

        <div className="relative mt-8 min-h-[420px]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={aktiv}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease }}
            >
              <h3 className="font-display text-4xl font-bold uppercase leading-none md:text-5xl">
                {s ? s.navn : tekst.alle.navn}
              </h3>
              <p className="mt-3 text-lg text-red">{s ? s.kort : tekst.alle.kort}</p>
              {s ? (
                <ul className="mt-6 space-y-4">
                  {s.punkter.map((p, k) => (
                    <motion.li
                      key={p.tittel}
                      className="border-l-2 border-red/60 pl-4"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + k * 0.07, duration: 0.4 }}
                    >
                      <p className="font-display text-lg uppercase tracking-wide">{p.tittel}</p>
                      <p className="mt-1 text-off/70">{p.tekst}</p>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-off/75">{tekst.alle.tekst}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
