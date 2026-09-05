"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslation } from "@/lib/LanguageContext";

/* Mouse-follow glow/parallax is a desktop-only affordance. Touch taps fire
   synthetic mouse events (iOS sticky hover) that would shift the media — so
   handlers no-op unless the device truly supports hover with a fine pointer. */
const supportsHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export interface VideoCaseCardProps {
  categoryKey: string;
  titleKey: string;
  descriptionKey: string;
  href?: string;
  glowColor: string;
  glowColorStrong: string;
  video: string;
  thumbnail?: string;
  poster?: string;
  duration?: string;
  format?: string;
  ctaKey?: string;
  comingSoonKey?: string;
  preload?: boolean;
  hideCta?: boolean;
}

export default function VideoCaseCard({
  categoryKey,
  titleKey,
  descriptionKey,
  href,
  glowColor,
  glowColorStrong,
  video,
  thumbnail,
  poster,
  duration,
  format,
  ctaKey = "itCases.cta",
  comingSoonKey,
  preload,
  hideCta = false,
}: VideoCaseCardProps) {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const smoothY = useSpring(mouseY, springConfig);

  const mockupY = useTransform(smoothY, [0, 1], [-3, 3]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!supportsHover()) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
      cardRef.current?.style.setProperty("--glow-x", `${x * 100}%`);
      cardRef.current?.style.setProperty("--glow-y", `${y * 100}%`);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    if (!supportsHover()) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
    cardRef.current?.style.setProperty("--glow-x", "50%");
    cardRef.current?.style.setProperty("--glow-y", "30%");
  }, [mouseX, mouseY]);

  const isPlaceholder = !href;

  const boostedGlow = glowColor.replace(/[\d.]+\)$/, (m) => `${Math.min(parseFloat(m) * 1.8, 0.7)} )`);
  const boostedGlowStrong = glowColorStrong.replace(/[\d.]+\)$/, (m) => `${Math.min(parseFloat(m) * 1.8, 0.8)} )`);

  return (
    <motion.div
      ref={cardRef}
      className={`featured-case-card relative group h-full flex flex-col rounded-2xl overflow-hidden bg-card/80 border border-border ${isPlaceholder ? "" : "cursor-pointer"}`}
      style={
        {
          "--case-glow": boostedGlow,
          "--case-glow-strong": boostedGlowStrong,
        } as React.CSSProperties
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 lg:p-14 flex flex-col flex-1">
        {/* Category */}
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/50 dark:text-muted-foreground mb-5">
            {t(categoryKey)}
          </span>

        {/* Title */}
        <h3 className="case-card-title text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
          {t(titleKey)}
        </h3>

        {/* Video Preview */}
        <motion.div
          className={`relative w-full flex items-center justify-center h-[260px] md:h-[320px]`}
          style={{ y: mockupY }}
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-background">
            {href ? (
              <Link href={href} className="block w-full h-full">
                <video
                  src={video}
                  poster={poster}
                  className="w-full h-full object-cover object-top"
                  style={{ objectPosition: "center 30%" }}
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Video preview"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] group-hover:scale-110 transition-all duration-300">
                    <Play size={24} className="text-white ml-1" fill="white" />
                  </div>
                </div>
              </Link>
            ) : (
              <>
                <video
                  src={video}
                  poster={poster}
                  className="w-full h-full object-cover object-top"
                  style={{ objectPosition: "center 30%" }}
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Video preview"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] group-hover:scale-110 transition-all duration-300">
                    <Play size={24} className="text-white ml-1" fill="white" />
                  </div>
                </div>
              </>
            )}
            {/* Duration & Format badges */}
            {(duration || format) && (
              <div className="absolute top-3 right-3 flex gap-2">
                {duration && (
                  <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/20">
                    {duration}
                  </span>
                )}
                {format && (
                  <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/20">
                    {format}
                  </span>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Hover overlay — description + CTA at bottom of card */}
      <div className="case-hover-content absolute bottom-[1px] left-[1px] right-[1px] rounded-b-2xl p-6 md:p-8 lg:p-10 pt-16 z-20 bg-gradient-to-t from-card via-card/95 to-card/60 backdrop-blur-sm">
        <p className="text-foreground/80 dark:text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mb-3">
          {t(descriptionKey)}
        </p>
        {!hideCta && href ? (
          <Link
            href={href}
            className="inline-flex items-center gap-3 text-foreground font-semibold text-sm group/cta w-fit border border-border rounded-full px-6 py-3 transition-all duration-300 hover:border-accent hover:bg-accent/5"
          >
            <span>{t(ctaKey)}</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/cta:translate-x-1"
            />
          </Link>
        ) : comingSoonKey ? (
          <span className="inline-flex items-center gap-3 text-foreground/60 dark:text-muted-foreground font-semibold text-sm w-fit border border-border rounded-full px-6 py-3">
            {t(comingSoonKey)}
          </span>
        ) : null}
      </div>
    </motion.div>
  );
}
