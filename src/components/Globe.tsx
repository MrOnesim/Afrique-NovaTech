import { motion, MotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface GlobeProps {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}

type Poly = [number, number][];

const CONTINENTS: Poly[] = [
  [
    [-17.5, 14.7], [-16.2, 12], [-13.5, 9], [-11.5, 7], [-8, 5], [-5, 4.6], [-4, 5.2],
    [0, 5.7], [3.2, 6.3], [6.5, 4.6], [9.2, 4.2], [13.2, 0.5], [12.5, -4.5], [12, -8.5],
    [13.6, -12], [14.8, -17], [14.3, -21.5], [16.8, -26], [18.3, -32], [20.2, -34.8],
    [28.5, -32.5], [32, -27.5], [35.5, -22.5], [35.8, -18], [39.5, -14.5], [38.5, -9.5],
    [41, -2.8], [44.5, 1.2], [47.5, 4], [51.2, 10.5], [48.8, 13.5], [44.2, 12.2],
    [43.3, 17.5], [36.5, 18.5], [33.3, 22.5], [33, 28.5], [34.8, 31.2], [31, 31.5],
    [26.5, 32.8], [20.5, 33], [15, 32.5], [11.2, 33.5], [10, 37], [5, 36.2], [0, 35.8],
    [-2.2, 34.6], [-6, 33.8], [-9.5, 31], [-13, 28], [-15.8, 23.5], [-17, 20.5],
    [-17.5, 14.7],
  ],
  [
    [-168, 66], [-163, 59], [-156, 58.5], [-149, 60], [-140, 59.5], [-132, 56.5],
    [-127.5, 52], [-125.5, 48.5], [-124.2, 42], [-122, 38], [-117.5, 33], [-113.5, 29.5],
    [-110.5, 25], [-108, 24], [-105.5, 21.5], [-105, 18.5], [-102, 16.5], [-98, 16],
    [-95, 17.5], [-92, 15], [-89, 13.5], [-85, 12], [-81, 9.5], [-77.5, 8.3],
    [-75.5, 9.5], [-76.5, 11], [-78.5, 12.5], [-81.5, 15.5], [-83.5, 19], [-82, 22.5],
    [-84.5, 25.5], [-88.5, 28.5], [-93, 29.5], [-97.5, 31.5], [-101, 32], [-105, 32.5],
    [-109, 32], [-113, 31], [-117, 32.5], [-119, 34], [-121, 35], [-122.5, 37.5],
    [-123.5, 40], [-124.5, 43], [-125, 46], [-125.5, 48.5], [-128, 50.5], [-131.5, 55.5],
    [-136.5, 59], [-145, 60.5], [-151, 58.5], [-158, 56.5], [-164, 55], [-166.5, 60],
    [-166, 63.5], [-168, 66],
  ],
  [
    [-68, 60], [-55, 64], [-45, 68], [-38, 72], [-30, 76], [-22, 79], [-15, 81],
    [-10, 78], [-15, 75], [-20, 73], [-27, 70], [-35, 67], [-43, 64], [-52, 61],
    [-63, 60], [-68, 60],
  ],
  [
    [-79, 8], [-75, 11.5], [-71, 12], [-66, 11], [-62, 10], [-57.5, 6.5], [-53, -0.5],
    [-51, -5], [-46, -7], [-40, -9], [-36, -12], [-37, -15], [-39, -19], [-42, -23],
    [-46, -26], [-50, -29], [-54, -34], [-57, -37], [-61, -40], [-65, -45], [-68, -48],
    [-70, -50], [-72, -49], [-72, -45], [-70, -40], [-70, -35], [-70, -30], [-70, -25],
    [-72, -20], [-76, -14], [-79, -8], [-81, -3], [-80, 0], [-78, 4], [-77, 6], [-79, 8],
  ],
  [
    [-9.5, 43.5], [-8.9, 37], [-5.5, 36.1], [-1.5, 37.5], [3.2, 41.5], [7.5, 43.5],
    [11, 44], [13.5, 45.5], [15.5, 44], [19.5, 40.5], [20.5, 37.5], [24, 35.8],
    [27.5, 36.5], [30.5, 36.3], [33, 36], [35, 36.5], [38, 37], [35.5, 33], [34.6, 31.5],
    [34.9, 29.5], [37, 24.5], [38.5, 20], [41, 15], [43, 12.8], [45, 13], [47, 14.5],
    [49, 16], [52, 17.5], [54, 17], [56.5, 18], [58, 20], [57.5, 23.5], [56.5, 26.8],
    [53, 27.5], [50.5, 29.5], [48.5, 30.5], [47.5, 29.5], [48, 31], [50.5, 30.5],
    [53.5, 29], [56.8, 26.8], [60, 25], [62, 25], [65.5, 25], [68, 24.5], [70, 23],
    [72, 21], [74, 19], [77, 9.5], [79, 8.5], [80, 14.5], [81, 19], [83, 21], [86, 21],
    [88, 21.5], [90, 22], [92, 22], [94, 20], [96, 16.5], [98, 15], [99, 12], [100, 8.5],
    [101.5, 4], [103, 1.2], [104, 1.5], [105, 8], [106.5, 11], [108, 14.5], [109, 19.5],
    [111, 21.5], [114, 22.5], [118, 24], [120, 26], [122, 29], [123, 31], [122, 32.5],
    [121.5, 34], [122.5, 37], [121, 38.5], [119, 40.5], [122, 40.5], [124.5, 39.5],
    [126, 37.5], [129, 35], [131, 37.5], [130.5, 39.5], [131, 42], [133, 43], [135, 44.5],
    [137, 46], [139, 48], [141, 50], [143, 52], [145, 53.5], [148, 55.5], [151, 57],
    [154, 58.5], [157, 60], [160, 61.5], [164, 63], [167, 64.5], [171, 65.5], [175, 66.5],
    [178, 66.5], [-179, 66], [-176, 66], [-173, 66.5], [-170, 66], [-169.5, 68.5],
    [-168, 69.5], [-165, 70], [-160, 70.5], [-155, 70.5], [-150, 71], [-145, 71],
    [-140, 71], [-135, 71], [-130, 70.5], [-125, 70.5], [-120, 71], [-115, 72],
    [-110, 73], [-105, 73.5], [-100, 73.5], [-95, 73.5], [-90, 73], [-85, 73], [-80, 72],
    [-75, 72.5], [-70, 72.5], [-65, 72], [-60, 71.5], [-55, 70.5], [-50, 70], [-45, 69],
    [-40, 69], [-35, 69.5], [-30, 70], [-25, 71.5], [-20, 72], [-15, 72.5], [-10, 72.5],
    [-5, 71.5], [0, 70.5], [5, 70], [10, 69.5], [15, 69], [20, 68.5], [25, 68],
    [30, 67.5], [35, 66.5], [40, 65.5], [45, 65], [50, 65.5], [55, 65.5], [60, 66],
    [65, 65.5], [70, 65], [75, 65.5], [80, 64.5], [85, 64], [90, 63.5], [95, 62.5],
    [100, 61.5], [105, 62], [110, 62], [115, 62], [120, 61.5], [125, 61], [130, 60.5],
    [135, 60], [140, 61], [145, 62], [150, 61.5], [155, 60.5], [160, 59.5], [165, 59],
    [168, 58.5], [172, 58.5], [176, 58], [178, 57.5], [180, 58], [180, 60.5],
    [-178, 62], [-176, 64], [-174, 66], [-172, 67.5], [-170, 68.5],
  ],
  [
    [113, -22], [115, -25], [124, -33], [130, -32], [136, -35], [140, -37], [145, -38],
    [147, -42], [150, -38], [153, -32], [153, -27], [151, -24], [146, -20], [143, -16],
    [140, -17], [136, -14], [132, -11], [128, -12], [125, -14], [122, -17], [115, -22],
    [113, -22],
  ],
  [
    [-8, 57], [-5, 59], [-2, 57.5], [-1, 53.5], [-3, 52], [-5, 51], [-4, 50],
    [0, 50.5], [-1, 52], [-4, 52], [-5, 54], [-8, 55], [-8, 57],
  ],
  [
    [130, 31], [131, 34], [134, 34.5], [137, 36.5], [140, 37.5], [140, 40], [141, 42],
    [142, 43], [144, 43.5], [145, 42], [144, 40], [141, 38], [140, 36], [137, 35],
    [134, 33], [131, 31],
  ],
  [
    [140, 42], [141, 44], [143, 45], [145, 44], [145, 42], [140, 42],
  ],
  [
    [95.5, 5.5], [98, 5], [100, 2], [102.5, 0.5], [103, -1], [100, -1.5], [96, -1],
    [94.5, 2.5], [95.5, 5.5],
  ],
  [
    [109, 1.5], [111.5, 2.5], [116, 2.5], [118, 0.5], [118, -2], [114, -3.5],
    [109.5, -2.5], [108.5, 0], [109, 1.5],
  ],
  [
    [105, -6], [108, -7], [111, -7.5], [114, -7], [115, -8.5], [113, -9], [110, -8],
    [106, -7], [105, -6],
  ],
  [
    [119, 1.5], [120, 0], [121, -1.5], [121.5, -4], [120, -5.5], [118, -4],
    [118.5, -1], [119, 1.5],
  ],
  [
    [130.5, -1], [133, -1], [137, -2.5], [141, -3], [146, -5.5], [147, -7], [144, -9],
    [139, -9], [135, -7], [132, -5], [130, -3], [130.5, -1],
  ],
  [
    [119.5, 5], [120.5, 7.5], [121.5, 11], [123, 13], [125, 16], [126, 17.5],
    [124, 18.5], [121.5, 18], [120.5, 15.5], [119.5, 12], [118, 9], [118.5, 6.5],
    [119.5, 5],
  ],
  [
    [43.5, -12], [46, -13.5], [48.5, -16], [48, -20], [45.5, -24], [43, -23], [42, -19],
    [42.5, -15], [43.5, -12],
  ],
  [
    [79.8, 9.5], [80.5, 9], [81.5, 7.5], [81.5, 6], [80.5, 5.8], [79.8, 7], [79.8, 9.5],
  ],
  [
    [173, -36], [176, -37], [177, -38], [176, -40], [174, -40], [172, -37], [173, -36],
  ],
  [
    [168, -44], [171, -42], [173, -41], [173, -43], [170, -46], [167, -46], [168, -44],
  ],
  [
    [-24, 63.5], [-21, 64.5], [-18, 66], [-15, 66], [-13, 64.5], [-15, 63.5],
    [-19, 63.3], [-23, 63.5],
  ],
  [
    [-84.5, 22], [-80, 22.5], [-75, 20.5], [-74, 20], [-78, 19.5], [-82, 21],
    [-84.5, 21.5], [-84.5, 22],
  ],
  [
    [-74, 19.5], [-70, 19.5], [-68.5, 18.5], [-70, 18], [-71.5, 18.5], [-74, 19.5],
  ],
  [
    [144, -40], [146, -41], [148, -42], [147, -43], [145, -43], [144, -41], [144, -40],
  ],
];

const COTONOU = { lon: 2.3912, lat: 6.3703 };

function inPoly(x: number, y: number, poly: Poly): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function isLand(lon: number, lat: number): boolean {
  for (const p of CONTINENTS) {
    if (inPoly(lon, lat, p)) return true;
  }
  return false;
}

let LAND_DOTS: [number, number][] | null = null;
function landDots(): [number, number][] {
  if (LAND_DOTS) return LAND_DOTS;
  const dots: [number, number][] = [];
  const step = 2.6;
  for (let lat = -80; lat <= 80; lat += step) {
    for (let lon = -180; lon < 180; lon += step) {
      if (isLand(lon, lat)) dots.push([lon, lat]);
    }
  }
  LAND_DOTS = dots;
  return dots;
}

export default function Globe({ rotateX, rotateY, parallaxX, parallaxY }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const glowX = useTransform(parallaxX, (v) => `${-v * 24}px`);
  const glowY = useTransform(parallaxY, (v) => `${-v * 24}px`);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    const size = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener("resize", size);

    const R = Math.min(w, h) * 0.42;
    const dots = landDots();
    const tilt = -Math.PI / 6;
    const camD = 3.2;

    const project = (lat: number, lon: number, rot: number) => {
      const pLat = (lat * Math.PI) / 180;
      const pLon = (lon * Math.PI) / 180;
      const x = Math.cos(pLat) * Math.sin(pLon);
      const y = Math.sin(pLat);
      const z = Math.cos(pLat) * Math.cos(pLon);
      const ca = Math.cos(rot);
      const sa = Math.sin(rot);
      const x1 = x * ca + z * sa;
      const z1 = -x * sa + z * ca;
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);
      const y2 = y * ct - z1 * st;
      const z2 = y * st + z1 * ct;
      const f = camD / (camD - z2);
      return { x: w / 2 + x1 * f * R, y: h / 2 + y2 * f * R, z: z2, f };
    };

    const drawRing = (lat: number, rot: number, alpha: number) => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(103,232,249,${alpha})`;
      ctx.lineWidth = 1;
      for (let i = 0; i <= 180; i++) {
        const lon = (i / 180) * 360 - 180;
        const p = project(lat, lon, rot);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    };

    const render = (t: number) => {
      const rot = reduced ? 0 : (t - t0) * 0.000057;
      const pulse = 0.5 + 0.5 * Math.sin((t - t0) / 420);

      ctx.clearRect(0, 0, w, h);

      const pts = dots.map(([lon, lat]) => project(lat, lon, rot)).filter((p) => p.z < camD);
      pts.sort((a, b) => a.z - b.z);

      for (const p of pts) {
        const z = Math.max(-1, Math.min(1, p.z));
        const alpha = 0.06 + Math.max(0, z) * 0.85;
        ctx.beginPath();
        if (z > 0) {
          ctx.fillStyle = z > 0.45 ? `rgba(250,253,255,${alpha})` : `rgba(125,227,255,${alpha})`;
        } else {
          ctx.fillStyle = `rgba(96,139,158,${alpha * 0.7})`;
        }
        ctx.arc(p.x, p.y, 0.9 + Math.max(0, z) * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      drawRing(0, rot, 0.14);
      drawRing(-40, rot, 0.07);
      drawRing(40, rot, 0.07);

      const m = project(COTONOU.lat, COTONOU.lon, rot);
      if (m.z > 0.05) {
        ctx.beginPath();
        ctx.arc(m.x, m.y, 7 + pulse * 7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34,211,238,${0.55 - pulse * 0.3})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.shadowColor = "rgba(34,211,238,0.9)";
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = "#e0fbff";
        ctx.fill();

        ctx.font = "600 13px Inter, system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 10;
        ctx.fillText("Cotonou", m.x, m.y - 16);

        ctx.font = "500 10px Inter, system-ui, sans-serif";
        ctx.fillStyle = "rgba(125,227,255,0.95)";
        ctx.fillText("98MJ+QW", m.x, m.y - 3);
        ctx.shadowBlur = 0;
      }
    };

    const t0 = performance.now();
    let raf = 0;
    const frame = (t: number) => {
      render(t);
      if (!reduced) raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      render(performance.now());
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    };
  }, []);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="relative flex h-96 w-96 items-center justify-center [transform-style:preserve-3d]"
    >
      <motion.div
        style={{ x: glowX, y: glowY, translateZ: "-60px" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="h-80 w-80 rounded-full bg-cyan-400/10 blur-[90px]" />
        <div className="absolute h-64 w-64 rounded-full bg-white/[0.04] blur-[60px]" />
      </motion.div>

      <motion.div style={{ translateZ: "20px" }} className="absolute inset-0">
        <canvas ref={canvasRef} className="h-full w-full" aria-label="Globe lumineux marquant la localisation d'Afrique NovaTech à Cotonou, Bénin" />
      </motion.div>
    </motion.div>
  );
}
