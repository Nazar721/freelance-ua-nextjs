import { key, text, type CaseRecord } from "../types";

/**
 * design/mydutyfree — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const mydutyfree: CaseRecord = {
  id: "design/mydutyfree",
  slug: "mydutyfree",
  direction: "design",
  subcategory: "banners",
  uaPath: "/cases/design/mydutyfree",
  enPath: "/en/cases/design/mydutyfree",

  h1: text("MyDutyFree — промо-банер із 3D-персонажем", "MyDutyFree — promo banner with a 3D character"),
  lead: key("designCases.mydutyfree.subtitle"),
  seo: {
    title: text("Промо-банер MyDutyFree з фірмовим 3D-персонажем | Freelance UA", "MyDutyFree promo banner with a branded 3D character | Freelance UA"),
    description: key("designCases.mydutyfree.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/mydutyfree/mydutyfree-preview.webp",
  },
  badge: key("designCases.mydutyfree.category"),
  glow: { base: "rgba(236, 72, 153, 0.12)", strong: "rgba(236, 72, 153, 0.28)" },

  hero: {
    kind: "image",
    src: "/media/cases/mydutyfree/mydutyfree1.webp",
    w: 1200,
    h: 800,
    alt: key("designCases.mydutyfree.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.mydutyfree.challenge"),
      solution: key("designCases.mydutyfree.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.mydutyfree.finalsTitle"),
      intro: key("designCases.mydutyfree.finalsIntro"),
      columns: 2,
      items: [
        { src: "/media/cases/mydutyfree/mydutyfree1.webp", w: 904, h: 1280, title: key("designCases.mydutyfree.item1.title"), caption: key("designCases.mydutyfree.item1.caption") },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.mydutyfree.result1"),
        key("designCases.mydutyfree.result2"),
        key("designCases.mydutyfree.result3"),
        key("designCases.mydutyfree.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("designCases.mydutyfree.reviewTitle"),
    text: key("designCases.mydutyfree.reviewText"),
    author: key("designCases.mydutyfree.reviewAuthor"),
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.mydutyfree.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
