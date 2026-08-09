// ============================================================================
// Moteur de calcul du devis
// ----------------------------------------------------------------------------
// Toutes les valeurs sont manipulées en FCFA (XOF), puis converties en EUR
// pour l'affichage. Le calcul produit une fourchette min/max.
// ============================================================================

import {
  AGENCY,
  DEADLINES,
  DESIGN_LEVELS,
  DISCOUNT_RULES,
  DOMAIN_PRICE,
  FEATURES,
  FX_RATE_EUR,
  HOSTING_PLANS,
  MAINTENANCE_PLANS,
  MAX_DISCOUNT,
  PAGE_RANGES,
  PROJECT_TYPES,
  SEO_EXTRAS,
  SEO_OPTIONS,
  type DeadlineId,
  type DesignId,
  type HostingId,
  type MaintenanceId,
  type PagesId,
  type ProjectTypeId,
  type SeoId,
} from "../config/pricing";

// ---------------------------------------------------------------------------
// Types de l'état du wizard
// ---------------------------------------------------------------------------
export interface QuoteState {
  projectType: ProjectTypeId;
  pages: PagesId;
  design: DesignId;
  features: string[];
  seo: SeoId;
  contentPages: number;
  analytics: boolean;
  copywriting: boolean;
  domain: boolean;
  hosting: HostingId;
  maintenance: MaintenanceId;
  deadline: DeadlineId;
  // Coordonnées (étape 7)
  name: string;
  phone: string;
  email: string;
  city: string;
}

export const INITIAL_STATE: QuoteState = {
  projectType: "vitrine",
  pages: "1-3",
  design: "standard",
  features: [],
  seo: "none",
  contentPages: 0,
  analytics: false,
  copywriting: false,
  domain: true,
  hosting: "vps",
  maintenance: "corrective",
  deadline: "standard",
  name: "",
  phone: "",
  email: "",
  city: "",
};

// ---------------------------------------------------------------------------
// Résultat du calcul
// ---------------------------------------------------------------------------
export interface QuoteLine {
  label: string;
  detail?: string;
  min: number;
  max: number;
}

export interface QuoteResult {
  lines: QuoteLine[];
  discountPct: number;
  discountLabels: string[];
  subtotal: { min: number; max: number };
  total: { min: number; max: number };
  delivery: { min: number; max: number }; // en semaines
  isValid: boolean;
}

/** Nombre de pages effectives (déduit de la fourchette choisie). */
export function effectivePages(id: PagesId): number {
  switch (id) {
    case "1-3": return 3;
    case "4-8": return 8;
    case "9-15": return 15;
    case "15+": return 20;
    default: return 0;
  }
}

/** Calcule le devis complet à partir de l'état du wizard. */
export function calculateQuote(s: QuoteState): QuoteResult {
  const project = PROJECT_TYPES.find((p) => p.id === s.projectType)!;
  const pages = PAGE_RANGES.find((p) => p.id === s.pages)!;
  const design = DESIGN_LEVELS.find((d) => d.id === s.design)!;
  const seo = SEO_OPTIONS.find((o) => o.id === s.seo)!;
  const deadline = DEADLINES.find((d) => d.id === s.deadline)!;
  const hosting = HOSTING_PLANS.find((h) => h.id === s.hosting)!;
  const maintenance = MAINTENANCE_PLANS.find((m) => m.id === s.maintenance)!;
  const selectedFeatures = FEATURES.filter((f) => s.features.includes(f.id));

  const lines: QuoteLine[] = [];

  // 1. Prix de base (multiplié par le niveau de design)
  const baseMin = Math.round(project.price.min * design.multiplier);
  const baseMax = Math.round(project.price.max * design.multiplier);
  lines.push({
    label: `${project.icon} ${project.label}`,
    detail: design.label !== "standard" ? `Design ${design.label.toLowerCase()}` : undefined,
    min: baseMin,
    max: baseMax,
  });

  // 2. Nombre de pages
  if (pages.increment > 0) {
    lines.push({
      label: `Envergure — ${pages.label}`,
      min: pages.increment,
      max: pages.increment,
    });
  }

  // 3. Fonctionnalités additionnelles
  for (const f of selectedFeatures) {
    lines.push({
      label: `${f.icon} ${f.label}`,
      min: f.price,
      max: f.price,
    });
  }

  // 4. SEO & marketing
  if (seo.price > 0) {
    lines.push({
      label: `🔍 ${seo.label}`,
      detail: seo.desc,
      min: seo.price,
      max: seo.price,
    });
  }
  if (s.contentPages > 0) {
    const content = SEO_EXTRAS[0]!;
    const amount = content.pricePerUnit! * s.contentPages;
    lines.push({
      label: `✍️ ${content.label}`,
      detail: `${s.contentPages} page${s.contentPages > 1 ? "s" : ""} × ${content.pricePerUnit!.toLocaleString("fr-FR")} FCFA`,
      min: amount,
      max: amount,
    });
  }
  if (s.analytics) {
    const a = SEO_EXTRAS[1]!;
    lines.push({ label: `📈 ${a.label}`, min: a.price!, max: a.price! });
  }
  if (s.copywriting) {
    const c = SEO_EXTRAS[2]!;
    lines.push({ label: `🎯 ${c.label}`, min: c.price!, max: c.price! });
  }

  // 5. Hébergement & maintenance (facturés à l'année)
  if (s.domain) {
    lines.push({
      label: `🌐 Nom de domaine (1 an)`,
      min: DOMAIN_PRICE,
      max: DOMAIN_PRICE,
    });
  }
  if (hosting.monthly > 0) {
    lines.push({
      label: `🖥️ ${hosting.label}`,
      detail: `${hosting.monthly.toLocaleString("fr-FR")} FCFA/mois × 12`,
      min: hosting.monthly * 12,
      max: hosting.monthly * 12,
    });
  }
  if (maintenance.price.max > 0) {
    lines.push({
      label: `🛠️ ${maintenance.label}`,
      detail: `${formatFCFA(maintenance.price.min)}–${formatFCFA(maintenance.price.max)} /mois × 12`,
      min: maintenance.price.min * 12,
      max: maintenance.price.max * 12,
    });
  }

  // Sous-total avant remises et délai
  const sum = (key: "min" | "max") => lines.reduce((acc, l) => acc + l[key], 0);
  let subtotalMin = sum("min");
  let subtotalMax = sum("max");

  // Remises combinées
  let discountPct = 0;
  const discountLabels: string[] = [];
  for (const rule of DISCOUNT_RULES) {
    if (rule.applies(s as never)) {
      discountPct += rule.percent;
      discountLabels.push(rule.label);
    }
  }
  discountPct = Math.min(discountPct, MAX_DISCOUNT);
  subtotalMin = Math.round(subtotalMin * (1 - discountPct));
  subtotalMax = Math.round(subtotalMax * (1 - discountPct));

  // Multiplicateur délai
  const totalMin = Math.round(subtotalMin * deadline.multiplier);
  const totalMax = Math.round(subtotalMax * deadline.multiplier);

  // Estimation du délai en semaines
  const featureWeeks = Math.round((selectedFeatures.length * 0.5) * 10) / 10;
  let delMin = project.weeks.min + pages.extraWeeks + featureWeeks;
  let delMax = project.weeks.max + pages.extraWeeks + featureWeeks;
  if (s.deadline === "urgent") { delMin *= 0.6; delMax *= 0.6; }
  if (s.deadline === "flexible") { delMin *= 1.2; delMax *= 1.2; }
  delMin = Math.max(1, Math.round(delMin));
  delMax = Math.max(delMin, Math.round(delMax));

  return {
    lines,
    discountPct,
    discountLabels,
    subtotal: { min: subtotalMin, max: subtotalMax },
    total: { min: totalMin, max: totalMax },
    delivery: { min: delMin, max: delMax },
    isValid: s.name.trim() !== "" && s.email.trim() !== "" && s.phone.trim() !== "",
  };
}

// ---------------------------------------------------------------------------
// Formatage
// ---------------------------------------------------------------------------
const nf = new Intl.NumberFormat("fr-FR");

/** 1 200 000 FCFA */
export function formatFCFA(n: number): string {
  return `${nf.format(n)} FCFA`;
}

/** 1 829 € */
export function formatEUR(n: number): string {
  return `${nf.format(Math.round(n))} €`;
}

/** Convertit un montant FCFA en EUR. */
export function toEUR(fcfa: number): number {
  return fcfa / FX_RATE_EUR;
}

/** Range formaté : "1 200 000 – 1 800 000 FCFA". */
export function formatRange(min: number, max: number): string {
  if (min === max) return formatFCFA(min);
  return `${nf.format(min)} – ${nf.format(max)} FCFA`;
}

export function formatRangeEUR(min: number, max: number): string {
  if (min === max) return formatEUR(toEUR(min));
  return `${nf.format(Math.round(toEUR(min)))} – ${nf.format(Math.round(toEUR(max)))} €`;
}

// ---------------------------------------------------------------------------
// Liens d'action (WhatsApp / Email)
// ---------------------------------------------------------------------------

/** Résumé texte du devis pour WhatsApp / Email. */
export function buildSummaryText(s: QuoteState, r: QuoteResult): string {
  const p = PROJECT_TYPES.find((x) => x.id === s.projectType)!.label;
  const d = DEADLINES.find((x) => x.id === s.deadline)!.label;
  const lines = [
    `*Demande de devis — Afrique NovaTech*`,
    ``,
    `Projet : ${p}`,
    `Envergure : ${PAGE_RANGES.find((x) => x.id === s.pages)!.label} · Design ${DESIGN_LEVELS.find((x) => x.id === s.design)!.label}`,
    `Fonctionnalités : ${s.features.length ? s.features.map((f) => FEATURES.find((x) => x.id === f)!.label).join(", ") : "Aucune"}`,
    `Délai : ${d}`,
    ``,
    `*Estimation : ${formatRange(r.total.min, r.total.max)}*`,
    `(${formatRangeEUR(r.total.min, r.total.max)})`,
    `Délai de livraison estimé : ${r.delivery.min}–${r.delivery.max} semaines`,
  ];
  if (s.name) lines.push(`\nNom : ${s.name}`);
  if (s.city) lines.push(`Ville / Pays : ${s.city}`);
  return lines.join("\n");
}

/** Lien WhatsApp pré-rempli avec le récapitulatif. */
export function buildWhatsAppLink(s: QuoteState, r: QuoteResult): string {
  const text = encodeURIComponent(buildSummaryText(s, r));
  return `https://wa.me/${AGENCY.whatsapp}?text=${text}`;
}

/** Lien mailto pré-rempli avec le récapitulatif. */
export function buildMailtoLink(s: QuoteState, r: QuoteResult): string {
  const subject = encodeURIComponent(`Demande de devis — ${s.name || "Projet"}`);
  const body = encodeURIComponent(buildSummaryText(s, r));
  return `mailto:${AGENCY.email}?subject=${subject}&body=${body}`;
}

/** Numéro de devis stable (ex: DEV-2026-0001).
 * Incrément journalier persistant dans le navigateur : chaque devis généré a
 * un numéro unique et croissant. À générer UNE fois par session (ex: useMemo). */
export function buildQuoteNumber(): string {
  const now = new Date();
  const y = now.getFullYear();
  const dayKey = `adi_quote_counter_${y}`;
  let count = 0;
  try {
    count = parseInt(localStorage.getItem(dayKey) || "0", 10) || 0;
  } catch {
    /* localStorage indisponible : on retombe sur un numéro horodaté */
  }
  count += 1;
  try {
    localStorage.setItem(dayKey, String(count));
  } catch {
    /* ignore */
  }
  return `DEV-${y}-${String(count).padStart(4, "0")}`;
}
