"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LOADED_EVENT, ringSvgPaths } from "./rings";
import { innhold } from "./innhold";
import { useSprak } from "./Sprak";

const paths = ringSvgPaths(100, 100, 92, 8);

// Åpningsanimasjon: årringene tegnes, tallet teller til 100, så glir teppet opp
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const tekst = innhold[useSprak()].preloader;

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    const dur = 2200;
    let raf = 0;
    const loop = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(loop);
      else
        setTimeout(() => {
          setDone(true);
          document.documentElement.style.overflow = "";
          (window as unknown as { __sitkaLoaded?: boolean }).__sitkaLoaded = true;
          window.dispatchEvent(new Event(LOADED_EVENT));
        }, 250);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.svg
            viewBox="0 0 200 200"
            className="h-40 w-40 md:h-56 md:w-56"
            animate={{ rotate: 90 }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
          >
            <motion.circle
              cx={100}
              cy={100}
              r={88}
              fill="none"
              stroke="#E0201A"
              strokeWidth={8}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
            />
            {paths.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke="#E0201A"
                strokeWidth={4}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.1 + i * 0.1, ease: [0.65, 0, 0.35, 1] }}
              />
            ))}
            <motion.circle
              cx={92.6}
              cy={104.6}
              r={4.6}
              fill="#E0201A"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4, type: "spring" }}
            />
          </motion.svg>
          <div className="mt-10 overflow-hidden">
            <motion.p
              className="font-display text-sm uppercase tracking-[0.5em] text-off/70"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {tekst}
            </motion.p>
          </div>
          <div className="absolute bottom-8 right-8 font-display text-7xl font-bold tabular-nums text-red md:text-9xl">
            {count}
            <span className="text-off/40">%</span>
          </div>
          <div className="absolute bottom-0 left-0 h-1 bg-red" style={{ width: `${count}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
