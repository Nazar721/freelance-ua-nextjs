"use client";

import Link from "next/link";

import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import FeaturedCaseCard from "@/components/ui/FeaturedCaseCard";
import { designCases } from "@/data/designCases";
import { useTranslation } from "@/lib/LanguageContext";

export default function DesignCasesSection() {
  const { t } = useTranslation();
  const featured = designCases.slice(0, 2);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-16" y={30} blur={8}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-[family-name:var(--font-syne)]">
            {t("designCases.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("designCases.desc")}
          </p>
        </FadeIn>

        {/* Featured cards — 2 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
          {featured.map((c, i) => (
            <FadeIn key={c.slug} delay={0.1 + i * 0.1} y={40} blur={4}>
              <FeaturedCaseCard
                categoryKey={c.categoryKey}
                titleKey={c.titleKey}
                descriptionKey={c.descriptionKey}
                href={c.href}
                glowColor={c.glowColor}
                glowColorStrong={c.glowColorStrong}
                image={c.image}
                imageFit={c.imageFit}
                preload
                badge={c.badge}
              />
            </FadeIn>
          ))}
        </div>

        {/* All cases CTA */}
        <FadeIn delay={0.15} y={20} blur={4} className="text-center mt-8">
          <Link
            href="/cases?tab=design"
            className="inline-flex items-center gap-2 border border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1] hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
          >
            {t("designCases.allCases")}
            <ArrowRight size={18} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
