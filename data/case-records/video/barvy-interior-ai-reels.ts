import { key, text, type CaseRecord } from "../types";

/**
 * video/barvy-interior-ai-reels — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const barvyInteriorAiReels: CaseRecord = {
  id: "video/barvy-interior-ai-reels",
  slug: "barvy-interior-ai-reels",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/barvy-interior-ai-reels",
  enPath: "/en/cases/video/barvy-interior-ai-reels",
  h1: text("AI-відео BARVY Interior", "AI video for BARVY Interior"),
  lead: key("videoCases.barvyInterior.subtitle"),
  seo: {
    title: text("AI-відео BARVY Interior | Freelance UA", "AI video for BARVY Interior | Freelance UA"),
    description: key("videoCases.barvyInterior.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/barvy-interior-ai-reels/poster.webp",
  },
  badge: key("videoCases.barvyInterior.category"),
  glow: { base: "rgba(168, 85, 247, 0.12)", strong: "rgba(168, 85, 247, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/barvy-interior-ai-reels/hero.mp4",
    poster: "/media/cases/barvy-interior-ai-reels/poster.webp",
    alt: key("videoCases.barvyInterior.title"),
    duration: text("~20с", "~20s"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.barvyInterior.challengeTitle"),
      solutionTitle: key("videoCases.barvyInterior.solutionTitle"),
      task: key("videoCases.barvyInterior.challenge"),
      solution: key("videoCases.barvyInterior.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.barvyInterior.result1"),
        key("videoCases.barvyInterior.result2"),
        key("videoCases.barvyInterior.result3"),
        key("videoCases.barvyInterior.result4"),
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.barvyInterior.clientName"),
      subtitle: key("videoCases.barvyInterior.clientRole"),
      text: key("videoCases.barvyInterior.clientDesc"),
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.barvyInterior.reviewTitle"),
    src: "/media/cases/barvy-interior-ai-reels/review.webp",
    alt: text("Відгук Катерини — BARVY Interior", "Kateryna's review — BARVY Interior"),
    text: key("videoCases.barvyInterior.reviewText"),
    author: key("videoCases.barvyInterior.reviewAuthor"),
    w: 902,
    h: 244,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.barvyInterior.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
