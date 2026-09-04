import { AGENCY, PAYMENT_TERMS, QUOTE_VALIDITY_DAYS } from "../../config/pricing";
import {
  buildMailtoLink,
  buildWhatsAppLink,
  formatFCFA,
  formatRange,
  formatRangeEUR,
  type QuoteResult,
  type QuoteState,
} from "../../utils/quote";
import {
  FaWhatsapp,
  FaEnvelope,
  FaFileArrowDown,
  FaCheck,
  FaReceipt,
  FaClock,
  FaCalendarCheck,
  FaCreditCard,
} from "react-icons/fa6";

export default function QuoteSummary({
  state,
  result,
  quoteNumber,
}: {
  state: QuoteState;
  result: QuoteResult;
  quoteNumber?: string;
}) {
  const validity = new Date();
  validity.setDate(validity.getDate() + QUOTE_VALIDITY_DAYS);

  const handleDownloadPdf = async () => {
    const { downloadQuotePdf } = await import("../../utils/pdf");
    downloadQuotePdf(state, result, quoteNumber);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-400/8 blur-2xl" />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="inline-flex items-center gap-2 text-base font-bold text-white">
            <FaReceipt className="h-4 w-4 text-cyan-200" />
            Récapitulatif du devis
          </h3>
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_25px_-6px_rgba(125,227,255,0.6)]"
          >
            <FaFileArrowDown className="h-3 w-3" /> PDF
          </button>
        </div>

        {/* Lignes du devis */}
        <div className="mt-5 space-y-2">
          {result.lines.map((l, i) => (
            <div key={i} className="flex items-start justify-between gap-3 text-sm">
              <div className="min-w-0">
                <span className="text-white/85">{l.label}</span>
                {l.detail && (
                  <span className="block text-xs text-white/40">{l.detail}</span>
                )}
              </div>
              <span className="shrink-0 font-semibold text-white/70">{formatFCFA(l.min)}</span>
            </div>
          ))}
        </div>

        <div className="my-4 border-t border-white/10" />

        {/* Remises */}
        {result.discountPct > 0 && (
          <div className="mb-4 rounded-xl bg-emerald-500/10 p-3 text-sm ring-1 ring-emerald-500/20">
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
              <FaCheck className="h-3 w-3" /> Remise {Math.round(result.discountPct * 100)}% appliquée
            </span>
            <span className="mt-0.5 block text-xs text-emerald-300/70">
              {result.discountLabels.join(" · ")}
            </span>
          </div>
        )}

        {/* Total */}
        <div className="relative overflow-hidden rounded-xl bg-white p-4 text-black">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" />
          <div className="relative">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-black/50">
              Estimation totale
            </div>
            <div className="mt-1 text-xl font-black leading-tight">
              {formatRange(result.total.min, result.total.max)}
            </div>
            <div className="mt-0.5 text-sm text-black/50">
              {formatRangeEUR(result.total.min, result.total.max)}
            </div>
          </div>
        </div>

        {/* Délai + validité */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <FaClock className="h-3 w-3" /> Délai estimé
            </div>
            <div className="mt-0.5 font-semibold text-white">
              {result.delivery.min}–{result.delivery.max} semaines
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <FaCalendarCheck className="h-3 w-3" /> Offre valable
            </div>
            <div className="mt-0.5 font-semibold text-white">
              {validity.toLocaleDateString("fr-FR")}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
            <FaCreditCard className="h-3 w-3" /> Modalités de paiement
          </div>
          <div className="mt-1 space-y-0.5 text-white/70">
            {PAYMENT_TERMS.map((t) => (
              <div key={t}>• {t}</div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <a
            href={buildWhatsAppLink(state, result)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:bg-emerald-400 hover:shadow-[0_0_35px_-8px_rgba(16,185,129,0.7)]"
          >
            <FaWhatsapp className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href={buildMailtoLink(state, result)}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <FaEnvelope className="h-3.5 w-3.5" /> Email
          </a>
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:col-span-2"
          >
            <FaFileArrowDown className="h-3.5 w-3.5" /> Télécharger le devis (PDF)
          </button>
        </div>

        <p className="mt-4 text-center text-[10px] leading-relaxed text-white/30">
          Devis estimatif, non contractuel. {AGENCY.name} · {AGENCY.email}
        </p>
      </div>
    </div>
  );
}
