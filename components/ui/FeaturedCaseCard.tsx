"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslation } from "@/lib/LanguageContext";
import Badge, { type BadgeProps } from "./Badge";

export interface FeaturedCaseCardProps {
  categoryKey: string;
  titleKey: string;
  descriptionKey: string;
  href?: string;
  glowColor: string;
  glowColorStrong: string;
  image: string;
  hoverImage?: string;
  galleryImages?: string[];
  ctaKey?: string;
  comingSoonKey?: string;
  preload?: boolean;
  imageFit?: "cover" | "contain";
  objectPosition?: string;
  hideCta?: boolean;
  badge?: {
    text: string;
    variant?: BadgeProps["variant"];
    animation?: BadgeProps["animation"];
    icon?: React.ReactNode;
  };
}

export default function FeaturedCaseCard({
  categoryKey,
  titleKey,
  descriptionKey,
  href,
  glowColor,
  glowColorStrong,
  image,
  hoverImage,
  galleryImages,
  ctaKey = "cases.cta",
  comingSoonKey,
  preload,
  imageFit = "cover",
  objectPosition = "center",
  hideCta = false,
  badge,
}: FeaturedCaseCardProps) {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const smoothY = useSpring(mouseY, springConfig);

  const mockupY = useTransform(smoothY, [0, 1], [-3, 3]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
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
      className={`featured-case-card relative group flex flex-col rounded-2xl overflow-hidden bg-card/80 border border-border ${isPlaceholder ? "" : "cursor-pointer"}`}
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
      <div className="relative z-10 p-8 md:p-10 lg:p-12 flex flex-col">
        {/* Category + Badge row */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground/50 dark:text-muted-foreground">
            {t(categoryKey)}
          </span>
          {badge && (
            <Badge
              variant={badge.variant ?? "gradient"}
              animation={badge.animation ?? "glow"}
              size="xs"
              icon={badge.icon}
            >
              {badge.text}
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="case-card-title text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
          {t(titleKey)}
        </h3>

        {/* Preview image — right after title */}
        {galleryImages && galleryImages.length > 1 ? (
          <motion.div
            className="relative w-full aspect-[3/2]"
            style={{ y: mockupY }}
          >
            <div className={`grid gap-2 h-full ${galleryImages.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
              {galleryImages.slice(0, 3).map((src, i) => (
                <div key={src} className="relative overflow-hidden rounded-xl">
                  <Image
                    src={src}
                    alt={t(titleKey)}
                    width={600}
                    height={800}
                    className="w-full h-full object-cover object-center"
                    draggable={false}
                    preload={i === 0 && preload}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="relative w-full flex items-center justify-center aspect-[3/2]"
            style={{ y: mockupY }}
          >
            <Image
              src={image}
              alt={t(titleKey)}
              width={1200}
              height={800}
              className={`case-mockup-image w-full h-full ${imageFit === "contain" ? "object-contain" : "object-cover"} rounded-xl ${isPlaceholder ? "opacity-40 grayscale" : ""}`}
              style={imageFit !== "contain" ? { objectPosition } : undefined}
              draggable={false}
              preload={preload}
            />
            {hoverImage ? (
              <Image
                src={hoverImage}
                alt=""
                width={1200}
                height={800}
                className={`case-mockup-hover-image absolute inset-0 w-full h-full ${imageFit === "contain" ? "object-contain object-[center_35%]" : "object-cover object-center"} rounded-xl`}
                draggable={false}
              />
            ) : null}
          </motion.div>
        )}
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
