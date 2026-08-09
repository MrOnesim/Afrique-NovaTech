import {
  SiDocker,
  SiFigma,
  SiFlutter,
  SiGraphql,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { FaCloud, FaRobot } from "react-icons/fa6";
import type { IconType } from "react-icons";

const tech: { name: string; icon: IconType }[] = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "React Native", icon: SiReact },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Figma", icon: SiFigma },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "AWS", icon: FaCloud },
  { name: "Docker", icon: SiDocker },
  { name: "Python", icon: SiPython },
  { name: "Vercel", icon: SiVercel },
  { name: "GraphQL", icon: SiGraphql },
  { name: "Flutter", icon: SiFlutter },
  { name: "Stripe", icon: SiStripe },
  { name: "Supabase", icon: SiSupabase },
  { name: "OpenAI", icon: FaRobot },
];

export default function Marquee() {
  const items = [...tech, ...tech];
  return (
    <section className="relative z-10 border-y border-white/10 py-8">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-white/40">
        Notre stack technologique de pointe
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-4">
          {items.map((t, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-white/70 backdrop-blur-xl"
            >
              <t.icon className="h-4 w-4 text-white/70" aria-hidden="true" />
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
