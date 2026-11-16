import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Process from "@/components/Process";
import Customers from "@/components/Customers";
import Contact from "@/components/Contact";
import { SprakProvider } from "@/components/Sprak";
import type { Sprak } from "@/lib/sprak";

// Forsiden, på norsk eller engelsk. Hver seksjon ligger i sin egen fil i mappen «components».
export default function Forside({ lang }: { lang: Sprak }) {
  return (
    <SprakProvider lang={lang}>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Process />
        <Customers />
        <Contact />
      </main>
    </SprakProvider>
  );
}
