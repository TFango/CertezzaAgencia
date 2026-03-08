import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import WhyUs from "@/components/sections/whyUs";
import AboutUs from "@/components/sections/aboutUs";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyUs />
      <AboutUs />
      <Contact />
    </main>
  );
}
