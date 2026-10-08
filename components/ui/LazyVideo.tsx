"use client";

import { useRef, useState, useEffect, type VideoHTMLAttributes } from "react";

interface LazyVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  rootMargin?: string;
}

export function LazyVideo({ rootMargin = "200px", autoPlay, src, ...props }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [nearView, setNearView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const loader = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNearView(true); loader.disconnect(); }
    }, { rootMargin });
    loader.observe(el);
    return () => loader.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !nearView || !autoPlay) return;
    let visible = false;
    const syncPlayback = () => {
      if (visible && !document.hidden) el.play().catch(() => {});
      else el.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(el);
    el.addEventListener("canplay", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      el.removeEventListener("canplay", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      el.pause();
    };
  }, [nearView, autoPlay]);

  return <video ref={ref} {...props} src={nearView ? src : undefined}
    preload={nearView ? (autoPlay ? "auto" : "metadata") : "none"}
    draggable={false} onContextMenu={(e) => e.preventDefault()} />;
}
