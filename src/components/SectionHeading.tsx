import Reveal from "./Reveal";
import { motion } from "framer-motion";
import { FaBolt } from "react-icons/fa6";

type Props = {
  tag: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ tag, title, subtitle }: Props) {
  return (
    <Reveal className="relative mx-auto mb-14 max-w-2xl text-center">
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/70 backdrop-blur-xl">
        <FaBolt className="h-3 w-3 text-cyan-200/70" />
        {tag}
      </span>
      <h2 className="relative bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
        {title}
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="mt-5 h-px w-24 bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent mx-auto"
      />
      {subtitle && <p className="mt-4 text-lg text-white/50">{subtitle}</p>}
    </Reveal>
  );
}
