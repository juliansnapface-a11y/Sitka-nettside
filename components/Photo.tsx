"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { bilder, type Bilde, type BildeNavn } from "./bilder";

const ease = [0.76, 0, 0.24, 1] as const;

// Liten bildetekst med fotograf og lisens (lisensen krever at vi viser dette)
export function Kreditt({ b, className = "" }: { b: Bilde; className?: string }) {
  return (
    <span className={className}>
      {b.tekst} · Foto:{" "}
      {b.kilde ? (
        <a href={b.kilde} target="_blank" rel="noreferrer" className="underline decoration-current/30 underline-offset-2 hover:text-red">
          {b.fotograf}
        </a>
      ) : (
        b.fotograf
      )}
      {b.lisens && (
        <>
          ,{" "}
          {b.lisensUrl ? (
            <a href={b.lisensUrl} target="_blank" rel="noreferrer" className="underline decoration-current/30 underline-offset-2 hover:text-red">
              {b.lisens}
            </a>
          ) : (
            b.lisens
          )}
        </>
      )}
    </span>
  );
}

// Et ekte bilde som «rulles opp» når det kommer inn på skjermen, og glir litt mens du scroller
export default function Photo({
  navn,
  className = "",
  frame = "aspect-[3/2]",
  sizes = "100vw",
  position = "center",
  dark = true,
}: {
  navn: BildeNavn;
  className?: string;
  frame?: string;
  sizes?: string;
  position?: string;
  dark?: boolean;
}) {
  const b = bilder[navn];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.25, 1.12]);
  // Ser etter selve rammen (ikke det klippede bildet), ellers merker ikke nettleseren at bildet er synlig
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <figure ref={ref} className={className}>
      <motion.div
        className={`relative w-full overflow-hidden rounded-3xl bg-[#1a0b09] ${frame}`}
        initial={{ clipPath: "inset(100% 0% 0% 0% round 1.5rem)" }}
        animate={inView ? { clipPath: "inset(0% 0% 0% 0% round 1.5rem)" } : undefined}
        transition={{ duration: 1.4, ease }}
      >
        <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
          <Image src={b.src} alt={b.alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: position }} />
        </motion.div>
        {/* svak mørk og rød tone så bildene passer med fargene på siden */}
        {dark && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />}
        <div className="pointer-events-none absolute inset-0 bg-red/10 mix-blend-multiply" />
      </motion.div>
      <figcaption className="mt-3 text-xs text-off/40">
        <Kreditt b={b} />
      </figcaption>
    </figure>
  );
}
