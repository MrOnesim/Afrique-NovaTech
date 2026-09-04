import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCookieBite, FaShieldHalved, FaCheck, FaXmark } from "react-icons/fa6";

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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Consentement aux cookies"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4"
        >
          <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/12 bg-[#0a0a0a]/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent" />
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-xl text-cyan-100 ring-1 ring-cyan-200/20">
                <FaCookieBite />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed text-white/70">
                  <strong className="font-semibold text-white">Votre vie privée d'abord.</strong>{" "}
                  Afrique NovaTech n'utilise pas de cookies publicitaires ni de suivi. Seul votre choix
                  de consentement est enregistré localement sur votre appareil.{" "}
                  <a
                    href="/confidentialite"
                    className="inline-flex items-center gap-1 text-cyan-300 underline decoration-cyan-300/40 underline-offset-2 transition-colors hover:text-cyan-200"
                  >
                    <FaShieldHalved className="h-3 w-3" /> En savoir plus
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 pl-15">
              <button
                ref={acceptRef}
                onClick={() => decide("accepted")}
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_-8px_rgba(125,227,255,0.5)]"
              >
                <FaCheck className="h-3.5 w-3.5" /> Accepter
              </button>
              <button
                onClick={() => decide("refused")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <FaXmark className="h-3.5 w-3.5" /> Refuser
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
