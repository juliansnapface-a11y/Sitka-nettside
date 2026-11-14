// Bærekraft: en rolig, statisk seksjon uten scroll-effekter

const punkter = [
  { tittel: "Fjerner en fremmed art", tekst: "Råvaren er sitkagran, et tre som fortrenger norsk natur og som mange steder allerede blir hogd." },
  { tittel: "Lagrer karbon i jorda", tekst: "Biokull er en stabil form for karbon. Havner det i jorda, kan karbonet bli liggende der lenge." },
  { tittel: "Ingenting går til spille", tekst: "Brukt strø kan komposteres og bli jordforbedring. Det som var et problem, ender som en ressurs." },
];

const kretslop = ["Sitkagran", "Biokull", "Strø", "Jord"];

export default function Sustainability() {
  return (
    <section id="baerekraft" className="relative overflow-hidden bg-ink px-5 py-24 md:px-10 md:py-36">
      {/* årringene fra logoen som stille bakgrunn */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/sitka-ikon.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-[20vw] top-1/2 w-[70vw] max-w-[900px] -translate-y-1/2 opacity-[0.07] md:-right-[8vw] md:w-[55vw]"
      />

      <div className="relative max-w-3xl">
        <div className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.35em] text-red md:text-sm">
          <span className="block h-px w-10 bg-red" />
          Bærekraft
        </div>
        <h2 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.9] md:text-8xl">
          Hver ring <span className="text-red">teller.</span>
        </h2>
        <p className="mt-8 max-w-xl text-lg text-off/70 md:text-xl">
          Sitka bygger på et enkelt kretsløp. Et tre som ikke hører hjemme her, blir til strø som gjør nytte i stallen, og ender
          som jordforbedring.
        </p>
      </div>

      {/* kretsløpet, fra tre til jord */}
      <ol className="relative mt-16 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4 md:gap-0">
        {kretslop.map((k, i) => (
          <li key={k} className="relative flex items-center gap-3 md:gap-0">
            <div className="flex w-full items-center gap-3 rounded-full border border-off/15 px-5 py-3 md:mr-10">
              <span className="font-display text-xs text-red">0{i + 1}</span>
              <span className="font-display text-lg uppercase tracking-[0.15em] md:text-xl">{k}</span>
            </div>
            {i < kretslop.length - 1 && (
              <span aria-hidden className="absolute right-0 hidden w-10 text-center font-display text-xl text-red md:block">
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="relative mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-8">
        {punkter.map((p, i) => (
          <div key={p.tittel} className="border-t-2 border-red pt-6">
            <span className="font-display text-sm tracking-[0.3em] text-off/40">0{i + 1}</span>
            <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-tight md:text-3xl">{p.tittel}</h3>
            <p className="mt-3 text-off/70">{p.tekst}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
