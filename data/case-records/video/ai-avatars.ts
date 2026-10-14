import { key, text, type CaseRecord } from "../types";

/**
 * video/ai-avatars — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const aiAvatars: CaseRecord = {
  id: "video/ai-avatars",
  slug: "ai-avatars",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/ai-avatars",
  enPath: "/en/cases/video/ai-avatars",
  h1: text("AI-аватари", "AI avatars"),
  lead: key("videoCases.aiAvatars.subtitle"),
  seo: {
    title: text("AI-аватари | Freelance UA", "AI avatars | Freelance UA"),
    description: key("videoCases.aiAvatars.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/ai-avatars/og-poster.jpg",
  },
  badge: key("videoCases.aiAvatars.category"),
  glow: { base: "rgba(168, 85, 247, 0.12)", strong: "rgba(168, 85, 247, 0.25)" },

  hero: {
    kind: "videoGrid",
    ratio: "9/16",
    items: [
      { src: "/media/cases/ai-avatars/hero.mp4", format: "9:16" },
      { src: "/media/cases/ai-avatars/process-1.mp4", format: "9:16" },
      { src: "/media/cases/ai-avatars/process-2.mp4", format: "9:16" },
    ],
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.aiAvatars.challengeTitle"),
      solutionTitle: key("videoCases.aiAvatars.solutionTitle"),
      task: key("videoCases.aiAvatars.challenge"),
      solution: key("videoCases.aiAvatars.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.aiAvatars.result1"),
        key("videoCases.aiAvatars.result2"),
        key("videoCases.aiAvatars.result3"),
        key("videoCases.aiAvatars.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.aiAvatars.reviewTitle"),
    text: key("videoCases.aiAvatars.reviewText"),
    author: key("videoCases.aiAvatars.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.aiAvatars.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
