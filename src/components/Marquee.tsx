import {
  SiDocker, SiFigma, SiFlutter, SiGraphql, SiMongodb, SiNextdotjs, SiNodedotjs,
  SiPostgresql, SiPython, SiReact, SiStripe, SiSupabase, SiTailwindcss,
  SiTypescript, SiVercel,
} from "react-icons/si";
import { FaCloud, FaRobot, FaBolt } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { motion } from "framer-motion";

const tech: { name: string; icon: IconType; color?: string }[] = [
  { name: "React", icon: SiReact, color: "text-cyan-300/80" },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript, color: "text-sky-300/80" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-300/80" },
  { name: "React Native", icon: SiReact, color: "text-cyan-300/80" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-300/80" },
  { name: "Figma", icon: SiFigma, color: "text-orange-300/80" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-indigo-300/80" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-300/80" },
  { name: "AWS", icon: FaCloud, color: "text-orange-300/80" },
  { name: "Docker", icon: SiDocker, color: "text-sky-300/80" },
  { name: "Python", icon: SiPython, color: "text-yellow-300/80" },
  { name: "Vercel", icon: SiVercel },
  { name: "GraphQL", icon: SiGraphql, color: "text-fuchsia-300/80" },
  { name: "Flutter", icon: SiFlutter, color: "text-sky-300/80" },
  { name: "Stripe", icon: SiStripe, color: "text-indigo-300/80" },
  { name: "Supabase", icon: SiSupabase, color: "text-green-300/80" },
  { name: "OpenAI", icon: FaRobot },
];

const badges = [
  "Sites web", "E-commerce", "Applications", "SaaS", "IA & Data", "Branding", "UX/UI", "Cloud",
];

function Chip({ name, icon, color }: { name: string; icon: IconType; color?: string }) {
  const Icon = icon;
  return (
    <span className="group flex shrink-0 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-white/70 backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/[0.08]">
      <Icon className={`h-4 w-4 ${color || "text-white/70"} transition-transform duration-300 group-hover:scale-125`} aria-hidden="true" />
      {name}
    </span>
  );
}

export default function Marquee() {
  const items = [...tech, ...tech];
  const badgesDual = [...badges, ...badges];

  return (
    <section className="relative z-10 overflow-hidden border-y border-white/10 py-5">
      {/* glow */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.05)_50%,transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-5 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-white/40"
        >
          Une stack moderne, une obsession: la perfection
        </motion.p>
      </div>

      <div className="relative space-y-4">
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-4">
            {items.map((t, i) => (
              <Chip key={i} {...t} />
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="flex w-max animate-ticker gap-3 [animation-direction:reverse]">
            {badgesDual.map((b, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2 text-xs uppercase tracking-[0.2em] text-white/45"
              >
                <FaBolt className="h-3 w-3 text-cyan-300/70" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
