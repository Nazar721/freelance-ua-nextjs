import { key, text, type CaseRecord } from "../types";

/**
 * video/dominanta-youtube-intro — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const dominantaYoutubeIntro: CaseRecord = {
  id: "video/dominanta-youtube-intro",
  slug: "dominanta-youtube-intro",
  direction: "video",
  subcategory: "motion",
  uaPath: "/cases/video/dominanta-youtube-intro",
  enPath: "/en/cases/video/dominanta-youtube-intro",
  h1: text("Інтро для YouTube", "YouTube intro"),
  lead: key("videoCases.dominanta.subtitle"),
  seo: {
    title: text("Інтро для YouTube | Freelance UA", "YouTube intro | Freelance UA"),
    description: text("Створили моушн-інтро для ютуб-каналу Dominanta — яскраво, динамічно, з першого кадру задає стиль каналу", "Created a motion intro for the Dominanta YouTube channel — bright, dynamic, setting the channel's style from the first frame"),
    ogImage: "https://freelance-ua.agency/media/cases/dominanta-youtube-intro/hero-poster.jpg",
  },
  badge: key("videoCases.dominanta.category"),
  glow: { base: "rgba(99, 102, 241, 0.12)", strong: "rgba(99, 102, 241, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/dominanta-youtube-intro/hero.mp4",
    poster: "/media/cases/dominanta-youtube-intro/hero-poster.jpg",
    alt: key("videoCases.dominanta.title"),
    duration: text("~22с", "~22s"),
    format: "16:9",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.dominanta.challengeTitle"),
      solutionTitle: key("videoCases.dominanta.solutionTitle"),
      task: key("videoCases.dominanta.challenge"),
      solution: key("videoCases.dominanta.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.dominanta.result1"),
        key("videoCases.dominanta.result2"),
        key("videoCases.dominanta.result3"),
        key("videoCases.dominanta.result4"),
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.dominanta.clientName"),
      subtitle: key("videoCases.dominanta.clientRole"),
      text: key("videoCases.dominanta.clientDesc"),
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.dominanta.reviewTitle"),
    text: key("videoCases.dominanta.reviewText"),
    author: key("videoCases.dominanta.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.dominanta.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
