import { key, text, type CaseRecord } from "../types";

/**
 * design/schonheit-gift-certificate — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const schonheitGiftCertificate: CaseRecord = {
  id: "design/schonheit-gift-certificate",
  slug: "schonheit-gift-certificate",
  direction: "design",
  subcategory: "branding",
  uaPath: "/cases/design/schonheit-gift-certificate",
  enPath: "/en/cases/design/schonheit-gift-certificate",

  h1: text("Schönheit — подарунковий сертифікат", "Schönheit — gift certificate"),
  lead: key("designCases.schonheitGiftCertificate.subtitle"),
  seo: {
    title: text("Подарунковий сертифікат для б'юті-салону | Freelance UA", "Gift certificate for a beauty salon | Freelance UA"),
    description: key("designCases.schonheitGiftCertificate.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/schonheit-gift-certificate/schonheit-gift-certificate-preview.webp",
  },
  badge: key("designCases.schonheitGiftCertificate.category"),
  glow: { base: "rgba(245, 208, 154, 0.12)", strong: "rgba(245, 208, 154, 0.3)" },

  hero: {
    kind: "image",
    src: "/media/cases/schonheit-gift-certificate/schonheit-gift-certificate1.webp",
    w: 1200,
    h: 800,
    alt: key("designCases.schonheitGiftCertificate.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.schonheitGiftCertificate.challenge"),
      solution: key("designCases.schonheitGiftCertificate.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.schonheitGiftCertificate.finalsTitle"),
      intro: key("designCases.schonheitGiftCertificate.finalsIntro"),
      columns: 2,
      items: [
        { src: "/media/cases/schonheit-gift-certificate/schonheit-gift-certificate1.webp", w: 874, h: 620, title: key("designCases.schonheitGiftCertificate.item1.title"), caption: key("designCases.schonheitGiftCertificate.item1.caption") },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.schonheitGiftCertificate.result1"),
        key("designCases.schonheitGiftCertificate.result2"),
        key("designCases.schonheitGiftCertificate.result3"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("designCases.schonheitGiftCertificate.reviewTitle"),
    text: key("designCases.schonheitGiftCertificate.reviewText"),
    author: key("designCases.schonheitGiftCertificate.reviewAuthor"),
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.schonheitGiftCertificate.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
