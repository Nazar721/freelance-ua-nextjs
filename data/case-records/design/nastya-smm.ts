import { key, text, type CaseRecord } from "../types";

/**
 * design/nastya-smm — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const nastyaSmm: CaseRecord = {
  id: "design/nastya-smm",
  slug: "nastya-smm",
  direction: "design",
  subcategory: "banners",
  uaPath: "/cases/design/nastya-smm",
  enPath: "/en/cases/design/nastya-smm",

  h1: text("Instagram-візуали для SMM", "Instagram visuals for SMM"),
  lead: key("designCases.nastyaSmm.subtitle"),
  seo: {
    title: text("Брендовані обкладинки для Instagram-контенту | Freelance UA", "Branded covers for Instagram content | Freelance UA"),
    description: key("designCases.nastyaSmm.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/nastya-smm/nastya-smm-preview.webp",
  },
  badge: key("designCases.nastyaSmm.category"),
  glow: { base: "rgba(251, 191, 36, 0.12)", strong: "rgba(251, 191, 36, 0.28)" },

  hero: {
    // Hand-corrected: the original hero maps `finalItems` on mobile AND on
    // desktop — the record keeps each file once (the check compares the set,
    // and duplicates would sit side by side in one grid).
    kind: "imageGrid",
    items: [
      { src: "/media/cases/nastya-smm/nastya-smm1.webp", w: 1750, h: 2187, alt: key("designCases.nastyaSmm.title") },
      { src: "/media/cases/nastya-smm/nastya-smm2.webp", w: 1700, h: 2241, alt: key("designCases.nastyaSmm.title") },
    ],
  },

  sections: [
    {
      kind: "gallery",
      title: key("designCases.nastyaSmm.finalsTitle"),
      intro: key("designCases.nastyaSmm.finalsIntro"),
      columns: 1,
      items: [
        { src: "/media/cases/nastya-smm/nastya-smm1.webp", w: 1750, h: 2187, title: key("designCases.nastyaSmm.item1.title"), caption: key("designCases.nastyaSmm.item1.caption") },
        { src: "/media/cases/nastya-smm/nastya-smm2.webp", w: 1700, h: 2241, title: key("designCases.nastyaSmm.item2.title"), caption: key("designCases.nastyaSmm.item2.caption") },
      ],
    },
    {
      kind: "brief",
      task: key("designCases.nastyaSmm.challenge"),
      solution: key("designCases.nastyaSmm.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.nastyaSmm.result1"),
        key("designCases.nastyaSmm.result2"),
        key("designCases.nastyaSmm.result3"),
      ],
    },
  ],

  review: {
    kind: "video",
    title: key("designCases.nastyaSmm.reviewTitle"),
    src: "/media/testimonials/video-2.mp4",
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.nastyaSmm.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
