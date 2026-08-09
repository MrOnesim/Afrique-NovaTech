// ============================================================================
// GRILLE TARIFAIRE — Calculateur de devis Afrique NovaTech
// ----------------------------------------------------------------------------
// Toutes les valeurs sont en FCFA (XOF). Le calculateur lit ce fichier à
// chaque rendu : vous pouvez donc modifier les prix SANS toucher au code du
// composant.
//
//   • Taux de change : 1 EUR = 655.957 FCFA (parité fixe UEMOA)
//   • L'ID (id) de chaque option est utilisé par le moteur de calcul.
//     Ne changez PAS les id, uniquement les libellés et les prix.
//
// Exemple d'ajustement :
//   Site vitrine de 400 000 FCFA → remplacez { min: 300_000, max: 500_000 }
//   par { min: 400_000, max: 600_000 }.
// ============================================================================

/** Taux de conversion FCFA → EUR (parité fixe UEMOA). */
export const FX_RATE_EUR = 655.957;

// ---------------------------------------------------------------------------
// ÉTAPE 1 — Types de projet (prix de base, fourchette min/max)
// ---------------------------------------------------------------------------
export const PROJECT_TYPES = [
  {
    id: "landing",
    label: "Landing page",
    icon: "🚀",
    desc: "Page unique optimisée pour convertir vos visiteurs en clients.",
    price: { min: 150_000, max: 250_000 },
    weeks: { min: 1, max: 2 },
  },
  {
    id: "vitrine",
    label: "Site vitrine",
    icon: "🌐",
    desc: "Site institutionnel présentant vos activités, services et contacts.",
    price: { min: 300_000, max: 500_000 },
    weeks: { min: 2, max: 3 },
  },
  {
    id: "refonte",
    label: "Refonte de site existant",
    icon: "🔄",
    desc: "Modernisation complète de votre site actuel : design, perf, SEO.",
    price: { min: 200_000, max: 350_000 },
    weeks: { min: 1, max: 3 },
  },
  {
    id: "ecommerce",
    label: "Site e-commerce",
    icon: "🛒",
    desc: "Boutique en ligne complète avec catalogue, panier et paiement.",
    price: { min: 700_000, max: 1_200_000 },
    weeks: { min: 3, max: 6 },
  },
  {
    id: "webapp",
    label: "Application web",
    icon: "⚙️",
    desc: "Plateforme web métier : SaaS, dashboard, back-office, outil en ligne.",
    price: { min: 1_000_000, max: 2_000_000 },
    weeks: { min: 4, max: 8 },
  },
  {
    id: "mobile",
    label: "Application mobile",
    icon: "📱",
    desc: "Application iOS / Android (React Native) connectée à votre service.",
    price: { min: 2_000_000, max: 4_000_000 },
    weeks: { min: 6, max: 12 },
  },
];

// ---------------------------------------------------------------------------
// ÉTAPE 2 — Envergure / complexité
// ---------------------------------------------------------------------------

/** Nombre de pages — incrément fixe ajouté au prix de base. */
export const PAGE_RANGES = [
  { id: "1-3", label: "1 à 3 pages", increment: 0, extraWeeks: 0 },
  { id: "4-8", label: "4 à 8 pages", increment: 50_000, extraWeeks: 0.5 },
  { id: "9-15", label: "9 à 15 pages", increment: 100_000, extraWeeks: 1 },
  { id: "15+", label: "Plus de 15 pages", increment: 200_000, extraWeeks: 2 },
];

/** Niveau de design — multiplicateur appliqué au prix de base. */
export const DESIGN_LEVELS = [
  { id: "standard", label: "Standard", desc: "Design propre et fonctionnel.", multiplier: 1 },
  { id: "premium", label: "Premium", desc: "Animations, effets et finitions soignés.", multiplier: 1.3 },
  { id: "surmesure", label: "Sur-mesure", desc: "Identité visuelle unique, design system.", multiplier: 1.6 },
];

// ---------------------------------------------------------------------------
// ÉTAPE 3 — Fonctionnalités additionnelles (prix unitaires)
// ---------------------------------------------------------------------------
export const FEATURES = [
  { id: "multilingue", label: "Multilingue (FR / EN / langues locales)", icon: "🌍", price: 75_000 },
  { id: "payment", label: "Paiement en ligne (Mobile Money, carte)", icon: "💳", price: 150_000 },
  { id: "cms", label: "Blog / CMS intégré", icon: "✍️", price: 100_000 },
  { id: "auth", label: "Espace client / authentification", icon: "🔐", price: 150_000 },
  { id: "rdv", label: "Prise de rendez-vous en ligne", icon: "📅", price: 75_000 },
  { id: "chat", label: "Chat / support en direct", icon: "💬", price: 60_000 },
  { id: "social", label: "Intégration réseaux sociaux", icon: "📣", price: 30_000 },
  { id: "forms", label: "Formulaires avancés (conditionnels)", icon: "📋", price: 50_000 },
  { id: "dashboard", label: "Tableau de bord d'administration", icon: "📊", price: 200_000 },
];

// ---------------------------------------------------------------------------
// ÉTAPE 4 — SEO & marketing
// ---------------------------------------------------------------------------
export const SEO_OPTIONS = [
  { id: "none", label: "Pas de SEO", price: 0 },
  { id: "base", label: "SEO de base", desc: "Structure, balises, sitemap, vitesse.", price: 50_000 },
  { id: "avance", label: "SEO avancé", desc: "Technique, maillage, backlinks.", price: 150_000 },
];

export const SEO_EXTRAS = [
  { id: "content", label: "Rédaction de contenu", desc: "Prix par page rédigée.", pricePerUnit: 10_000, unit: "page" },
  { id: "analytics", label: "Google Analytics / Tag Manager", price: 30_000 },
  { id: "copywriting", label: "Copywriting persuasif", desc: "Ventes, pages clés.", price: 100_000 },
];

// ---------------------------------------------------------------------------
// ÉTAPE 5 — Hébergement & maintenance (prix mensuels, facturés à l'année)
// ---------------------------------------------------------------------------

/** Nom de domaine — forfait 1 an. */
export const DOMAIN_PRICE = 15_000;

export const HOSTING_PLANS = [
  { id: "none", label: "Pas d'hébergement", desc: "Je possède déjà un hébergement.", monthly: 0 },
  { id: "mutuel", label: "Hébergement mutuel", desc: "Bas trafic : site vitrine, landing.", monthly: 5_000 },
  { id: "vps", label: "Hébergement VPS", desc: "Moyen trafic : e-commerce, app web.", monthly: 15_000 },
  { id: "cloud", label: "Cloud dédié", desc: "Fort trafic : plateformes, SaaS.", monthly: 40_000 },
];

export const MAINTENANCE_PLANS = [
  { id: "none", label: "Pas de maintenance", desc: "Je gère moi-même.", price: { min: 0, max: 0 } },
  {
    id: "corrective",
    label: "Maintenance corrective",
    desc: "Bugs, mises à jour de sécurité, sauvegardes, monitoring.",
    price: { min: 25_000, max: 40_000 },
  },
  {
    id: "evolutive",
    label: "Maintenance évolutive",
    desc: "Corrective + nouvelles fonctionnalités.",
    price: { min: 50_000, max: 80_000 },
  },
];

/** Périmètre de la maintenance (affiché sur le PDF quand un plan est choisi). */
export const MAINTENANCE_SCOPE = [
  "Inclus : mises à jour de sécurité, sauvegardes, monitoring, petites corrections",
  "Exclu : nouvelles fonctionnalités, redesign, pages supplémentaires",
];

// ---------------------------------------------------------------------------
// ÉTAPE 6 — Délai souhaité (multiplicateur)
// ---------------------------------------------------------------------------
export const DEADLINES = [
  { id: "flexible", label: "Flexible (6+ semaines)", desc: "Meilleur prix.", multiplier: 0.9 },
  { id: "standard", label: "Standard (4-6 semaines)", desc: "Planning classique.", multiplier: 1 },
  { id: "urgent", label: "Urgent (2-3 semaines)", desc: "Priorité au projet.", multiplier: 1.25 },
];

// ---------------------------------------------------------------------------
// Remises combinées (appliquées automatiquement, plafonnées à 25%)
// ---------------------------------------------------------------------------
export const DISCOUNT_RULES = [
  {
    id: "seo-maintenance",
    label: "SEO + Maintenance",
    percent: 0.1,
    applies: (s: { seo: string; maintenance: string }) =>
      s.seo !== "none" && s.maintenance !== "none",
  },
  {
    id: "ecommerce-payment",
    label: "E-commerce + Paiement en ligne",
    percent: 0.05,
    applies: (s: { projectType: string; features: string[] }) =>
      s.projectType === "ecommerce" && s.features.includes("payment"),
  },
  {
    id: "3-features",
    label: "3+ fonctionnalités additionnelles",
    percent: 0.07,
    applies: (s: { features: string[] }) => s.features.length >= 3,
  },
  {
    id: "refonte-evolutive",
    label: "Refonte + Maintenance évolutive",
    percent: 0.1,
    applies: (s: { projectType: string; maintenance: string }) =>
      s.projectType === "refonte" && s.maintenance === "evolutive",
  },
];

/** Plafond des remises cumulées. */
export const MAX_DISCOUNT = 0.25;

/** Validité de l'offre en jours (affichée sur le devis PDF). */
export const QUOTE_VALIDITY_DAYS = 30;

/** Mot de passe du back-office /admin.
 * Surchargé par la variable d'environnement VITE_ADMIN_PASSWORD.
 * NOTE : protection côté client uniquement (cosmétique) — pour une vraie
 * sécurité, protégez la route côté serveur (Vercel Edge, etc.). */
export const ADMIN_PASSWORD =
  (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) || "adi-admin-2026";

/** Modalités de paiement (affichées sur le PDF et le récapitulatif). */
export const PAYMENT_TERMS = [
  "50% à la commande",
  "40% à la mise en ligne",
  "10% après 30 jours de garantie",
];

/** Définition contractuelle de la "livraison" (évite toute ambiguïté). */
export const DELIVERY_DEFINITION =
  "Livraison = mise en ligne du site et formation, hors révisions supplémentaires.";

// ---------------------------------------------------------------------------
// Types d'ID (dérivés des tableaux ci-dessus — utilisés par le moteur de calcul)
// ---------------------------------------------------------------------------
export type ProjectTypeId = (typeof PROJECT_TYPES)[number]["id"];
export type PagesId = (typeof PAGE_RANGES)[number]["id"];
export type DesignId = (typeof DESIGN_LEVELS)[number]["id"];
export type FeatureId = (typeof FEATURES)[number]["id"];
export type SeoId = (typeof SEO_OPTIONS)[number]["id"];
export type HostingId = (typeof HOSTING_PLANS)[number]["id"];
export type MaintenanceId = (typeof MAINTENANCE_PLANS)[number]["id"];
export type DeadlineId = (typeof DEADLINES)[number]["id"];

// ---------------------------------------------------------------------------
// Informations de l'agence (utilisées pour le PDF et le récapitulatif)
// ---------------------------------------------------------------------------
export const AGENCY = {
  name: "Afrique NovaTech",
  tagline: "Studio de création web & solutions digitales",
  email: "gracaonesim@gmail.com",
  phone: "+229 01 41 96 92 08",
  whatsapp: "2290141969208",
  address: "Cotonou, Bénin",
};
