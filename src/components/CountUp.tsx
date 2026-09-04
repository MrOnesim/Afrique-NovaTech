import { useEffect, useRef, useState } from "react";

/**
 * Compteur animé : les chiffres montent de 0 vers la valeur cible
 * quand l'élément entre dans le viewport.
 */
export default function CountUp({
  value,
  duration = 1400,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => value.replace(/\d/, "0"));
  const started = useRef(false);

  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  const target = match ? parseInt(match[2], 10) : 0;
  const prefix = match ? match[1] : "";
  const suffix = match ? match[3] : "";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !started.current) {
          started.current = true;
          observer.disconnect();
          if (reduced) {
            setDisplay(value);
            return;
          }
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(`${prefix}${Math.round(target * eased).toLocaleString("fr-FR")}${suffix}`);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, prefix, suffix, value]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}
