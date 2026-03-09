import Hero from "@/components/sections/marketing/hero";
import Packs from "@/components/sections/marketing/packs";
import HowMarketingWorks from "@/components/sections/marketing/howWork";
import Contact from "@/components/ui/contact";

export default function WebPage() {
  return (
    <main style={{ overflowX: "hidden" }}>
      <Hero />
      <Packs />
      <HowMarketingWorks />
      <Contact variant="marketing" />
    </main>
  );
}
