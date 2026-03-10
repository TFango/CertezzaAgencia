import Hero from "@/components/sections/web/hero";
import Contact from "@/components/ui/contact";
import Packs from "@/components/sections/web/packs";
import HowWebWorks from "@/components/sections/web/howWork";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desarrollo Web",
  description:
    "Creamos sitios web rápidos, modernos y optimizados para que tu negocio se vea profesional y convierta visitas en clientes. Desde landing pages hasta plataformas a medida.",
  alternates: {
    canonical: "https://certezza.com.ar/servicios/web",
  },
  openGraph: {
    title: "Desarrollo Web | Certezza",
    description:
      "Creamos sitios web rápidos, modernos y optimizados para que tu negocio convierta visitas en clientes.",
    url: "https://certezza.com.ar/servicios/web",
  },
};

export default function WebPage() {
  return (
    <main style={{ overflowX: "hidden" }}>
      <section id="inicio">
        <Hero />
      </section>
      <section id="packs">
        <Packs />
      </section>
      <section id="comoTrabajamos">
        <HowWebWorks />
      </section>
      <section id="contacto">
        <Contact variant="web" />
      </section>
    </main>
  );
}
