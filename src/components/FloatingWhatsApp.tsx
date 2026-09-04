import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { AGENCY } from "../config/pricing";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={`https://wa.me/${AGENCY.whatsapp}?text=${encodeURIComponent("Bonjour Afrique NovaTech ! Je souhaite discuter de mon projet.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6, ease: "backOut" }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_10px_40px_-8px_rgba(16,185,129,0.7)]"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30" />
      <FaWhatsapp className="relative z-10 h-7 w-7" />
      <span className="absolute -top-1.5 -right-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black shadow">
        1
      </span>
    </motion.a>
  );
}
