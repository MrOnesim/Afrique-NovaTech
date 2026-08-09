import {
  DEADLINES,
  DESIGN_LEVELS,
  FEATURES,
  HOSTING_PLANS,
  MAINTENANCE_PLANS,
  PAGE_RANGES,
  PROJECT_TYPES,
  SEO_EXTRAS,
  SEO_OPTIONS,
} from "../../config/pricing";
import { formatFCFA, type QuoteState } from "../../utils/quote";
import {
  CheckRow,
  NumberStepper,
  OptionCard,
  Segmented,
  StepSection,
} from "./ui";

// ---------------------------------------------------------------------------
// ÉTAPE 1 — Type de projet
// ---------------------------------------------------------------------------
export function StepProjectType({
  state,
  onChange,
}: {
  state: QuoteState;
  onChange: (patch: Partial<QuoteState>) => void;
}) {
  return (
    <StepSection
      title="Quel type de projet ?"
      subtitle="Sélectionnez la catégorie la plus proche de votre besoin."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {PROJECT_TYPES.map((p) => (
          <OptionCard
            key={p.id}
            selected={state.projectType === p.id}
            onClick={() => onChange({ projectType: p.id })}
            icon={p.icon}
            title={p.label}
            desc={p.desc}
            right={formatFCFA(p.price.min)}
          />
        ))}
      </div>
    </StepSection>
  );
}

// ---------------------------------------------------------------------------
// ÉTAPE 2 — Envergure / complexité
// ---------------------------------------------------------------------------
export function StepScope({
  state,
  onChange,
}: {
  state: QuoteState;
  onChange: (patch: Partial<QuoteState>) => void;
}) {
  return (
    <div className="space-y-8">
      <StepSection title="Nombre de pages" subtitle="Plus il y a de pages, plus le budget augmente.">
        <Segmented
          options={PAGE_RANGES.map((p) => ({ id: p.id, label: p.label }))}
          value={state.pages}
          onChange={(id) => onChange({ pages: id })}
        />
      </StepSection>

      <StepSection title="Niveau de design" subtitle="Impacte directement la qualité perçue et le prix.">
        <div className="grid gap-3 sm:grid-cols-3">
          {DESIGN_LEVELS.map((d) => (
            <OptionCard
              key={d.id}
              selected={state.design === d.id}
              onClick={() => onChange({ design: d.id })}
              title={d.label}
              desc={d.desc}
              right={`+${Math.round((d.multiplier - 1) * 100)}%`}
            />
          ))}
        </div>
      </StepSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ÉTAPE 3 — Fonctionnalités additionnelles
// ---------------------------------------------------------------------------
export function StepFeatures({
  state,
  onChange,
}: {
  state: QuoteState;
  onChange: (patch: Partial<QuoteState>) => void;
}) {
  const toggle = (id: string) => {
    const has = state.features.includes(id);
    onChange({
      features: has
        ? state.features.filter((f) => f !== id)
        : [...state.features, id],
    });
  };

  return (
    <StepSection
      title="Fonctionnalités additionnelles"
      subtitle="Cochez ce dont vous avez besoin. Chaque option a un coût visible."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <CheckRow
            key={f.id}
            checked={state.features.includes(f.id)}
            onChange={() => toggle(f.id)}
            icon={f.icon}
            title={f.label}
            price={f.price}
          />
        ))}
      </div>
    </StepSection>
  );
}

// ---------------------------------------------------------------------------
// ÉTAPE 4 — SEO & marketing
// ---------------------------------------------------------------------------
export function StepSeo({
  state,
  onChange,
}: {
  state: QuoteState;
  onChange: (patch: Partial<QuoteState>) => void;
}) {
  return (
    <div className="space-y-8">
      <StepSection title="Référencement SEO" subtitle="Combien de visibilité souhaitez-vous ?">
        <div className="grid gap-3 sm:grid-cols-3">
          {SEO_OPTIONS.map((s) => (
            <OptionCard
              key={s.id}
              selected={state.seo === s.id}
              onClick={() => onChange({ seo: s.id })}
              title={s.label}
              desc={s.desc}
              right={s.price > 0 ? formatFCFA(s.price) : undefined}
            />
          ))}
        </div>
      </StepSection>

      <StepSection title="Options marketing" subtitle="Contenu et suivi de performance.">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-white">Rédaction de contenu</div>
                <div className="mt-0.5 text-xs text-white/50">
                  {SEO_EXTRAS[0]!.pricePerUnit!.toLocaleString("fr-FR")} FCFA / page
                </div>
              </div>
              <NumberStepper
                value={state.contentPages}
                onChange={(n) => onChange({ contentPages: n })}
                suffix="page(s)"
              />
            </div>
          </div>
          <CheckRow
            checked={state.analytics}
            onChange={() => onChange({ analytics: !state.analytics })}
            icon="📈"
            title={SEO_EXTRAS[1].label}
            price={SEO_EXTRAS[1].price}
          />
          <CheckRow
            checked={state.copywriting}
            onChange={() => onChange({ copywriting: !state.copywriting })}
            icon="🎯"
            title={SEO_EXTRAS[2].label}
            desc={SEO_EXTRAS[2].desc}
            price={SEO_EXTRAS[2].price}
          />
        </div>
      </StepSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ÉTAPE 5 — Hébergement & maintenance
// ---------------------------------------------------------------------------
export function StepHosting({
  state,
  onChange,
}: {
  state: QuoteState;
  onChange: (patch: Partial<QuoteState>) => void;
}) {
  return (
    <div className="space-y-8">
      <StepSection title="Nom de domaine" subtitle="Souhaitez-vous que nous réservions votre domaine ?">
        <OptionCard
          selected={state.domain}
          onClick={() => onChange({ domain: !state.domain })}
          icon="🌐"
          title="Réservation du nom de domaine (1 an)"
          right={formatFCFA(15_000)}
        />
      </StepSection>

      <StepSection
        title="Hébergement"
        subtitle="Facturé à l'année dans le devis. Adaptez le plan à votre trafic."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {HOSTING_PLANS.map((h) => (
            <OptionCard
              key={h.id}
              selected={state.hosting === h.id}
              onClick={() => onChange({ hosting: h.id })}
              title={h.label}
              desc={h.desc}
              right={h.monthly > 0 ? `${formatFCFA(h.monthly)}/mois` : undefined}
            />
          ))}
        </div>
      </StepSection>

      <StepSection title="Maintenance" subtitle="Pour garder votre site sûr et à jour.">
        <div className="grid gap-3 sm:grid-cols-3">
          {MAINTENANCE_PLANS.map((m) => (
            <OptionCard
              key={m.id}
              selected={state.maintenance === m.id}
              onClick={() => onChange({ maintenance: m.id })}
              title={m.label}
              desc={m.desc}
              right={m.price.max > 0 ? `${formatFCFA(m.price.min)}–${formatFCFA(m.price.max)}/mois` : undefined}
            />
          ))}
        </div>
      </StepSection>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ÉTAPE 6 — Délai souhaité
// ---------------------------------------------------------------------------
export function StepDeadline({
  state,
  onChange,
}: {
  state: QuoteState;
  onChange: (patch: Partial<QuoteState>) => void;
}) {
  return (
    <StepSection
      title="Quel est votre délai ?"
      subtitle="Le délai impacte le prix : urgent = majoration, flexible = remise."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {DEADLINES.map((d) => {
          const diff = Math.round((d.multiplier - 1) * 100);
          return (
            <OptionCard
              key={d.id}
              selected={state.deadline === d.id}
              onClick={() => onChange({ deadline: d.id })}
              title={d.label}
              desc={d.desc}
              right={diff < 0 ? `${diff}%` : diff > 0 ? `+${diff}%` : undefined}
            />
          );
        })}
      </div>
    </StepSection>
  );
}
