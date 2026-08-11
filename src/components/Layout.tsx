import { ReactNode } from "react";
import AnimatedBackground from "./AnimatedBackground";
import ScrollProgress from "./ScrollProgress";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import CookieConsent from "./CookieConsent";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        Aller au contenu principal
      </a>
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar />
      <main id="contenu" className="relative">{children}</main>
      <Footer />
      <BackToTop />
      <CookieConsent />
    </div>
  );
}
