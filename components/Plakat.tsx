"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

// Små byggeklosser til plakat-stilen på forsiden (Problemet og Løsningen)

// Liten etikett med prikk over en stor overskrift
export function Etikett({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 font-display text-xs uppercase tracking-[0.35em] md:text-sm ${className}`}>
      <span className="block h-2 w-2 rounded-full bg-current" />
      {children}
    </div>
  );
}

// Rundt «klistremerke», litt på skrå, som på plakatene
export function Merke({
  children,
  className = "",
  vinkel = -12,
}: {
  children: ReactNode;
  className?: string;
  vinkel?: number;
}) {
  return (
    <motion.div
      className={`absolute z-10 flex h-32 w-32 items-center justify-center rounded-full text-center font-display text-lg font-bold uppercase leading-[1.05] tracking-wide shadow-[0_20px_40px_rgba(12,5,5,0.25)] md:h-44 md:w-44 md:text-2xl ${className}`}
      initial={{ scale: 0, rotate: vinkel - 40 }}
      whileInView={{ scale: 1, rotate: vinkel }}
      // bare marg oppe/nede: merket starter som et punkt (scale 0), og ligger ofte helt ute ved kanten
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.3 }}
    >
      <div className="px-4">{children}</div>
    </motion.div>
  );
}

// Knapp som lenker videre
export function PilKnapp({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full px-7 py-4 font-display text-sm uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5 ${className}`}
      data-cursor=""
    >
      {children}
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </a>
  );
}
