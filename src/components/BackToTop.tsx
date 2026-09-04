import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa6";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Retour en haut"
          className="group fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-white/80 backdrop-blur-2xl transition-all duration-300 hover:bg-white/[0.15] hover:text-white hover:shadow-[0_0_35px_-5px_rgba(125,227,255,0.5)]"
        >
          <span className="absolute inset-0 animate-spin-slow rounded-2xl border border-dashed border-cyan-200/20 opacity-0 transition-opacity group-hover:opacity-100" />
          <FaArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
