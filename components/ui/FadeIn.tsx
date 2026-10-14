"use client";

import { useRef, type ElementType, type ReactNode } from "react";
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
  /** Element the wrapper renders as. Pass "li" directly inside a <ul>/<ol> so
   *  the animated node IS the list item — a <div> between <ul> and <li> is
   *  invalid HTML and breaks list semantics for assistive tech. */
  as?: "div" | "li";
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
  as = "div",
  ...rest
}: FadeInProps) {
  // Keep the legacy blur prop out of the DOM; reveals use compositor-friendly properties only.
  delete rest.blur;
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: isMobile ? "-40px 0px" : "-80px 0px" });
  const MotionTag: ElementType = as === "li" ? motion.li : motion.div;

  if (shouldReduceMotion) {
    const StaticTag: ElementType = as;
    // The remaining props (data-*, aria-*) must survive here too — they were
    // silently dropped, so a caller could not mark its static node at all.
    // `data-reveal` marks the node in BOTH branches: under reduced motion the
    // checker asserts that every revealed node is fully visible and unblurred.
    return (
      <StaticTag className={className} style={style} data-reveal="static" {...rest}>
        {children}
      </StaticTag>
    );
  }

  // Phones use a shorter reveal without filter or 3D rotation.
  if (isMobile) {
    return (
      <MotionTag
        ref={ref}
        className={className}
        data-reveal="motion"
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
      </MotionTag>
    );
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      data-reveal="motion"
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
    </MotionTag>
  );
}
