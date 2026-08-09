import { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { formatFCFA } from "../../utils/quote";

/** Carte cliquable (radio) pour les choix — Type de projet, design, etc. */
export function OptionCard({
  selected,
  onClick,
  icon,
  title,
  desc,
  right,
}: {
  selected: boolean;
  onClick: () => void;
  icon?: string;
  title: string;
  desc?: string;
  right?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all",
        selected
          ? "border-white/40 bg-white/10"
          : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]"
      )}
    >
      {icon && <span className="mt-0.5 text-xl leading-none">{icon}</span>}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-white">{title}</span>
        {desc && <span className="mt-0.5 block text-xs text-white/50">{desc}</span>}
      </span>
      {right && <span className="shrink-0 text-sm font-semibold text-white/80">{right}</span>}
    </button>
  );
}

/** Ligne à cocher (checkbox) avec prix — fonctionnalités, options SEO. */
export function CheckRow({
  checked,
  onChange,
  icon,
  title,
  desc,
  price,
}: {
  checked: boolean;
  onChange: () => void;
  icon?: string;
  title: string;
  desc?: string;
  price?: number;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all",
        checked
          ? "border-white/40 bg-white/10"
          : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]"
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 shrink-0 accent-white"
      />
      {icon && <span className="mt-0.5 text-lg leading-none">{icon}</span>}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-white">{title}</span>
        {desc && <span className="mt-0.5 block text-xs text-white/50">{desc}</span>}
      </span>
      {price !== undefined && (
        <span className="shrink-0 text-sm font-semibold text-white/80">
          +{formatFCFA(price)}
        </span>
      )}
    </label>
  );
}

/** Groupe de boutons segmenté (radio inline) — nombre de pages, etc. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={cn(
            "rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
            value === o.id
              ? "border-white/40 bg-white text-black"
              : "border-white/10 bg-white/[0.04] text-white/70 hover:border-white/25 hover:text-white"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Bloc de section avec titre. */
export function StepSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">{title}</h3>
        {subtitle && <p className="mt-1 text-xs text-white/40">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

/** Petit stepper +/- pour un nombre (ex: pages de contenu). */
export function NumberStepper({
  value,
  onChange,
  min = 0,
  max = 30,
  suffix,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  suffix?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lg text-white transition-colors hover:bg-white/10 disabled:opacity-40"
        disabled={value <= min}
        aria-label="Diminuer"
      >
        −
      </button>
      <div className="min-w-[4.5rem] text-center">
        <span className="text-lg font-bold text-white">{value}</span>
        {suffix && <span className="ml-1 text-xs text-white/50">{suffix}</span>}
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lg text-white transition-colors hover:bg-white/10 disabled:opacity-40"
        disabled={value >= max}
        aria-label="Augmenter"
      >
        +
      </button>
    </div>
  );
}

/** Champ de formulaire pour l'étape coordonnées. */
export function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-wider text-white/50">
        {label} {required && <span className="text-white/30">*</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 transition-all placeholder:text-white/30 focus:ring-white/30"
      />
    </div>
  );
}
