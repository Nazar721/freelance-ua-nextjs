"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  rotateX?: number;
  blur?: number;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
};

export function FadeIn({
  children,
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  rotateX = 0,
  blur = 6,
  className,
  style,
  ...rest
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ perspective: rotateX ? 800 : undefined, ...style }}
      initial={{
        opacity: 0,
        y,
        x,
        scale: scale < 1 ? scale : 1,
        rotateX,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)",
            }
          : {
              opacity: 0,
              y,
              x,
              scale: scale < 1 ? scale : 1,
              rotateX,
              filter: blur > 0 ? `blur(${blur}px)` : undefined,
            }
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
