import { motion } from "framer-motion";
import { projects } from "../data";
import SectionHeading from "./SectionHeading";
import { FaArrowUpRightFromSquare, FaCode, FaStar } from "react-icons/fa6";

export default function Portfolio() {
  return (
    <section id="projects" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[60rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,122,24,0.06),transparent_70%)]" />

      <SectionHeading
        tag="Réalisations"
        title="Des projets qui parlent d'eux-mêmes"
        subtitle="Quelques exemples de produits digitaux que nous avons conçus et lancés avec succès."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_30px_80px_-30px_rgba(125,227,255,0.35)]"
          >
            {/* image */}
            <div className="relative overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover opacity-90 grayscale-[35%] transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-2xl">
                {p.category}
              </span>
              <span className="absolute right-4 top-4 font-mono text-xs font-bold text-white/30 transition-colors duration-500 group-hover:text-cyan-200/70">
                /{String(i + 1).padStart(2, "0")}
              </span>

              {/* hover action */}
              <div className="absolute inset-x-0 bottom-0 flex translate-y-6 items-center justify-center gap-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-bold text-black shadow-lg transition-transform hover:scale-105"
                  >
                    <FaArrowUpRightFromSquare className="h-3 w-3" /> Voir le site
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-5 py-2 text-xs font-bold text-white backdrop-blur-xl transition-transform hover:scale-105"
                  >
                    <FaCode className="h-3 w-3" /> Code
                  </a>
                )}
              </div>
            </div>

            {/* body */}
            <div className="relative p-6">
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-cyan-400/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-50">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{p.desc}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-white/60 ring-1 ring-white/10">
                    <FaStar className="h-2.5 w-2.5 text-amber-200/50" />
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/30 transition-all duration-500 group-hover:gap-3 group-hover:text-cyan-200">
                Explorer le projet
                <FaArrowUpRightFromSquare className="h-3 w-3" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
