import { key, text, type CaseRecord } from "../types";

/**
 * video/ai-video-new — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const aiVideoNew: CaseRecord = {
  id: "video/ai-video-new",
  slug: "ai-video-new",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/ai-video-new",
  enPath: "/en/cases/video/ai-video-new",
  h1: text("AI-відео промо", "AI video promo"),
  lead: key("videoCases.aiVideoNew.subtitle"),
  seo: {
    title: text("AI-відео промо | Freelance UA", "AI video promo | Freelance UA"),
    description: key("videoCases.aiVideoNew.shortDesc"),
    ogImage: "/media/cases/ai-video-new/preview.webp",
  },
  badge: key("videoCases.aiVideoNew.category"),
  glow: { base: "rgba(168, 85, 247, 0.12)", strong: "rgba(168, 85, 247, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/ai-video-new/hero.mp4",
    poster: "/media/cases/ai-video-new/preview.webp",
    alt: key("videoCases.aiVideoNew.title"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.aiVideoNew.challengeTitle"),
      solutionTitle: key("videoCases.aiVideoNew.solutionTitle"),
      task: key("videoCases.aiVideoNew.challenge"),
      solution: key("videoCases.aiVideoNew.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.aiVideoNew.result1"),
        key("videoCases.aiVideoNew.result2"),
        key("videoCases.aiVideoNew.result3"),
        key("videoCases.aiVideoNew.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.aiVideoNew.reviewTitle"),
    text: key("videoCases.aiVideoNew.reviewText"),
    author: key("videoCases.aiVideoNew.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.aiVideoNew.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
