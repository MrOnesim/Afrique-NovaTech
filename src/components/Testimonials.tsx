import { motion } from "framer-motion";
import { testimonials } from "../data";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <SectionHeading
        tag="Témoignages"
        title="Ils nous ont fait confiance"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
          >
            <div className="mb-4 text-3xl text-white/30">“</div>
            <blockquote className="flex-1 text-sm leading-relaxed text-white/70">{t.quote}</blockquote>
            <div className="mb-3 mt-6 flex gap-1 text-sm">
              {Array.from({ length: 5 }).map((_, j) => (
                <span key={j}>⭐</span>
              ))}
            </div>
            <figcaption className="flex items-center gap-3 border-t border-white/10 pt-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sm font-bold ring-1 ring-white/10">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-white/45">{t.title}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
