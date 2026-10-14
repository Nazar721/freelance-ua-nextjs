import { key, text, type CaseRecord } from "../types";

/**
 * video/veronika-ai-muscles — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const veronikaAiMuscles: CaseRecord = {
  id: "video/veronika-ai-muscles",
  slug: "veronika-ai-muscles",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/veronika-ai-muscles",
  enPath: "/en/cases/video/veronika-ai-muscles",
  h1: text("AI маска", "AI mask"),
  lead: key("videoCases.veronikaAiMuscles.subtitle"),
  seo: {
    title: text("AI маска | Freelance UA", "AI mask | Freelance UA"),
    description: key("videoCases.veronikaAiMuscles.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/veronika-ai-muscles/screenshot.webp",
  },
  badge: key("videoCases.veronikaAiMuscles.category"),
  glow: { base: "rgba(34, 197, 94, 0.12)", strong: "rgba(34, 197, 94, 0.25)" },

  hero: {
    kind: "videoGrid",
    ratio: "9/16",
    items: [
      { src: "/media/cases/veronika-ai-muscles/hero.mp4", format: "9:16" },
      { src: "/media/cases/veronika-ai-muscles/video2.mp4", format: "9:16" },
    ],
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.veronikaAiMuscles.challengeTitle"),
      solutionTitle: key("videoCases.veronikaAiMuscles.solutionTitle"),
      task: key("videoCases.veronikaAiMuscles.challenge"),
      solution: key("videoCases.veronikaAiMuscles.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.veronikaAiMuscles.result1"),
        key("videoCases.veronikaAiMuscles.result2"),
        key("videoCases.veronikaAiMuscles.result3"),
        key("videoCases.veronikaAiMuscles.result4"),
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.veronikaAiMuscles.reviewTitle"),
    src: "/media/cases/veronika-ai-muscles/screenshot.webp",
    alt: text("Відгук Вероніки", "Veronika's review"),
    text: key("videoCases.veronikaAiMuscles.reviewText"),
    author: key("videoCases.veronikaAiMuscles.reviewAuthor"),
    w: 500,
    h: 600,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.veronikaAiMuscles.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
