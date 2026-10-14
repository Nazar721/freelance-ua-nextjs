import { key, text, type CaseRecord } from "../types";

/**
 * design/moto-school-window-branding — migrated by hand: the original page is
 * a composite "scenes" layout (artwork → installation) with mobile-only
 * detail crops of the panorama, which the bulk mapper cannot express.
 * Every text is an existing dictionary key except the rewritten H1 and the
 * EN twin of the SEO title (texts.md, розділ 14).
 */
export const motoSchoolWindowBranding: CaseRecord = {
  id: "design/moto-school-window-branding",
  slug: "moto-school-window-branding",
  direction: "design",
  subcategory: "branding",
  uaPath: "/cases/design/moto-school-window-branding",
  enPath: "/en/cases/design/moto-school-window-branding",

  h1: text("Мотошкола — оформлення вітрин", "Motorcycle school — window branding"),
  lead: key("designCases.motoSchoolWindowBranding.subtitle"),
  seo: {
    title: text(
      "Мотошкола — оформлення вітрин | Freelance UA",
      "Motorcycle school — window branding | Freelance UA",
    ),
    description: key("designCases.motoSchoolWindowBranding.subtitle"),
    ogImage: "https://freelance-ua.agency/media/cases/moto-school-window-branding/moto-school-artwork.webp",
  },
  badge: key("designCases.motoSchoolWindowBranding.category"),
  glow: { base: "rgba(239, 68, 68, 0.12)", strong: "rgba(132, 204, 22, 0.22)" },

  hero: {
    kind: "image",
    src: "/media/cases/moto-school-window-branding/moto-school-artwork.webp",
    w: 2560,
    h: 1074,
    alt: key("designCases.motoSchoolWindowBranding.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.motoSchoolWindowBranding.challenge"),
      solution: key("designCases.motoSchoolWindowBranding.solution"),
    },
    {
      kind: "scenes",
      title: key("designCases.motoSchoolWindowBranding.transitionTitle"),
      intro: key("designCases.motoSchoolWindowBranding.transitionIntro"),
      items: [
        {
          number: 1,
          stage: key("designCases.motoSchoolWindowBranding.artworkStage"),
          title: key("designCases.motoSchoolWindowBranding.finalsTitle"),
          intro: key("designCases.motoSchoolWindowBranding.finalsIntro"),
          accent: "red",
          image: {
            src: "/media/cases/moto-school-window-branding/moto-school-artwork.webp",
            w: 2560,
            h: 1074,
            title: key("designCases.motoSchoolWindowBranding.artworkTitle"),
            caption: key("designCases.motoSchoolWindowBranding.artworkCaption"),
          },
          detailsTitle: key("designCases.motoSchoolWindowBranding.detailsTitle"),
          details: [
            { alt: key("designCases.motoSchoolWindowBranding.detail.benefits"), origin: "left" },
            { alt: key("designCases.motoSchoolWindowBranding.detail.rider"), origin: "center" },
            { alt: key("designCases.motoSchoolWindowBranding.detail.cta"), origin: "right" },
          ],
        },
        {
          number: 2,
          stage: key("designCases.motoSchoolWindowBranding.installedStage"),
          title: key("designCases.motoSchoolWindowBranding.installedTitle"),
          intro: key("designCases.motoSchoolWindowBranding.installedIntro"),
          accent: "lime",
          image: {
            src: "/media/cases/moto-school-window-branding/moto-school-installed.webp",
            w: 1280,
            h: 960,
            title: key("designCases.motoSchoolWindowBranding.installedImageTitle"),
            caption: key("designCases.motoSchoolWindowBranding.installedImageCaption"),
          },
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.motoSchoolWindowBranding.result1"),
        key("designCases.motoSchoolWindowBranding.result2"),
        key("designCases.motoSchoolWindowBranding.result3"),
        key("designCases.motoSchoolWindowBranding.result4"),
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("designCases.motoSchoolWindowBranding.reviewTitle"),
    src: "/media/cases/moto-school-window-branding/moto-school-review.webp",
    alt: key("designCases.motoSchoolWindowBranding.reviewScreenshotAlt"),
    caption: key("designCases.motoSchoolWindowBranding.reviewScreenshotCaption"),
    text: key("designCases.motoSchoolWindowBranding.reviewText"),
    author: key("designCases.motoSchoolWindowBranding.reviewAuthor"),
    w: 746,
    h: 704,
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.motoSchoolWindowBranding.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
