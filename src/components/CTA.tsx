import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[2.5rem] border border-white/10"
      >
        <img src="/images/hero-bg.webp" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="relative px-8 py-20 text-center sm:py-28">
          <h2 className="mx-auto max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            Prêt à <span className="shine-text [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]">transformer</span> votre vision en réalité&nbsp;?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/70">
            Rejoignez les entreprises qui font confiance à notre équipe pour bâtir leur présence digitale.
          </p>
          <a
            href="/#contact"
            className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-9 py-4 font-semibold text-black shadow-[0_0_60px_-15px_rgba(255,255,255,0.25)] transition-transform hover:scale-105"
          >
            Démarrer maintenant <span>→</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
