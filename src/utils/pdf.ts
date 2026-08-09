// ============================================================================
// Génération du devis en PDF (jsPDF)
// ----------------------------------------------------------------------------
// Produit un A4 de type facture : en-tête agence, infos client, lignes du
// devis, sous-total, remises, total (FCFA + EUR), validité et coordonnées.
// ============================================================================

import { jsPDF } from "jspdf";
import {
  AGENCY,
  DELIVERY_DEFINITION,
  MAINTENANCE_SCOPE,
  PAYMENT_TERMS,
  QUOTE_VALIDITY_DAYS,
  type DeadlineId,
  type DesignId,
  type HostingId,
  type MaintenanceId,
  type PagesId,
  type ProjectTypeId,
} from "../config/pricing";
import {
  buildQuoteNumber,
  formatEUR,
  formatFCFA,
  toEUR,
  type QuoteResult,
  type QuoteState,
} from "./quote";

const W = 210; // largeur A4 en mm
const ML = 16; // marge gauche
const MR = 16; // marge droite
const CW = W - ML - MR; // largeur utile

const BLACK: [number, number, number] = [22, 22, 22];
const GRAY: [number, number, number] = [110, 110, 110];
const ACCENT: [number, number, number] = [245, 245, 245];

function sectionTitle(doc: jsPDF, text: string, y: number): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...BLACK);
  doc.text(text.toUpperCase(), ML, y);
  return y + 5;
}

function divider(doc: jsPDF, y: number): number {
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.line(ML, y, W - MR, y);
  return y + 7;
}

export function downloadQuotePdf(s: QuoteState, r: QuoteResult, quoteNumber?: string) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const num = quoteNumber || buildQuoteNumber();
  let y = 44;

  // --- En-tête -------------------------------------------------------------
  doc.setFillColor(15, 15, 15);
  doc.rect(0, 0, W, 34, "F");
  doc.setFillColor(255, 255, 255);
  doc.circle(ML + 6, 17, 5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(15, 15, 15);
  doc.text("A", ML + 6, 19.5, { align: "center" });

  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  doc.text("Afrique NovaTech", ML + 15, 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(200, 200, 200);
  doc.text(AGENCY.tagline, ML + 15, 21.5);
  doc.text(`${AGENCY.address} · ${AGENCY.email} · ${AGENCY.phone}`, ML + 15, 26);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("DEVIS ESTIMATIF", W - MR, 16, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(200, 200, 200);
  doc.text(`N° ${num}`, W - MR, 21, { align: "right" });
  const validity = new Date();
  validity.setDate(validity.getDate() + QUOTE_VALIDITY_DAYS);
  doc.text(
    `Date : ${new Date().toLocaleDateString("fr-FR")} · Valable jusqu'au ${validity.toLocaleDateString("fr-FR")}`,
    W - MR,
    26,
    { align: "right" },
  );

  // --- Client ---------------------------------------------------------------
  y = sectionTitle(doc, "Adressé à", y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...BLACK);
  doc.text(s.name || "—", ML, y);
  y += 5;
  if (s.email) { doc.text(`Email : ${s.email}`, ML, y); y += 5; }
  if (s.phone) { doc.text(`Téléphone / WhatsApp : ${s.phone}`, ML, y); y += 5; }
  if (s.city) { doc.text(`Ville / Pays : ${s.city}`, ML, y); y += 5; }
  y = divider(doc, y + 2);

  // --- Lignes du devis --------------------------------------------------------
  y = sectionTitle(doc, "Détail du devis", y);
  let rowY = y;
  const colLabel = ML;
  const colAmt = W - MR - 32;
  const colAmt2 = W - MR;

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...GRAY);
  doc.text("Désignation", colLabel, rowY);
  doc.text("Montant", colAmt, rowY, { align: "right" });
  rowY += 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...BLACK);
  for (const line of r.lines) {
    const label = line.label.length > 55 ? line.label.slice(0, 53) + "…" : line.label;
    doc.text(label, colLabel, rowY);
    doc.text(formatFCFA(line.min), colAmt, rowY, { align: "right" });
    rowY += 5;
    if (line.detail) {
      doc.setFontSize(8);
      doc.setTextColor(...GRAY);
      doc.text(line.detail.slice(0, 60), colLabel, rowY);
      doc.setFontSize(9.5);
      doc.setTextColor(...BLACK);
      rowY += 5;
    }
  }

  y = rowY;
  y = divider(doc, y);

  // --- Sous-total, remises, total ---------------------------------------------
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text("Sous-total", colLabel, y);
  doc.setFont("helvetica", "bold");
  doc.text(formatFCFA(r.subtotal.min), colAmt, y, { align: "right" });
  y += 6;

  if (r.discountPct > 0) {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...GRAY);
    doc.text(
      `Remises : ${r.discountLabels.join(", ")} (${Math.round(r.discountPct * 100)}%)`,
      colLabel,
      y,
    );
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BLACK);
    doc.text(formatFCFA(r.subtotal.min), colAmt, y, { align: "right" });
    y += 6;
  }

  // Total encadré
  doc.setFillColor(...ACCENT);
  doc.roundedRect(ML, y - 5, CW, 16, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("ESTIMATION TOTALE", colLabel, y + 4);
  doc.text(
    `${formatFCFA(r.total.min)} – ${formatFCFA(r.total.max)}`,
    colAmt2,
    y + 4,
    { align: "right" },
  );
  doc.setFontSize(8.5);
  doc.setTextColor(...GRAY);
  doc.text(
    `soit ${formatEUR(toEUR(r.total.min))} – ${formatEUR(toEUR(r.total.max))}`,
    colAmt2,
    y + 8.5,
    { align: "right" },
  );
  y += 18;

  // --- Délai et conditions ------------------------------------------------------
  y = divider(doc, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...BLACK);
  doc.text(`Délai de livraison estimé : ${r.delivery.min} à ${r.delivery.max} semaines`, ML, y);
  y += 6;
  doc.text(
    `Cette estimation reste valable ${QUOTE_VALIDITY_DAYS} jours à compter de la date ci-dessus.`,
    ML,
    y,
  );
  y += 6;
  doc.text("Paiement : Mobile Money (MTN, Moov) ou virement acceptés.", ML, y);
  y += 8;

  // --- Modalités de paiement -----------------------------------------------------
  y = sectionTitle(doc, "Modalités de paiement", y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...BLACK);
  for (const term of PAYMENT_TERMS) {
    doc.text(`• ${term}`, ML, y);
    y += 6;
  }
  y += 1;
  doc.setFontSize(8);
  doc.setTextColor(...GRAY);
  doc.text(DELIVERY_DEFINITION, ML, y);
  y += 5;
  doc.setFontSize(9.5);
  doc.setTextColor(...BLACK);

  // --- Périmètre de la maintenance (si un plan est sélectionné) -------------------
  if (s.maintenance !== "none") {
    y += 2;
    y = sectionTitle(doc, "Périmètre de la maintenance", y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...GRAY);
    for (const line of MAINTENANCE_SCOPE) {
      doc.text(line, ML, y);
      y += 5;
    }
    doc.setFontSize(9.5);
    doc.setTextColor(...BLACK);
  }

  // --- Pied de page --------------------------------------------------------------
  doc.setFontSize(8);
  doc.setTextColor(...GRAY);
  doc.text(
    `${AGENCY.name} · ${AGENCY.email} · ${AGENCY.phone} · ${AGENCY.address}`,
    W / 2,
    287,
    { align: "center" },
  );

  doc.save(`devis-${num}.pdf`);
}

/** Types nécessaires au PDF (importés de la config). */
export type { DeadlineId, DesignId, HostingId, MaintenanceId, PagesId, ProjectTypeId };
