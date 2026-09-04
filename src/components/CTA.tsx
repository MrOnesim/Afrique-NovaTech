import { motion } from "framer-motion";
import { FaArrowRight, FaPhone, FaEnvelope } from "react-icons/fa6";

export default function CTA() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative overflow-hidden rounded-[2.5rem] border border-white/12"
      >
        {/* Animated video backdrop */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-bg.webp"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        >
          <source src="/videos/showreel.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.55),rgba(5,5,5,0.75)_50%,rgba(5,5,5,0.9))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.12),transparent_60%)]" />

        {/* floating orbs */}
        <div className="absolute -left-20 top-10 h-48 w-48 animate-float rounded-full bg-cyan-400/15 blur-[90px]" />
        <div className="absolute -right-16 bottom-8 h-40 w-40 animate-float-slow rounded-full bg-orange-500/12 blur-[80px]" />

        <div className="relative grid gap-10 px-8 py-20 sm:px-14 sm:py-28 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="text-center lg:text-left">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/80 backdrop-blur-2xl">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
              Votre projet mérite le meilleur
            </span>
            <h2 className="mx-auto max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:mx-0">
              Prêt à <span className="shine-text [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]">transformer</span> votre vision en réalité&nbsp;?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-white/70 lg:mx-0">
              Rejoignez les entreprises qui font confiance à notre équipe pour bâtir leur présence digitale.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <a
              href="/#contact"
              className="group inline-flex items-center gap-2.5 rounded-2xl bg-white px-9 py-4 font-bold text-black shadow-[0_0_70px_-15px_rgba(255,255,255,0.35)] transition-all hover:scale-105 hover:shadow-[0_0_90px_-12px_rgba(125,227,255,0.5)]"
            >
              Démarrer maintenant
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:gracaonesim@gmail.com"
              className="inline-flex items-center gap-2 text-xs text-white/55 transition-colors hover:text-white"
            >
              <FaEnvelope className="text-cyan-200/80" /> gracaonesim@gmail.com
            </a>
            <a
              href="tel:+2290141969208"
              className="inline-flex items-center gap-2 text-xs text-white/55 transition-colors hover:text-white"
            >
              <FaPhone className="text-orange-200/80" /> +229 01 41 96 92 08
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
