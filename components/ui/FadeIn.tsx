"use client";

import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { motion, useInView } from "framer-motion";

import { useIsMobile } from "@/lib/useIsMobile";

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
  className,
  style,
  ...rest
}: FadeInProps) {
  // Keep the legacy blur prop out of the DOM; reveals use compositor-friendly properties only.
  delete rest.blur;
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: isMobile ? "-40px 0px" : "-80px 0px" });

  if (shouldReduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  // Phones use a shorter reveal without filter or 3D rotation.
  if (isMobile) {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={style}
        initial={{ opacity: 0, y: y > 0 ? 16 : 0 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: y > 0 ? 16 : 0 }
        }
        transition={{
          duration: 0.55,
          delay: Math.min(delay, 0.3),
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        {...rest}
      >
        {children}
      </motion.div>
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
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              rotateX: 0,
            }
          : {
              opacity: 0,
              y,
              x,
              scale: scale < 1 ? scale : 1,
              rotateX,
            }
      }
      transition={{
        duration: 1.1,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
