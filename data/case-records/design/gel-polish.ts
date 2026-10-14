import { key, text, type CaseRecord } from "../types";

/**
 * design/gel-polish — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const gelPolish: CaseRecord = {
  id: "design/gel-polish",
  slug: "gel-polish",
  direction: "design",
  subcategory: "banners",
  uaPath: "/cases/design/gel-polish",
  enPath: "/en/cases/design/gel-polish",

  h1: text("Gel Polish — рекламний постер", "Gel Polish — advertising poster"),
  lead: key("designCases.gelPolish.subtitle"),
  seo: {
    title: text("Постер гель-лаку: якість, стійкість і колір | Freelance UA", "Gel polish poster: quality, durability and color | Freelance UA"),
    description: key("designCases.gelPolish.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/gel-polish/gel-polish-preview.webp",
  },
  badge: key("designCases.gelPolish.category"),
  glow: { base: "rgba(239, 68, 68, 0.12)", strong: "rgba(239, 68, 68, 0.28)" },

  hero: {
    kind: "image",
    src: "/media/cases/gel-polish/gel-polish1.webp",
    w: 1200,
    h: 800,
    alt: key("designCases.gelPolish.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.gelPolish.challenge"),
      solution: key("designCases.gelPolish.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.gelPolish.finalsTitle"),
      intro: key("designCases.gelPolish.finalsIntro"),
      columns: 2,
      items: [
        { src: "/media/cases/gel-polish/gel-polish1.webp", w: 900, h: 1200, title: key("designCases.gelPolish.item1.title"), caption: key("designCases.gelPolish.item1.caption") },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.gelPolish.result1"),
        key("designCases.gelPolish.result2"),
        key("designCases.gelPolish.result3"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("designCases.gelPolish.reviewTitle"),
    text: key("designCases.gelPolish.reviewText"),
    author: key("designCases.gelPolish.reviewAuthor"),
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.gelPolish.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
