"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

// Rød overgang mellom problemet og løsningen: to linjer som glir mot hverandre
export default function Bridge() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const x1 = useTransform(p, [0, 0.55], ["-45%", "0%"]);
  const x2 = useTransform(p, [0, 0.55], ["45%", "0%"]);
  const rotate = useTransform(p, [0, 1], [-90, 90]);
  const scale = useTransform(p, [0, 0.6, 1], [0.6, 1, 1.15]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-red py-28 text-ink md:py-44">
      <motion.div
        style={{ rotate, scale }}
        className="pointer-events-none absolute left-1/2 top-1/2 -ml-[45vmin] -mt-[45vmin] h-[90vmin] w-[90vmin] rounded-full bg-[repeating-radial-gradient(circle,transparent_0_26px,rgba(12,5,5,0.16)_26px_30px)]"
      />
      <div className="relative px-5 md:px-10">
        <motion.p style={{ x: x1 }} className="whitespace-nowrap font-display text-[15vw] font-bold uppercase leading-[0.9] md:text-[13vw]">
          To problemer.
        </motion.p>
        <motion.p
          style={{ x: x2 }}
          className="whitespace-nowrap text-right font-display text-[15vw] font-bold uppercase leading-[0.9] text-off md:text-[13vw]"
        >
          Ett produkt.
        </motion.p>
        <p className="mt-10 max-w-md text-lg font-medium text-ink/80 md:ml-auto md:text-right md:text-xl">
          Vi tar et tre naturen vil bli kvitt, og bruker det til å løse et problem i stallen.
        </p>
      </div>
    </section>
  );
}
