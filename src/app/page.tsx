import Hero from "@/components/sections/home/hero";
import Services from "@/components/sections/home/services";
import WhyUs from "@/components/sections/home/whyUs";
import AboutUs from "@/components/sections/home/aboutUs";
import Contact from "@/components/sections/home/contact";
import ProblemWeSolve from "@/components/sections/home/problemWeSolve";

export default function Home() {
  return (
    <main>
      <section id="inicio">
        <Hero />
      </section>
      <section id="problemWeSolve">
        <ProblemWeSolve />
      </section>
      <section id="servicios">
        <Services />
      </section>
      <section id="PorQueElegirnos">
        <WhyUs />
      </section>
      <section id="nosotros">
        <AboutUs />
      </section>
      <section id="contacto">
        <Contact />
      </section>
    </main>
  );
}
