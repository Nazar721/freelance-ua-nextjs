"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Quote, Expand, ExternalLink } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { cases } from "@/data/cases";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/ui/FadeIn";

const getMimeType = (src: string) =>
  src.endsWith(".webm") ? "video/webm" : "video/mp4";

const slides = cases.map((c) =>
  c.video
    ? { type: "video" as const, sources: [{ src: c.video, type: getMimeType(c.video) }], autoPlay: true }
    : { type: "image" as const, src: c.image!, alt: c.title }
);

export default function CasesSection() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <section id="cases" className="py-20 px-4 bg-[#111118]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16" y={30} blur={8}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-4">
            Наші кейси
          </h2>
          <p className="text-[#8B8B9E] text-lg max-w-2xl mx-auto">
            Реальні проєкти — реальні результати
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
                  className="relative w-full h-52 bg-[#0A0A0F] overflow-hidden group cursor-zoom-in"
                  aria-label={`Відкрити медіа: ${caseItem.title}`}
                >
                  {caseItem.video ? (
                    <>
                      <div className="absolute inset-0 bg-linear-to-br from-[#1A1A24] to-[#0A0A0F]" />
                      <video
                        src={caseItem.video}
                        autoPlay muted loop playsInline
                        className="absolute inset-0 w-full h-full object-contain z-10 transition-transform duration-700 group-hover:scale-110"
                      />
                    </>
                  ) : caseItem.image ? (
                    <>
                      <Image src={caseItem.image} alt="" fill aria-hidden className="object-cover scale-110 blur-2xl opacity-30" />
                      <Image src={caseItem.image} alt={caseItem.title} fill className="object-contain z-10 transition-transform duration-700 group-hover:scale-110" />
                    </>
                  ) : null}
                  <div className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 scale-75 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                      <Expand size={20} className="text-white" />
                    </div>
                  </div>
                </button>

                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-medium text-[#6366F1] mb-2">{caseItem.category}</span>
                  <h3 className="text-[#F8F8FF] font-bold text-base mb-3">{caseItem.title}</h3>
                  <p className="text-[#8B8B9E] text-sm leading-relaxed mb-4 flex-1">{caseItem.description}</p>
                  <div className="bg-[#0A0A0F] rounded-xl p-4 transition-all duration-300 hover:bg-[#0A0A0F]/70 hover:shadow-[inset_0_0_0_1px_rgba(99,102,241,0.22)]">
                    <Quote size={14} className="text-[#6366F1] mb-2" />
                    <p className="text-[#8B8B9E] text-xs italic leading-relaxed">{caseItem.review}</p>
                  </div>
                  {caseItem.link && (
                    <a
                      href={caseItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#6366F1] hover:text-[#4F46E5] transition-all duration-300 hover:translate-x-0.5"
                    >
                      <ExternalLink size={12} />
                      Відвідати сайт
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
            Дивитись всі кейси
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
