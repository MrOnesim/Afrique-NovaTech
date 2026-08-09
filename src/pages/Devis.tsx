import QuoteWizard from "../components/quote/QuoteWizard";
import { AGENCY } from "../config/pricing";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Devis() {
  usePageMeta(
    "Devis en ligne gratuit — Afrique NovaTech",
    "Calculez le prix de votre site web, application ou SaaS en 2 minutes. Estimation instantanée en FCFA et EUR, sans engagement.",
  );

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-28">
      {/* En-tête */}
      <div className="mb-10 text-center">
        <span className="mb-4 inline-block rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
          Devis en ligne
        </span>
        <h1 className="mx-auto max-w-2xl bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
          Calculez votre projet en 2 minutes
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-white/55">
          Répondez aux questions, obtenez une estimation instantanée en FCFA et en EUR, puis
          recevez votre devis détaillé. Sans engagement.
        </p>
      </div>

      <QuoteWizard />

      {/* Réassurance */}
      <div className="mx-auto mt-12 grid max-w-3xl gap-4 text-center text-xs text-white/40 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-1 text-lg">⏱️</div>
          Estimation en temps réel
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-1 text-lg">💬</div>
          Réponse sous 24h via WhatsApp
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-1 text-lg">🤝</div>
          Sans engagement — {AGENCY.address}
        </div>
      </div>
    </div>
  );
}
