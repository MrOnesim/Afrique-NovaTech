import { useEffect, useRef, useState } from "react";

const KEY = "cookies-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState<boolean>(() => {
    try {
      return !localStorage.getItem(KEY);
    } catch {
      return true;
    }
  });
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (visible) acceptRef.current?.focus();
  }, [visible]);

  const decide = (value: "accepted" | "refused") => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ value, at: Date.now() }));
    } catch {
      /* stockage indisponible : on masque simplement la bannière */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement aux cookies"
      className="fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4"
    >
      <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0a0a0a]/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        <p className="text-sm leading-relaxed text-white/70">
          Afrique NovaTech n'utilise pas de cookies publicitaires ni de suivi. Seul votre choix de
          consentement est enregistré localement sur votre appareil.{" "}
          <a
            href="/confidentialite"
            className="text-cyan-300 underline decoration-cyan-300/40 underline-offset-2 transition-colors hover:text-cyan-200"
          >
            En savoir plus
          </a>
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            ref={acceptRef}
            onClick={() => decide("accepted")}
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105"
          >
            Accepter
          </button>
          <button
            onClick={() => decide("refused")}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
}
