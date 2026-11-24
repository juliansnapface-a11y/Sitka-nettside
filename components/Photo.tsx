"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { bilder, bildeTekst, type Bilde, type BildeNavn } from "./bilder";
import { innhold } from "./innhold";
import { useSprak } from "./Sprak";

const ease = [0.76, 0, 0.24, 1] as const;

// Liten bildetekst med fotograf og lisens (lisensen krever at vi viser dette)
export function Kreditt({ b, className = "" }: { b: Bilde; className?: string }) {
  const lang = useSprak();
  const t = bildeTekst(b, lang);
  return (
    <span className={className}>
      {t.tekst} · {innhold[lang].foto}:{" "}
      {b.kilde ? (
        <a href={b.kilde} target="_blank" rel="noreferrer" className="underline decoration-current/30 underline-offset-2 hover:text-red">
          {b.fotograf}
        </a>
      ) : (
        b.fotograf
      )}
      {t.lisens && (
        <>
          ,{" "}
          {b.lisensUrl ? (
            <a href={b.lisensUrl} target="_blank" rel="noreferrer" className="underline decoration-current/30 underline-offset-2 hover:text-red">
              {t.lisens}
            </a>
          ) : (
            t.lisens
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
  natur = false,
  tekstFarge = "text-off/40",
  children,
}: {
  navn: BildeNavn;
  className?: string;
  frame?: string;
  sizes?: string;
  position?: string;
  dark?: boolean;
  // natur: viser bildet i ekte farger, uten mørk og rød tone
  natur?: boolean;
  tekstFarge?: string;
  // ekstra ting som skal ligge oppå bildet (for eksempel en etikett)
  children?: ReactNode;
}) {
  const b = bilder[navn];
  const lang = useSprak();
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
          <Image src={b.src} alt={bildeTekst(b, lang).alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: position }} />
        </motion.div>
        {/* svak mørk og rød tone så bildene passer med fargene på siden */}
        {dark && !natur && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />}
        {!natur && <div className="pointer-events-none absolute inset-0 bg-red/10 mix-blend-multiply" />}
        {children}
      </motion.div>
      <figcaption className={`mt-3 text-xs ${tekstFarge}`}>
        <Kreditt b={b} />
      </figcaption>
    </figure>
  );
}
