"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { brands } from "@/data/brands";
import { FadeIn } from "@/components/ui/FadeIn";
import { useTranslation } from "@/lib/LanguageContext";

function LogoSet() {
  return (
    <>
      {brands.map((brand, i) => (
        <div key={`a-${i}`} className="flex items-center justify-center shrink-0" style={{ width: 220, height: 60 }}>
          <Image
            src={brand.logo}
            alt={brand.name}
            width={180}
            height={70}
            className="trusted-partners__logo"
            style={{ width: "auto", height: "60px", maxWidth: 180 }}
          />
        </div>
      ))}
    </>
  );
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  phase: number;
  phaseSpeed: number;
  driftRadiusX: number;
  driftRadiusY: number;
  animated: boolean;
  r: number;
  g: number;
  b: number;
  glowSize: number;
}

function createParticles(count: number, animatedRatio: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const x = 0.03 + Math.random() * 0.94;
    const y = 0.25 + Math.random() * 0.65;
    const isPurple = i % 7 === 0;
    const isBlue = !isPurple && i % 4 === 0;
    const isAnimated = i < count * animatedRatio;
    particles.push({
      x, y, baseX: x, baseY: y,
      size: 0.6 + Math.random() * 2.2,
      opacity: 0.3 + Math.random() * 0.6,
      baseOpacity: 0.3 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: isAnimated ? 0.002 + Math.random() * 0.004 : 0,
      driftRadiusX: isAnimated ? 0.02 + Math.random() * 0.04 : 0,
      driftRadiusY: isAnimated ? 0.015 + Math.random() * 0.03 : 0,
      animated: isAnimated,
      r: isPurple ? 139 : isBlue ? 99 : 255,
      g: isPurple ? 92 : isBlue ? 102 : 255,
      b: isPurple ? 246 : isBlue ? 241 : 255,
      glowSize: isPurple ? 6 : isBlue ? 5 : 3,
    });
  }
  return particles;
}

export default function TrustedBySection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = section.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (canvas.width !== w * 2 || canvas.height !== h * 2) {
      canvas.width = w * 2;
      canvas.height = h * 2;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(2, 2);
    }

    ctx.clearRect(0, 0, w, h);

    for (const p of particlesRef.current) {
      if (p.animated) {
        p.phase += p.phaseSpeed;
        p.x = p.baseX + Math.sin(p.phase) * p.driftRadiusX + Math.cos(p.phase * 0.7) * p.driftRadiusX * 0.6;
        p.y = p.baseY + Math.cos(p.phase * 1.3) * p.driftRadiusY + Math.sin(p.phase * 0.5) * p.driftRadiusY * 0.5;
        p.opacity = p.baseOpacity * (0.3 + 0.7 * Math.abs(Math.sin(p.phase * 2)));
      } else {
        p.opacity = p.baseOpacity * (0.15 + 0.15 * Math.sin(p.phase * 0.05));
        p.phase += 0.0003;
      }

      const px = p.x * w;
      const py = p.y * h;

      const grad = ctx.createRadialGradient(px, py, 0, px, py, p.size + p.glowSize);
      grad.addColorStop(0, `rgba(${p.r},${p.g},${p.b},${p.opacity})`);
      grad.addColorStop(0.4, `rgba(${p.r},${p.g},${p.b},${p.opacity * 0.4})`);
      grad.addColorStop(1, `rgba(${p.r},${p.g},${p.b},0)`);

      ctx.beginPath();
      ctx.arc(px, py, p.size + p.glowSize, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    animRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    particlesRef.current = createParticles(250, 0.5);
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  return (
    <section ref={sectionRef} className="relative px-4 pt-12 overflow-hidden" style={{ background: "transparent" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>

        {/* Atmospheric purple glow */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "20%",
            height: "60%",
            background: `
              radial-gradient(ellipse 65% 50% at 50% 75%, rgba(99,102,241,0.5), transparent 50%),
              radial-gradient(ellipse 50% 40% at 50% 80%, rgba(139,92,246,0.4), transparent 45%),
              radial-gradient(ellipse 80% 35% at 50% 85%, rgba(99,102,241,0.3), transparent 40%)
            `,
          }}
        />

        {/* HORIZON LINE */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "58%",
            height: "2px",
            background: "linear-gradient(90deg, transparent 5%, rgba(99,102,241,0.2) 15%, rgba(139,92,246,0.4) 50%, rgba(99,102,241,0.2) 85%, transparent 95%)",
            boxShadow: "0 0 15px rgba(99,102,241,0.3), 0 0 40px rgba(99,102,241,0.15)",
          }}
        />

        {/* Canvas particles — never stops */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Left glow */}
        <div
          className="absolute rounded-full"
          style={{
            left: isMobile ? "0%" : "3%",
            top: "15%",
            width: isMobile ? 60 : 120,
            height: isMobile ? 60 : 120,
            background: "radial-gradient(circle, rgba(255,255,255,0.6), rgba(99,102,241,0.3) 40%, transparent 70%)",
            filter: "blur(35px)",
          }}
        />

        {/* Right glow */}
        <div
          className="absolute rounded-full"
          style={{
            right: isMobile ? "0%" : "3%",
            top: "10%",
            width: isMobile ? 50 : 100,
            height: isMobile ? 50 : 100,
            background: "radial-gradient(circle, rgba(255,255,255,0.5), rgba(139,92,246,0.25) 40%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* Dark curved surface */}
        <div
          className="absolute"
          style={{
            left: "-30%",
            right: "-30%",
            bottom: 0,
            height: "42%",
            background: "linear-gradient(to bottom, rgba(5,5,10,0.9), #050508)",
            borderRadius: "50% 50% 0 0 / 22% 22% 0 0",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl">
        <FadeIn className="text-center">
          <h2 className="text-2xl font-bold leading-tight text-[#F8F8FF] sm:text-3xl md:text-4xl">
            <span className="text-[#6366F1]">{t("trusted.title")}</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.12} className="trusted-partners mt-7">
          <div className="trusted-partners__track-wrapper">
            <div className="trusted-partners__track">
              <LogoSet />
            </div>
            <div className="trusted-partners__track" aria-hidden>
              <LogoSet />
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="h-28 sm:h-36" />
    </section>
  );
}
