import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Services from "../components/Services";
import Process from "../components/Process";
import Portfolio from "../components/Portfolio";
import Team from "../components/Team";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Home() {
  usePageMeta(
    "Afrique NovaTech — Studio de création web & solutions digitales | Cotonou",
    "Afrique NovaTech conçoit des sites web, applications et plateformes SaaS modernes et sur-mesure. Basé à Cotonou, nous livrons des produits digitaux d'exception dans toute l'Afrique et dans le monde.",
  );

  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <Portfolio />
      <Team />
      <Testimonials />
      <CTA />
      <Pricing />
      <FAQ />
      <Contact />
    </>
  );
}
