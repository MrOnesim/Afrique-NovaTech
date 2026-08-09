// ============================================================================
// Gestion des leads (devis générés)
// ----------------------------------------------------------------------------
// Les leads sont stockés en localStorage (solution sans backend). Un export
// CSV permet de les récupérer et de les importer dans un CRM / Google Sheets.
// Si des variables EmailJS sont configurées, une copie est aussi envoyée par
// email à l'agence (à la soumission du formulaire de devis).
// ============================================================================

import emailjs from "@emailjs/browser";
import { AGENCY } from "../config/pricing";
import {
  buildSummaryText,
  formatRange,
  formatRangeEUR,
  toEUR,
  type QuoteResult,
  type QuoteState,
} from "./quote";

export interface Lead {
  id: string;
  createdAt: string;
  status: "nouveau" | "contacté" | "converti";
  quoteNumber: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  projectType: string;
  totalMin: number;
  totalMax: number;
  totalEUR: number;
  details: QuoteState;
}

const KEY = "adi_leads";

export function getLeads(): Lead[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as Lead[];
  } catch {
    return [];
  }
}

export function saveLead(s: QuoteState, r: QuoteResult, quoteNumber: string): Lead {
  const lead: Lead = {
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "nouveau",
    quoteNumber,
    name: s.name,
    email: s.email,
    phone: s.phone,
    city: s.city,
    projectType: s.projectType,
    totalMin: r.total.min,
    totalMax: r.total.max,
    totalEUR: toEUR(r.total.min),
    details: s,
  };
  const leads = getLeads();
  leads.unshift(lead);
  localStorage.setItem(KEY, JSON.stringify(leads));
  return lead;
}

export function updateLeadStatus(id: string, status: Lead["status"]) {
  const leads = getLeads().map((l) => (l.id === id ? { ...l, status } : l));
  localStorage.setItem(KEY, JSON.stringify(leads));
}

export function deleteLead(id: string) {
  const leads = getLeads().filter((l) => l.id !== id);
  localStorage.setItem(KEY, JSON.stringify(leads));
}

/** Vrai si les variables EmailJS sont configurées dans l'environnement. */
export function isEmailJsConfigured(): boolean {
  return Boolean(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  );
}

/** Envoie le lead par EmailJS si les variables sont configurées. Silencieux sinon. */
export async function sendLeadEmail(
  s: QuoteState,
  r: QuoteResult,
  quoteNumber: string,
): Promise<boolean> {
  if (!isEmailJsConfigured()) return false;
  const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  try {
    await emailjs.send(
      service,
      template,
      {
        quote_number: quoteNumber,
        to_name: AGENCY.name,
        to_email: AGENCY.email,
        from_name: s.name,
        from_email: s.email,
        phone: s.phone,
        city: s.city,
        project_type: s.projectType,
        estimation: formatRange(r.total.min, r.total.max),
        estimation_eur: formatRangeEUR(r.total.min, r.total.max),
        delivery_weeks: `${r.delivery.min}–${r.delivery.max}`,
        message: buildSummaryText(s, r),
      },
      publicKey,
    );
    return true;
  } catch {
    return false;
  }
}

/** Export CSV des leads (séparateur ; pour Excel / Google Sheets). */
export function exportLeadsCsv(): string {
  const leads = getLeads();
  const header = [
    "N° devis",
    "Date",
    "Statut",
    "Nom",
    "Email",
    "Téléphone",
    "Ville/Pays",
    "Type de projet",
    "Estimation min (FCFA)",
    "Estimation max (FCFA)",
    "Estimation (EUR)",
  ];
  const rows = leads.map((l) => [
    l.quoteNumber || "",
    new Date(l.createdAt).toLocaleString("fr-FR"),
    l.status,
    l.name,
    l.email,
    l.phone,
    l.city,
    l.projectType,
    String(l.totalMin),
    String(l.totalMax),
    String(Math.round(l.totalEUR)),
  ]);
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  return [header, ...rows].map((r) => r.map(esc).join(";")).join("\n");
}
