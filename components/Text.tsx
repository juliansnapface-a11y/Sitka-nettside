"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LOADED_EVENT } from "./rings";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ease = [0.22, 1, 0.36, 1] as const;

export function useLoaded() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if ((window as unknown as { __sitkaLoaded?: boolean }).__sitkaLoaded) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoaded(true);
      return;
    }
    const on = () => setLoaded(true);
    window.addEventListener(LOADED_EVENT, on);
    return () => window.removeEventListener(LOADED_EVENT, on);
  }, []);
  return loaded;
}

// Bokstaver som glir opp bak en maske, én etter én
export function SplitLetters({
  text,
  className = "",
  delay = 0,
  stagger = 0.045,
  play,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  play?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const show = play ?? inView;
  return (
    <span ref={ref} className={`-mb-[0.1em] inline-flex overflow-hidden pb-[0.1em] ${className}`} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block will-change-transform"
          initial={{ y: "110%", rotate: 8 }}
          animate={show ? { y: "0%", rotate: 0 } : undefined}
          transition={{ duration: 1.1, delay: delay + i * stagger, ease }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

// Linjer/ord som glir opp når de kommer inn i bildet
export function RevealWords({
  text,
  className = "",
  delay = 0,
  play,
}: {
  text: string;
  className?: string;
  delay?: number;
  play?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const show = play ?? inView;
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "105%" }}
            animate={show ? { y: "0%" } : undefined}
            transition={{ duration: 0.9, delay: delay + i * 0.035, ease }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Tekst som «lyser opp» ord for ord mens du scroller (GSAP scrub)
export function ScrubText({ text, className = "", highlight = [] as string[] }: { text: string; className?: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useGSAP(
    () => {
      const words = ref.current!.querySelectorAll(".w");
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 85%", end: "bottom 45%", scrub: true },
        },
      );
    },
    { scope: ref },
  );
  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((w, i) => {
        const hl = highlight.some((h) => w.toLowerCase().startsWith(h.toLowerCase()));
        return (
          <span key={i} className={`w inline-block ${hl ? "text-red" : ""}`}>
            {w}&nbsp;
          </span>
        );
      })}
    </p>
  );
}

// Liten etikett over overskrifter
export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`flex items-center gap-3 font-display text-xs uppercase tracking-[0.35em] text-red md:text-sm ${className}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
    >
      <motion.span
        className="block h-px bg-red"
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
      />
      {children}
    </motion.div>
  );
}

// Stor overskrift i plakat-stil: første del på én linje, så et lite ord i kursiv og siste del i en annen farge.
// deler = [«Stikkende luft», «i», «stallen.»]
export function PlakatTittel({
  deler,
  className = "",
  farger = ["", "", "text-red"],
}: {
  deler: string[];
  className?: string;
  farger?: [string, string, string];
}) {
  const [a, lite, b] = deler;
  return (
    <h2 className={`font-display font-bold uppercase leading-[0.84] tracking-[-0.01em] ${className}`}>
      <span className={`block ${farger[0]}`}>
        <RevealWords text={a} />
      </span>
      <span className="flex flex-wrap items-baseline">
        <motion.span
          className={`mr-[0.18em] font-serif text-[0.42em] font-normal normal-case italic tracking-normal ${farger[1]}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
        >
          {lite}
        </motion.span>
        <RevealWords text={b} className={farger[2]} delay={0.15} />
      </span>
    </h2>
  );
}
