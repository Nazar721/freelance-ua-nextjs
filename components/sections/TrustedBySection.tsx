"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
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
            style={{ width: "auto", height: "34px" }}
          />
        </div>
      ))}
    </>
  );
}

export default function TrustedBySection() {
  const fxRef = useRef<HTMLDivElement>(null);
  const fxInView = useInView(fxRef, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= 768);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="trusted-shell px-4 py-16">
      <div className="relative z-10 mx-auto max-w-3xl">
        <FadeIn className="text-center">
          <h2 className="text-2xl font-bold leading-tight text-[#F8F8FF] sm:text-3xl md:text-4xl">
            <span className="text-[#6366F1]">Нам довіряють</span>
          </h2>
        </FadeIn>

        {/* Seamless infinite marquee */}
        <FadeIn delay={0.12} className="trusted-partners mt-7">
          <div className="trusted-partners__track-wrapper">
            <div className="trusted-partners__track">
              <LogoSet />
            </div>
            <div className="trusted-partners__track" aria-hidden>
              <LogoSet />
            </div>
          </div>

          {/* Firefly sparkles at edges — reduced on mobile */}
          {!shouldReduceMotion && (
            <>
              {/* Left edge sparkles — fewer on mobile */}
              {(isMobile ? [0, 1] : [0, 1, 2, 3]).map((i) => (
                <motion.div
                  key={`sparkle-l-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: `${6 + i * 3}%`,
                    width: isMobile ? 2 : (3 + (i % 2) * 2),
                    height: isMobile ? 2 : (3 + (i % 2) * 2),
                    background: "radial-gradient(circle, rgba(99,102,241,0.9), rgba(139,92,246,0.4))",
                    boxShadow: "0 0 6px rgba(99,102,241,0.5), 0 0 12px rgba(99,102,241,0.2)",
                    top: `${35 + (i % 3) * 15}%`,
                  }}
                  animate={{
                    opacity: [0, 0.7, 0.2, 0.8, 0],
                    scale: [0.5, 1.1, 0.7, 1.0, 0.5],
                    y: [0, -3, 1, -2, 0],
                  }}
                  transition={{
                    duration: isMobile ? 3.5 : (2.5 + i * 0.4),
                    delay: i * (isMobile ? 0.8 : 0.6),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Right edge sparkles — fewer on mobile */}
              {(isMobile ? [0, 1] : [0, 1, 2, 3]).map((i) => (
                <motion.div
                  key={`sparkle-r-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    right: `${6 + i * 3}%`,
                    width: isMobile ? 2 : (3 + (i % 2) * 2),
                    height: isMobile ? 2 : (3 + (i % 2) * 2),
                    background: "radial-gradient(circle, rgba(6,182,212,0.9), rgba(99,102,241,0.4))",
                    boxShadow: "0 0 6px rgba(6,182,212,0.5), 0 0 12px rgba(6,182,212,0.2)",
                    top: `${30 + (i % 3) * 18}%`,
                  }}
                  animate={{
                    opacity: [0, 0.8, 0.15, 0.7, 0],
                    scale: [0.5, 1.2, 0.6, 1.1, 0.5],
                    y: [0, -2, 2, -1, 0],
                  }}
                  transition={{
                    duration: isMobile ? 4 : (2.8 + i * 0.3),
                    delay: 0.3 + i * (isMobile ? 0.7 : 0.5),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </>
          )}
        </FadeIn>

        {/* Full-width energy wave effect — simplified on mobile */}
        <div ref={fxRef} className="relative mt-8 h-16 w-full overflow-hidden">
          {!shouldReduceMotion && fxInView && (
            <>
              {/* Base line */}
              <motion.div
                className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.15) 20%, rgba(99,102,241,0.3) 50%, rgba(99,102,241,0.15) 80%, transparent 100%)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* SVG wave — simplified on mobile */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1200 64"
                preserveAspectRatio="none"
                fill="none"
              >
                <defs>
                  <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(99,102,241,0)" />
                    <stop offset="20%" stopColor="rgba(99,102,241,0.4)" />
                    <stop offset="50%" stopColor="rgba(6,182,212,0.5)" />
                    <stop offset="80%" stopColor="rgba(99,102,241,0.4)" />
                    <stop offset="100%" stopColor="rgba(99,102,241,0)" />
                  </linearGradient>
                </defs>

                <motion.path
                  d="M0,32 C100,16 200,48 300,32 C400,16 500,48 600,32 C700,16 800,48 900,32 C1000,16 1100,48 1200,32"
                  stroke="url(#wave-gradient)"
                  strokeWidth={isMobile ? "1" : "1.5"}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>

              {/* Flowing light dots — fewer on mobile */}
              {(isMobile ? [0, 1] : [0, 1, 2, 3, 4]).map((i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: isMobile ? 3 : 4,
                    height: isMobile ? 3 : 4,
                    background: i % 2 === 0
                      ? "radial-gradient(circle, #6366F1, rgba(99,102,241,0.4))"
                      : "radial-gradient(circle, #06B6D4, rgba(6,182,212,0.4))",
                    boxShadow: i % 2 === 0
                      ? "0 0 10px rgba(99,102,241,0.6), 0 0 20px rgba(99,102,241,0.3)"
                      : "0 0 10px rgba(6,182,212,0.6), 0 0 20px rgba(6,182,212,0.3)",
                  }}
                  initial={{ left: "-5%", opacity: 0 }}
                  animate={{
                    left: ["-5%", "105%"],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: isMobile ? 5 : (4 + i * 0.5),
                    delay: 1 + i * (isMobile ? 1.2 : 0.8),
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
