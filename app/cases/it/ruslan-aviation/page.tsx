"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, ArrowLeft, Quote, Check, AlertTriangle, Lightbulb } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import CurvedDashedLines from "@/components/ui/CurvedDashedLines";

import { useTranslation } from "@/lib/LanguageContext";
import RelatedProjectsSection from "@/components/sections/RelatedProjectsSection";
import ReviewAvatar from "@/components/ui/ReviewAvatar";

const components = [
  { titleKey: "itCases.ruslan.component1Title", descKey: "itCases.ruslan.component1Desc", image: "/media/cases/ruslan-catalog.webp" },
  { titleKey: "itCases.ruslan.component2Title", descKey: "itCases.ruslan.component2Desc", image: "/media/cases/ruslan-filter.webp" },
  { titleKey: "itCases.ruslan.component3Title", descKey: "itCases.ruslan.component3Desc", image: "/media/cases/ruslan-checkout.webp" },
  { titleKey: "itCases.ruslan.component4Title", descKey: "itCases.ruslan.component4Desc", image: "/media/cases/ruslan-trust.webp" },
  { titleKey: "itCases.ruslan.component5Title", descKey: "itCases.ruslan.component5Desc", images: ["/media/cases/ruslan-admin1.webp", "/media/cases/ruslan-admin2.webp", "/media/cases/ruslan-admin3.webp"] },
  { titleKey: "itCases.ruslan.component6Title", descKey: "itCases.ruslan.component6Desc" },
];

const results = [
  "itCases.ruslan.result1",
  "itCases.ruslan.result2",
  "itCases.ruslan.result3",
  "itCases.ruslan.result4",
  "itCases.ruslan.result5",
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function RuslanAviationPage() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const mockupScale = useTransform(scrollYProgress, [0, 0.6], [0.7, 1.05]);
  const mockupY = useTransform(scrollYProgress, [0, 0.6], [120, 0]);
  const mockupOpacity = useTransform(scrollYProgress, [0, 0.25], [0.3, 1]);
  const mockupRotateX = useTransform(scrollYProgress, [0, 0.6], [8, 0]);

  return (
    <article className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link
          href="/cases/it"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors duration-300"
        >
          <ArrowLeft size={16} />
          {t("itCases.backToList")}
        </Link>
      </div>

      <section ref={heroRef} className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn y={30} blur={8}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
              {t("itCases.ruslan.category")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t("itCases.ruslan.title")}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed mb-12">
              {t("itCases.ruslan.description")}
            </p>
          </FadeIn>

          <div
            className="featured-case-card border border-border rounded-2xl relative"
            style={
              {
                "--case-glow": "rgba(139, 92, 246, 0.12)",
                "--case-glow-strong": "rgba(139, 92, 246, 0.25)",
              } as React.CSSProperties
            }
          >
            <motion.div
              className="w-full max-w-5xl mx-auto"
              style={{
                scale: mockupScale,
                y: mockupY,
                opacity: mockupOpacity,
                rotateX: mockupRotateX,
                perspective: 1200,
              }}
            >
              <Image
                src="/media/cases/ruslan-web-v3.webp"
                alt={t("itCases.ruslan.title")}
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-xl"
                draggable={false}
                priority
              />
            </motion.div>
          </div>

          <div className="mt-6">
            <a
              href="http://www.ruslanaviationcomponents.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-purple-200 transition-colors duration-500"
            >
              {t("itCases.ruslan.viewSiteLabel")}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-surface-elevated/40 border border-red-500/25 rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(239,68,68,0.1)] hover:border-red-500/50"
            >
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-4">
                <AlertTriangle size={20} className="text-red-500 shrink-0" />
                {t("itCases.challenge")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("itCases.ruslan.challenge")}
              </p>
            </motion.div>

            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-surface-elevated/40 border border-green-500/25 rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.1)] hover:border-green-500/50"
            >
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-4">
                <Lightbulb size={20} className="text-green-500 shrink-0" />
                {t("itCases.solution")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("itCases.ruslan.solution")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 relative">
        <CurvedDashedLines glowColor="rgba(139, 92, 246, 0.12)" side="both" />
        <div className="max-w-4xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              {t("itCases.technicals")}
            </h2>
          </FadeIn>

          <div className="space-y-6">
            {components.map((comp, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08} y={30} blur={4}>
                <div className="featured-case-card border border-border rounded-2xl p-6 md:p-8" style={{ borderRadius: "16px" }}>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {t(comp.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(comp.descKey)}
                  </p>
                  {comp.image && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-border">
                      <Image
                        src={comp.image}
                        alt={t(comp.titleKey)}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-contain"
                        draggable={false}
                      />
                    </div>
                  )}
                  {comp.images && (
                    <div className="mt-4 space-y-4">
                      {comp.images.map((img: string, idx: number) => (
                        <div key={idx} className="rounded-xl overflow-hidden border border-border">
                          <Image
                            src={img}
                            alt={`${t(comp.titleKey)} ${idx + 1}`}
                            width={1200}
                            height={800}
                            className="w-full h-auto object-contain"
                            draggable={false}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("itCases.results")}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 gap-4">
            {results.map((r, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08} y={20} blur={4}>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-surface-elevated/50 border border-border">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} className="text-green-500" />
                  </div>
                  <p className="text-foreground text-sm leading-relaxed">{t(r)}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("itCases.review")}
            </h2>
            <div className="featured-case-card border border-border rounded-2xl p-8 md:p-12 text-center" style={{ borderRadius: "20px" }}>
              <Quote size={32} className="text-primary mx-auto mb-6 opacity-50" />
              <p className="text-foreground text-lg md:text-xl italic leading-relaxed mb-6">
                &ldquo;{t("itCases.ruslan.reviewText")}&rdquo;
              </p>
              <div className="mb-6 rounded-xl overflow-hidden border border-border">
                <Image
                  src="/media/cases/ruslan-review.png"
                  alt={t("itCases.ruslan.reviewAuthor")}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                  draggable={false}
                />
              </div>
              <div className="flex items-center justify-center gap-3">
  <ReviewAvatar name={t("itCases.ruslan.reviewAuthor")} />
  <p className="text-primary font-semibold">{t("itCases.ruslan.reviewAuthor")}</p>
</div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-muted-foreground/60 mb-1">
            {t("itCases.projectTeam")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("itCases.team.bohdanDeveloper")}
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("itCases.nextStep")}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              {t("itCases.nextStepDesc")}
            </p>
            <a
              href="https://t.me/freelance_ua"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-button inline-flex items-center gap-2 border border-border text-purple-300 hover:border-purple-400/50 hover:bg-purple-400/10 hover:text-purple-200 font-semibold px-8 py-4 rounded-full transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(167,139,250,0.12)]"
            >
              {t("itCases.nextStepCta")}
              <ArrowRight size={18} />
            </a>
          </FadeIn>
        </div>
      </section>

      <RelatedProjectsSection currentSlug="ruslan-aviation" />
    </article>
  );
}
