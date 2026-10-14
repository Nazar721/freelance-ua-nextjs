import { key, text, type CaseRecord } from "../types";

/**
 * design/prestige-school-billboard — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const prestigeSchoolBillboard: CaseRecord = {
  id: "design/prestige-school-billboard",
  slug: "prestige-school-billboard",
  direction: "design",
  subcategory: "branding",
  uaPath: "/cases/design/prestige-school-billboard",
  enPath: "/en/cases/design/prestige-school-billboard",

  h1: text("Престиж — білборд приватної школи", "Prestige — private school billboard"),
  lead: key("designCases.prestigeSchoolBillboard.subtitle"),
  seo: {
    title: text("Білборд приватної початкової школи у фірмовому стилі | Freelance UA", "Private primary school billboard in the school's own style | Freelance UA"),
    description: key("designCases.prestigeSchoolBillboard.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/prestige-school-billboard/prestige-school-billboard-preview.webp",
  },
  badge: key("designCases.prestigeSchoolBillboard.category"),
  glow: { base: "rgba(139, 92, 246, 0.12)", strong: "rgba(139, 92, 246, 0.28)" },

  hero: {
    kind: "image",
    src: "/media/cases/prestige-school-billboard/prestige-billboard1.webp",
    w: 1200,
    h: 800,
    alt: key("designCases.prestigeSchoolBillboard.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.prestigeSchoolBillboard.challenge"),
      solution: key("designCases.prestigeSchoolBillboard.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.prestigeSchoolBillboard.finalsTitle"),
      intro: key("designCases.prestigeSchoolBillboard.finalsIntro"),
      columns: 2,
      items: [
        { src: "/media/cases/prestige-school-billboard/prestige-billboard1.webp", w: 1280, h: 640, title: key("designCases.prestigeSchoolBillboard.item1.title"), caption: key("designCases.prestigeSchoolBillboard.item1.caption") },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.prestigeSchoolBillboard.result1"),
        key("designCases.prestigeSchoolBillboard.result2"),
        key("designCases.prestigeSchoolBillboard.result3"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("designCases.prestigeSchoolBillboard.reviewTitle"),
    text: key("designCases.prestigeSchoolBillboard.reviewText"),
    author: key("designCases.prestigeSchoolBillboard.reviewAuthor"),
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.prestigeSchoolBillboard.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
