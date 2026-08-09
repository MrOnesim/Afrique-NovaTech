import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Segment = {
  text: string;
  className?: string;
  break?: boolean;       // line break before this segment
};

type Props = {
  segments: Segment[];
  speed?: number;         // ms per character
  startDelay?: number;    // ms before typing starts
  cursorColor?: string;
  className?: string;
};

/**
 * Typewriter that types through multiple styled segments one char at a time,
 * with a blinking cursor at the end.
 */
export default function Typewriter({
  segments,
  speed = 55,
  startDelay = 600,
  className = "",
}: Props) {
  // Flatten all chars with their segment index
  const chars = segments.flatMap((seg, si) =>
    seg.text.split("").map((ch) => ({ ch, si, br: false }))
  );
  // Insert a break marker before the first char of segments that have `break`
  const withBreaks: { ch: string; si: number; br: boolean }[] = [];
  let segStart = 0;
  for (let si = 0; si < segments.length; si++) {
    const len = segments[si].text.length;
    for (let ci = 0; ci < len; ci++) {
      const globalIdx = segStart + ci;
      withBreaks.push({
        ...chars[globalIdx],
        br: segments[si].break === true && ci === 0,
      });
    }
    segStart += len;
  }

  const total = withBreaks.length;
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || count >= total) return;
    const t = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [started, count, total, speed]);

  // Build rendered nodes
  const rendered: React.ReactNode[] = [];
  let segCharStart = 0;

  for (let si = 0; si < segments.length; si++) {
    const seg = segments[si];
    const segLen = seg.text.length;
    const visibleInSeg = Math.max(0, Math.min(segLen, count - segCharStart));

    if (visibleInSeg > 0) {
      if (seg.break) {
        rendered.push(<br key={`br-${si}`} />);
      }
      rendered.push(
        <span key={si} className={seg.className}>
          {seg.text.slice(0, visibleInSeg)}
        </span>
      );
    }

    segCharStart += segLen;
  }

  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {rendered}
      {/* Blinking cursor */}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] rounded-full bg-white align-middle sm:w-[4px]"
      />
    </motion.h1>
  );
}
