import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pricing } from "../data";
import { cn } from "../utils/cn";
import SectionHeading from "./SectionHeading";

type Currency = "EUR" | "FCFA";

export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>("EUR");

  return (
    <section id="pricing" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <SectionHeading
        tag="Nos Offres"
        title="Des formules pour chaque ambition"
        subtitle="Des prix clairs, des livrables concrets. Chaque projet peut être ajusté selon vos besoins."
      />

      {/* Currency toggle */}
      <div className="mb-14 flex justify-center">
        <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-xl">
          {(["EUR", "FCFA"] as Currency[]).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={cn(
                "relative rounded-xl px-8 py-2.5 text-sm font-semibold transition-all duration-300",
                currency === c
                  ? "bg-white text-black shadow-[0_0_30px_-8px_rgba(255,255,255,0.4)]"
                  : "text-white/50 hover:text-white"
              )}
            >
              {c === "EUR" ? "€ Euro" : "FCFA"}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
        {pricing.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className={cn(
              "relative flex flex-col rounded-3xl p-8 transition-all duration-300",
              p.highlight
                ? "bg-white text-black shadow-[0_0_80px_-10px_rgba(255,255,255,0.3)] lg:-translate-y-5"
                : "glow-card border border-white/10 bg-white/[0.04] text-white backdrop-blur-xl hover:bg-white/[0.06]"
            )}
          >
            {/* Badge */}
            {p.badge && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black px-5 py-1.5 text-xs font-bold text-white ring-1 ring-white/20">
                {p.badge}
              </span>
            )}

            {/* Header */}
            <div className="flex items-center gap-3">
              <span className={cn(
                "flex h-11 w-11 items-center justify-center rounded-2xl text-xl",
                p.highlight ? "bg-black/10" : "bg-white/10"
              )}>
                {p.icon}
              </span>
              <div>
                <h3 className={cn("text-lg font-black", p.highlight ? "text-black" : "text-white")}>
                  {p.name}
                </h3>
                <p className={cn("text-xs", p.highlight ? "text-black/50" : "text-white/40")}>
                  {p.deliveryTime}
                </p>
              </div>
            </div>

            <p className={cn("mt-4 text-sm leading-relaxed", p.highlight ? "text-black/60" : "text-white/50")}>
              {p.desc}
            </p>

            {/* Price */}
            <div className={cn("mt-7 rounded-2xl p-5", p.highlight ? "bg-black/5" : "bg-white/5")}>
              <p className={cn("text-xs font-medium uppercase tracking-widest", p.highlight ? "text-black/40" : "text-white/35")}>
                {currency === "EUR" ? p.periodEUR : p.periodFCFA}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currency}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-1"
                >
                  {currency === "EUR" ? (
                    <div className={cn("text-4xl font-black tracking-tight", p.highlight ? "text-black" : "text-white")}>
                      {p.priceEUR}
                    </div>
                  ) : (
                    <div className={cn("text-3xl font-black tracking-tight", p.highlight ? "text-black" : "text-white")}>
                      {p.priceFCFA}
                    </div>
                  )}
                  <p className={cn("mt-1 text-xs", p.highlight ? "text-black/40" : "text-white/30")}>
                    {currency === "EUR"
                      ? `≈ ${p.priceFCFA}`
                      : `≈ ${p.priceEUR}`}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className={cn("my-6 h-px", p.highlight ? "bg-black/10" : "bg-white/10")} />

            {/* Features */}
            <ul className="flex-1 space-y-3">
              {p.features.map((f) => (
                <li
                  key={f.label}
                  className={cn(
                    "flex items-start gap-3 text-sm",
                    f.included
                      ? p.highlight ? "text-black/80" : "text-white/75"
                      : p.highlight ? "text-black/25 line-through" : "text-white/20 line-through"
                  )}
                >
                  <span className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                    f.included
                      ? p.highlight
                        ? "bg-black text-white"
                        : "bg-white/15 text-white"
                      : p.highlight
                        ? "bg-black/10 text-black/30"
                        : "bg-white/5 text-white/20"
                  )}>
                    {f.included ? "✓" : "✕"}
                  </span>
                  {f.label}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="/#contact"
              className={cn(
                "mt-8 inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 font-bold transition-all hover:scale-105 hover:gap-3",
                p.highlight
                  ? "bg-black text-white shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
                  : "bg-white text-black shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)]"
              )}
            >
              Démarrer ce projet
              <span>→</span>
            </a>

            <p className={cn("mt-3 text-center text-xs", p.highlight ? "text-black/35" : "text-white/25")}>
              Paiement échelonné disponible · Mobile Money accepté
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-14 rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-8 backdrop-blur-xl"
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: "💳",
              title: "Paiement flexible",
              desc: "Règlement en 2 ou 3 fois selon les jalons du projet. Virement, carte bancaire ou Mobile Money (Wave, Orange Money, MTN).",
            },
            {
              icon: "📋",
              title: "Devis gratuit sous 24h",
              desc: "Parlez-nous de votre projet, nous vous répondons avec une estimation détaillée et sans engagement dans la journée.",
            },
            {
              icon: "🔒",
              title: "Prix garantis",
              desc: "Le prix convenu dans le devis est fixe. Aucune surprise, aucune facturation cachée. Transparence totale du début à la fin.",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">
                {item.icon}
              </span>
              <div>
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-white/45">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
