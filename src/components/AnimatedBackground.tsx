import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  alpha: number;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

/**
 * Cinematic animated background: layered aurora, drifting nebula, grid,
 * mouse-reactive particle constellation and occasional shooting stars.
 * The palette stays monochrome with subtle cyan / amber accents to match the brand.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let raf = 0;
    let last = performance.now();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (dpr !== 1) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const COUNT = Math.max(32, Math.min(110, Math.floor(width / 13)));
    const stars: Star[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      r: Math.random() * 1.7 + 0.35,
      hue: Math.random() > 0.86 ? (Math.random() > 0.5 ? 188 : 27) : 0,
      alpha: 0.35 + Math.random() * 0.65,
    }));

    let meteors: Meteor[] = [];
    const spawnMeteor = () => {
      meteors.push({
        x: width + 20 + Math.random() * width * 0.35,
        y: Math.random() * height * 0.45,
        vx: -(3.4 + Math.random() * 3.2),
        vy: 2.1 + Math.random() * 2.5,
        life: 0,
        maxLife: 60 + Math.random() * 35,
      });
    };
    let meteorTimer = 0;

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (dpr !== 1) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      } else {
        canvas.width = width;
        canvas.height = height;
      }
    };
    window.addEventListener("resize", onResize);

    const draw = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow.
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      // Shooting stars.
      if (!reduced) {
        meteorTimer -= dt;
        if (meteorTimer <= 0) {
          spawnMeteor();
          meteorTimer = 1500 + Math.random() * 2600;
        }
        meteors = meteors.filter((m) => m.life < m.maxLife);
        for (const m of meteors) {
          m.x += m.vx * (dt / 16);
          m.y += m.vy * (dt / 16);
          m.life += dt / 16;
          const a = Math.max(0, 1 - m.life / m.maxLife);
          const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 12, m.y - m.vy * 12);
          grad.addColorStop(0, `rgba(255,255,255,${a})`);
          grad.addColorStop(0.35, `rgba(125,227,255,${a * 0.7})`);
          grad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(m.x - m.vx * 12, m.y - m.vy * 12);
          ctx.stroke();
        }
      }

      // Particle constellation.
      for (const p of stars) {
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        if (p.x < -10) p.x += width + 20;
        if (p.x > width + 10) p.x -= width + 20;
        if (p.y < -10) p.y += height + 20;
        if (p.y > height + 10) p.y -= height + 20;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x += (dx / dist) * force * 0.9;
          p.y += (dy / dist) * force * 0.9;
        }

        const color = p.hue === 188 ? `rgba(103,232,249,${p.alpha})` : p.hue === 27 ? `rgba(255,171,64,${p.alpha})` : `rgba(255,255,255,${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        if (p.r > 1.3) {
          ctx.shadowColor = "rgba(255,255,255,0.4)";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.85)";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Connections.
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b = stars[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 135) {
            const alpha = 0.18 * (1 - d / 135);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = a.hue === 188
              ? `rgba(125,227,255,${alpha})`
              : a.hue === 27
                ? `rgba(255,171,64,${alpha})`
                : `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base deep-space wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.06),transparent_48%)]" />

      {/* Aurora layers */}
      <div className="absolute inset-0 aurora-sweep" />
      <div className="absolute inset-0 aurora-sweep opacity-60 [animation-delay:-8s] [transform:scaleX(-1)]" />

      {/* Animated gradient orbs */}
      <div className="absolute -left-40 top-[-8rem] h-[42rem] w-[42rem] animate-orb rounded-full bg-cyan-400/10 blur-[140px]" />
      <div className="absolute -right-44 top-1/4 h-[40rem] w-[40rem] animate-orb rounded-full bg-orange-500/[0.08] blur-[150px] [animation-delay:-7s]" />
      <div className="absolute bottom-[-12rem] left-1/2 h-[36rem] w-[36rem] animate-orb rounded-full bg-white/[0.05] blur-[130px] [animation-delay:-13s]" />

      {/* Technical grids */}
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="code-scroll absolute inset-[-40%]" />

      {/* Floating sparkles */}
      <div className="absolute left-[12%] top-[22%] h-2 w-2 animate-float rounded-full bg-cyan-300/70 shadow-[0_0_22px_6px_rgba(34,211,238,0.35)]" />
      <div className="absolute right-[18%] top-[30%] h-1.5 w-1.5 animate-float-slow rounded-full bg-white/70 shadow-[0_0_18px_5px_rgba(255,255,255,0.3)]" />
      <div className="absolute bottom-[24%] left-[26%] h-1.5 w-1.5 animate-float rounded-full bg-orange-400/70 shadow-[0_0_18px_5px_rgba(255,122,24,0.35)] [animation-delay:-3s]" />
      <div className="absolute right-[30%] bottom-[18%] h-2 w-2 animate-float-slow rounded-full bg-cyan-300/60 shadow-[0_0_20px_6px_rgba(34,211,238,0.3)] [animation-delay:-5s]" />

      {/* Shooting stars handled on canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" />

      {/* Vignette to focus content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.7)_100%)]" />
    </div>
  );
}
