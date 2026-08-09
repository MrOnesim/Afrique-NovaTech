import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";
import {
  buildQuoteNumber,
  calculateQuote,
  formatRange,
  formatRangeEUR,
  INITIAL_STATE,
  type QuoteState,
} from "../../utils/quote";
import { isEmailJsConfigured, saveLead, sendLeadEmail } from "../../utils/leads";
import QuoteSummary from "./QuoteSummary";
import {
  StepDeadline,
  StepFeatures,
  StepHosting,
  StepProjectType,
  StepScope,
  StepSeo,
} from "./QuoteSteps";
import { TextField } from "./ui";

const STEP_TITLES = [
  "Type de projet",
  "Envergure",
  "Fonctionnalités",
  "SEO & marketing",
  "Hébergement",
  "Délai",
  "Coordonnées",
];

const TOTAL_STEPS = STEP_TITLES.length;

export default function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<QuoteState>(INITIAL_STATE);
  const [quoteNumber] = useState(() => buildQuoteNumber());
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [formError, setFormError] = useState("");

  const result = useMemo(() => calculateQuote(state), [state]);

  const patch = (p: Partial<QuoteState>) => setState((prev) => ({ ...prev, ...p }));

  const canGoNext = step < TOTAL_STEPS - 1;
  const isLast = step === TOTAL_STEPS - 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result.isValid) {
      setFormError("Veuillez remplir au moins le nom, l'email et le téléphone.");
      return;
    }
    setFormError("");
    setSending(true);
    saveLead(state, result, quoteNumber);
    const sent = await sendLeadEmail(state, result, quoteNumber);
    setEmailSent(sent);
    setSending(false);
    setSubmitted(true);
  };

  // --- Écran de confirmation après soumission ---------------------------------
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-xl rounded-[2.5rem] border border-white/[0.12] bg-white/[0.06] p-8 text-center backdrop-blur-2xl sm:p-12"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl text-black">
          ✓
        </div>
        <h2 className="text-2xl font-black text-white">Demande envoyée !</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/55">
          Merci {state.name.split(" ")[0] || ""}. Votre demande de devis a bien été enregistrée.
          Notre équipe vous recontacte sous 24h au{" "}
          <strong className="text-white">{state.phone}</strong> ou par email.
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-white/60">
          <span className="font-semibold text-white">{quoteNumber}</span>
          <span>· devis référence</span>
        </div>
        {emailSent ? (
          <p role="status" aria-live="polite" className="mt-3 text-xs text-emerald-400">
            ✓ Votre devis a été transmis à notre équipe par email.
          </p>
        ) : isEmailJsConfigured() ? (
          <p role="status" aria-live="polite" className="mt-3 text-xs text-amber-400/80">
            La demande est enregistrée, mais l'envoi email n'a pas abouti. Contactez-nous
            directement via WhatsApp.
          </p>
        ) : (
          <p role="status" aria-live="polite" className="mt-3 text-xs text-white/40">
            Votre demande est bien enregistrée. Téléchargez le PDF ci-dessous pour la garder en
            référence.
          </p>
        )}
        <div className="mt-6">
          <QuoteSummary state={state} result={result} quoteNumber={quoteNumber} />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {/* Barre de progression */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs text-white/50">
          <span className="font-semibold text-white">
            Étape {step + 1} / {TOTAL_STEPS} — {STEP_TITLES[step]}
          </span>
          <span>~2 min</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-white"
            initial={false}
            animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Contenu de l'étape */}
        <div>
          <div className="rounded-[2rem] border border-white/[0.12] bg-white/[0.06] p-6 backdrop-blur-2xl sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
              >
                {step === 0 && <StepProjectType state={state} onChange={patch} />}
                {step === 1 && <StepScope state={state} onChange={patch} />}
                {step === 2 && <StepFeatures state={state} onChange={patch} />}
                {step === 3 && <StepSeo state={state} onChange={patch} />}
                {step === 4 && <StepHosting state={state} onChange={patch} />}
                {step === 5 && <StepDeadline state={state} onChange={patch} />}
                {step === 6 && (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
                        Vos coordonnées
                      </h3>
                      <p className="mt-1 text-xs text-white/40">
                        Pour recevoir votre devis détaillé par email et WhatsApp.
                      </p>
                    </div>
                    {formError && (
                      <div role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/20">
                        {formError}
                      </div>
                    )}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <TextField
                        label="Nom complet"
                        value={state.name}
                        onChange={(v) => patch({ name: v })}
                        placeholder="Votre nom"
                      />
                      <TextField
                        label="Téléphone / WhatsApp"
                        type="tel"
                        value={state.phone}
                        onChange={(v) => patch({ phone: v })}
                        placeholder="+229 XX XX XX XX"
                      />
                      <TextField
                        label="Email"
                        type="email"
                        value={state.email}
                        onChange={(v) => patch({ email: v })}
                        placeholder="vous@email.com"
                      />
                      <TextField
                        label="Ville / Pays"
                        value={state.city}
                        onChange={(v) => patch({ city: v })}
                        placeholder="Cotonou, Bénin"
                        required={false}
                      />
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/35">
                      En envoyant, vous acceptez d'être recontacté par notre équipe. Vos données ne
                      sont jamais partagées avec des tiers.
                    </p>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 disabled:opacity-30"
              >
                ← Retour
              </button>

              {canGoNext ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1))}
                  className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
                >
                  Continuer →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => (document.querySelector("form") as HTMLFormElement)?.requestSubmit()}
                  disabled={sending}
                  className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? "Envoi en cours…" : "Recevoir mon devis ✓"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Prix temps réel — sticky desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-3">
            <div className="rounded-2xl border border-white/[0.12] bg-white/[0.06] p-6 backdrop-blur-2xl">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Estimation temps réel
              </div>
              <div className="mt-2 text-2xl font-black leading-tight text-white">
                {formatRange(result.total.min, result.total.max)}
              </div>
              <div className="mt-1 text-sm text-white/50">
                {formatRangeEUR(result.total.min, result.total.max)}
              </div>
              <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-xs text-white/50">
                <div className="flex justify-between">
                  <span>Délai estimé</span>
                  <span className="font-semibold text-white">
                    {result.delivery.min}–{result.delivery.max} sem.
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Fonctionnalités</span>
                  <span className="font-semibold text-white">{state.features.length}</span>
                </div>
                {result.discountPct > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Remise appliquée</span>
                    <span className="font-semibold">-{Math.round(result.discountPct * 100)}%</span>
                  </div>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center text-xs text-white/40">
              💡 Prix mis à jour à chaque clic
            </div>
          </div>
        </aside>
      </div>

      {/* Prix temps réel — sticky mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0a0a0a]/90 p-3 backdrop-blur-2xl lg:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <div>
            <div className="text-[9px] uppercase tracking-wider text-white/40">
              Estimation
            </div>
            <div className={cn("text-sm font-black text-white")}>
              {formatRange(result.total.min, result.total.max)}
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              isLast
                ? (document.querySelector("form") as HTMLFormElement)?.requestSubmit()
                : setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1))
            }
            disabled={sending}
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-60"
          >
            {isLast ? (sending ? "Envoi…" : "Finaliser ✓") : "Continuer"}
          </button>
        </div>
      </div>
    </div>
  );
}
