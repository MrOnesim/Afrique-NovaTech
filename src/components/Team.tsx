import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { team } from "../data";
import SectionHeading from "./SectionHeading";

function TeamAvatar({ initials, role }: { initials: string; role: string }) {
  let gradient: string;
  let borderGlow: string;
  let iconColor: string;
  let svgIcon: ReactNode;

  if (role.toLowerCase().includes("developer")) {
    gradient = "from-amber-500/30 via-orange-500/10 to-red-500/20";
    borderGlow = "group-hover:shadow-[0_0_25px_rgba(249,115,22,0.35)]";
    iconColor = "text-orange-400";
    svgIcon = (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  } else if (role.toLowerCase().includes("design")) {
    gradient = "from-fuchsia-500/30 via-purple-500/10 to-pink-500/20";
    borderGlow = "group-hover:shadow-[0_0_25px_rgba(217,70,239,0.35)]";
    iconColor = "text-fuchsia-400";
    svgIcon = (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    );
  } else if (role.toLowerCase().includes("cloud")) {
    gradient = "from-cyan-500/30 via-blue-500/10 to-indigo-500/20";
    borderGlow = "group-hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]";
    iconColor = "text-cyan-400";
    svgIcon = (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    );
  } else {
    gradient = "from-emerald-500/30 via-teal-500/10 to-green-500/20";
    borderGlow = "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]";
    iconColor = "text-emerald-400";
    svgIcon = (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    );
  }

  return (
    <div className={`relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} border border-white/10 transition-all duration-500 ${borderGlow} group-hover:scale-105 group-hover:border-white/20`}>
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
      
      {/* Icon & Initials */}
      <div className={`relative flex flex-col items-center justify-center ${iconColor} transition-all duration-500`}>
        {svgIcon}
        <span className="mt-1 text-[9px] font-black uppercase tracking-wider opacity-60 group-hover:opacity-100">{initials}</span>
      </div>

      {/* Decorative corner brackets for tech UI style */}
      <div className="absolute top-1.5 left-1.5 h-1.5 w-1.5 border-t border-l border-white/20" />
      <div className="absolute top-1.5 right-1.5 h-1.5 w-1.5 border-t border-r border-white/20" />
      <div className="absolute bottom-1.5 left-1.5 h-1.5 w-1.5 border-b border-l border-white/20" />
      <div className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 border-b border-r border-white/20" />
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="relative z-10 mx-auto max-w-7xl px-6 py-28">
      <SectionHeading
        tag="Notre Équipe"
        title="Les talents derrière vos projets"
        subtitle="Une grande équipe de développeurs, designers et chefs de projet passionnés et expérimentés."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 text-center backdrop-blur-xl transition-all duration-500 hover:border-white/15 hover:bg-white/[0.06]"
          >
            <TeamAvatar initials={m.initials} role={m.role} />
            <h3 className="mt-5 text-lg font-bold transition-colors group-hover:text-white">{m.name}</h3>
            <p className="mt-1 text-sm text-white/50">{m.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
