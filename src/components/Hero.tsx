import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { stats } from "../data";
import Typewriter from "./Typewriter";
import Globe from "./Globe";
import { FaPlay, FaArrowDown, FaRocket } from "react-icons/fa6";

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [15, -15]), { stiffness: 80, damping: 20, mass: 0.6 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 80, damping: 20, mass: 0.6 });
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
      className="relative z-10 flex min-h-screen items-center overflow-hidden"
    >
      {/* Presentation reel */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-bg.webp"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-55"
        >
          <source src="/videos/showreel.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.82)_38%,rgba(5,5,5,0.35)_72%,rgba(5,5,5,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.55)_0%,transparent_28%,transparent_62%,#050505_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(34,211,238,0.14),transparent_50%)]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 pt-32 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* ---- Copy ---- */}
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.05] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/75 backdrop-blur-2xl"
          >
            <span className="flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-cyan-300/80" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300" />
            </span>
            Studio digital nouvelle génération
          </motion.span>

          <Typewriter
            speed={42}
            startDelay={450}
            className="mx-auto max-w-3xl text-5xl font-black leading-[1.03] tracking-tight sm:text-6xl xl:text-7xl"
            segments={[
              {
                text: "Nous conçevons",
                className: "gradient-text",
              },
              {
                text: "le digital",
                className: "shine-text [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]",
                break: true,
              },
              {
                text: "de demain",
                className: "hero-gradient-text",
              },
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg lg:mx-0"
          >
            <strong className="font-semibold text-white">Afrique NovaTech</strong> transforme vos idées en
            sites web, applications et plateformes ultra-modernes. Une équipe de développeurs experts qui
            livre des produits d'exception, dans les temps.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <a
              href="/#contact"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-white px-8 py-4 font-bold text-black shadow-[0_0_70px_-15px_rgba(255,255,255,0.35)] transition-all hover:scale-105 hover:shadow-[0_0_90px_-12px_rgba(125,227,255,0.5)]"
            >
              <span className="relative z-10">Lancer mon projet</span>
              <FaRocket className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="/#projects"
              className="group inline-flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.06] px-8 py-4 font-semibold text-white backdrop-blur-2xl transition-all hover:border-white/30 hover:bg-white/10"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[9px] text-black transition-transform group-hover:scale-110">
                <FaPlay className="ml-0.5" />
              </span>
              Voir nos réalisations
            </a>
          </motion.div>

          {/* trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/40 lg:justify-start"
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" /> Devis gratuit sous 24h
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" /> Paiement échelonné
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400/70" /> Support 24/7
            </span>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7 }}
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass-panel rounded-2xl p-4 text-center backdrop-blur-xl transition-transform duration-300 hover:scale-[1.03]">
                <div className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-2xl font-black text-transparent sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-white/45">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ---- Visual ---- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="relative hidden h-[560px] items-center justify-center lg:flex"
        >
          {/* Glow */}
          <div className="absolute h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.24),transparent_62%)] blur-md" />

          {/* orbit rings */}
          <div className="ring-conic absolute h-[31rem] w-[31rem] animate-spin-orbit rounded-full opacity-80" />
          <div className="ring-conic absolute h-[38rem] w-[38rem] animate-spin-orbit-reverse rounded-full opacity-40" />
          <div className="absolute h-[26rem] w-[26rem] rounded-full border border-white/10" />

          {/* floating chips */}
          <motion.div
            animate={{ y: [-8, 10, -8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel absolute left-2 top-16 z-20 rounded-2xl px-4 py-3 text-sm backdrop-blur-xl"
          >
            <span className="mr-2 text-emerald-300">●</span> Site livré en 2 semaines
          </motion.div>
          <motion.div
            animate={{ y: [10, -8, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel absolute right-2 top-40 z-20 rounded-2xl px-4 py-3 text-sm backdrop-blur-xl"
          >
            <span className="mr-2 text-cyan-300">✦</span> UX primée
          </motion.div>
          <motion.div
            animate={{ y: [-6, 12, -6] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel absolute bottom-28 left-8 z-20 rounded-2xl px-4 py-3 text-sm backdrop-blur-xl"
          >
            <span className="mr-2 text-orange-300">▲</span> 12 pays couverts
          </motion.div>

          <Globe rotateX={rx} rotateY={ry} parallaxX={px} parallaxY={py} />

          {/* code label */}
          <div className="glass-panel absolute bottom-12 right-6 z-20 rounded-2xl px-5 py-3 font-mono text-xs text-white/65 backdrop-blur-xl">
            <span className="text-emerald-300">const</span> mission = <span className="text-cyan-300">"Afrique → Monde"</span>;
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{ delay: 1.6, duration: 3, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/45"
      >
        <FaArrowDown className="text-xs" />
        <span className="text-[10px] uppercase tracking-[0.3em]">Explorer</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
