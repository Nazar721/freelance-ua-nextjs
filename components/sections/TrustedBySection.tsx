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
  const [isMobile, setIsMobile] = useState(false);
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

          {/* Firefly sparkles at edges — disabled on mobile */}
          {!shouldReduceMotion && !isMobile && (
            <>
              {/* Left edge sparkles */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={`sparkle-l-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: `${6 + i * 3}%`,
                    width: 3 + (i % 2) * 2,
                    height: 3 + (i % 2) * 2,
                    background: "radial-gradient(circle, rgba(99,102,241,0.9), rgba(139,92,246,0.4))",
                    boxShadow: "0 0 8px rgba(99,102,241,0.6), 0 0 16px rgba(99,102,241,0.3)",
                    top: `${35 + (i % 3) * 15}%`,
                  }}
                  animate={{
                    opacity: [0, 0.8, 0.3, 0.9, 0],
                    scale: [0.5, 1.2, 0.8, 1.1, 0.5],
                    y: [0, -4, 2, -3, 0],
                  }}
                  transition={{
                    duration: 2.5 + i * 0.4,
                    delay: i * 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Right edge sparkles */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={`sparkle-r-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    right: `${6 + i * 3}%`,
                    width: 3 + (i % 2) * 2,
                    height: 3 + (i % 2) * 2,
                    background: "radial-gradient(circle, rgba(6,182,212,0.9), rgba(99,102,241,0.4))",
                    boxShadow: "0 0 8px rgba(6,182,212,0.6), 0 0 16px rgba(6,182,212,0.3)",
                    top: `${30 + (i % 3) * 18}%`,
                  }}
                  animate={{
                    opacity: [0, 0.9, 0.2, 0.8, 0],
                    scale: [0.5, 1.3, 0.7, 1.2, 0.5],
                    y: [0, -3, 3, -2, 0],
                  }}
                  transition={{
                    duration: 2.8 + i * 0.3,
                    delay: 0.3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </>
          )}
        </FadeIn>

        {/* Full-width energy wave effect */}
        <div ref={fxRef} className="relative mt-8 h-16 w-full overflow-hidden">
          {!shouldReduceMotion && !isMobile && fxInView && (
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

              {/* SVG wave */}
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
                  <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(139,92,246,0)" />
                    <stop offset="30%" stopColor="rgba(139,92,246,0.25)" />
                    <stop offset="50%" stopColor="rgba(99,102,241,0.35)" />
                    <stop offset="70%" stopColor="rgba(139,92,246,0.25)" />
                    <stop offset="100%" stopColor="rgba(139,92,246,0)" />
                  </linearGradient>
                </defs>

                <motion.path
                  d="M0,32 C100,16 200,48 300,32 C400,16 500,48 600,32 C700,16 800,48 900,32 C1000,16 1100,48 1200,32"
                  stroke="url(#wave-gradient)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                />

                <motion.path
                  d="M0,32 C150,44 250,20 400,32 C550,44 650,20 800,32 C950,44 1050,20 1200,32"
                  stroke="url(#wave-gradient-2)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 2.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>

              {/* Flowing light dots */}
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: 4,
                    height: 4,
                    background: i % 2 === 0
                      ? "radial-gradient(circle, #6366F1, rgba(99,102,241,0.4))"
                      : "radial-gradient(circle, #06B6D4, rgba(6,182,212,0.4))",
                    boxShadow: i % 2 === 0
                      ? "0 0 12px rgba(99,102,241,0.8), 0 0 24px rgba(99,102,241,0.4)"
                      : "0 0 12px rgba(6,182,212,0.8), 0 0 24px rgba(6,182,212,0.4)",
                  }}
                  initial={{ left: "-5%", opacity: 0 }}
                  animate={{
                    left: ["-5%", "105%"],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    delay: 1 + i * 0.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}

              {/* Sweep glow */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 h-8 w-32 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse, rgba(99,102,241,0.15), transparent 70%)",
                  filter: "blur(8px)",
                }}
                initial={{ left: "-15%" }}
                animate={{ left: ["-15%", "115%"] }}
                transition={{
                  duration: 5,
                  delay: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
