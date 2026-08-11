import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { stats } from "../data";
import Typewriter from "./Typewriter";
import Globe from "./Globe";

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [15, -15]), { stiffness: 80, damping: 20, mass: 0.6 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 80, damping: 20, mass: 0.6 });
  // Raw springs for multi-layer parallax
  const px = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.5 });
  const py = useSpring(my, { stiffness: 60, damping: 18, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="home"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-32 pb-20 text-center"
    >
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/70 backdrop-blur-xl"
      >
        <span className="flex h-2 w-2"><span className="absolute h-2 w-2 animate-ping rounded-full bg-white/60" /><span className="h-2 w-2 rounded-full bg-white" /></span>
        Studio digital nouvelle génération — basé en Afrique, livré au monde
      </motion.span>

      <Typewriter
        speed={50}
        startDelay={500}
        className="max-w-5xl text-5xl font-black leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl"
        segments={[
          {
            text: "Nous concevons",
            className: "bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent",
          },
          {
            text: "le digital ",
            className: "shine-text [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]",
            break: true,
          },
          {
            text: "de demain",
            className: "bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent",
          },
        ]}
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 max-w-2xl text-lg leading-relaxed text-white/55"
      >
        <strong className="font-semibold text-white">Afrique NovaTech</strong> transforme vos idées en
        sites web, applications et plateformes ultra-modernes. Une équipe de développeurs experts qui
        livre des produits d'exception, dans les temps.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <a
          href="/#contact"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-white px-8 py-4 font-semibold text-black shadow-[0_0_60px_-15px_rgba(255,255,255,0.25)] transition-transform hover:scale-105"
        >
          <span className="relative z-10">Lancer mon projet</span>
          <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
        </a>
        <a
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-4 font-semibold text-white backdrop-blur-xl transition-colors hover:bg-white/10"
        >
          ▶ Voir nos réalisations
        </a>
      </motion.div>

      {/* Globe 3D lumineux — localisation Afrique NovaTech (Cotonou) */}
      <div className="mt-10 hidden lg:block">
        <Globe rotateX={rx} rotateY={ry} parallaxX={px} parallaxY={py} />
      </div>

      {/* stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-xl">
            <div className="bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-3xl font-black text-transparent sm:text-4xl">{s.value}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-white/45">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="mt-16 flex flex-col items-center gap-2 text-white/30">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
