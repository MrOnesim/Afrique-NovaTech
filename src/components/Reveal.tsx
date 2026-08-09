import { motion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";

type Props = Omit<
  ComponentProps<typeof motion.div>,
  "initial" | "whileInView" | "viewport" | "transition"
> & {
  children: ReactNode;
  delay?: number;
  y?: number;
};

export default function Reveal({ children, delay = 0, y = 28, className, ...rest }: Props) {
  return (
    <motion.div
      {...rest}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
