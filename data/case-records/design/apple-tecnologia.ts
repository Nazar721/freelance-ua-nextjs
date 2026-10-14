import { key, text, type CaseRecord } from "../types";

/**
 * design/apple-tecnologia — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const appleTecnologia: CaseRecord = {
  id: "design/apple-tecnologia",
  slug: "apple-tecnologia",
  direction: "design",
  subcategory: "banners",
  uaPath: "/cases/design/apple-tecnologia",
  enPath: "/en/cases/design/apple-tecnologia",

  h1: text("Apple Tecnologia — рекламний банер техніки", "Apple Tecnologia — tech advertising banner"),
  lead: key("designCases.appleTecnologia.subtitle"),
  seo: {
    title: text("Рекламний банер техніки Apple | Freelance UA", "Apple tech advertising banner | Freelance UA"),
    description: key("designCases.appleTecnologia.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/apple-tecnologia/apple-tecnologia-preview.webp",
  },
  badge: key("designCases.appleTecnologia.category"),
  glow: { base: "rgba(163, 230, 53, 0.12)", strong: "rgba(163, 230, 53, 0.28)" },

  hero: {
    kind: "image",
    src: "/media/cases/apple-tecnologia/apple-tecnologia1.webp",
    w: 1200,
    h: 800,
    alt: key("designCases.appleTecnologia.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.appleTecnologia.challenge"),
      solution: key("designCases.appleTecnologia.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.appleTecnologia.finalsTitle"),
      intro: key("designCases.appleTecnologia.finalsIntro"),
      columns: 2,
      items: [
        { src: "/media/cases/apple-tecnologia/apple-tecnologia1.webp", w: 1080, h: 1080, title: key("designCases.appleTecnologia.item1.title"), caption: key("designCases.appleTecnologia.item1.caption") },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.appleTecnologia.result1"),
        key("designCases.appleTecnologia.result2"),
        key("designCases.appleTecnologia.result3"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("designCases.appleTecnologia.reviewTitle"),
    text: key("designCases.appleTecnologia.reviewText"),
    author: key("designCases.appleTecnologia.reviewAuthor"),
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.appleTecnologia.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
