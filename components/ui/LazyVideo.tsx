"use client";

import { useRef, useState, useEffect, type VideoHTMLAttributes } from "react";

interface LazyVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  rootMargin?: string;
}

export function LazyVideo({ rootMargin = "200px", autoPlay, ...props }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    if (autoPlay) {
      el.play().catch(() => {});
    }
  }, [inView, autoPlay]);

  return (
    <video
      ref={ref}
      {...props}
      preload={inView ? "auto" : "none"}
      autoPlay={inView && autoPlay}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
