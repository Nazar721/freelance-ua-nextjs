"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
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

function useIsMobile() {
  // Start false so SSR and the first client render match (hydration-safe);
  // the real viewport value applies right after mount.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

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
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: isMobile ? "-40px 0px" : "-80px 0px" });

  if (shouldReduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  // Mobile: simplified animation — only opacity + y, no blur/rotateX, shorter duration.
  // filter is pinned to blur(0px) on purpose: SSR renders the desktop branch with
  // filter: blur(Npx) inline, and without an explicit client-side value React
  // hydration leaves that orphan style applied — content stays permanently blurred.
  if (isMobile) {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={style}
        initial={{ opacity: 0, y: y > 0 ? 16 : 0, filter: "blur(0px)" }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: y > 0 ? 16 : 0, filter: "blur(0px)" }
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
