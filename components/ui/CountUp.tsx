"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({ value, suffix = "", duration = 1.8, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  useEffect(() => {
    const el = ref.current;
    // Show real values in server HTML and avoid per-frame React updates on phones.
    if (!el || !isInView || duration <= 0 ||
      !window.matchMedia("(min-width: 769px) and (prefers-reduced-motion: no-preference)").matches) return;
    const startTime = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      el.textContent = `${Math.round((1 - Math.pow(1 - progress, 3)) * value)}${suffix}`;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); el.textContent = `${value}${suffix}`; };
  }, [isInView, value, suffix, duration]);
  return <span ref={ref} className={className}>{value}{suffix}</span>;
}
