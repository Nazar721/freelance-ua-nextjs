import { key, text, type CaseRecord } from "../types";

/**
 * video/nikita-sheremet-crypto — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const nikitaSheremetCrypto: CaseRecord = {
  id: "video/nikita-sheremet-crypto",
  slug: "nikita-sheremet-crypto",
  direction: "video",
  subcategory: "reels",
  uaPath: "/cases/video/nikita-sheremet-crypto",
  enPath: "/en/cases/video/nikita-sheremet-crypto",
  h1: text("Нікіта Шеремет", "Nikita Sheremet"),
  lead: key("videoCases.nikitaSheremet.subtitle"),
  seo: {
    title: text("Нікіта Шеремет | Freelance UA", "Nikita Sheremet | Freelance UA"),
    description: text("Створили серію Reels для Instagram — 4 відео з аналітикою крипто-ринку та порадами для інвесторів", "Created a series of Instagram Reels — 4 videos with crypto-market analytics and tips for investors"),
    ogImage: "https://freelance-ua.agency/media/cases/nikita-sheremet-crypto/screenshot.webp",
  },
  badge: key("videoCases.nikitaSheremet.category"),
  glow: { base: "rgba(225, 48, 108, 0.12)", strong: "rgba(225, 48, 108, 0.25)" },

  hero: {
    kind: "videoGrid",
    ratio: "9/16",
    items: [
      { src: "/media/cases/nikita-sheremet-crypto/process-1.mp4", format: "9:16" },
      { src: "/media/cases/nikita-sheremet-crypto/process-2.mp4", format: "9:16" },
      { src: "/media/cases/nikita-sheremet-crypto/process-3.mp4", format: "9:16" },
      { src: "/media/cases/nikita-sheremet-crypto/hero.mp4", format: "9:16" },
    ],
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.nikitaSheremet.challengeTitle"),
      solutionTitle: key("videoCases.nikitaSheremet.solutionTitle"),
      task: key("videoCases.nikitaSheremet.challenge"),
      solution: key("videoCases.nikitaSheremet.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.nikitaSheremet.result1"),
        key("videoCases.nikitaSheremet.result2"),
        key("videoCases.nikitaSheremet.result3"),
        key("videoCases.nikitaSheremet.result4"),
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.nikitaSheremet.clientName"),
      subtitle: key("videoCases.nikitaSheremet.clientRole"),
      text: key("videoCases.nikitaSheremet.clientDesc"),
      image: { src: "/media/cases/nikita-sheremet-crypto/avatar.jpeg", alt: text("Профіль Нікіти Шеремета — Instagram", "Nikita Sheremet's profile — Instagram") },
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.nikitaSheremet.reviewTitle"),
    src: "/media/cases/nikita-sheremet-crypto/screenshot.webp",
    alt: text("Відгук Нікіти Шеремета", "Nikita Sheremet's review"),
    text: key("videoCases.nikitaSheremet.reviewText"),
    author: key("videoCases.nikitaSheremet.reviewAuthor"),
    w: 400,
    h: 600,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.team.andriiMotion"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
