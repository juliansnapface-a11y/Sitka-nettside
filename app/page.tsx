import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Process from "@/components/Process";
import Sustainability from "@/components/Sustainability";
import Customers from "@/components/Customers";
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
        <Problem />
        <Solution />
        <Process />
        <Sustainability />
        <Customers />
        <Contact />
      </main>
    </>
  );
}
