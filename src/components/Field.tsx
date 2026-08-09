import { cn } from "../utils/cn";

export default function Field({
  label,
  type = "text",
  placeholder,
  required = true,
  value,
  onChange,
  error,
}: {
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-wider text-white/50">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={cn(
          "w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/30",
          error
            ? "ring-2 ring-red-500/50 focus:ring-red-500"
            : "ring-1 ring-white/10 focus:ring-white/30"
        )}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
