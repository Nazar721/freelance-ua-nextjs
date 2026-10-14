import { key, text, type CaseRecord } from "../types";

/**
 * video/vorodi-medical — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const vorodiMedical: CaseRecord = {
  id: "video/vorodi-medical",
  slug: "vorodi-medical",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/vorodi-medical",
  enPath: "/en/cases/video/vorodi-medical",
  h1: text("AI-відео для медицини", "AI video for medicine"),
  lead: key("videoCases.vorodiMedical.subtitle"),
  seo: {
    title: text("AI-відео для медицини | Freelance UA", "AI video for medicine | Freelance UA"),
    description: text("AI-промо-ролик для медичного бренду — короткий динамічний візуал", "AI promo video for a medical brand — short dynamic visuals"),
    ogImage: "https://freelance-ua.agency/media/cases/vorodi-medical/og-poster.jpg",
  },
  badge: key("videoCases.vorodiMedical.category"),
  glow: { base: "rgba(199, 146, 146, 0.12)", strong: "rgba(199, 146, 146, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/vorodi-medical/hero.mp4",
    alt: key("videoCases.vorodiMedical.title"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.vorodiMedical.challengeTitle"),
      solutionTitle: key("videoCases.vorodiMedical.solutionTitle"),
      task: key("videoCases.vorodiMedical.challenge"),
      solution: key("videoCases.vorodiMedical.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.vorodiMedical.result1"),
        key("videoCases.vorodiMedical.result2"),
        key("videoCases.vorodiMedical.result3"),
        key("videoCases.vorodiMedical.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.vorodiMedical.reviewTitle"),
    text: key("videoCases.vorodiMedical.reviewText"),
    author: key("videoCases.vorodiMedical.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.vorodiMedical.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
