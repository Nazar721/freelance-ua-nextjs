"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { useTranslation } from "@/lib/LanguageContext";

interface RelatedCase {
  slug: string;
  categoryKey: string;
  titleKey: string;
  descriptionKey: string;
  href: string;
  image: string;
  section: "it" | "design" | "video";
}

const allCases: RelatedCase[] = [
  {
    slug: "hope-media-group",
    categoryKey: "designCases.hopeMedia.category",
    titleKey: "designCases.hopeMedia.title",
    descriptionKey: "designCases.hopeMedia.shortDesc",
    href: "/cases/design/hope-media-group",
    image: "/media/cases/hope-media/hope-media-preview.webp",
    section: "design",
  },
  {
    slug: "nastya-smm",
    categoryKey: "designCases.nastyaSmm.category",
    titleKey: "designCases.nastyaSmm.title",
    descriptionKey: "designCases.nastyaSmm.shortDesc",
    href: "/cases/design/nastya-smm",
    image: "/media/cases/nastya-smm/nastya-smm-preview.webp",
    section: "design",
  },
  {
    slug: "vikontse-logo",
    categoryKey: "designCases.vikontseLogo.category",
    titleKey: "designCases.vikontseLogo.title",
    descriptionKey: "designCases.vikontseLogo.shortDesc",
    href: "/cases/design/vikontse-logo",
    image: "/media/cases/vikontse-logo/vikontse-logo-preview.webp",
    section: "design",
  },
  {
    slug: "schonheit-gift-certificate",
    categoryKey: "designCases.schonheitGiftCertificate.category",
    titleKey: "designCases.schonheitGiftCertificate.title",
    descriptionKey: "designCases.schonheitGiftCertificate.shortDesc",
    href: "/cases/design/schonheit-gift-certificate",
    image: "/media/cases/schonheit-gift-certificate/schonheit-gift-certificate-preview.webp",
    section: "design",
  },
  {
    slug: "smm-case-presentation",
    categoryKey: "designCases.smmCasePresentation.category",
    titleKey: "designCases.smmCasePresentation.title",
    descriptionKey: "designCases.smmCasePresentation.shortDesc",
    href: "/cases/design/smm-case-presentation",
    image: "/media/cases/smm-case-presentation/smm-case-presentation-preview.webp",
    section: "design",
  },
  {
    slug: "mht-clinic-billboard",
    categoryKey: "designCases.mhtClinicBillboard.category",
    titleKey: "designCases.mhtClinicBillboard.title",
    descriptionKey: "designCases.mhtClinicBillboard.shortDesc",
    href: "/cases/design/mht-clinic-billboard",
    image: "/media/cases/mht-clinic-billboard/mht-clinic-billboard-preview.webp",
    section: "design",
  },
  {
    slug: "prestige-school-billboard",
    categoryKey: "designCases.prestigeSchoolBillboard.category",
    titleKey: "designCases.prestigeSchoolBillboard.title",
    descriptionKey: "designCases.prestigeSchoolBillboard.shortDesc",
    href: "/cases/design/prestige-school-billboard",
    image: "/media/cases/prestige-school-billboard/prestige-school-billboard-preview.webp",
    section: "design",
  },
  {
    slug: "photo-retouch",
    categoryKey: "designCases.photoRetouch.category",
    titleKey: "designCases.photoRetouch.title",
    descriptionKey: "designCases.photoRetouch.shortDesc",
    href: "/cases/design/photo-retouch",
    image: "/media/cases/photo-retouch/photo-retouch-preview.webp",
    section: "design",
  },
  {
    slug: "mydutyfree",
    categoryKey: "designCases.mydutyfree.category",
    titleKey: "designCases.mydutyfree.title",
    descriptionKey: "designCases.mydutyfree.shortDesc",
    href: "/cases/design/mydutyfree",
    image: "/media/cases/mydutyfree/mydutyfree-preview.webp",
    section: "design",
  },
  {
    slug: "gopro-hero13",
    categoryKey: "designCases.goproHero13.category",
    titleKey: "designCases.goproHero13.title",
    descriptionKey: "designCases.goproHero13.shortDesc",
    href: "/cases/design/gopro-hero13",
    image: "/media/cases/gopro-hero13/gopro-hero13-preview.webp",
    section: "design",
  },
  {
    slug: "gel-polish",
    categoryKey: "designCases.gelPolish.category",
    titleKey: "designCases.gelPolish.title",
    descriptionKey: "designCases.gelPolish.shortDesc",
    href: "/cases/design/gel-polish",
    image: "/media/cases/gel-polish/gel-polish-preview.webp",
    section: "design",
  },
  {
    slug: "divorce-legal-ad",
    categoryKey: "designCases.divorceLegalAd.category",
    titleKey: "designCases.divorceLegalAd.title",
    descriptionKey: "designCases.divorceLegalAd.shortDesc",
    href: "/cases/design/divorce-legal-ad",
    image: "/media/cases/divorce-legal-ad/divorce-legal-ad-preview.webp",
    section: "design",
  },
  {
    slug: "giesbrecht-pv",
    categoryKey: "designCases.giesbrechtPv.category",
    titleKey: "designCases.giesbrechtPv.title",
    descriptionKey: "designCases.giesbrechtPv.shortDesc",
    href: "/cases/design/giesbrecht-pv",
    image: "/media/cases/giesbrecht-pv/giesbrecht-pv-preview.webp",
    section: "design",
  },
  {
    slug: "sembud-repair",
    categoryKey: "designCases.sembudRepair.category",
    titleKey: "designCases.sembudRepair.title",
    descriptionKey: "designCases.sembudRepair.shortDesc",
    href: "/cases/design/sembud-repair",
    image: "/media/cases/sembud-repair/sembud-repair-preview.webp",
    section: "design",
  },
  {
    slug: "crypto-chat-manager-vacancy",
    categoryKey: "designCases.cryptoChatManagerVacancy.category",
    titleKey: "designCases.cryptoChatManagerVacancy.title",
    descriptionKey: "designCases.cryptoChatManagerVacancy.shortDesc",
    href: "/cases/design/crypto-chat-manager-vacancy",
    image: "/media/cases/crypto-chat-manager-vacancy/crypto-chat-manager-vacancy-preview.webp",
    section: "design",
  },
  {
    slug: "apple-tecnologia",
    categoryKey: "designCases.appleTecnologia.category",
    titleKey: "designCases.appleTecnologia.title",
    descriptionKey: "designCases.appleTecnologia.shortDesc",
    href: "/cases/design/apple-tecnologia",
    image: "/media/cases/apple-tecnologia/apple-tecnologia-preview.webp",
    section: "design",
  },
  {
    slug: "f5-guitars-youtube",
    categoryKey: "designCases.f5Guitars.category",
    titleKey: "designCases.f5Guitars.title",
    descriptionKey: "designCases.f5Guitars.shortDesc",
    href: "/cases/design/f5-guitars-youtube",
    image: "/media/cases/f5-guitars-youtube/f5-guitars-youtube-preview.webp",
    section: "design",
  },
  {
    slug: "pink-pr-flyers",
    categoryKey: "designCases.pinkPrFlyers.category",
    titleKey: "designCases.pinkPrFlyers.title",
    descriptionKey: "designCases.pinkPrFlyers.shortDesc",
    href: "/cases/design/pink-pr-flyers",
    image: "/media/cases/pink-pr-flyers/pink-pr-flyers-preview.webp",
    section: "design",
  },
  {
    slug: "eva-code",
    categoryKey: "itCases.evaCode.category",
    titleKey: "itCases.evaCode.title",
    descriptionKey: "itCases.evaCode.shortDesc",
    href: "/cases/it/eva-code",
    image: "/media/cases/eva-web.webp?v=2",
    section: "it",
  },
  {
    slug: "ruslan-aviation",
    categoryKey: "itCases.ruslan.category",
    titleKey: "itCases.ruslan.title",
    descriptionKey: "itCases.ruslan.shortDesc",
    href: "/cases/it/ruslan-aviation",
    image: "/media/cases/ruslan-web-v3.webp",
    section: "it",
  },
  {
    slug: "repair-collision",
    categoryKey: "itCases.repairCollision.category",
    titleKey: "itCases.repairCollision.title",
    descriptionKey: "itCases.repairCollision.shortDesc",
    href: "/cases/it/repair-collision",
    image: "/media/cases/repair-collision-web.webp",
    section: "it",
  },
  {
    slug: "prime-auto-shipping",
    categoryKey: "itCases.primeAuto.category",
    titleKey: "itCases.primeAuto.title",
    descriptionKey: "itCases.primeAuto.shortDesc",
    href: "/cases/it/prime-auto-shipping",
    image: "/media/cases/prime-autoshipping-mockup.webp",
    section: "it",
  },
  {
    slug: "asandra-soul",
    categoryKey: "itCases.asandraSoul.category",
    titleKey: "itCases.asandraSoul.title",
    descriptionKey: "itCases.asandraSoul.shortDesc",
    href: "/cases/it/asandra-soul",
    image: "/media/cases/asandraapp-mocap.webp",
    section: "it",
  },
  {
    slug: "route-core",
    categoryKey: "itCases.routeCore.category",
    titleKey: "itCases.routeCore.title",
    descriptionKey: "itCases.routeCore.shortDesc",
    href: "/cases/it/route-core",
    image: "/media/cases/routecore-mocap.webp",
    section: "it",
  },
  {
    slug: "serezha-shop",
    categoryKey: "itCases.serezhaShop.category",
    titleKey: "itCases.serezhaShop.title",
    descriptionKey: "itCases.serezhaShop.shortDesc",
    href: "/cases/it/serezha-shop",
    image: "/media/cases/serezha-mocap.webp",
    section: "it",
  },
  {
    slug: "nextcup",
    categoryKey: "itCases.nextCup.category",
    titleKey: "itCases.nextCup.title",
    descriptionKey: "itCases.nextCup.shortDesc",
    href: "/cases/it/nextcup",
    image: "/media/cases/nextcup-mocap.webp",
    section: "it",
  },
  {
    slug: "shkiper-drop",
    categoryKey: "itCases.shkiperDrop.category",
    titleKey: "itCases.shkiperDrop.title",
    descriptionKey: "itCases.shkiperDrop.shortDesc",
    href: "/cases/it/shkiper-drop",
    image: "/media/cases/shkiper-drop-mocap.webp",
    section: "it",
  },
  {
    slug: "mnm-detailing",
    categoryKey: "itCases.mnmDetailing.category",
    titleKey: "itCases.mnmDetailing.title",
    descriptionKey: "itCases.mnmDetailing.shortDesc",
    href: "/cases/it/mnm-detailing",
    image: "/media/cases/mnm-detailing-mocap.webp",
    section: "it",
  },
  {
    slug: "sdent",
    categoryKey: "itCases.sdent.category",
    titleKey: "itCases.sdent.title",
    descriptionKey: "itCases.sdent.shortDesc",
    href: "/cases/it/sdent",
    image: "/media/cases/sdent-mocap.webp",
    section: "it",
  },
  {
    slug: "md-dental",
    categoryKey: "itCases.mdDental.category",
    titleKey: "itCases.mdDental.title",
    descriptionKey: "itCases.mdDental.shortDesc",
    href: "/cases/it/md-dental",
    image: "/media/cases/mddental-mocap.webp",
    section: "it",
  },
  {
    slug: "voltone-pro",
    categoryKey: "itCases.voltonePro.category",
    titleKey: "itCases.voltonePro.title",
    descriptionKey: "itCases.voltonePro.shortDesc",
    href: "/cases/it/voltone-pro",
    image: "/media/cases/voltone-mocap.webp",
    section: "it",
  },
  {
    slug: "nikita-sheremet",
    categoryKey: "videoCases.nikitaSheremet.category",
    titleKey: "videoCases.nikitaSheremet.title",
    descriptionKey: "videoCases.nikitaSheremet.shortDesc",
    href: "/cases/video/nikita-sheremet-crypto",
    image: "/media/cases/nikita-sheremet-crypto/avatar.jpeg",
    section: "video",
  },
  {
    slug: "eva-code-reels",
    categoryKey: "videoCases.evaCodeReels.category",
    titleKey: "videoCases.evaCodeReels.title",
    descriptionKey: "videoCases.evaCodeReels.shortDesc",
    href: "/cases/video/eva-code-reels",
    image: "/media/cases/eva-code-reels/hero-poster.jpg",
    section: "video",
  },
  {
    slug: "vsehub-reels",
    categoryKey: "videoCases.vsehub.category",
    titleKey: "videoCases.vsehub.title",
    descriptionKey: "videoCases.vsehub.shortDesc",
    href: "/cases/video/vsehub-reels",
    image: "/media/cases/vsehub-reels/avatar.jpeg",
    section: "video",
  },
  {
    slug: "varto-reels",
    categoryKey: "videoCases.varto.category",
    titleKey: "videoCases.varto.title",
    descriptionKey: "videoCases.varto.shortDesc",
    href: "/cases/video/varto-reels",
    image: "/media/cases/varto-reels/screenshot.webp",
    section: "video",
  },
  {
    slug: "vtikha-promo",
    categoryKey: "videoCases.vtikha.category",
    titleKey: "videoCases.vtikha.title",
    descriptionKey: "videoCases.vtikha.shortDesc",
    href: "/cases/video/vtikha-promo",
    image: "/media/cases/vtikha-promo/hero-poster.jpg",
    section: "video",
  },
  {
    slug: "dance-competition-lviv",
    categoryKey: "videoCases.danceCompetition.category",
    titleKey: "videoCases.danceCompetition.title",
    descriptionKey: "videoCases.danceCompetition.shortDesc",
    href: "/cases/video/dance-competition-lviv",
    image: "/media/cases/dance-competition-lviv/hero-poster.jpg",
    section: "video",
  },
  {
    slug: "artem-reels",
    categoryKey: "videoCases.artem.category",
    titleKey: "videoCases.artem.title",
    descriptionKey: "videoCases.artem.shortDesc",
    href: "/cases/video/artem-reels",
    image: "/media/cases/artem-reels/hero-poster.jpg",
    section: "video",
  },
  {
    slug: "yulia-smm-reels",
    categoryKey: "videoCases.yuliaSmm.category",
    titleKey: "videoCases.yuliaSmm.title",
    descriptionKey: "videoCases.yuliaSmm.shortDesc",
    href: "/cases/video/yulia-smm-reels",
    image: "/media/cases/yulia-smm-reels/hero-poster.jpg",
    section: "video",
  },
  {
    slug: "auto-edits-reels",
    categoryKey: "videoCases.autoEdits.category",
    titleKey: "videoCases.autoEdits.title",
    descriptionKey: "videoCases.autoEdits.shortDesc",
    href: "/cases/video/auto-edits-reels",
    image: "/media/cases/auto-edits/hero-poster.jpg",
    section: "video",
  },
  {
    slug: "cuprus-life",
    categoryKey: "videoCases.cuprusLife.category",
    titleKey: "videoCases.cuprusLife.title",
    descriptionKey: "videoCases.cuprusLife.shortDesc",
    href: "/cases/video/cuprus-life",
    image: "/media/cases/cuprus-life/preview-1.jpg",
    section: "video",
  },
  {
    slug: "veronika-ai-muscles",
    categoryKey: "videoCases.veronikaAiMuscles.category",
    titleKey: "videoCases.veronikaAiMuscles.title",
    descriptionKey: "videoCases.veronikaAiMuscles.shortDesc",
    href: "/cases/video/veronika-ai-muscles",
    image: "/media/cases/veronika-ai-muscles/screenshot.webp",
    section: "video",
  },
  {
    slug: "logan-ai-promo",
    categoryKey: "videoCases.loganAiPromo.category",
    titleKey: "videoCases.loganAiPromo.title",
    descriptionKey: "videoCases.loganAiPromo.shortDesc",
    href: "/cases/video/logan-ai-promo",
    image: "/media/cases/logan-ai-promo/hero-poster.jpg",
    section: "video",
  },
  {
    slug: "sheglam-promo",
    categoryKey: "videoCases.sheglamPromo.category",
    titleKey: "videoCases.sheglamPromo.title",
    descriptionKey: "videoCases.sheglamPromo.shortDesc",
    href: "/cases/video/sheglam-promo",
    image: "/media/cases/sheglam-promo/hero-poster.jpg",
    section: "video",
  },
  {
    slug: "sheglam-freedom-fest",
    categoryKey: "videoCases.sheglamFreedomFest.category",
    titleKey: "videoCases.sheglamFreedomFest.title",
    descriptionKey: "videoCases.sheglamFreedomFest.shortDesc",
    href: "/cases/video/sheglam-freedom-fest",
    image: "/media/cases/sheglam-freedom-fest/hero-poster.jpg",
    section: "video",
  },
  {
    slug: "ai-spring-fashion",
    categoryKey: "videoCases.aiSpringFashion.category",
    titleKey: "videoCases.aiSpringFashion.title",
    descriptionKey: "videoCases.aiSpringFashion.shortDesc",
    href: "/cases/video/ai-spring-fashion",
    image: "/media/cases/ai-spring-fashion/hero-poster.jpg",
    section: "video",
  },
  {
    slug: "internet-svit-promo",
    categoryKey: "videoCases.internetSvitPromo.category",
    titleKey: "videoCases.internetSvitPromo.title",
    descriptionKey: "videoCases.internetSvitPromo.shortDesc",
    href: "/cases/video/internet-svit-promo",
    image: "/media/cases/internet-svit-promo/hero-poster.jpg",
    section: "video",
  },
  {
    slug: "dominanta-youtube-intro",
    categoryKey: "videoCases.dominanta.category",
    titleKey: "videoCases.dominanta.title",
    descriptionKey: "videoCases.dominanta.shortDesc",
    href: "/cases/video/dominanta-youtube-intro",
    image: "/media/cases/dominanta-youtube-intro/hero-poster.jpg",
    section: "video",
  },
  {
    slug: "telegram-emoji-stickers",
    categoryKey: "videoCases.telegramEmojiStickers.category",
    titleKey: "videoCases.telegramEmojiStickers.title",
    descriptionKey: "videoCases.telegramEmojiStickers.shortDesc",
    href: "/cases/video/telegram-emoji-stickers",
    image: "/media/cases/telegram-emoji-stickers/screenshot.webp",
    section: "video",
  },
  {
    slug: "youtube-conversational-video",
    categoryKey: "videoCases.youtubeConversationalVideo.category",
    titleKey: "videoCases.youtubeConversationalVideo.title",
    descriptionKey: "videoCases.youtubeConversationalVideo.shortDesc",
    href: "/cases/video/youtube-conversational-video",
    image: "/media/cases/youtube-conversational-video/hero-poster.jpg",
    section: "video",
  },
  {
    slug: "liliya-product-business",
    categoryKey: "videoCases.liliyaProductBusiness.category",
    titleKey: "videoCases.liliyaProductBusiness.title",
    descriptionKey: "videoCases.liliyaProductBusiness.shortDesc",
    href: "/cases/video/liliya-product-business",
    image: "/media/cases/liliya-product-business/screen-1.jpg",
    section: "video",
  },
  {
    slug: "taranenko-trade",
    categoryKey: "videoCases.taranenkoTrade.category",
    titleKey: "videoCases.taranenkoTrade.title",
    descriptionKey: "videoCases.taranenkoTrade.shortDesc",
    href: "/cases/video/taranenko-trade",
    image: "/media/cases/taranenko-trade/screen-1.jpg",
    section: "video",
  },
];

export default function RelatedProjectsSection({
  currentSlug,
  section = "it",
}: {
  currentSlug: string;
  section?: "it" | "design" | "video";
}) {
  const { t } = useTranslation();

  const others = allCases.filter((c) => c.slug !== currentSlug);
  const sameSection = others.filter((c) => c.section === section);
  const otherSection = others.filter((c) => c.section !== section);
  const relatedCases = [...sameSection, ...otherSection].slice(0, 3);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn y={30} blur={8}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            {t("itCases.relatedProjects")}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedCases.map((caseItem, i) => (
            <FadeIn key={caseItem.slug} delay={0.1 + i * 0.1} y={30} blur={4}>
              <Link
                href={caseItem.href}
                className="group block bg-secondary/50 border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/50 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(99,102,241,0.15)]"
              >
                <div className="relative aspect-[3/2] bg-background overflow-hidden">
                  <Image
                    src={caseItem.image}
                    alt={t(caseItem.titleKey)}
                    width={800}
                    height={500}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                </div>

                <div className="p-6">
                  <span className="text-xs font-medium text-primary mb-2 block">
                    {t(caseItem.categoryKey)}
                  </span>
                  <h3 className="text-foreground font-bold text-lg mb-2">
                    {t(caseItem.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {t(caseItem.descriptionKey)}
                  </p>
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-primary text-sm font-medium md:group-hover:gap-2.5 transition-all duration-300">
                    {t("itCases.viewProject")}
                    <ArrowRight size={14} className="transition-transform duration-300 md:group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
