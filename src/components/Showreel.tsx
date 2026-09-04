import { motion } from "framer-motion";
import { FaPlay, FaClapperboard, FaWandMagicSparkles, FaBullseye } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";

export default function Showreel() {
  return (
    <section id="showreel" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-[70rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,122,24,0.06),transparent_65%)]" />

      <SectionHeading
        tag="Showreel"
        title="Le studio en mouvement"
        subtitle="Un aperçu cinématique de notre univers créatif et de nos derniers projets livrés."
      />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="group relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-black shadow-[0_40px_120px_-50px_rgba(0,0,0,0.9)]"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          poster="/images/hero-bg.webp"
          className="aspect-video w-full object-cover"
        >
          <source src="/videos/showreel.mp4" type="video/mp4" />
          Votre navigateur ne prend pas en charge la vidéo.
        </video>

        {/* top overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-2xl">
            <FaClapperboard className="h-3.5 w-3.5 text-cyan-200" />
            Showreel 2026
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs text-white/70 backdrop-blur-2xl">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" /> Rec
          </span>
        </div>

        <div className="pointer-events-none absolute bottom-5 left-5 right-5">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg">
              <FaPlay className="ml-0.5" />
            </span>
            <div>
              <div className="text-sm font-bold text-white">Découvrez nos projets</div>
              <div className="text-xs text-white/55">Sites · Applications · SaaS · Branding</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { Icon: FaBullseye, label: "Précision", text: "Chaque pixel pensé pour la conversion et la performance." },
          { Icon: FaWandMagicSparkles, label: "Créativité", text: "Design, motion & storytelling au service de votre marque." },
          { Icon: FaClapperboard, label: "Excellence", text: "Un niveau de finition digne des studios internationaux." },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 * i }}
            className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-200/20 hover:bg-white/[0.06]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-cyan-100 ring-1 ring-white/10">
              <item.Icon className="h-5 w-5" />
            </span>
            <div>
              <div className="font-semibold text-white">{item.label}</div>
              <div className="mt-1 text-sm text-white/50">{item.text}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
