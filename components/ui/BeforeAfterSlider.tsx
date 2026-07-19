"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc?: string;
  afterVideo?: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc = "",
  afterVideo,
  beforeAlt = "Code",
  afterAlt = "Website",
  className = "",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [hasAutoplayed, setHasAutoplayed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || hasAutoplayed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAutoplayed) {
          const duration = 2800;
          const start = 30;
          const end = 70;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Smooth ease-in-out-cubic
            const eased = progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            setPosition(start + (end - start) * eased);

            if (progress < 1) {
              rafRef.current = requestAnimationFrame(animate);
            } else {
              setHasAutoplayed(true);
            }
          };

          rafRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(wrapper);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [hasAutoplayed]);

  // Try to play video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const getPositionFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    return Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      setPosition(getPositionFromClientX(e.clientX));
    },
    [getPositionFromClientX],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      setPosition(getPositionFromClientX(e.touches[0].clientX));
    },
    [getPositionFromClientX],
  );

  const isVideo = !!afterVideo;

  return (
    <div ref={wrapperRef}>
      <div
        ref={containerRef}
        className={`relative w-full aspect-[16/10] rounded-xl overflow-hidden select-none bg-[#0A0A0F] cursor-ew-resize ${className}`}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After (image or video) - fills entire container */}
        {isVideo ? (
          <video
            ref={videoRef}
            src={afterVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-contain"
          />
        ) : (
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            sizes="(max-width: 768px) 100vw, 65vw"
            quality={90}
            className="object-cover"
            draggable={false}
          />
        )}

        {/* Before image (clipped from right) - fills entire container */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes="(max-width: 768px) 100vw, 65vw"
            quality={90}
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white/80 pointer-events-none z-10"
          style={{
            left: `${position}%`,
            transform: "translateX(-50%)",
            boxShadow: "0 0 12px rgba(255,255,255,0.4)",
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border-2 border-white flex items-center justify-center pointer-events-none"
            style={{ boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M6 3L2 9L6 15"
                stroke="#1A1A24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 3L16 9L12 15"
                stroke="#1A1A24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
