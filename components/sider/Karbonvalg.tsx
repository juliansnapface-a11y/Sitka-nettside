"use client";

// Liten interaktiv figur: hva skjer med karbonet i treet hvis det brennes, råtner eller blir biokull?
// Prikkene er karbon. De starter i treet og flytter seg til lufta eller ned i jorda.

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type KarbonValg = { id: string; navn: string; tid: string; tekst: string; lagret: number };

const RED = "#E0201A";
const OFF = "#F4EEEE";
const ease = [0.22, 1, 0.36, 1] as const;

// faste, «tilfeldige» plasser så figuren ser lik ut hver gang
const N = 18;
const tre = Array.from({ length: N }, (_, i) => ({ x: 200 + Math.sin(i * 2.3) * 28, y: 120 + Math.cos(i * 1.7) * 26 }));
const luft = Array.from({ length: N }, (_, i) => ({ x: 50 + ((i * 53) % 300), y: 30 + ((i * 37) % 60) }));
const overflate = Array.from({ length: N }, (_, i) => ({ x: 70 + ((i * 41) % 260), y: 196 + ((i * 7) % 10) }));
const dypt = Array.from({ length: N }, (_, i) => ({ x: 80 + ((i * 47) % 240), y: 222 + ((i * 13) % 30) }));

function mal(id: string, i: number) {
  if (id === "brenne") return luft[i];
  if (id === "ratne") return i % 3 === 0 ? overflate[i] : luft[i];
  return i % 6 === 0 ? overflate[i] : dypt[i];
}

export default function Karbonvalg({ valg, hint, skala }: { valg: KarbonValg[]; hint: string; skala: string }) {
  const [aktiv, setAktiv] = useState(valg.length - 1);
  const rolig = useReducedMotion();
  const v = valg[aktiv];

  return (
    <div className="rounded-3xl border border-off/10 bg-[#140909] p-5 md:p-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label={hint}>
        {valg.map((o, i) => (
          <button
            key={o.id}
            onClick={() => setAktiv(i)}
            aria-pressed={aktiv === i}
            className={`rounded-full border px-4 py-2 font-display text-sm uppercase tracking-[0.15em] transition-colors ${
              aktiv === i ? "border-red bg-red text-off" : "border-off/20 text-off/70 hover:border-red hover:text-off"
            }`}
          >
            {o.navn}
          </button>
        ))}
      </div>

      <div className="mt-6 grid items-center gap-8 md:grid-cols-2">
        <svg viewBox="0 0 400 270" className="w-full" aria-hidden="true">
          <defs>
            <linearGradient id="kv-jord" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a1a12" />
              <stop offset="100%" stopColor="#1a0b09" />
            </linearGradient>
          </defs>
          {/* luft og jord */}
          <text x="14" y="22" fill={OFF} fillOpacity="0.35" fontSize="11" letterSpacing="2" style={{ fontFamily: "var(--font-oswald)" }}>
            CO₂
          </text>
          <rect x="0" y="185" width="400" height="85" rx="10" fill="url(#kv-jord)" />
          <line x1="0" y1="185" x2="400" y2="185" stroke={OFF} strokeOpacity="0.2" />
          {/* treet */}
          <rect x="196" y="140" width="8" height="45" fill={OFF} fillOpacity="0.25" />
          <path d="M200 70 L240 150 L160 150 Z" fill={OFF} fillOpacity="0.08" stroke={OFF} strokeOpacity="0.25" />
          {/* karbonprikkene */}
          <g key={v.id}>
            {tre.map((p, i) => {
              const m = mal(v.id, i);
              return (
                <motion.circle
                  key={i}
                  r={5}
                  fill={m.y > 185 ? RED : OFF}
                  initial={{ cx: p.x, cy: p.y, opacity: 0.9 }}
                  animate={{ cx: m.x, cy: m.y, opacity: m.y > 185 ? 1 : 0.45 }}
                  transition={rolig ? { duration: 0 } : { duration: v.id === "ratne" ? 2.4 : 1.4, delay: i * 0.04, ease }}
                />
              );
            })}
          </g>
        </svg>

        <div aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <p className="font-display text-xs uppercase tracking-[0.3em] text-red">{v.tid}</p>
              <p className="mt-3 text-lg leading-relaxed text-off/80">{v.tekst}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-off/40">{skala}</p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-off/10">
                <motion.div
                  className="h-full rounded-full bg-red"
                  initial={{ width: 0 }}
                  animate={{ width: `${v.lagret}%` }}
                  transition={{ duration: 1, ease }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-4 text-center font-display text-xs uppercase tracking-[0.3em] text-off/40">{hint}</p>
    </div>
  );
}
