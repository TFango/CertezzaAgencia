import Hero from "@/components/sections/home/hero";
import Services from "@/components/sections/home/services";
import WhyUs from "@/components/sections/home/whyUs";
import Contact from "@/components/ui/contact";
import ProblemWeSolve from "@/components/sections/home/problemWeSolve";
import HowWeWork from "@/components/sections/home/howWeWork";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certezza | Agencia de Marketing Digital y Desarrollo Web",
  description:
    "En Certezza combinamos desarrollo web y marketing digital para que tu negocio se vea profesional y llegue a más clientes. Basados en Mar del Plata.",
  alternates: {
    canonical: "https://certezza.com.ar",
  },
};

export default function Home() {
  return (
    <main>
      <section id="inicio">
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
