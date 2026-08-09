# 💰 Calculateur de devis — Afrique NovaTech

Calculateur multi-étapes (wizard) qui estime le prix d'un projet web en **temps réel**,
en FCFA et en EUR, et génère un devis PDF téléchargeable.

## 🚀 Accès

| Page | URL |
|---|---|
| Calculateur de devis | `/devis` |
| Back-office (leads) | `/admin` |

## 🗂️ Fichiers clés

| Fichier | Rôle |
|---|---|
| `src/config/pricing.ts` | **La grille tarifaire** (tout se modifie ici) |
| `src/utils/quote.ts` | Moteur de calcul + formatage FCFA/EUR |
| `src/utils/pdf.ts` | Génération du PDF (jsPDF) |
| `src/utils/leads.ts` | Stockage des leads (localStorage) + export CSV + EmailJS |
| `src/components/quote/` | Composants du wizard |
| `src/pages/Devis.tsx` / `Admin.tsx` | Pages |

## 🔧 Modifier les prix

Ouvrez `src/config/pricing.ts`. Tout est en FCFA. Exemples :

```ts
// Prix de base d'un site vitrine → 400 000 à 600 000 FCFA
{ id: "vitrine", price: { min: 400_000, max: 600_000 } }

// Ajouter une fonctionnalité
{ id: "newsletter", label: "Newsletter / e-mailing", icon: "📧", price: 45_000 }
```

### Maintenance mensuelle
Dans `MAINTENANCE_PLANS`, chaque plan a une fourchette mensuelle :
- `corrective` : 25 000 – 40 000 FCFA/mois (facturée × 12 dans le devis)
- `evolutive` : 50 000 – 80 000 FCFA/mois

Le périmètre inclus/exclu (`MAINTENANCE_SCOPE`) s'affiche sur le PDF quand un plan est choisi.

### Remises automatiques
Dans `DISCOUNT_RULES`, chaque règle a un `percent` (0.1 = 10%) et une condition
`applies`. Le plafond cumulé est `MAX_DISCOUNT` (25%).

### Modalités de paiement
Dans `PAYMENT_TERMS` (par défaut : 50% à la commande → 40% à la mise en ligne → 10% après
30 jours de garantie). La définition de la « livraison » est dans `DELIVERY_DEFINITION`.
Ces textes s'affichent sur le PDF et dans le récapitulatif du calculateur.

### Taux de change
`FX_RATE_EUR = 655.957` (parité fixe UEMOA). Modifiez cette valeur pour un autre marché.

## ✉️ Activer l'envoi email du lead (EmailJS)

1. Copiez `.env.example` en `.env`
2. Renseignez vos clés EmailJS (`VITE_EMAILJS_*`), comme pour le formulaire de contact
3. Sans configuration, les leads sont **toujours** sauvegardés localement et visibles sur `/admin`

## 🔐 Accès au back-office

`/admin` est protégé par un mot de passe :

- Défaut : `adi-admin-2026` — **à changer absolument**
- Surcharge via la variable d'environnement `VITE_ADMIN_PASSWORD`
- La session dure le temps de l'onglet (sessionStorage)

⚠️ Protection **côté client uniquement** (cosmétique). Pour une vraie sécurité, protégez
la route côté serveur (Vercel Edge Middleware, basique auth, etc.).

## 🏷️ Numéros de devis

Chaque devis reçoit un numéro unique et croissant (`DEV-2026-0001`, …), persisté dans le
`localStorage`. Le même numéro est utilisé sur le PDF, l'email EmailJS et le back-office.

## 📱 WhatsApp

Le numéro WhatsApp est défini dans `AGENCY.whatsapp` (config tarifaire), au format international
sans `+` ni espaces : `2290141969208`.

## 📦 Leads & export CSV

- Les devis soumis sont stockés dans le `localStorage` du navigateur
- Sur `/admin` : changement de statut (nouveau / contacté / converti), suppression, export CSV
- **Limite** : local au navigateur. Pour un usage multi-appareils, connectez un backend
  (Supabase, webhook, Google Sheets via EmailJS).

## ⚠️ Limites connues

- Estimation **non contractuelle** (fourchette indicative, affichée sur le PDF)
- Les liens `mailto` dépendent de la messagerie du visiteur
- jsPDF (~390 KB) est chargé **uniquement** au clic « Télécharger PDF » (lazy-load)

## 🛠️ Qualité & vérifications

| Commande | Rôle |
|---|---|
| `pnpm typecheck` | Vérification TypeScript (`tsc --noEmit`) |
| `pnpm lint` | ESLint (React Hooks, React Refresh, TS) |
| `pnpm check` | Typecheck + lint en une commande |
| `pnpm build` | Build de production dans `dist/` |

Le CI (`/.github/workflows/ci.yml`) exécute automatiquement `typecheck`, `lint` puis
`build` à chaque push sur `main`. L'image sociale `public/og-image.jpg` (1200×630) peut être
régénérée via `scripts/gen-og-image.ps1` (PowerShell/System.Drawing, sans dépendance).
