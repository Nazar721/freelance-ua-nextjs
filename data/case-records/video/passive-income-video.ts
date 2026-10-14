import { key, text, type CaseRecord } from "../types";

/**
 * video/passive-income-video — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const passiveIncomeVideo: CaseRecord = {
  id: "video/passive-income-video",
  slug: "passive-income-video",
  direction: "video",
  subcategory: "youtube",
  uaPath: "/cases/video/passive-income-video",
  enPath: "/en/cases/video/passive-income-video",
  h1: text("Пасивний дохід", "Passive income"),
  lead: key("videoCases.passiveIncomeVideo.subtitle"),
  seo: {
    title: text("Пасивний дохід | Freelance UA", "Passive income | Freelance UA"),
    description: text("Відео про пасивний дохід — монтаж для YouTube з динамічною подачею", "Video about passive income — YouTube editing with dynamic delivery"),
    ogImage: "https://freelance-ua.agency/media/cases/passive-income-video/poster.jpg",
  },
  badge: key("videoCases.passiveIncomeVideo.category"),
  glow: { base: "rgba(239, 68, 68, 0.12)", strong: "rgba(239, 68, 68, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/passive-income-video/video.mp4",
    poster: "/media/cases/passive-income-video/poster.jpg",
    alt: key("videoCases.passiveIncomeVideo.title"),
    format: "16:9",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.passiveIncomeVideo.challengeTitle"),
      solutionTitle: key("videoCases.passiveIncomeVideo.solutionTitle"),
      task: key("videoCases.passiveIncomeVideo.challenge"),
      solution: key("videoCases.passiveIncomeVideo.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.passiveIncomeVideo.result1"),
        key("videoCases.passiveIncomeVideo.result2"),
        key("videoCases.passiveIncomeVideo.result3"),
        key("videoCases.passiveIncomeVideo.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.passiveIncomeVideo.reviewTitle"),
    text: key("videoCases.passiveIncomeVideo.reviewText"),
    author: key("videoCases.passiveIncomeVideo.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.passiveIncomeVideo.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
