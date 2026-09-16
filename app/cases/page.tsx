"use client";

import { Suspense, useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FadeIn } from "@/components/ui/FadeIn";
import FeaturedCaseCard from "@/components/ui/FeaturedCaseCard";
import VideoCaseCard from "@/components/ui/VideoCaseCard";
import { itCases } from "@/data/itCases";
import { designCases } from "@/data/designCases";
import { videoCases } from "@/data/videoCases";
import type { DesignCategory, ITCategory } from "@/data/types";
import type { VideoSubCategory } from "@/data/videoCases";
import { useTranslation } from "@/lib/LanguageContext";

type Tab = "it" | "design" | "video";
type DesignType = "all" | DesignCategory;
type ITType = "all" | ITCategory;
type VideoType = "all" | VideoSubCategory;

function CasesTabsContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const saved = sessionStorage.getItem("cases-scroll-position");
    if (saved) {
      const y = parseInt(saved, 10);
      requestAnimationFrame(() => {
        const lenis = (window as unknown as Record<string, unknown>).__lenis;
        if (lenis && typeof (lenis as { scrollTo: unknown }).scrollTo === "function") {
          (lenis as { scrollTo: (y: number, opts: { immediate: boolean }) => void }).scrollTo(y, { immediate: true });
        } else {
          window.scrollTo(0, y);
        }
        sessionStorage.removeItem("cases-scroll-position");
      });
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          sessionStorage.setItem("cases-scroll-position", String(window.scrollY));
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initialTab: Tab = (searchParams.get("tab") as Tab) || "it";
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  const typeParam = searchParams.get("type");
  const activeDesignType: DesignType =
    typeParam === "banners" || typeParam === "branding" || typeParam === "photo-retouch"
      ? (typeParam as DesignCategory)
      : "all";
  const activeITType: ITType =
    typeParam === "ecommerce" || typeParam === "landing" || typeParam === "saas-telegram"
      ? (typeParam as ITCategory)
      : "all";
  const activeVideoType: VideoType =
    typeParam === "reels" || typeParam === "motion" || typeParam === "youtube" || typeParam === "ai"
      ? (typeParam as VideoSubCategory)
      : "all";

  const updateQuery = useCallback(
    (nextTab: Tab, nextType: DesignType | ITType | VideoType) => {
      const params = new URLSearchParams(searchParams.toString());
      if (nextTab === "design") params.set("tab", "design");
      else if (nextTab === "video") params.set("tab", "video");
      else params.delete("tab");
      if (nextTab === "design" && nextType !== "all") params.set("type", nextType as string);
      else if (nextTab === "it" && nextType !== "all") params.set("type", nextType as string);
      else if (nextTab === "video" && nextType !== "all") params.set("type", nextType as string);
      else params.delete("type");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const handleTab = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === "design") updateQuery(tab, activeDesignType);
    else if (tab === "video") updateQuery(tab, activeVideoType);
    else updateQuery(tab, "all");
  };

  const handleDesignType = (type: DesignType) => {
    updateQuery("design", type);
  };

  const handleITType = (type: ITType) => {
    updateQuery("it", type);
  };

  const handleVideoType = (type: VideoType) => {
    updateQuery("video", type);
  };

  const tabs: Array<{ key: Tab; labelKey: string }> = [
    { key: "it", labelKey: "cases.tab.it" },
    { key: "design", labelKey: "cases.tab.design" },
    { key: "video", labelKey: "cases.tab.video" },
  ];

  const designTypes: Array<{ key: DesignType; labelKey: string }> = [
    { key: "all", labelKey: "cases.subtab.all" },
    { key: "banners", labelKey: "cases.subtab.banners" },
    { key: "branding", labelKey: "cases.subtab.branding" },
    { key: "photo-retouch", labelKey: "cases.subtab.photoRetouch" },
  ];

  const itTypes: Array<{ key: ITType; labelKey: string }> = [
    { key: "all", labelKey: "cases.subtab.all" },
    { key: "ecommerce", labelKey: "cases.subtab.ecommerce" },
    { key: "landing", labelKey: "cases.subtab.landing" },
    { key: "saas-telegram", labelKey: "cases.subtab.saasTelegram" },
  ];

  const videoTypes: Array<{ key: VideoType; labelKey: string }> = [
    { key: "all", labelKey: "cases.subtab.all" },
    { key: "reels", labelKey: "cases.subtab.reels" },
    { key: "motion", labelKey: "cases.subtab.motion" },
    { key: "youtube", labelKey: "cases.subtab.youtube" },
    { key: "ai", labelKey: "cases.subtab.ai" },
  ];

  const filteredITCases =
    activeITType === "all"
      ? itCases
      : itCases.filter((c) => c.itCategory === activeITType);

  const filteredDesignCases =
    activeDesignType === "all"
      ? designCases
      : designCases.filter((c) => c.category === activeDesignType);

  const filteredVideoCases =
    activeVideoType === "all"
      ? videoCases
      : videoCases.filter((c) => c.subCategory === activeVideoType);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-12" y={30} blur={8}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("cases.title")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("cases.desc")}
          </p>
        </FadeIn>

        {/* Tabs */}
        <FadeIn delay={0.1} y={20} blur={4} className="flex justify-center mb-14">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full border border-border bg-secondary/60">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTab(tab.key)}
                className={`cursor-pointer px-6 md:px-10 py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground shadow-[0_0_24px_rgba(99,102,241,0.35)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Sub-tabs — inside the active tab */}
        {activeTab === "design" && (
          <FadeIn delay={0.14} y={16} blur={4} className="flex justify-center mb-14">
            <div className="inline-flex flex-wrap justify-center items-center gap-1 p-1.5 rounded-full border border-border bg-secondary/50">
              {designTypes.map((dt) => (
                <button
                  key={dt.key}
                  onClick={() => handleDesignType(dt.key)}
                  className={`cursor-pointer px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                    activeDesignType === dt.key
                      ? "bg-foreground text-background shadow-[0_0_18px_rgba(248,248,255,0.18)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(dt.labelKey)}
                </button>
              ))}
            </div>
          </FadeIn>
        )}

        {activeTab === "it" && (
          <FadeIn delay={0.14} y={16} blur={4} className="flex justify-center mb-14">
            <div className="inline-flex flex-wrap justify-center items-center gap-1 p-1.5 rounded-full border border-border bg-secondary/50">
              {itTypes.map((it) => (
                <button
                  key={it.key}
                  onClick={() => handleITType(it.key)}
                  className={`cursor-pointer px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                    activeITType === it.key
                      ? "bg-foreground text-background shadow-[0_0_18px_rgba(248,248,255,0.18)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(it.labelKey)}
                </button>
              ))}
            </div>
          </FadeIn>
        )}

        {activeTab === "video" && (
          <FadeIn delay={0.14} y={16} blur={4} className="flex justify-center mb-14">
            <div className="inline-flex flex-wrap justify-center items-center gap-1 p-1.5 rounded-full border border-border bg-secondary/50">
              {videoTypes.map((vt) => (
                <button
                  key={vt.key}
                  onClick={() => handleVideoType(vt.key)}
                  className={`cursor-pointer px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                    activeVideoType === vt.key
                      ? "bg-foreground text-background shadow-[0_0_18px_rgba(248,248,255,0.18)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(vt.labelKey)}
                </button>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Tab content */}
        {activeTab === "it" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {filteredITCases.map((c, i) => (
              <FadeIn key={c.slug} delay={0.05 + i * 0.06} y={40} blur={4}>
                <FeaturedCaseCard
                  categoryKey={c.categoryKey}
                  titleKey={c.titleKey}
                  descriptionKey={c.descriptionKey}
                  href={c.href}
                  glowColor={c.glowColor}
                  glowColorStrong={c.glowColorStrong}
                  image={c.image}
                  hoverImage={c.hoverImage}
                  imageFit={c.imageFit}
                  objectPosition={c.objectPosition}
                  preload={i < 2}
                  badge={c.badge}
                />
              </FadeIn>
            ))}
          </div>
        )}

        {activeTab === "design" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {filteredDesignCases.map((c, i) => (
              <FadeIn key={c.slug} delay={0.05 + i * 0.06} y={40} blur={4}>
                <FeaturedCaseCard
                  categoryKey={c.categoryKey}
                  titleKey={c.titleKey}
                  descriptionKey={c.descriptionKey}
                  href={c.href}
                  glowColor={c.glowColor}
                  glowColorStrong={c.glowColorStrong}
                  image={c.image}
                  hoverImage={c.hoverImage}
                  galleryImages={c.galleryImages}
                  preload={i < 2}
                  badge={c.badge}
                />
              </FadeIn>
            ))}
          </div>
        )}

        {activeTab === "video" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {filteredVideoCases.map((c, i) => (
              <FadeIn key={c.slug} delay={0.05 + i * 0.06} y={40} blur={4}>
                <VideoCaseCard
                  categoryKey={c.categoryKey}
                  titleKey={c.titleKey}
                  descriptionKey={c.descriptionKey}
                  href={c.href}
                  glowColor={c.glowColor}
                  glowColorStrong={c.glowColorStrong}
                  video={c.heroVideo}
                  poster={c.poster}
                  thumbnail={c.thumbnail}
                  duration={c.duration}
                  format={c.format}
                  preload={i < 2}
                />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function CasesPage() {
  return (
    <Suspense fallback={null}>
      <CasesTabsContent />
    </Suspense>
  );
}
