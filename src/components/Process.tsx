import { motion } from "framer-motion";
import { process } from "../data";
import SectionHeading from "./SectionHeading";
import { FaRoute, FaWandMagicSparkles, FaCode, FaRocket, FaArrowRight } from "react-icons/fa6";

const icons = [FaRoute, FaWandMagicSparkles, FaCode, FaRocket];

export default function Process() {
  return (
    <section id="process" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <SectionHeading
        tag="Notre Méthode"
        title="Un processus rodé, des résultats garantis"
        subtitle="Une grande équipe de développeurs derrière chaque projet pour livrer à temps, sans compromis."
      />

      <div className="relative grid gap-6 lg:grid-cols-4">
        {/* connecting line + traveling dot */}
        <div className="absolute left-0 right-0 top-[4.1rem] hidden h-px overflow-visible lg:block">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <motion.div
            animate={{ left: ["0%", "100%", "0%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_15px_4px_rgba(125,227,255,0.6)]"
          />
        </div>

        {process.map((p, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-7 backdrop-blur-xl transition-colors duration-500 hover:border-cyan-200/25"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative mb-5 flex items-center justify-between">
                <div className="relative flex h-14 w-14 items-center justify-center">
                  <div className="absolute inset-0 rounded-2xl bg-white/10 animate-pulse-glow" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-neutral-300 text-base font-black text-black shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <span className="font-mono text-sm font-bold tracking-widest text-white/15 transition-colors duration-500 group-hover:text-cyan-200/50">
                  {p.step}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{p.desc}</p>

              {i < process.length - 1 && (
                <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-wider text-white/25 transition-all duration-500 group-hover:gap-3 group-hover:text-cyan-200/60">
                  Étape suivante <FaArrowRight className="h-3 w-3" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
