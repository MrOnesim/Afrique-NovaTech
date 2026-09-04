import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa6";
import { cn } from "../utils/cn";

type Props = {
  tag: string;
  title: string;
  subtitle?: string;
  backTo?: string;
  center?: boolean;
};

export default function PageHeader({ tag, title, subtitle, backTo, center }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className={cn("relative", center && "text-center")}
    >
      {backTo && (
        <a
          href={backTo}
          className="group mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white/60 backdrop-blur-xl transition-colors hover:bg-white/10 hover:text-white"
        >
          <FaArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          Retour à l'accueil
        </a>
      )}

      <div className={cn("mb-4 flex", center && "justify-center")}>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/70 backdrop-blur-xl">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
          {tag}
        </span>
      </div>

      <h1 className="mx-auto max-w-3xl bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
        {title}
      </h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="mt-5 h-px w-24 bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent mx-auto"
      />

      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/50">{subtitle}</p>
      )}
    </motion.div>
  );
}
