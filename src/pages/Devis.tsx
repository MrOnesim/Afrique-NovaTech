import QuoteWizard from "../components/quote/QuoteWizard";
import PageHeader from "../components/PageHeader";
import { AGENCY } from "../config/pricing";
import { usePageMeta } from "../hooks/usePageMeta";
import { motion } from "framer-motion";
import { FaStopwatch, FaComments, FaHandshake, FaShieldHalved, FaBolt } from "react-icons/fa6";

export default function Devis() {
  usePageMeta(
    "Devis en ligne gratuit — Afrique NovaTech",
    "Calculez le prix de votre site web, application ou SaaS en 2 minutes. Estimation instantanée en FCFA et EUR, sans engagement.",
  );

  const reassure = [
    {
      Icon: FaStopwatch,
      color: "text-cyan-200",
      title: "Estimation en temps réel",
      desc: "Le prix se met à jour à chaque choix.",
    },
    {
      Icon: FaComments,
      color: "text-emerald-300",
      title: "Réponse sous 24h",
      desc: "Via WhatsApp, email ou téléphone.",
    },
    {
      Icon: FaHandshake,
      color: "text-orange-200",
      title: "Sans engagement",
      desc: `Basé à ${AGENCY.address}.`,
    },
  ];

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-28">
      {/* ambiance */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-72 max-w-4xl bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_70%)]" />

      <PageHeader
        tag="Devis en ligne"
        title="Calculez votre projet en 2 minutes"
        subtitle="Répondez aux questions, obtenez une estimation instantanée en FCFA et en EUR, puis recevez votre devis détaillé. Sans engagement."
        center
      />

      <div className="mx-auto mt-12 max-w-xl">
        <div className="mb-6 flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-xs text-white/55 backdrop-blur-xl">
          <FaBolt className="h-3.5 w-3.5 text-cyan-200" />
          <span>7 étapes simples — <strong className="text-white">sans inscription</strong> ni paiement.</span>
        </div>
      </div>

      <QuoteWizard />

      {/* Réassurance */}
      <div className="mx-auto mt-12 grid max-w-3xl gap-4 text-center sm:grid-cols-3">
        {reassure.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-200/20 hover:bg-white/[0.06]"
          >
            <item.Icon className={`mx-auto mb-2 h-6 w-6 ${item.color}`} />
            <div className="text-sm font-bold text-white">{item.title}</div>
            <div className="mt-1 text-xs text-white/45">{item.desc}</div>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 flex items-center justify-center gap-2 text-center text-[11px] text-white/30">
        <FaShieldHalved className="h-3 w-3" />
        Données protégées — jamais partagées avec des tiers.
      </p>
    </div>
  );
}
