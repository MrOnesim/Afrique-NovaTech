import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { motion } from "framer-motion";
import { FaHouse, FaCompass, FaArrowRight } from "react-icons/fa6";

export default function NotFound() {
  usePageMeta(
    "Page introuvable — Afrique NovaTech",
    "La page que vous cherchez n'existe pas ou a été déplacée.",
  );

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-64 w-64 rounded-full bg-orange-500/8 blur-[90px]" />

      <div className="relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto mb-4 flex h-28 w-28 items-center justify-center"
        >
          <div className="absolute inset-0 animate-spin-slow rounded-3xl border border-dashed border-cyan-200/25" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-black shadow-[0_0_60px_-10px_rgba(125,227,255,0.6)]">
            <FaCompass className="h-9 w-9" />
          </div>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-7xl font-black leading-none text-transparent sm:text-[9rem]"
        >
          404
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-2 text-2xl font-black text-white"
        >
          Page introuvable
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mx-auto mt-3 max-w-md text-white/55"
        >
          Cette page a été déplacée ou n'existe plus. Retournez à l'accueil pour
          découvrir nos services et réaliser votre projet.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-bold text-black shadow-[0_0_60px_-15px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_80px_-12px_rgba(125,227,255,0.5)]"
          >
            <FaHouse className="h-4 w-4" /> Retour à l'accueil
            <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
