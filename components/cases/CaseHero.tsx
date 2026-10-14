"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { CaseRecord, ResolveText } from "@/data/case-records";
import { FullscreenVideo, VideoTiles } from "./CaseMedia";

/**
 * Hero shared by every reworked case: category eyebrow (+ optional format
 * pill), H1, lead and the framed media block with the scroll-linked reveal.
 *
 * The three original pages used three slightly different motion parameter
 * sets for the same effect; the shared component uses one set, and renders
 * the frame statically when the visitor prefers reduced motion.
 */
export default function CaseHero({ record, L }: { record: CaseRecord; L: ResolveText }) {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [fullscreen, setFullscreen] = useState<{ src: string; opener: HTMLElement | null } | null>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.65, 1.05]);
  const y = useTransform(scrollYProgress, [0, 0.6], [150, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.2, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.6], [12, 0]);

  const hero = record.hero;
  const glow = record.glow;

  let media: React.ReactNode = null;
  if (hero.kind === "image") {
    media = (
      <Image
        src={hero.src}
        alt={hero.alt ? L(hero.alt) : L(record.h1)}
        width={hero.w}
        height={hero.h}
        className="mx-auto w-full max-w-5xl rounded-xl object-contain"
        draggable={false}
        priority={hero.priority}
      />
    );
  } else if (hero.kind === "imageGrid") {
    media = (
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 md:gap-6 md:p-10">
        {hero.items.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl bg-black shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          >
            {"video" in item ? (
              // A video tile: a real <video>, not next/image — the optimizer
              // answers video sources with 400. Clicking opens the shared
              // fullscreen player, exactly as the original page did.
              <button
                type="button"
                data-case-block="hero-video-tile"
                className="block w-full cursor-pointer"
                onClick={(event) => setFullscreen({ src: item.src, opener: event.currentTarget })}
                aria-label={L(record.h1)}
              >
                <video
                  src={item.src}
                  className="h-auto w-full object-cover"
                  style={{ aspectRatio: hero.ratio ?? "9/16", maxHeight: "560px" }}
                  muted
                  preload="metadata"
                  playsInline
                />
              </button>
            ) : (
              <Image
                src={item.src}
                alt={item.alt ? L(item.alt) : L(record.h1)}
                width={item.w ?? 1200}
                height={item.h ?? 800}
                className="h-auto w-full object-cover"
                draggable={false}
                priority={index === 0}
              />
            )}
          </div>
        ))}
      </div>
    );
    // Hero videos get the shared player, exactly like the section grids do.
    if (fullscreen) {
      media = (
        <>
          {media}
          <FullscreenVideo src={fullscreen.src} opener={fullscreen.opener} onClose={() => setFullscreen(null)} />
        </>
      );
    }
  } else if (hero.kind === "video") {
    // One interactive tile, same contract as the video grids: a real button
    // with a localized name, the duration/format badges from the record and
    // the shared fullscreen player (reported defect: the old static <video>
    // ignored every click and had no player at all).
    // Portrait tiles keep the phone-frame width; landscape reels (16:9) get
    // the wider frame the original pages drew (maccoudi, telegram).
    const tileRatio = hero.ratio ?? "9/16";
    media = (
      <VideoTiles
        items={[{ src: hero.src, poster: hero.poster, duration: hero.duration, format: hero.format }]}
        ratio={tileRatio}
        L={L}
        // The tile shows the lighter `src` preview; the player opens the
        // fuller `fullSrc` when the page kept a separate full file.
        onOpen={(src, opener) => setFullscreen({ src: (hero.fullSrc ?? src).split("#")[0], opener })}
        className={
          tileRatio === "9/16"
            ? "mx-auto grid w-full max-w-[315px] grid-cols-1"
            : "mx-auto grid w-full max-w-3xl grid-cols-1"
        }
      />
    );
  } else if (hero.kind === "videoGrid") {
    media = (
      <VideoTiles
        items={hero.items}
        ratio={hero.ratio ?? "9/16"}
        L={L}
        onOpen={(src, opener) => setFullscreen({ src: src.split("#")[0], opener })}
        className={
          hero.items.length >= 3
            ? "grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5"
            : "grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
        }
      />
    );
  }

  return (
    <section ref={heroRef} className="overflow-hidden py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn y={30} blur={8}>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {record.badge && (
              <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {L(record.badge)}
              </span>
            )}
            {record.pill && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EAB308]/20 bg-[#EAB308]/10 px-3 py-1 text-xs font-semibold text-[#EAB308]">
                <Play size={12} />
                {L(record.pill)}
              </span>
            )}
          </div>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            {L(record.h1)}
          </h1>
          {record.subtitle && (
            <p className="mb-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {L(record.subtitle)}
            </p>
          )}
          {record.lead && (
            <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {L(record.lead)}
            </p>
          )}
        </FadeIn>

        <div
          data-case-block="hero"
          className="featured-case-card relative rounded-2xl border border-border"
          style={
            glow
              ? ({
                  "--case-glow": glow.base,
                  "--case-glow-strong": glow.strong,
                } as React.CSSProperties)
              : undefined
          }
        >
          {reduceMotion ? (
            <div className="mx-auto w-full max-w-5xl">{media}</div>
          ) : (
            <motion.div
              className="w-full max-w-5xl mx-auto"
              style={{ scale, y, opacity, rotateX, perspective: 1200 }}
            >
              {media}
            </motion.div>
          )}
        </div>
      </div>

      {fullscreen && (
        <FullscreenVideo src={fullscreen.src} opener={fullscreen.opener} onClose={() => setFullscreen(null)} />
      )}
    </section>
  );
}
