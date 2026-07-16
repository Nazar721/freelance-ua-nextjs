"use client";

import { useRef, useCallback, type MouseEvent } from "react";
import { Code2, Palette, Video } from "lucide-react";
import { services } from "@/data/services";
import { FadeIn } from "@/components/ui/FadeIn";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { useTranslation } from "@/lib/LanguageContext";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={32} className="text-[#6366F1]" />,
  Palette: <Palette size={32} className="text-[#6366F1]" />,
  Video: <Video size={32} className="text-[#6366F1]" />,
};

function ServiceCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--mouse-x", `${x * 100}%`);
    el.style.setProperty("--mouse-y", `${y * 100}%`);
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} max-md:premium-surface-static`}
      onMouseMove={handleMouseMove}
      style={{
        transition:
          "transform 500ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 500ms ease, border-color 500ms ease",
      }}
    >
      {children}
    </div>
  );
}

export default function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16" y={30} blur={8}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            {t("services.title")}
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-2xl mx-auto">
            {t("services.desc")}
          </p>
        </FadeIn>

        {/* Desktop */}
        <div className="hidden lg:block space-y-6">
          {/* Row 1: IT card + Showcase */}
          <div className="grid grid-cols-[35fr_65fr] gap-6">
            <FadeIn delay={0.15} y={50} rotateX={8} blur={6}>
              <ServiceCard className="premium-surface glow-border bg-[#111118] border border-[#2A2A38] rounded-2xl p-8 h-full group relative overflow-hidden">
                {/* Decorative background icon */}
                <div className="absolute -right-8 -bottom-8 text-[#6366F1]/5 pointer-events-none">
                  <Code2 size={200} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <div className="premium-icon w-20 h-20 bg-[#6366F1]/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-[#6366F1]/20 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                    {iconMap[services[0].icon]}
                  </div>
                  <h3 className="text-[#F8F8FF] font-bold text-2xl mb-6">
                    {t("services.it.category")}
                  </h3>
                  <ul className="space-y-4">
                    {[1,2,3,4,5,6,7].map((n) => (
                      <li
                        key={n}
                        className="group/item flex items-center gap-3 text-[#8B8B9E] text-base transition-all duration-300 hover:text-[#F8F8FF] hover:translate-x-1"
                      >
                        <span className="w-1.5 h-1.5 bg-[#6366F1] rounded-full shrink-0 transition-all duration-300 group-hover/item:scale-150 group-hover/item:shadow-[0_0_14px_rgba(99,102,241,0.75)]" />
                        {t(`services.it.${n}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </ServiceCard>
            </FadeIn>

            <FadeIn delay={0.3} y={50} rotateX={8} blur={6}>
              <ServiceCard className="premium-surface glow-border bg-[#111118] border border-[#2A2A38] rounded-2xl p-8 h-full group">
                <span className="text-xs font-medium text-[#6366F1] uppercase tracking-wider">
                  {t("services.it.slider")}
                </span>
                <div className="mt-4">
                  <BeforeAfterSlider
                    beforeSrc="/media/services/code-before.png"
                    afterSrc="/media/services/website-after.png"
                    beforeAlt="Source code"
                    afterAlt="Finished website"
                  />
                </div>
                <p className="mt-4 text-[#8B8B9E] text-sm">
                  {t("services.it.slider.desc")}
                </p>
              </ServiceCard>
            </FadeIn>
          </div>

          {/* Row 2: Design card + Design Showcase */}
          <div className="grid grid-cols-[35fr_65fr] gap-6">
            <FadeIn delay={0.4} y={50} rotateX={8} blur={6}>
              <ServiceCard className="premium-surface glow-border bg-[#111118] border border-[#2A2A38] rounded-2xl p-8 h-full group relative overflow-hidden">
                {/* Decorative background icon */}
                <div className="absolute -right-8 -bottom-8 text-[#6366F1]/5 pointer-events-none">
                  <Palette size={200} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <div className="premium-icon w-20 h-20 bg-[#6366F1]/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-[#6366F1]/20 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                    {iconMap[services[1].icon]}
                  </div>
                  <h3 className="text-[#F8F8FF] font-bold text-2xl mb-6">
                    {t("services.design.category")}
                  </h3>
                  <ul className="space-y-4">
                    {[1,2,3,4,5].map((n) => (
                      <li
                        key={n}
                        className="group/item flex items-center gap-3 text-[#8B8B9E] text-base transition-all duration-300 hover:text-[#F8F8FF] hover:translate-x-1"
                      >
                        <span className="w-1.5 h-1.5 bg-[#6366F1] rounded-full shrink-0 transition-all duration-300 group-hover/item:scale-150 group-hover/item:shadow-[0_0_14px_rgba(99,102,241,0.75)]" />
                        {t(`services.design.${n}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </ServiceCard>
            </FadeIn>

            <FadeIn delay={0.5} y={50} rotateX={8} blur={6}>
              <ServiceCard className="premium-surface glow-border bg-[#111118] border border-[#2A2A38] rounded-2xl p-8 h-full group">
                <span className="text-xs font-medium text-[#6366F1] uppercase tracking-wider">
                  {t("services.design.slider")}
                </span>
                <div className="mt-4">
                  <BeforeAfterSlider
                    beforeSrc="/media/services/design-before.png"
                    afterSrc="/media/services/design-after.png"
                    beforeAlt="Design concept"
                    afterAlt="Final design"
                  />
                </div>
                <p className="mt-4 text-[#8B8B9E] text-sm">
                  {t("services.design.slider.desc")}
                </p>
              </ServiceCard>
            </FadeIn>
          </div>

          {/* Row 3: Video card (full width) */}
          <div className="grid grid-cols-[35fr_65fr] gap-6">
            <FadeIn delay={0.6} y={50} rotateX={8} blur={6}>
              <ServiceCard className="premium-surface glow-border bg-[#111118] border border-[#2A2A38] rounded-2xl p-8 h-full group relative overflow-hidden">
                {/* Decorative background icon */}
                <div className="absolute -right-8 -bottom-8 text-[#6366F1]/5 pointer-events-none">
                  <Video size={200} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <div className="premium-icon w-20 h-20 bg-[#6366F1]/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-[#6366F1]/20 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                    {iconMap[services[2].icon]}
                  </div>
                  <h3 className="text-[#F8F8FF] font-bold text-2xl mb-6">
                    {t("services.video.category")}
                  </h3>
                  <ul className="space-y-4">
                    {[1,2,3,4,5,6].map((n) => (
                      <li
                        key={n}
                        className="group/item flex items-center gap-3 text-[#8B8B9E] text-base transition-all duration-300 hover:text-[#F8F8FF] hover:translate-x-1"
                      >
                        <span className="w-1.5 h-1.5 bg-[#6366F1] rounded-full shrink-0 transition-all duration-300 group-hover/item:scale-150 group-hover/item:shadow-[0_0_14px_rgba(99,102,241,0.75)]" />
                        {t(`services.video.${n}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </ServiceCard>
            </FadeIn>

            {/* Video showcase */}
            <FadeIn delay={0.7} y={50} rotateX={8} blur={6}>
              <ServiceCard className="premium-surface glow-border bg-[#111118] border border-[#2A2A38] rounded-2xl p-8 h-full group">
                <span className="text-xs font-medium text-[#6366F1] uppercase tracking-wider">
                  {t("services.video.slider")}
                </span>
                <div className="mt-4">
                  <BeforeAfterSlider
                    beforeSrc="/media/services/video-poster.png"
                    afterVideo="/media/cases/shermet.mp4"
                    beforeAlt="Editing process"
                    afterAlt="Final video"
                  />
                </div>
                <p className="mt-4 text-[#8B8B9E] text-sm">
                  {t("services.video.slider.desc")}
                </p>
              </ServiceCard>
            </FadeIn>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden grid grid-cols-1 gap-6">
          {/* IT */}
          <FadeIn delay={0.15} y={50} rotateX={8} blur={6}>
            <ServiceCard className="premium-surface glow-border bg-[#111118] border border-[#2A2A38] rounded-2xl p-8 group relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 text-[#6366F1]/5 pointer-events-none">
                <Code2 size={180} strokeWidth={1} />
              </div>
              <div className="relative z-10">
                <div className="premium-icon w-20 h-20 bg-[#6366F1]/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-[#6366F1]/20 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                  {iconMap[services[0].icon]}
                </div>
                <h3 className="text-[#F8F8FF] font-bold text-2xl mb-6">
                  {t("services.it.category")}
                </h3>
                <ul className="space-y-4">
                  {[1,2,3,4,5,6,7].map((n) => (
                    <li key={n} className="group/item flex items-center gap-3 text-[#8B8B9E] text-lg transition-all duration-300 hover:text-[#F8F8FF] hover:translate-x-1">
                      <span className="w-1.5 h-1.5 bg-[#6366F1] rounded-full shrink-0 transition-all duration-300 group-hover/item:scale-150 group-hover/item:shadow-[0_0_14px_rgba(99,102,241,0.75)]" />
                      {t(`services.it.${n}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </ServiceCard>
          </FadeIn>
          <FadeIn delay={0.2} y={40} blur={4}>
            <ServiceCard className="premium-surface glow-border bg-[#111118] border border-[#2A2A38] rounded-2xl p-8 group">
              <span className="text-xs font-medium text-[#6366F1] uppercase tracking-wider">
                {t("services.it.slider")}
              </span>
              <div className="mt-4">
                <BeforeAfterSlider
                  beforeSrc="/media/services/code-before.png"
                  afterSrc="/media/services/website-after.png"
                  beforeAlt="Source code"
                  afterAlt="Finished website"
                />
              </div>
              <p className="mt-4 text-[#8B8B9E] text-sm">
                {t("services.it.slider.desc")}
              </p>
            </ServiceCard>
          </FadeIn>

          {/* Design */}
          <FadeIn delay={0.25} y={50} rotateX={8} blur={6}>
            <ServiceCard className="premium-surface glow-border bg-[#111118] border border-[#2A2A38] rounded-2xl p-8 group relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 text-[#6366F1]/5 pointer-events-none">
                <Palette size={180} strokeWidth={1} />
              </div>
              <div className="relative z-10">
                <div className="premium-icon w-20 h-20 bg-[#6366F1]/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-[#6366F1]/20 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                  {iconMap[services[1].icon]}
                </div>
                <h3 className="text-[#F8F8FF] font-bold text-2xl mb-6">
                  {t("services.design.category")}
                </h3>
                <ul className="space-y-4">
                  {[1,2,3,4,5].map((n) => (
                    <li key={n} className="group/item flex items-center gap-3 text-[#8B8B9E] text-lg transition-all duration-300 hover:text-[#F8F8FF] hover:translate-x-1">
                      <span className="w-1.5 h-1.5 bg-[#6366F1] rounded-full shrink-0 transition-all duration-300 group-hover/item:scale-150 group-hover/item:shadow-[0_0_14px_rgba(99,102,241,0.75)]" />
                      {t(`services.design.${n}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </ServiceCard>
          </FadeIn>
          <FadeIn delay={0.3} y={40} blur={4}>
            <ServiceCard className="premium-surface glow-border bg-[#111118] border border-[#2A2A38] rounded-2xl p-8 group">
              <span className="text-xs font-medium text-[#6366F1] uppercase tracking-wider">
                {t("services.design.slider")}
              </span>
              <div className="mt-4">
                <BeforeAfterSlider
                  beforeSrc="/media/services/design-before.png"
                  afterSrc="/media/services/design-after.png"
                  beforeAlt="Design concept"
                  afterAlt="Final design"
                />
              </div>
              <p className="mt-4 text-[#8B8B9E] text-sm">
                {t("services.design.slider.desc")}
              </p>
            </ServiceCard>
          </FadeIn>

          {/* Video */}
          <FadeIn delay={0.35} y={50} rotateX={8} blur={6}>
            <ServiceCard className="premium-surface glow-border bg-[#111118] border border-[#2A2A38] rounded-2xl p-8 group relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 text-[#6366F1]/5 pointer-events-none">
                <Video size={180} strokeWidth={1} />
              </div>
              <div className="relative z-10">
                <div className="premium-icon w-20 h-20 bg-[#6366F1]/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-[#6366F1]/20 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                  {iconMap[services[2].icon]}
                </div>
                <h3 className="text-[#F8F8FF] font-bold text-2xl mb-6">
                  {t("services.video.category")}
                </h3>
                <ul className="space-y-4">
                  {[1,2,3,4,5,6].map((n) => (
                    <li key={n} className="group/item flex items-center gap-3 text-[#8B8B9E] text-lg transition-all duration-300 hover:text-[#F8F8FF] hover:translate-x-1">
                      <span className="w-1.5 h-1.5 bg-[#6366F1] rounded-full shrink-0 transition-all duration-300 group-hover/item:scale-150 group-hover/item:shadow-[0_0_14px_rgba(99,102,241,0.75)]" />
                      {t(`services.video.${n}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </ServiceCard>
          </FadeIn>
          <FadeIn delay={0.4} y={40} blur={4}>
            <ServiceCard className="premium-surface glow-border bg-[#111118] border border-[#2A2A38] rounded-2xl p-8 group">
              <span className="text-xs font-medium text-[#6366F1] uppercase tracking-wider">
                {t("services.video.slider")}
              </span>
              <div className="mt-4">
                <BeforeAfterSlider
                  beforeSrc="/media/services/video-poster.png"
                  afterSrc="/media/services/video-poster.png"
                  afterVideo="/media/cases/shermet.mp4"
                  beforeAlt="Editing process"
                  afterAlt="Final video"
                />
              </div>
              <p className="mt-4 text-[#8B8B9E] text-sm">
                {t("services.video.slider.desc")}
              </p>
            </ServiceCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
