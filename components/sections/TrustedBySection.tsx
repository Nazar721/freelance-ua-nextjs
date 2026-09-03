"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { brands } from "@/data/brands";
import { FadeIn } from "@/components/ui/FadeIn";
import { useTranslation } from "@/lib/LanguageContext";

function LogoSet() {
  return (
    <>
      {brands.map((brand, i) => (
        <div
          key={`a-${i}`}
          className="flex items-center justify-center shrink-0 logo-slot"
          style={{ width: 220, height: 70 }}
        >
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

export default function TrustedBySection() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="relative px-4 pt-16 pb-8 overflow-hidden" style={{ background: "transparent" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {/* Central spotlight glow */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: isMobile ? "70vw" : "45vw",
            height: "200%",
            background: `
              radial-gradient(ellipse 100% 40% at 50% 50%, var(--trusted-glow-1) 0%, transparent 70%),
              radial-gradient(ellipse 60% 30% at 50% 50%, var(--trusted-glow-2) 0%, transparent 60%),
              radial-gradient(ellipse 40% 20% at 50% 50%, var(--trusted-glow-3) 0%, transparent 50%)
            `,
            animation: "center-glow-pulse 4s ease-in-out infinite",
          }}
        />

        {/* Vertical light beam */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: "2px",
            height: "100%",
            background: "linear-gradient(180deg, transparent 10%, var(--trusted-beam) 30%, var(--trusted-beam-core) 50%, var(--trusted-beam) 70%, transparent 90%)",
            boxShadow: "0 0 20px var(--trusted-beam), 0 0 60px var(--trusted-beam)",
          }}
        />

        {/* Horizontal light line */}
        <div
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent 5%, var(--trusted-line) 20%, var(--trusted-line-core) 45%, var(--trusted-line-core) 55%, var(--trusted-line) 80%, transparent 95%)",
            boxShadow: "0 0 12px var(--trusted-line)",
          }}
        />

        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0"
          style={{
            width: "25%",
            background: "linear-gradient(90deg, var(--trusted-fade) 0%, var(--trusted-fade-mid) 40%, transparent 100%)",
            zIndex: 2,
          }}
        />

        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0"
          style={{
            width: "25%",
            background: "linear-gradient(270deg, var(--trusted-fade) 0%, var(--trusted-fade-mid) 40%, transparent 100%)",
            zIndex: 2,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl">
        <FadeIn className="text-center">
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl mb-3">
            <span className="text-[var(--text-primary)]">{t("trusted.title")}</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-lg mx-auto">
            {t("trusted.subtitle")}
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="trusted-partners mt-10">
          <div className="trusted-partners__track-wrapper">
            <div className="trusted-partners__track">
              <LogoSet />
            </div>
            <div className="trusted-partners__track" aria-hidden>
              <LogoSet />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.25} className="mt-10">
          <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
            <div className="glass-stat-badge px-5 py-2.5 rounded-full">
              <span className="text-[var(--text-primary)] font-bold text-lg">140+</span>
              <span className="text-[var(--text-secondary)] text-xs ml-1.5">{t("trusted.statClients")}</span>
            </div>
            <div className="glass-stat-badge px-5 py-2.5 rounded-full">
              <span className="text-[var(--text-primary)] font-bold text-lg">3</span>
              <span className="text-[var(--text-secondary)] text-xs ml-1.5">{t("trusted.statNiches")}</span>
            </div>
            <div className="glass-stat-badge px-5 py-2.5 rounded-full">
              <span className="text-[var(--text-primary)] font-bold text-lg">100%</span>
              <span className="text-[var(--text-secondary)] text-xs ml-1.5">{t("trusted.statSatisfaction")}</span>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="h-8 sm:h-12" />
    </section>
  );
}
