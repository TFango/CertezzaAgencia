import Hero from "@/components/sections/web/hero";
import Contact from "@/components/ui/contact";
import Packs from "@/components/sections/web/packs";
import HowWebWorks from "@/components/sections/web/howWork";

export default function WebPage() {
  return (
    <main style={{ overflowX: "hidden" }}>
      <Hero />
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
