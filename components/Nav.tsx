"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLoaded } from "./Text";

const links = [
  { href: "#problemet", label: "Problemet" },
  { href: "#losningen", label: "Løsningen" },
  { href: "#prosessen", label: "Prosessen" },
  { href: "#baerekraft", label: "Bærekraft" },
];

const ease = [0.76, 0, 0.24, 1] as const;

export default function Nav() {
  const loaded = useLoaded();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  // Skjul menyen når du scroller ned, vis den når du scroller opp
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200);
  });

  // Lås scrollingen mens mobilmenyen er åpen
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-50 h-[2px] origin-left bg-red"
        style={{ scaleX: scrollYProgress, width: "100%" }}
      />
      <motion.header
        className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 md:px-10 ${open ? "" : "mix-blend-difference"}`}
        initial={{ y: -100 }}
        animate={{ y: !loaded || (hidden && !open) ? -100 : 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <a href="#top" className="group flex items-center gap-3" data-cursor="">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/sitka-ikon.svg" alt="" className="h-9 w-9 transition-transform duration-700 group-hover:rotate-180" />
          <span className="font-display text-2xl font-bold tracking-[0.12em] text-off">SITKA</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group relative font-display text-sm uppercase tracking-[0.2em] text-off">
              <span className="relative block overflow-hidden">
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">{l.label}</span>
                <span className="absolute left-0 top-full block text-red transition-transform duration-500 group-hover:-translate-y-full">
                  {l.label}
                </span>
              </span>
            </a>
          ))}
          <a
            href="#kontakt"
            className="rounded-full border border-off px-5 py-2 font-display text-sm uppercase tracking-[0.2em] text-off transition-colors hover:bg-off hover:text-ink"
          >
            Kontakt
          </a>
        </nav>
        <button
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Meny"
        >
          <motion.span className="block h-0.5 w-7 bg-off" animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} />
          <motion.span className="block h-0.5 w-7 bg-off" animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col justify-end bg-red px-6 pb-16 md:hidden"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.8, ease }}
          >
            {[...links, { href: "#kontakt", label: "Kontakt" }].map((l, i) => (
              <div key={l.href} className="overflow-hidden">
                <motion.a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block font-display text-6xl font-bold uppercase leading-[1.05] text-ink"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease }}
                >
                  {l.label}
                </motion.a>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
