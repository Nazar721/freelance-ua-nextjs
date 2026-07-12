"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { brands } from "@/data/brands";
import { FadeIn } from "@/components/ui/FadeIn";

function LogoSet() {
  return (
    <>
      {brands.map((brand, i) => (
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

// Fireflies — BELOW the horizon line, active and bright
const fireflies = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  x: 3 + Math.random() * 94,
  y: 65 + Math.random() * 30,
  size: 1.2 + Math.random() * 2.5,
  delay: Math.random() * 8,
  dur: 3 + Math.random() * 6,
  purple: i % 3 === 0,
}));

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
            top: "10%",
            height: "70%",
            background: `
              radial-gradient(ellipse 70% 50% at 50% 85%, rgba(99,102,241,0.55), transparent 50%),
              radial-gradient(ellipse 50% 40% at 50% 90%, rgba(139,92,246,0.4), transparent 45%),
              radial-gradient(ellipse 85% 35% at 50% 95%, rgba(99,102,241,0.3), transparent 40%)
            `,
          }}
        />

        {/* HORIZON LINE — the "earth" edge */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "62%",
            height: "2px",
            background: "linear-gradient(90deg, transparent 5%, rgba(99,102,241,0.2) 20%, rgba(139,92,246,0.35) 50%, rgba(99,102,241,0.2) 80%, transparent 95%)",
            boxShadow: "0 0 12px rgba(99,102,241,0.25), 0 0 30px rgba(99,102,241,0.12)",
          }}
        />

        {/* Fireflies — ALL below horizon, active with glow */}
        {!shouldReduceMotion && fireflies.map((f) => (
          <motion.div
            key={f.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: f.size,
              height: f.size,
              background: f.purple ? "rgba(160,140,255,1)" : "rgba(255,255,255,0.9)",
              boxShadow: f.purple
                ? `0 0 ${f.size * 5}px ${f.size * 2}px rgba(99,102,241,0.6)`
                : `0 0 ${f.size * 3}px ${f.size}px rgba(255,255,255,0.45)`,
            }}
            animate={{
              opacity: [0.1, 0.9, 0.15, 0.95, 0.1],
              scale: [0.7, 1.3, 0.8, 1.25, 0.7],
            }}
            transition={{
              duration: f.dur,
              delay: f.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Left white glow */}
        <div
          className="absolute rounded-full"
          style={{
            left: isMobile ? "0%" : "5%",
            top: "15%",
            width: isMobile ? 50 : 100,
            height: isMobile ? 50 : 100,
            background: "radial-gradient(circle, rgba(255,255,255,0.7), transparent 50%)",
            filter: "blur(25px)",
          }}
        />

        {/* Right white glow */}
        <div
          className="absolute rounded-full"
          style={{
            right: isMobile ? "0%" : "5%",
            top: "10%",
            width: isMobile ? 45 : 90,
            height: isMobile ? 45 : 90,
            background: "radial-gradient(circle, rgba(255,255,255,0.6), transparent 50%)",
            filter: "blur(22px)",
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
