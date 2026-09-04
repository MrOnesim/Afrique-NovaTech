import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "../data";
import SectionHeading from "./SectionHeading";
import { cn } from "../utils/cn";
import { FaPlus, FaCircleQuestion } from "react-icons/fa6";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative z-10 mx-auto max-w-3xl px-6 py-28">
      <SectionHeading tag="FAQ" title="Questions fréquentes" />

      <div className="space-y-4">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-button-${i}`;
          return (
            <div key={f.q} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:border-cyan-200/20 hover:bg-white/[0.06]">
              <h3>
                <button
                  id={buttonId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-cyan-100/60 ring-1 ring-white/10 transition-all duration-500 group-hover:bg-cyan-400/10 group-hover:text-cyan-100 group-hover:ring-cyan-200/30">
                    <FaCircleQuestion className="h-4 w-4" />
                  </span>
                  <span className="flex-1 font-semibold text-white/90">{f.q}</span>
                  <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs transition-all duration-500 group-hover:bg-white/15", isOpen && "rotate-45 bg-cyan-400/20 text-cyan-100")}>
                    <FaPlus />
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-white/55">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
