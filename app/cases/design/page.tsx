"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import FeaturedCaseCard from "@/components/ui/FeaturedCaseCard";
import { designCases } from "@/data/designCases";
import { useTranslation } from "@/lib/LanguageContext";

export default function DesignCasesPage() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16" y={30} blur={8}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("designCases.title")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("designCases.desc")}
          </p>
          <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground mt-4">{t("designCases.title")}</h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {designCases.map((c, i) => (
            <FadeIn key={c.slug} delay={0.1 + i * 0.1} y={40} blur={4}>
              <FeaturedCaseCard
                categoryKey={c.categoryKey}
                titleKey={c.titleKey}
                descriptionKey={c.descriptionKey}
                href={c.href}
                glowColor={c.glowColor}
                glowColorStrong={c.glowColorStrong}
                image={c.image}
                preload
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
