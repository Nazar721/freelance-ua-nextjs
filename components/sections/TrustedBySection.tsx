"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { brands } from "@/data/brands";
import { FadeIn } from "@/components/ui/FadeIn";

function LogoSet() {
  return (
    <>
      {brands.slice(0, 8).map((brand, i) => (
        <div key={`a-${i}`} className="flex items-center shrink-0" style={{ marginRight: 48 }}>
          <Image
            src={brand.logo}
            alt={brand.name}
            width={180}
            height={70}
            className="trusted-partners__logo"
            style={{ width: "auto", height: "60px" }}
          />
        </div>
      ))}
    </>
  );
}

// MANY stars — dense cluster in center, spread outward
const stars = Array.from({ length: 80 }, (_, i) => {
  const isCenter = i < 50;
  const isEdge = i >= 65;
  return {
    id: i,
    x: isCenter ? 15 + Math.random() * 70 : isEdge ? Math.random() * 100 : 5 + Math.random() * 90,
    y: 40 + Math.random() * 40,
    size: isCenter ? (1 + Math.random() * 2) : (0.5 + Math.random() * 1.2),
    delay: Math.random() * 6,
    dur: 2 + Math.random() * 5,
    static: i % 5 === 0, // every 5th star is always visible
  };
});

export default function TrustedBySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= 768);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section ref={sectionRef} className="relative px-4 pt-12 overflow-hidden" style={{ background: "transparent" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>

        {/* Purple glow */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "15%",
            height: "60%",
            background: `
              radial-gradient(ellipse 75% 70% at 50% 70%, rgba(99,102,241,0.5), transparent 55%),
              radial-gradient(ellipse 55% 50% at 50% 80%, rgba(139,92,246,0.35), transparent 50%),
              radial-gradient(ellipse 90% 40% at 50% 85%, rgba(99,102,241,0.25), transparent 45%)
            `,
          }}
        />

        {/* Stars — LOTS of them, many always visible */}
        {!shouldReduceMotion && stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              background: s.id % 7 === 0 ? "rgba(99,102,241,0.9)" : "white",
              boxShadow: `0 0 ${s.size + 1}px ${s.size / 2}px ${s.id % 7 === 0 ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.3)"}`,
            }}
            animate={s.static ? { opacity: [0.6, 1, 0.7, 0.95, 0.6] } : { opacity: [0.1, 0.8, 0.3, 0.9, 0.1] }}
            transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Left white glow */}
        <div
          className="absolute rounded-full"
          style={{
            left: isMobile ? "2%" : "8%",
            top: "20%",
            width: isMobile ? 40 : 70,
            height: isMobile ? 40 : 70,
            background: "radial-gradient(circle, rgba(255,255,255,0.6), transparent 60%)",
            filter: "blur(20px)",
          }}
        />

        {/* Right white glow */}
        <div
          className="absolute rounded-full"
          style={{
            right: isMobile ? "2%" : "8%",
            top: "15%",
            width: isMobile ? 35 : 60,
            height: isMobile ? 35 : 60,
            background: "radial-gradient(circle, rgba(255,255,255,0.5), transparent 60%)",
            filter: "blur(18px)",
          }}
        />

        {/* Dark curved surface */}
        <div
          className="absolute"
          style={{
            left: "-20%",
            right: "-20%",
            bottom: 0,
            height: "48%",
            background: "#0A0A0F",
            borderRadius: "50% 50% 0 0 / 20% 20% 0 0",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl">
        <FadeIn className="text-center">
          <h2 className="text-2xl font-bold leading-tight text-[#F8F8FF] sm:text-3xl md:text-4xl">
            <span className="text-[#6366F1]">Нам довіряють</span>
          </h2>
        </FadeIn>

        {/* Logo marquee — with BLUR fade at edges */}
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
