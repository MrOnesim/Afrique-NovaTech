import { motion } from "framer-motion";
import { services } from "../data";
import SectionHeading from "./SectionHeading";
import { FaArrowRight, FaCode, FaPaintbrush, FaMeteor, FaRobot, FaCartShopping, FaMobileScreen } from "react-icons/fa6";

const iconMap: Record<string, React.ReactNode> = {
  "🌐": <FaCode />,
  "🛒": <FaCartShopping />,
  "📱": <FaMobileScreen />,
  "🎨": <FaPaintbrush />,
  "⚙️": <FaMeteor />,
  "🤖": <FaRobot />,
};

export default function Services() {
  return (
    <section id="services" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      {/* ambient section glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-80 max-w-4xl bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_70%)]" />

      <SectionHeading
        tag="Nos Services"
        title="Tout ce dont vous avez besoin pour briller en ligne"
        subtitle="Une offre complète, du concept au lancement, portée par une équipe pluridisciplinaire."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 backdrop-blur-2xl transition-colors duration-500 hover:border-cyan-200/25 hover:bg-white/[0.06]"
          >
            {/* hover shimmer */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 [background:radial-gradient(circle_at_80%_0%,rgba(125,227,255,0.14),transparent_55%)]" />
            <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-white/[0.05] blur-3xl transition-transform duration-700 group-hover:scale-150" />

            {/* top index */}
            <div className="absolute right-6 top-6 text-xs font-black tracking-widest text-white/15 transition-colors duration-500 group-hover:text-cyan-200/40">
              /{String(i + 1).padStart(2, "0")}
            </div>

            <div className="relative">
              <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
                <div className="absolute inset-0 animate-spin-slow rounded-2xl border border-dashed border-cyan-200/20 transition-colors duration-500 group-hover:border-cyan-200/50" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-white/15 to-white/5 text-xl text-cyan-100 ring-1 ring-white/15 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:text-cyan-50 group-hover:shadow-[0_0_30px_rgba(125,227,255,0.3)]">
                  {iconMap[s.icon] ?? s.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-50">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{s.desc}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60 ring-1 ring-white/10 transition-colors group-hover:ring-white/20">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/35 transition-all duration-500 group-hover:gap-3 group-hover:text-cyan-200">
                Découvrir
                <FaArrowRight className="h-3 w-3" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
