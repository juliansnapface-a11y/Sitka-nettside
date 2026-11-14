"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { prosess } from "./innhold";
import { bilder } from "./bilder";
import { Kreditt } from "./Photo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Flis (lyse biter) og biokull (mørke korn) strødd utover
const blanding = (() => {
  const rnd = rand(5);
  return Array.from({ length: 110 }, (_, k) => ({
    x: 24 + rnd() * 252,
    y: 24 + rnd() * 252,
    rot: rnd() * 180,
    r: 4 + rnd() * 5,
    kull: k % 3 === 0,
    glo: k % 12 === 0,
  }));
})();

// Biokull-korn nede i jorda
const jord = (() => {
  const rnd = rand(9);
  return Array.from({ length: 34 }, (_, k) => ({
    x: 36 + rnd() * 228,
    y: 168 + rnd() * 98,
    r: 2.5 + rnd() * 5,
    glo: k % 4 === 0,
  }));
})();

// Enkle strektegninger for hvert steg (tegnes opp når panelet kommer inn)
function Visual({ i }: { i: number }) {
  const common = "draw fill-none stroke-red [stroke-dasharray:1] [stroke-width:3] [stroke-linecap:round] [stroke-linejoin:round]";
  if (i === 0)
    return (
      <svg viewBox="0 0 300 300" className="h-full w-full">
        <path pathLength={1} className={common} d="M150 30 L95 110 H125 L75 180 H115 L60 250 H240 L185 180 H225 L175 110 H205 Z" />
        <path pathLength={1} className={common} d="M150 250 V285" />
        <path pathLength={1} className={`${common} stroke-off/40`} d="M20 285 H280" />
      </svg>
    );
  if (i === 2)
    return (
      <svg viewBox="0 0 300 300" className="h-full w-full">
        {blanding.map((b, k) =>
          b.kull ? (
            <circle key={k} className="pop" cx={b.x} cy={b.y} r={b.r} fill={b.glo ? "#E0201A" : "#3a1c18"} stroke="#E0201A" strokeWidth="1" />
          ) : (
            <rect
              key={k}
              className="pop"
              x={b.x - 9}
              y={b.y - 2.5}
              width={18}
              height={5}
              rx={2}
              fill="#c9a27a"
              opacity={0.8}
              transform={`rotate(${b.rot.toFixed(0)} ${b.x.toFixed(1)} ${b.y.toFixed(1)})`}
            />
          ),
        )}
      </svg>
    );
  return (
    <svg viewBox="0 0 300 300" className="h-full w-full">
      <path pathLength={1} className={common} d="M20 140 C80 120 120 160 160 140 S240 120 280 140" />
      <path pathLength={1} className={`${common} stroke-off/40`} d="M20 140 V280 H280 V140" />
      {jord.map((j, k) => (
        <circle key={k} className="pop" cx={j.x} cy={j.y} r={j.r} fill={j.glo ? "#E0201A" : "#F4EEEE"} opacity={j.glo ? 1 : 0.25} />
      ))}
      <path
        pathLength={1}
        className={common}
        d="M150 140 V80 M150 100 C130 90 120 70 125 55 C140 60 150 75 150 100 M150 90 C165 75 180 70 190 75 C185 90 170 95 150 95"
      />
    </svg>
  );
}

// Pyrolyse-videoen spiller bare mens den er synlig på skjermen
function PyrolyseVideo() {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={video}
      className="h-full w-full object-cover"
      src="/media/pyrolyse.mp4"
      poster="/media/pyrolyse-poster.jpg"
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Tegner strekene, «popper» inn prikkene og zoomer bildet i et panel
      const animatePanel = (p: HTMLElement, trigger: () => ScrollTrigger.Vars) => {
        const draws = p.querySelectorAll(".draw");
        if (draws.length)
          gsap.fromTo(
            draws,
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.8, stagger: 0.2, ease: "power2.inOut", scrollTrigger: trigger() },
          );
        const photos = p.querySelectorAll(".photo");
        if (photos.length)
          gsap.fromTo(photos, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: "power3.out", scrollTrigger: trigger() });
        const pops = p.querySelectorAll(".pop");
        if (pops.length)
          gsap.from(pops, {
            scale: 0,
            transformOrigin: "center",
            stagger: 0.012,
            ease: "back.out(2)",
            scrollTrigger: trigger(),
          });
      };

      // Store skjermer: horisontal scroll som er «festet» mens du scroller
      mm.add("(min-width: 768px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".panel");
        const distance = () => track.current!.scrollWidth - window.innerWidth;
        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + distance(),
            invalidateOnRefresh: true,
          },
        });
        gsap.to(".bar", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: () => "+=" + distance(), scrub: true },
        });
        panels.forEach((p) => {
          animatePanel(p, () => ({ trigger: p, containerAnimation: tween, start: "left 65%" }));
          const nr = p.querySelector(".big-nr");
          if (nr)
            gsap.from(nr, {
              yPercent: 100,
              ease: "none",
              scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "left 35%", scrub: true },
            });
        });
      });

      // Mobil: vanlige panel under hverandre
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".panel").forEach((p) => {
          animatePanel(p, () => ({ trigger: p.querySelector(".visual") ?? p, start: "top 80%" }));
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="prosessen" ref={ref} className="relative overflow-hidden bg-off text-ink md:h-svh">
      <div className="absolute left-5 top-8 z-10 md:left-10 md:top-10">
        <div className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.35em] text-red md:text-sm">
          <span className="block h-px w-10 bg-red" />
          Prosessen · fra tre til jord
        </div>
      </div>
      <div className="absolute bottom-8 left-10 right-10 z-10 hidden h-[3px] bg-ink/10 md:block">
        <div className="bar h-full origin-left scale-x-0 bg-red" />
      </div>

      <div ref={track} className="flex flex-col pt-20 md:h-full md:w-max md:flex-row md:items-center md:pt-0">
        <div className="panel flex w-full shrink-0 flex-col justify-center px-5 py-16 md:h-full md:w-[60vw] md:px-10">
          <h2 className="font-display text-6xl font-bold uppercase leading-[0.9] md:text-[8vw]">
            Fra
            <br />
            <span className="text-red">problem</span>
            <br />
            til ressurs.
          </h2>
          <p className="mt-8 max-w-md text-lg text-ink/70">
            Fire steg fra en uønsket gran til et strø som gjør stallen bedre, og så tilbake til jorda.
          </p>
          <p className="mt-10 hidden font-display text-sm uppercase tracking-[0.3em] text-ink/40 md:block">Scroll →</p>
        </div>

        {prosess.map((s, i) => (
          <article
            key={s.nr}
            className="panel relative flex w-full shrink-0 flex-col gap-10 border-t border-ink/10 px-5 py-16 md:h-full md:w-[80vw] md:flex-row md:items-center md:gap-16 md:border-l md:border-t-0 md:px-16 lg:w-[70vw]"
          >
            <div className="relative md:w-1/2">
              <div className="overflow-hidden pb-[0.07em] font-display text-[30vw] font-bold leading-[0.8] text-red md:text-[14vw]">
                <div className="big-nr">{s.nr}</div>
              </div>
              <h3 className="mt-6 font-display text-4xl font-bold uppercase md:text-6xl">{s.tittel}</h3>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">{s.tekst}</p>
            </div>
            <div className="relative aspect-square w-full max-w-md md:w-1/2">
              {s.video ? (
                <div className="relative h-full w-full overflow-hidden rounded-3xl bg-ink">
                  <PyrolyseVideo />
                  <div className="absolute bottom-4 left-4 rounded-full bg-red px-3 py-1 font-display text-xs uppercase tracking-[0.2em] text-off">
                    ca. 600 °C · nesten uten O<sub className="text-[0.7em]">2</sub>
                  </div>
                </div>
              ) : s.bilde ? (
                <div className="visual relative h-full w-full overflow-hidden rounded-3xl bg-ink">
                  <Image
                    src={bilder[s.bilde].src}
                    alt={bilder[s.bilde].alt}
                    fill
                    sizes="(min-width: 768px) 35vw, 100vw"
                    className="photo object-cover"
                  />
                  <div className="absolute inset-x-4 bottom-4 w-fit rounded-full bg-ink/80 px-3 py-1 text-[11px] text-off/80 backdrop-blur">
                    <Kreditt b={bilder[s.bilde]} />
                  </div>
                </div>
              ) : (
                <div className="visual h-full w-full rounded-3xl bg-ink p-8 md:p-12">
                  <Visual i={i} />
                </div>
              )}
            </div>
          </article>
        ))}
        <div className="hidden w-[10vw] shrink-0 md:block" />
      </div>
    </section>
  );
}
