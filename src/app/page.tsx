import Hero from "@/components/sections/home/hero";
import Services from "@/components/sections/home/services";
import WhyUs from "@/components/sections/home/whyUs";
import Contact from "@/components/ui/contact";
import ProblemWeSolve from "@/components/sections/home/problemWeSolve";
import HowWeWork from "@/components/sections/home/howWeWork";

export default function Home() {
  return (
    <main>
      <section id="/">
        <Hero />
      </section>
      <section id="problemasQueResolvemos">
        <ProblemWeSolve />
      </section>
      <section id="servicios">
        <Services />
      </section>
      <section id="porQueElegirnos">
        <WhyUs />
      </section>
      <section id="comoTrabajamos">
        <HowWeWork />
      </section>
      <section id="contacto">
        <Contact />
      </section>
    </main>
  );
}
