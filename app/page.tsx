import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Problem from "@/components/Problem";
import Bridge from "@/components/Bridge";
import Solution from "@/components/Solution";
import Process from "@/components/Process";
import Sustainability from "@/components/Sustainability";
import Customers from "@/components/Customers";
import About from "@/components/About";
import Contact from "@/components/Contact";

// Forsiden. Hver seksjon ligger i sin egen fil i mappen «components».
export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Marquee
          items={["Sitkagran", "Biokull", "Strø", "Jord"]}
          className="border-y border-off/10 py-5 text-5xl md:text-8xl"
        />
        <Problem />
        <Bridge />
        <Solution />
        <Process />
        <Sustainability />
        <Customers />
        <About />
        <Contact />
      </main>
    </>
  );
}
