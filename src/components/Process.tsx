import { motion } from "framer-motion";
import { process } from "../data";
import SectionHeading from "./SectionHeading";

export default function Process() {
  return (
    <section id="process" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <SectionHeading
        tag="Notre Méthode"
        title="Un processus rodé, des résultats garantis"
        subtitle="Une grande équipe de développeurs derrière chaque projet pour livrer à temps, sans compromis."
      />

      <div className="relative grid gap-6 lg:grid-cols-4">
        <div className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent lg:block" />
        {process.map((p, i) => (
          <motion.div
            key={p.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-black text-black shadow-[0_0_60px_-15px_rgba(255,255,255,0.25)]">
              {p.step}
            </div>
            <h3 className="text-lg font-bold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
