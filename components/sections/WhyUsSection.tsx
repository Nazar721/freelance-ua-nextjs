"use client";

import { useRef, useCallback, useState, useEffect, type MouseEvent } from "react";
import { CheckCircle, Clock, Shield, Sparkles, Users, Zap, Award } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { useTranslation } from "@/lib/LanguageContext";

const advantageIcons = [Clock, Shield, Zap, Users, Sparkles, CheckCircle, Award];
const advantageKeys = ["why.1", "why.2", "why.3", "why.4", "why.5", "why.6", "why.7"];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-6px)`;
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  }, []);

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 400ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 400ms ease", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export default function WhyUsSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 px-4 bg-[#111118]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16" y={30} blur={8}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            {t("why.title")}
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-2xl mx-auto">
            {t("why.desc")}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {advantageKeys.map((key, i) => {
            const Icon = advantageIcons[i];
            return (
              <FadeIn
                key={key}
                delay={0.1 + i * 0.07}
                y={40}
                blur={4}
              >
                <TiltCard className="premium-surface glow-border bg-[#1A1A24] border border-[#2A2A38] rounded-2xl p-6 cursor-default h-full">
                  <div className="premium-icon w-12 h-12 bg-[#6366F1]/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={24} className="text-[#6366F1]" />
                  </div>
                  <h3 className="text-[#F8F8FF] font-semibold text-base mb-2">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="text-[#8B8B9E] text-sm leading-relaxed">
                    {t(`${key}.desc`)}
                  </p>
                </TiltCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
