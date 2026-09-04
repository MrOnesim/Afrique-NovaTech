import { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { formatFCFA } from "../../utils/quote";
import { FaCheck, FaRegCircle, FaPlus, FaMinus, FaCircleCheck } from "react-icons/fa6";
import { QuoteIcon } from "./quote-icons";

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
        "group relative flex w-full items-start gap-3 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300",
        selected
          ? "border-cyan-200/45 bg-cyan-400/[0.08] shadow-[0_0_35px_-10px_rgba(125,227,255,0.35)]"
          : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]",
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all",
          selected ? "border-cyan-200 bg-cyan-400/20 text-cyan-100" : "border-white/25 text-transparent group-hover:border-white/40",
        )}
      >
        {selected ? <FaCheck className="h-2.5 w-2.5" /> : <FaRegCircle className="h-3 w-3" />}
      </span>
      {icon && <QuoteIcon code={icon} />}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-white">{title}</span>
        {desc && <span className="mt-0.5 block text-xs text-white/50">{desc}</span>}
      </span>
      {right && (
        <span className={cn("shrink-0 text-sm font-bold", selected ? "text-cyan-100" : "text-white/70")}>
          {right}
        </span>
      )}
      {selected && (
        <span className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-cyan-400/15 blur-2xl" />
      )}
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
        "group relative flex cursor-pointer items-start gap-3 overflow-hidden rounded-2xl border p-4 transition-all duration-300",
        checked
          ? "border-emerald-300/40 bg-emerald-400/[0.07] shadow-[0_0_30px_-12px_rgba(16,185,129,0.45)]"
          : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]",
      )}
    >
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all",
          checked ? "border-emerald-300 bg-emerald-400/20 text-emerald-100" : "border-white/25 text-transparent group-hover:border-white/40",
        )}
      >
        <FaCheck className="h-2.5 w-2.5" />
      </span>
      {icon && <QuoteIcon code={icon} />}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-white">{title}</span>
        {desc && <span className="mt-0.5 block text-xs text-white/50">{desc}</span>}
      </span>
      {price !== undefined && (
        <span className={cn("shrink-0 text-sm font-bold", checked ? "text-emerald-300" : "text-white/70")}>
          +{formatFCFA(price)}
        </span>
      )}
      {checked && (
        <span className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-emerald-400/12 blur-2xl" />
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
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={cn(
            "group relative flex items-center justify-between overflow-hidden rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300",
            value === o.id
              ? "border-white/40 bg-white text-black shadow-[0_0_35px_-10px_rgba(255,255,255,0.5)]"
              : "border-white/10 bg-white/[0.04] text-white/70 hover:border-white/25 hover:text-white",
          )}
        >
          <span>{o.label}</span>
          {value === o.id && <FaCircleCheck className="h-4 w-4" />}
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
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/50">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
          {title}
        </h3>
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
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/10 disabled:opacity-40"
        disabled={value <= min}
        aria-label="Diminuer"
      >
        <FaMinus className="h-3 w-3" />
      </button>
      <div className="min-w-[4.5rem] text-center">
        <span className="text-lg font-bold text-white">{value}</span>
        {suffix && <span className="ml-1 text-xs text-white/50">{suffix}</span>}
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/10 disabled:opacity-40"
        disabled={value >= max}
        aria-label="Augmenter"
      >
        <FaPlus className="h-3 w-3" />
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
        {label} {required && <span className="text-cyan-300/60">*</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 transition-all placeholder:text-white/30 focus:border-cyan-200/40 focus:ring-2 focus:ring-cyan-200/30 focus:bg-white/[0.07]"
      />
    </div>
  );
}
