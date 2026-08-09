import { motion, MotionValue, useTransform } from "framer-motion";

interface HeroVisualProps {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}

export default function HeroVisual({ rotateX, rotateY, parallaxX, parallaxY }: HeroVisualProps) {
  // Multi-layer parallax: each layer moves at a different speed & direction
  // Back layer: moves opposite to cursor (subtle depth illusion)
  const bgX = useTransform(parallaxX, (v) => `${-v * 28}px`);
  const bgY = useTransform(parallaxY, (v) => `${-v * 28}px`);

  // Mid layer (orbits SVG): moderate movement with cursor
  const midX = useTransform(parallaxX, (v) => `${v * 18}px`);
  const midY = useTransform(parallaxY, (v) => `${v * 18}px`);

  // Main image: strong parallax, moves more aggressively with cursor
  const imgX = useTransform(parallaxX, (v) => `${v * 40}px`);
  const imgY = useTransform(parallaxY, (v) => `${v * 40}px`);

  // Front particles: the fastest parallax (closest to viewer)
  const fgX = useTransform(parallaxX, (v) => `${v * 60}px`);
  const fgY = useTransform(parallaxY, (v) => `${v * 60}px`);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="relative flex h-96 w-96 items-center justify-center [transform-style:preserve-3d]"
    >
      {/* ── Layer 0 (Back): Ambient glow halos ── */}
      <motion.div
        style={{ x: bgX, y: bgY, translateZ: "-80px" }}
        className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]"
      >
        <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-amber-500/25 via-orange-500/10 to-cyan-500/20 blur-[80px]" />
        <div className="absolute h-48 w-48 rounded-full bg-orange-600/15 blur-[50px] animate-pulse" />
      </motion.div>

      {/* ── Layer 1 (Mid): Rotating Orbit rings SVG ── */}
      <motion.div
        style={{ x: midX, y: midY, translateZ: "-20px" }}
        className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]"
      >
        <div className="relative h-72 w-72 animate-float-slow [transform-style:preserve-3d]">
          <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
            <defs>
              <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff9900" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#ff5500" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ff2200" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="orbitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#00a8ff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </linearGradient>
              <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Orange orbit – spins clockwise */}
            <g className="origin-center" style={{ animation: "spin-slow 14s linear infinite" }}>
              <ellipse cx="100" cy="100" rx="80" ry="26" fill="none" stroke="url(#orbitGrad1)" strokeWidth="1.8" strokeDasharray="9 6" transform="rotate(-25 100 100)" />
              <circle cx="20" cy="100" r="5" fill="#ff7700" filter="url(#neon-glow)" transform="rotate(-25 100 100)" />
              <circle cx="180" cy="100" r="3" fill="#ffcc00" transform="rotate(-25 100 100)" />
            </g>

            {/* Cyan orbit – spins counter-clockwise */}
            <g className="origin-center" style={{ animation: "spin-slow 22s linear infinite reverse" }}>
              <ellipse cx="100" cy="100" rx="92" ry="32" fill="none" stroke="url(#orbitGrad2)" strokeWidth="1.8" strokeDasharray="14 8" transform="rotate(35 100 100)" />
              <circle cx="100" cy="68" r="5.5" fill="#00f2fe" filter="url(#neon-glow)" transform="rotate(35 100 100)" />
            </g>

            {/* Slow white orbit ring */}
            <g className="origin-center" style={{ animation: "spin-slow 38s linear infinite" }}>
              <ellipse cx="100" cy="100" rx="98" ry="38" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" transform="rotate(80 100 100)" />
              <circle cx="100" cy="62" r="3.5" fill="#ffffff" filter="url(#neon-glow)" transform="rotate(80 100 100)" />
            </g>

            {/* Constellation lines */}
            <g opacity="0.35" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8">
              <line x1="100" y1="100" x2="148" y2="52" />
              <line x1="100" y1="100" x2="48" y2="72" />
              <line x1="100" y1="100" x2="58" y2="152" />
              <line x1="100" y1="100" x2="155" y2="142" />
            </g>

            {/* Constellation dots */}
            <circle cx="148" cy="52" r="3.5" fill="#00f2fe" filter="url(#neon-glow)" />
            <circle cx="48" cy="72" r="2.5" fill="#ff5500" />
            <circle cx="58" cy="152" r="4" fill="#ffaa00" filter="url(#neon-glow)" />
            <circle cx="155" cy="142" r="2.5" fill="#ffffff" />
          </svg>
        </div>
      </motion.div>

      {/* ── Layer 2 (Main): hero_visual.png image ── */}
      <motion.div
        style={{ x: imgX, y: imgY, translateZ: "40px" }}
        className="absolute flex h-64 w-64 items-center justify-center [transform-style:preserve-3d]"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <img
          src="/images/hero_visual.png"
          alt="Sphère digitale 3D Afrique NovaTech"
          className="h-full w-full object-contain drop-shadow-[0_0_48px_rgba(255,140,0,0.5)]"
          draggable={false}
        />
      </motion.div>

      {/* ── Layer 3 (Front): Floating micro particles ── */}
      <motion.div
        style={{ x: fgX, y: fgY, translateZ: "80px" }}
        className="pointer-events-none absolute inset-0 [transform-style:preserve-3d]"
      >
        {/* Top-right particle */}
        <motion.div
          animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-8 top-8 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_4px_rgba(0,242,254,0.6)]"
        />
        {/* Bottom-left particle */}
        <motion.div
          animate={{ y: [0, 12, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 left-10 h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_14px_5px_rgba(255,170,0,0.55)]"
        />
        {/* Center-left particle */}
        <motion.div
          animate={{ y: [0, -8, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute left-6 top-1/2 h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_3px_rgba(255,255,255,0.4)]"
        />
        {/* Top-left particle */}
        <motion.div
          animate={{ y: [0, 9, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute left-14 top-14 h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_4px_rgba(255,100,0,0.5)]"
        />
      </motion.div>
    </motion.div>
  );
}
