import { motion } from "framer-motion";
import { testimonials } from "../data";
import SectionHeading from "./SectionHeading";
import { FaQuoteLeft, FaStar } from "react-icons/fa6";

export default function Testimonials() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-[70rem] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05),transparent_65%)]" />

      <SectionHeading tag="Témoignages" title="Ils nous ont fait confiance" />

      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 backdrop-blur-xl transition-all duration-500 hover:border-cyan-200/25"
          >
            <div className="absolute -top-14 right-6 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-100 ring-1 ring-white/15 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                <FaQuoteLeft className="h-5 w-5" />
              </div>
              <div className="flex gap-1 text-sm text-amber-200/90">
                {Array.from({ length: 5 }).map((_, j) => (
                  <FaStar key={j} />
                ))}
              </div>
            </div>

            <blockquote className="flex-1 text-sm leading-relaxed text-white/70">“{t.quote}”</blockquote>

            <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-white to-neutral-300 text-sm font-black text-black shadow-[0_0_30px_-8px_rgba(255,255,255,0.4)]">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <div>
                <div className="text-sm font-semibold text-white">{t.name}</div>
                <div className="text-xs text-white/45">{t.title}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
