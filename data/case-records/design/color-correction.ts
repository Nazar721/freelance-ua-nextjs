import { key, text, type CaseRecord } from "../types";

/**
 * design/color-correction — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const colorCorrection: CaseRecord = {
  id: "design/color-correction",
  slug: "color-correction",
  direction: "design",
  subcategory: "photo-retouch",
  uaPath: "/cases/design/color-correction",
  enPath: "/en/cases/design/color-correction",

  h1: text("Кольорокорекція відео: світло, колір і настрій кадру", "Video color grading: light, color and the mood of the frame"),
  lead: key("designCases.colorCorrection.subtitle"),
  seo: {
    title: text("Кольорокорекція відео — робота зі світлом, кольором та настроєм кадру | Freelance UA", "Video color grading — working with light, color and the mood of the frame | Freelance UA"),
    description: text("Кольорокорекція відео — робота зі світлом, кольором та настроєм кадру", "Video color grading — working with light, color and the mood of the frame."),
    ogImage: "https://freelance-ua.agency/media/cases/color-correction/poster.jpg",
  },
  badge: key("designCases.colorCorrection.category"),
  glow: { base: "rgba(168, 132, 100, 0.12)", strong: "rgba(168, 132, 100, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/color-correction/video.mp4#t=0.2",
    poster: "/media/cases/color-correction/poster.jpg",
    alt: key("designCases.colorCorrection.title"),
    // Original badges over the clickable thumb: "~10с" and "9:16".
    duration: text("~10с", "~10s"),
    format: "9:16",
    ratio: "9/16",
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.colorCorrection.challenge"),
      solution: key("designCases.colorCorrection.solution"),
    },
    {
      kind: "checklist",
      title: key("designCases.colorCorrection.approachTitle"),
      columns: 2,
      items: [
        key("designCases.colorCorrection.approach1"),
        key("designCases.colorCorrection.approach2"),
        key("designCases.colorCorrection.approach3"),
        key("designCases.colorCorrection.approach4"),
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.colorCorrection.result1"),
        key("designCases.colorCorrection.result2"),
        key("designCases.colorCorrection.result3"),
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("designCases.colorCorrection.reviewTitle"),
    src: "/media/cases/color-correction/screenshot.png",
    alt: text("Відгук — підхід до обробки", "Review — the editing approach"),
    w: 1200,
    h: 630,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("designCases.colorCorrection.teamMember"),
  },
  backToList: {
    label: key("designCases.colorCorrection.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
