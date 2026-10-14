import { key, text, type CaseRecord } from "../types";

/**
 * design/photo-retouch — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const photoRetouch: CaseRecord = {
  id: "design/photo-retouch",
  slug: "photo-retouch",
  direction: "design",
  subcategory: "photo-retouch",
  uaPath: "/cases/design/photo-retouch",
  enPath: "/en/cases/design/photo-retouch",

  h1: text("Ретуш і кольорокорекція фото", "Photo retouching and color grading"),
  lead: key("designCases.photoRetouch.subtitle"),
  seo: {
    title: text("Ретуш різних типів кадрів — від авто до портретів | Freelance UA", "Retouching of different frame types — from cars to portraits | Freelance UA"),
    description: key("designCases.photoRetouch.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/photo-retouch/photo-retouch-preview.webp",
  },
  badge: key("designCases.photoRetouch.category"),
  glow: { base: "rgba(34, 211, 238, 0.10)", strong: "rgba(34, 211, 238, 0.26)" },

  hero: {
    kind: "imageGrid",
    items: [
      { src: "/media/cases/photo-retouch/photo-retouch-1-after.webp", alt: key("designCases.photoRetouch.title") },
      { src: "/media/cases/photo-retouch/photo-retouch-3-after.webp", alt: key("designCases.photoRetouch.title") },
      { src: "/media/cases/photo-retouch/photo-retouch-4-after.webp", alt: key("designCases.photoRetouch.title") },
    ],
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.photoRetouch.challenge"),
      solution: key("designCases.photoRetouch.solution"),
    },
    {
      kind: "checklist",
      title: key("designCases.photoRetouch.approachTitle"),
      intro: key("designCases.photoRetouch.approachIntro"),
      columns: 2,
      items: [
        key("designCases.photoRetouch.approach1"),
        key("designCases.photoRetouch.approach2"),
        key("designCases.photoRetouch.approach3"),
        key("designCases.photoRetouch.approach4"),
      ],
    },
    {
      kind: "compare",
      title: key("designCases.photoRetouch.finalsTitle"),
      intro: key("designCases.photoRetouch.finalsIntro"),
      items: [
        { mode: "slider", before: "/media/cases/photo-retouch/photo-retouch-1-before.webp", after: "/media/cases/photo-retouch/photo-retouch-1-after.webp", title: key("designCases.photoRetouch.slider1Title"), caption: key("designCases.photoRetouch.slider1Caption") },
        { mode: "slider", before: "/media/cases/photo-retouch/photo-retouch-2-before.webp", after: "/media/cases/photo-retouch/photo-retouch-2-after.webp", title: key("designCases.photoRetouch.slider2Title"), caption: key("designCases.photoRetouch.slider2Caption") },
        { mode: "slider", before: "/media/cases/photo-retouch/photo-retouch-3-before.webp", after: "/media/cases/photo-retouch/photo-retouch-3-after.webp", title: key("designCases.photoRetouch.slider3Title"), caption: key("designCases.photoRetouch.slider3Caption") },
        { mode: "slider", before: "/media/cases/photo-retouch/photo-retouch-4-before.webp", after: "/media/cases/photo-retouch/photo-retouch-4-after.webp", title: key("designCases.photoRetouch.slider4Title"), caption: key("designCases.photoRetouch.slider4Caption") },
        { mode: "slider", before: "/media/cases/photo-retouch/photo-retouch-5-before.webp", after: "/media/cases/photo-retouch/photo-retouch-5-after.webp", title: key("designCases.photoRetouch.slider5Title"), caption: key("designCases.photoRetouch.slider5Caption") },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.photoRetouch.result1"),
        key("designCases.photoRetouch.result2"),
        key("designCases.photoRetouch.result3"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("designCases.photoRetouch.reviewTitle"),
    text: key("designCases.photoRetouch.reviewText"),
    author: key("designCases.photoRetouch.reviewAuthor"),
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.photoRetouch.backToList"),
    href: { uk: "/cases?tab=design&type=photo-retouch", en: "/en/cases?tab=design&type=photo-retouch" },
  },
};
