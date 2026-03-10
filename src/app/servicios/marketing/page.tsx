import Hero from "@/components/sections/marketing/hero";
import Packs from "@/components/sections/marketing/packs";
import HowMarketingWorks from "@/components/sections/marketing/howWork";
import Contact from "@/components/ui/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Digital",
  description:
    "Gestionamos tu presencia digital de punta a punta. Contenido, comunidad y campañas en Meta Ads y Google Ads que convierten seguidores en clientes.",
  alternates: {
    canonical: "https://certezza.com.ar/servicios/marketing",
  },
  openGraph: {
    title: "Marketing Digital | Certezza",
    description:
      "Gestionamos tu presencia digital de punta a punta. Contenido, comunidad y campañas que convierten seguidores en clientes.",
    url: "https://certezza.com.ar/servicios/marketing",
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
        <HowMarketingWorks />
      </section>
      <section id="contacto">
        <Contact variant="marketing" />
      </section>
    </main>
  );
}
