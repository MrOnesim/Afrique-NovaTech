import {
  FaRocket,
  FaEarthAfrica,
  FaArrowsRotate,
  FaCartShopping,
  FaGears,
  FaMobileScreen,
  FaGlobe,
  FaCreditCard,
  FaPenNib,
  FaLock,
  FaCalendarCheck,
  FaComment,
  FaShareNodes,
  FaClipboardList,
  FaChartLine,
  FaChartPie,
  FaBullseye,
  FaPen,
  FaFileCode,
  FaGaugeHigh,
  FaDatabase,
  FaHandshake,
  FaScrewdriverWrench,
  FaBolt,
  FaCircleCheck,
  FaShieldHalved,
} from "react-icons/fa6";

const ICONS: Record<string, typeof FaRocket> = {
  // Types de projet
  "🚀": FaRocket,
  "🌐": FaEarthAfrica,
  "🔄": FaArrowsRotate,
  "🛒": FaCartShopping,
  "⚙️": FaGears,
  "📱": FaMobileScreen,

  // Fonctionnalités additionnelles
  "🌍": FaGlobe,
  "💳": FaCreditCard,
  "✍️": FaPenNib,
  "🔐": FaLock,
  "📅": FaCalendarCheck,
  "💬": FaComment,
  "📣": FaShareNodes,
  "📋": FaClipboardList,
  "📊": FaChartLine,

  // SEO & marketing
  "📈": FaChartPie,
  "🎯": FaBullseye,
  "✏️": FaPen,
  "📝": FaPen,
  "🔎": FaGaugeHigh,
  "🔍": FaGaugeHigh,
  "🧠": FaDatabase,

  // Autres
  "🤝": FaHandshake,
  "🛠️": FaScrewdriverWrench,
  "🛡️": FaShieldHalved,
  "⚡": FaBolt,
  "✔️": FaCircleCheck,
};

/** Rend une vraie icône (React Icons) à la place d'un sticker emoji. */
export function QuoteIcon({ code }: { code?: string }) {
  const Icon = (code && ICONS[code]) || FaFileCode;
  return (
    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5 text-cyan-100 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-cyan-400/10 group-hover:ring-cyan-200/30">
      <Icon className="h-4 w-4" />
    </span>
  );
}
