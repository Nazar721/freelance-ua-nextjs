import { key, text, type CaseRecord } from "../types";

/**
 * video/selloflow-intro — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const selloflowIntro: CaseRecord = {
  id: "video/selloflow-intro",
  slug: "selloflow-intro",
  direction: "video",
  subcategory: "motion",
  uaPath: "/cases/video/selloflow-intro",
  enPath: "/en/cases/video/selloflow-intro",
  h1: text("Вступне відео Selloflow", "Selloflow intro video"),
  lead: key("videoCases.selloflowIntro.subtitle"),
  seo: {
    title: text("Вступне відео Selloflow | Freelance UA", "Selloflow intro video | Freelance UA"),
    description: text("Моушн-інтро для стартапу Selloflow — динамічний візуал для презентації платформи", "Motion intro for the Selloflow startup — dynamic visuals to present the platform"),
    ogImage: "https://freelance-ua.agency/media/cases/selloflow-intro/hero-poster.jpg",
  },
  badge: key("videoCases.selloflowIntro.category"),
  glow: { base: "rgba(59, 130, 246, 0.12)", strong: "rgba(59, 130, 246, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/selloflow-intro/hero.mp4",
    alt: key("videoCases.selloflowIntro.title"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.selloflowIntro.challengeTitle"),
      solutionTitle: key("videoCases.selloflowIntro.solutionTitle"),
      task: key("videoCases.selloflowIntro.challenge"),
      solution: key("videoCases.selloflowIntro.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.selloflowIntro.result1"),
        key("videoCases.selloflowIntro.result2"),
        key("videoCases.selloflowIntro.result3"),
        key("videoCases.selloflowIntro.result4"),
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.selloflowIntro.clientName"),
      subtitle: key("videoCases.selloflowIntro.clientRole"),
      text: key("videoCases.selloflowIntro.clientDesc"),
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.selloflowIntro.reviewTitle"),
    src: "/media/cases/selloflow-intro/screenshot.webp",
    alt: text("Відгук Andrii — Selloflow", "Andrii's review — Selloflow"),
    text: key("videoCases.selloflowIntro.reviewText"),
    author: key("videoCases.selloflowIntro.reviewAuthor"),
    w: 500,
    h: 600,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.selloflowIntro.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
