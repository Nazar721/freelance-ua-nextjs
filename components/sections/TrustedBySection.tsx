"use client";

import { useRef, useState, useEffect } from "react";

import Image from "next/image";
import { brands } from "@/data/brands";
import { FadeIn } from "@/components/ui/FadeIn";

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

// Generate two layers: static stars + animated drifting particles
function generateStaticStars() {
  let html = "";
  for (let i = 0; i < 100; i++) {
    const x = (3 + Math.random() * 94).toFixed(1);
    const y = (30 + Math.random() * 60).toFixed(1);
    const size = (0.4 + Math.random() * 1.5).toFixed(1);
    const opacity = (0.2 + Math.random() * 0.5).toFixed(2);
    const isPurple = i % 8 === 0;
    const isBlue = !isPurple && i % 5 === 0;
    const color = isPurple
      ? "rgba(139,92,246,"
      : isBlue
        ? "rgba(99,102,241,"
        : "rgba(255,255,255,";
    html += `<div class="star" style="left:${x}%;top:${y}%;width:${size}px;height:${size}px;background:${color}${opacity});box-shadow:0 0 ${Number(size) * 2}px ${Number(size) * 0.5}px ${color}0.3)"></div>`;
  }
  return html;
}

function generateAnimatedParticles() {
  let html = "";
  for (let i = 0; i < 80; i++) {
    const x = (3 + Math.random() * 94).toFixed(1);
    const y = (30 + Math.random() * 60).toFixed(1);
    const size = (0.8 + Math.random() * 2.2).toFixed(1);
    const dur = (4 + Math.random() * 6).toFixed(1);
    const delay = (Math.random() * 6).toFixed(1);
    const isPurple = i % 7 === 0;
    const isBlue = !isPurple && i % 4 === 0;
    const color = isPurple
      ? "rgba(139,92,246,0.85)"
      : isBlue
        ? "rgba(99,102,241,0.85)"
        : "rgba(255,255,255,0.9)";
    const glowColor = isPurple
      ? "rgba(139,92,246,0.6)"
      : isBlue
        ? "rgba(99,102,241,0.5)"
        : "rgba(255,255,255,0.5)";
    const glowSize = isPurple ? 5 : isBlue ? 4 : 3;

    html += `<div class="pf pf${i % 4}" style="left:${x}%;top:${y}%;width:${size}px;height:${size}px;background:${color};box-shadow:0 0 ${glowSize * Number(size)}px ${Number(size)}px ${glowColor};animation-duration:${dur}s;animation-delay:${delay}s"></div>`;
  }
  return html;
}

const staticStarsHTML = generateStaticStars();
const animatedParticlesHTML = generateAnimatedParticles();

export default function TrustedBySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
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

        {/* Static stars — always visible */}
        <div
          className="absolute inset-0 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: staticStarsHTML }}
        />

        {/* Animated particles — drift */}
        <div
          className="absolute inset-0 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: animatedParticlesHTML }}
        />

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
