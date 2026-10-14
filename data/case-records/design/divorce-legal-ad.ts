import { key, text, type CaseRecord } from "../types";

/**
 * design/divorce-legal-ad — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const divorceLegalAd: CaseRecord = {
  id: "design/divorce-legal-ad",
  slug: "divorce-legal-ad",
  direction: "design",
  subcategory: "banners",
  uaPath: "/cases/design/divorce-legal-ad",
  enPath: "/en/cases/design/divorce-legal-ad",

  h1: text("Юридична консультація — рекламний банер", "Legal consultation — advertising banner"),
  lead: key("designCases.divorceLegalAd.subtitle"),
  seo: {
    title: text("Банер юридичної консультації з розлучення | Freelance UA", "Banner for divorce legal consultation | Freelance UA"),
    description: key("designCases.divorceLegalAd.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/divorce-legal-ad/divorce-legal-ad-preview.webp",
  },
  badge: key("designCases.divorceLegalAd.category"),
  glow: { base: "rgba(136, 19, 55, 0.14)", strong: "rgba(136, 19, 55, 0.3)" },

  hero: {
    kind: "image",
    src: "/media/cases/divorce-legal-ad/divorce-legal-ad1.webp",
    w: 1200,
    h: 800,
    alt: key("designCases.divorceLegalAd.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.divorceLegalAd.challenge"),
      solution: key("designCases.divorceLegalAd.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.divorceLegalAd.finalsTitle"),
      intro: key("designCases.divorceLegalAd.finalsIntro"),
      columns: 2,
      items: [
        { src: "/media/cases/divorce-legal-ad/divorce-legal-ad1.webp", w: 1024, h: 1280, title: key("designCases.divorceLegalAd.item1.title"), caption: key("designCases.divorceLegalAd.item1.caption") },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.divorceLegalAd.result1"),
        key("designCases.divorceLegalAd.result2"),
        key("designCases.divorceLegalAd.result3"),
        key("designCases.divorceLegalAd.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("designCases.divorceLegalAd.reviewTitle"),
    text: key("designCases.divorceLegalAd.reviewText"),
    author: key("designCases.divorceLegalAd.reviewAuthor"),
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.divorceLegalAd.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
