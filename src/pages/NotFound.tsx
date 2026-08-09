import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";

export default function NotFound() {
  usePageMeta(
    "Page introuvable — Afrique NovaTech",
    "La page que vous cherchez n'existe pas ou a été déplacée.",
  );

  return (
    <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 pt-24 text-center">
      <span className="bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-[7rem] font-black leading-none text-transparent sm:text-[9rem]">
        404
      </span>
      <h1 className="mt-2 text-2xl font-bold text-white">Page introuvable</h1>
      <p className="mt-3 max-w-md text-white/55">
        Cette page a été déplacée ou n'existe plus. Retournez à l'accueil pour
        découvrir nos services et réaliser votre projet.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition-transform hover:scale-105"
      >
        Retour à l'accueil
        <span>→</span>
      </Link>
    </div>
  );
}
