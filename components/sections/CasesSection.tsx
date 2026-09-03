"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ArrowRight, Quote, Expand, ExternalLink } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { cases } from "@/data/cases";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/ui/FadeIn";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { useTranslation } from "@/lib/LanguageContext";
import type { CaseSection } from "@/types";

const getMimeType = (src: string) =>
  src.endsWith(".webm") ? "video/webm" : "video/mp4";

const sectionConfig: Record<CaseSection, { titleKey: string; order: number; parent?: string }> = {
  it: { titleKey: "cases.section.it", order: 1 },
  design: { titleKey: "cases.section.design", order: 2 },
  motion: { titleKey: "cases.section.motion", order: 3, parent: "video" },
  ai_video: { titleKey: "cases.section.ai_video", order: 4, parent: "video" },
};

const videoParentConfig = { titleKey: "cases.section.video", order: 3 };

export default function CasesSection() {
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState(-1);

    const groupedCases = useMemo(() => {
      const groups: Record<CaseSection, typeof cases> = {
        it: [],
        design: [],
        motion: [],
        ai_video: [],
      };
      cases.forEach((c) => {
        groups[c.section].push(c);
      });

      const sections: Array<{ key: string; titleKey: string; items: typeof cases; isSubSection?: boolean }> = [];

      // IT section is now handled by ItCasesSection — skip here
      // Design section is now handled by DesignCasesSection — skip here

      // Video parent section with sub-sections
      if (groups.motion.length > 0 || groups.ai_video.length > 0) {
        sections.push({ key: "video", titleKey: videoParentConfig.titleKey, items: [] });
        if (groups.motion.length > 0) {
          sections.push({ key: "motion", titleKey: "cases.section.motion", items: groups.motion, isSubSection: true });
        }
        if (groups.ai_video.length > 0) {
          sections.push({ key: "ai_video", titleKey: "cases.section.ai_video", items: groups.ai_video, isSubSection: true });
        }
      }

      return sections;
    }, []);

  const allCases = useMemo(() => cases, []);

  const slides = useMemo(() =>
    allCases.map((c) =>
      c.video
        ? { type: "video" as const, sources: [{ src: c.video, type: getMimeType(c.video) }], autoPlay: true }
        : { type: "image" as const, src: c.image!, alt: t(c.titleKey) }
    ), [allCases, t]
  );

  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= 768);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const getGlobalIndex = (caseId: number) => allCases.findIndex((c) => c.id === caseId);

  return (
    <section id="cases" className="py-20 px-4 bg-surface">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16" y={30} blur={8}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("cases.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("cases.desc")}
          </p>
        </FadeIn>

        {groupedCases.map((section) => (
          <div key={section.key} className={section.isSubSection ? "mb-12 last:mb-0" : "mb-16 last:mb-0"}>
            {!section.isSubSection && (
              <FadeIn className="mb-8" y={20} blur={4}>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  {t(section.titleKey)}
                </h3>
              </FadeIn>
            )}

            {section.isSubSection && (
              <FadeIn className="mb-6 ml-6" y={15} blur={3}>
                <h4 className="text-xl md:text-2xl font-semibold text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                  {t(section.titleKey)}
                </h4>
              </FadeIn>
            )}

            {section.items.length > 0 && (
              <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ${section.isSubSection ? "ml-6" : ""}`}>
                {section.items.map((caseItem, index) => (
                  <FadeIn
                    key={caseItem.id}
                    delay={0.1 + index * 0.08}
                    y={40}
                    blur={4}
                  >
                    <div className="premium-surface glow-border bg-surface-elevated border border-border rounded-2xl overflow-hidden flex flex-col h-full group/card">
                      <button
                        onClick={() => setLightboxIndex(getGlobalIndex(caseItem.id))}
                        className="relative w-full bg-background overflow-hidden group cursor-zoom-in flex items-center justify-center"
                        aria-label={`${t("cases.openMedia")} ${t(caseItem.titleKey)}`}
                      >
                        {caseItem.video ? (
                          <>
                            <div className="absolute inset-0 bg-linear-to-br from-surface-elevated to-background" />
                            <LazyVideo
                              src={caseItem.video}
                              autoPlay muted loop playsInline
                              className="relative w-full h-auto max-h-80 object-contain z-10 transition-transform duration-700 group-hover:scale-110"
                            />
                          </>
                        ) : caseItem.image ? (
                          <Image src={caseItem.image} alt={t(caseItem.titleKey)} width={800} height={600} draggable={false} onContextMenu={(e) => e.preventDefault()} className="relative w-full h-auto max-h-80 object-contain z-10 transition-transform duration-700 group-hover:scale-110" />
                        ) : null}
                        <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                          <div className={`opacity-0 scale-75 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-white/10 ${isMobile ? "" : "backdrop-blur-sm"} rounded-full p-3 border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.3)]`}>
                            <Expand size={20} className="text-white" />
                          </div>
                        </div>
                      </button>

                      <div className="p-6 flex flex-col flex-1">
                        <span className="text-xs font-medium text-accent mb-2">{t(caseItem.categoryKey)}</span>
                        <h3 className="text-foreground font-bold text-base mb-3">{t(caseItem.titleKey)}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{t(caseItem.descriptionKey)}</p>
                        <div className="bg-background rounded-xl p-4 transition-all duration-300 hover:bg-background/70 hover:shadow-[inset_0_0_0_1px_rgba(99,102,241,0.22)]">
                          <Quote size={14} className="text-accent mb-2" />
                          <p className="text-muted-foreground text-xs italic leading-relaxed">{t(caseItem.reviewKey)}</p>
                        </div>
                        {caseItem.link && (
                          <a
                            href={caseItem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover transition-all duration-300 hover:translate-x-0.5"
                          >
                            <ExternalLink size={12} />
                            {t("cases.visit")}
                          </a>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        ))}

        <FadeIn delay={0.15} y={20} blur={4} className="text-center mt-8">
          <a
            href={siteConfig.telegram.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-primary-foreground font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
          >
            {t("cases.allCases")}
            <ArrowRight size={18} />
          </a>
        </FadeIn>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Video, Zoom]}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.95)" } }}
        video={{ autoPlay: true, muted: false, controls: true, playsInline: true, loop: true }}
      />
    </section>
  );
}
