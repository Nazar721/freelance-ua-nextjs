import { key, text, type CaseRecord } from "../types";

/**
 * design/vikontse-logo — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const vikontseLogo: CaseRecord = {
  id: "design/vikontse-logo",
  slug: "vikontse-logo",
  direction: "design",
  subcategory: "branding",
  uaPath: "/cases/design/vikontse-logo",
  enPath: "/en/cases/design/vikontse-logo",

  h1: text("Віконце — розробка логотипу", "Vikontse — logo design"),
  lead: key("designCases.vikontseLogo.subtitle"),
  seo: {
    title: text("Логотип для компанії «Віконце» і фірмова типографіка | Freelance UA", "Logo and brand typography for the Vikontse company | Freelance UA"),
    description: key("designCases.vikontseLogo.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/vikontse-logo/vikontse-logo-preview.webp?v=2",
  },
  badge: key("designCases.vikontseLogo.category"),
  glow: { base: "rgba(249, 115, 22, 0.12)", strong: "rgba(249, 115, 22, 0.28)" },

  hero: {
    kind: "image",
    src: "/media/cases/vikontse-logo/vikontse-logo1.webp",
    w: 1200,
    h: 800,
    alt: key("designCases.vikontseLogo.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.vikontseLogo.challenge"),
      solution: key("designCases.vikontseLogo.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.vikontseLogo.finalsTitle"),
      intro: key("designCases.vikontseLogo.finalsIntro"),
      columns: 2,
      items: [
        { src: "/media/cases/vikontse-logo/vikontse-logo1.webp", w: 1000, h: 1000, title: key("designCases.vikontseLogo.item1.title"), caption: key("designCases.vikontseLogo.item1.caption") },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.vikontseLogo.result1"),
        key("designCases.vikontseLogo.result2"),
        key("designCases.vikontseLogo.result3"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("designCases.vikontseLogo.reviewTitle"),
    text: key("designCases.vikontseLogo.reviewText"),
    author: key("designCases.vikontseLogo.reviewAuthor"),
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.vikontseLogo.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
