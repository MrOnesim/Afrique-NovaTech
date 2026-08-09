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
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white">Récapitulatif du devis</h3>
        <button
          type="button"
          onClick={handleDownloadPdf}
          className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black transition-transform hover:scale-105"
        >
          ⬇ Télécharger PDF
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
            <span className="shrink-0 text-white/70">{formatFCFA(l.min)}</span>
          </div>
        ))}
      </div>

      <div className="my-4 border-t border-white/10" />

      {/* Remises */}
      {result.discountPct > 0 && (
        <div className="mb-4 rounded-xl bg-emerald-500/10 p-3 text-sm ring-1 ring-emerald-500/20">
          <span className="font-semibold text-emerald-400">
            Remise {Math.round(result.discountPct * 100)}% appliquée
          </span>
          <span className="mt-0.5 block text-xs text-emerald-300/70">
            {result.discountLabels.join(" · ")}
          </span>
        </div>
      )}

      {/* Total */}
      <div className="rounded-xl bg-white p-4 text-black">
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

      {/* Délai + validité */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <div className="text-xs text-white/40">Délai estimé</div>
          <div className="mt-0.5 font-semibold text-white">
            {result.delivery.min}–{result.delivery.max} semaines
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <div className="text-xs text-white/40">Offre valable</div>
          <div className="mt-0.5 font-semibold text-white">
            {validity.toLocaleDateString("fr-FR")}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
          Modalités de paiement
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
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3a16 16 0 0 0 3.8 3.1 16 16 0 0 0 1.7.7c.7.3 1.3.2 1.7.1.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1l-.5-.5Z" />
          </svg>
          Discuter sur WhatsApp
        </a>
        <a
          href={buildMailtoLink(state, result)}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          ✉️ Envoyer par email
        </a>
        <button
          type="button"
          onClick={handleDownloadPdf}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:col-span-2"
        >
          ⬇ Télécharger le devis (PDF)
        </button>
      </div>

      <p className="mt-4 text-center text-[10px] leading-relaxed text-white/30">
        Devis estimatif, non contractuel. {AGENCY.name} · {AGENCY.email}
      </p>
    </div>
  );
}
