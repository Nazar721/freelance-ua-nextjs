import { key, text, type CaseRecord } from "../types";

/**
 * design/giesbrecht-pv — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const giesbrechtPv: CaseRecord = {
  id: "design/giesbrecht-pv",
  slug: "giesbrecht-pv",
  direction: "design",
  subcategory: "banners",
  uaPath: "/cases/design/giesbrecht-pv",
  enPath: "/en/cases/design/giesbrecht-pv",

  h1: text("Giesbrecht PV — банер для СЕС", "Giesbrecht PV — solar banner"),
  lead: key("designCases.giesbrechtPv.subtitle"),
  seo: {
    title: text("Рекламний банер сонячних електростанцій для німецькомовного ринку | Freelance UA", "Advertising banner for solar plants for the German-speaking market | Freelance UA"),
    description: key("designCases.giesbrechtPv.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/giesbrecht-pv/giesbrecht-pv-preview.webp",
  },
  badge: key("designCases.giesbrechtPv.category"),
  glow: { base: "rgba(249, 115, 22, 0.12)", strong: "rgba(249, 115, 22, 0.28)" },

  hero: {
    kind: "image",
    src: "/media/cases/giesbrecht-pv/giesbrecht-pv1.webp",
    w: 1200,
    h: 800,
    alt: key("designCases.giesbrechtPv.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.giesbrechtPv.challenge"),
      solution: key("designCases.giesbrechtPv.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.giesbrechtPv.finalsTitle"),
      intro: key("designCases.giesbrechtPv.finalsIntro"),
      columns: 2,
      items: [
        { src: "/media/cases/giesbrecht-pv/giesbrecht-pv1.webp", w: 1080, h: 1080, title: key("designCases.giesbrechtPv.item1.title"), caption: key("designCases.giesbrechtPv.item1.caption") },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.giesbrechtPv.result1"),
        key("designCases.giesbrechtPv.result2"),
        key("designCases.giesbrechtPv.result3"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("designCases.giesbrechtPv.reviewTitle"),
    text: key("designCases.giesbrechtPv.reviewText"),
    author: key("designCases.giesbrechtPv.reviewAuthor"),
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.giesbrechtPv.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
