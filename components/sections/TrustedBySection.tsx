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

// Particles — scattered stars and dust across the dark area
const particles = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  startX: 5 + Math.random() * 90,
  startY: 35 + Math.random() * 55,
  driftX: -15 + Math.random() * 30,
  driftY: -10 + Math.random() * 20,
  size: 1 + Math.random() * 2.5,
  delay: Math.random() * 12,
  dur: 6 + Math.random() * 10,
  type: i % 5 === 0 ? "purple" : i % 3 === 0 ? "blue" : "white",
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

        {/* HORIZON LINE — visible earth edge */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "58%",
            height: "2px",
            background: "linear-gradient(90deg, transparent 5%, rgba(99,102,241,0.2) 15%, rgba(139,92,246,0.4) 50%, rgba(99,102,241,0.2) 85%, transparent 95%)",
            boxShadow: "0 0 15px rgba(99,102,241,0.3), 0 0 40px rgba(99,102,241,0.15)",
          }}
        />

        {/* Particles — stars and cosmic dust with drift */}
        {!shouldReduceMotion && particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.startX}%`,
              top: `${p.startY}%`,
              width: p.size,
              height: p.size,
              background: p.type === "purple"
                ? "rgba(139,92,246,1)"
                : p.type === "blue"
                  ? "rgba(99,102,241,1)"
                  : "rgba(255,255,255,0.9)",
              boxShadow: p.type === "purple"
                ? `0 0 ${p.size * 5}px ${p.size * 1.5}px rgba(139,92,246,0.6)`
                : p.type === "blue"
                  ? `0 0 ${p.size * 4}px ${p.size * 1.2}px rgba(99,102,241,0.5)`
                  : `0 0 ${p.size * 3}px ${p.size * 0.8}px rgba(255,255,255,0.4)`,
            }}
            animate={{
              opacity: [0.15, 0.7, 0.2, 0.75, 0.15],
              scale: [0.9, 1.1, 0.92, 1.08, 0.9],
              x: [0, p.driftX * 0.5, p.driftX, p.driftX * 0.3, 0],
              y: [0, p.driftY * 0.6, p.driftY, p.driftY * 0.4, 0],
            }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1],
            }}
          />
        ))}

        {/* Left glow — atmospheric light source */}
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

        {/* Right glow — atmospheric light source */}
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

        {/* Dark curved surface — planet-like horizon */}
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
