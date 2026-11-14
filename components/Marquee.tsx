"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";

// Rullende tekstbånd som går fortere (og snur) når du scroller
export default function Marquee({
  items,
  baseVelocity = -3,
  className = "",
  tilt = 0,
  outlineClass = "outline-text",
  dotClass = "text-red",
}: {
  items: string[];
  baseVelocity?: number;
  className?: string;
  tilt?: number;
  outlineClass?: string;
  dotClass?: string;
}) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const smooth = useSpring(vel, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);
  const pos = useTransform(x, (v) => `${wrap(-25, -50, v)}%`);

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    x.set(x.get() + move);
  });

  const row = (
    <>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className={i % 2 ? outlineClass : ""}>{t}</span>
          <svg viewBox="0 0 20 20" className={`mx-[0.35em] h-[0.45em] w-[0.45em] shrink-0 ${dotClass}`}>
            <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="10" cy="10" r="3" fill="currentColor" />
          </svg>
        </span>
      ))}
    </>
  );

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} style={{ rotate: `${tilt}deg` }}>
      <motion.div className="flex w-max font-display font-bold uppercase" style={{ x: pos }}>
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}
