"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Quote, Expand, ExternalLink } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { cases } from "@/data/cases";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/ui/FadeIn";
import { useTranslation } from "@/lib/LanguageContext";

const getMimeType = (src: string) =>
  src.endsWith(".webm") ? "video/webm" : "video/mp4";

export default function CasesSection() {
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const slides = cases.map((c) =>
    c.video
      ? { type: "video" as const, sources: [{ src: c.video, type: getMimeType(c.video) }], autoPlay: true }
      : { type: "image" as const, src: c.image!, alt: t(c.titleKey) }
  );

  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= 768);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="cases" className="py-20 px-4 bg-[#111118]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16" y={30} blur={8}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            {t("cases.title")}
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-2xl mx-auto">
            {t("cases.desc")}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {cases.map((caseItem, index) => (
            <FadeIn
              key={caseItem.id}
              delay={0.1 + index * 0.08}
              y={40}
              blur={4}
            >
              <div className="premium-surface glow-border bg-[#1A1A24] border border-[#2A2A38] rounded-2xl overflow-hidden flex flex-col h-full group/card">
                <button
                  onClick={() => setLightboxIndex(index)}
                  className="relative w-full bg-[#0A0A0F] overflow-hidden group cursor-zoom-in flex items-center justify-center"
                  aria-label={`${t("cases.openMedia")} ${t(caseItem.titleKey)}`}
                >
                  {caseItem.video ? (
                    <>
                      <div className="absolute inset-0 bg-linear-to-br from-[#1A1A24] to-[#0A0A0F]" />
                      <video
                        src={caseItem.video}
                        autoPlay muted loop playsInline
                        className="relative w-full h-auto max-h-80 object-contain z-10 transition-transform duration-700 group-hover:scale-110"
                      />
                    </>
                  ) : caseItem.image ? (
                    <Image src={caseItem.image} alt={t(caseItem.titleKey)} width={800} height={600} className="relative w-full h-auto max-h-80 object-contain z-10 transition-transform duration-700 group-hover:scale-110" />
                  ) : null}
                  <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                    <div className={`opacity-0 scale-75 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-white/10 ${isMobile ? "" : "backdrop-blur-sm"} rounded-full p-3 border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.3)]`}>
                      <Expand size={20} className="text-white" />
                    </div>
                  </div>
                </button>

                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-medium text-[#6366F1] mb-2">{t(caseItem.categoryKey)}</span>
                  <h3 className="text-[#F8F8FF] font-bold text-base mb-3">{t(caseItem.titleKey)}</h3>
                  <p className="text-[#8B8B9E] text-sm leading-relaxed mb-4 flex-1">{t(caseItem.descriptionKey)}</p>
                  <div className="bg-[#0A0A0F] rounded-xl p-4 transition-all duration-300 hover:bg-[#0A0A0F]/70 hover:shadow-[inset_0_0_0_1px_rgba(99,102,241,0.22)]">
                    <Quote size={14} className="text-[#6366F1] mb-2" />
                    <p className="text-[#8B8B9E] text-xs italic leading-relaxed">{t(caseItem.reviewKey)}</p>
                  </div>
                  {caseItem.link && (
                    <a
                      href={caseItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#6366F1] hover:text-[#4F46E5] transition-all duration-300 hover:translate-x-0.5"
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

        <FadeIn delay={0.15} y={20} blur={4} className="text-center">
          <a
            href={siteConfig.telegram.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-button inline-flex items-center gap-2 border border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1] hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
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
