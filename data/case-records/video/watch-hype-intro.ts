import { key, text, type CaseRecord } from "../types";

/**
 * video/watch-hype-intro — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const watchHypeIntro: CaseRecord = {
  id: "video/watch-hype-intro",
  slug: "watch-hype-intro",
  direction: "video",
  subcategory: "motion",
  uaPath: "/cases/video/watch-hype-intro",
  enPath: "/en/cases/video/watch-hype-intro",
  h1: text("Інтро для Watch Hype", "Watch Hype intro"),
  lead: key("videoCases.watchHypeIntro.subtitle"),
  seo: {
    title: text("Інтро для Watch Hype | Freelance UA", "Watch Hype intro | Freelance UA"),
    description: text("Motion-інтро для YouTube-каналу Watch Hype — анімована 3D-сцена з фінальним лого та динамічним переходом", "Motion intro for the Watch Hype YouTube channel — animated 3D scene with a final logo and dynamic transition"),
    ogImage: "https://freelance-ua.agency/media/cases/watch-hype-intro/hero-poster.jpg",
  },
  badge: key("videoCases.watchHypeIntro.category"),
  glow: { base: "rgba(148, 85, 200, 0.12)", strong: "rgba(148, 85, 200, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/watch-hype-intro/hero.mp4",
    poster: "/media/cases/watch-hype-intro/hero-poster.jpg",
    alt: key("videoCases.watchHypeIntro.title"),
    format: "16:9",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.watchHypeIntro.challengeTitle"),
      solutionTitle: key("videoCases.watchHypeIntro.solutionTitle"),
      task: key("videoCases.watchHypeIntro.challenge"),
      solution: key("videoCases.watchHypeIntro.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.watchHypeIntro.result1"),
        key("videoCases.watchHypeIntro.result2"),
        key("videoCases.watchHypeIntro.result3"),
        key("videoCases.watchHypeIntro.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.watchHypeIntro.reviewTitle"),
    text: key("videoCases.watchHypeIntro.reviewText"),
    author: key("videoCases.watchHypeIntro.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.watchHypeIntro.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
