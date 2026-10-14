import { key, text, type CaseRecord } from "../types";

/**
 * Cuprus Life — chosen as the video pilot because it combines the block types
 * the video catalogue is built from: a hero video grid with posters,
 * durations and a ratio badge, a brief with case-specific headings, a
 * two-column result list, a screenshot review with quote + author, and a
 * team line. The fullscreen player behaviour of the original page is kept.
 *
 * Media taken from the original page: 3 reels + 3 posters + 1 review
 * screenshot = 7 references, the count recorded by the Package 1 inventory.
 * Card duration ("~39с") stays in data/videoCases.ts; the tile durations are
 * localized here because "~33с" must not appear on the English page.
 */
export const cuprusLife: CaseRecord = {
  id: "video/cuprus-life",
  slug: "cuprus-life",
  direction: "video",
  subcategory: "reels",
  uaPath: "/cases/video/cuprus-life",
  enPath: "/en/cases/video/cuprus-life",

  h1: text(
    "Cuprus Life — 3 промо-Reels для соціальних мереж",
    "Cuprus Life — 3 promo Reels for social media",
  ),
  lead: key("videoCases.cuprusLife.subtitle"),
  seo: {
    title: text(
      "Reels для Cuprus Life — монтаж промо-роликів | Freelance UA",
      "Reels for Cuprus Life — promo video editing | Freelance UA",
    ),
    description: text(
      "3 Instagram Reels для бренду Cuprus Life — динамічний монтаж",
      "3 Instagram Reels for the Cuprus Life brand — dynamic video editing",
    ),
    ogImage: "/media/cases/cuprus-life/hero-poster.jpg",
  },
  badge: key("videoCases.cuprusLife.category"),
  pill: text("Reels", "Reels"),
  glow: { base: "rgba(234, 179, 8, 0.12)", strong: "rgba(234, 179, 8, 0.25)" },

  hero: {
    kind: "videoGrid",
    ratio: "9/16",
    items: [
      {
        src: "/media/cases/cuprus-life/reel-1.mp4",
        poster: "/media/cases/cuprus-life/preview-1.jpg",
        duration: text("~33с", "~33s"),
        format: "9:16",
        label: text("Reels 1", "Reels 1"),
      },
      {
        src: "/media/cases/cuprus-life/reel-2.mp4",
        poster: "/media/cases/cuprus-life/preview-2.jpg",
        duration: text("~39с", "~39s"),
        format: "9:16",
        label: text("Reels 2", "Reels 2"),
      },
      {
        src: "/media/cases/cuprus-life/reel-3.mp4",
        poster: "/media/cases/cuprus-life/preview-3.jpg",
        duration: text("~45с", "~45s"),
        format: "9:16",
        label: text("Reels 3", "Reels 3"),
      },
    ],
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.cuprusLife.challengeTitle"),
      solutionTitle: key("videoCases.cuprusLife.solutionTitle"),
      task: key("videoCases.cuprusLife.challenge"),
      solution: key("videoCases.cuprusLife.solution"),
    },
    {
      kind: "results",
      decorated: true,
      title: key("itCases.results"),
      columns: 2,
      items: [
        key("videoCases.cuprusLife.result1"),
        key("videoCases.cuprusLife.result2"),
        key("videoCases.cuprusLife.result3"),
        key("videoCases.cuprusLife.result4"),
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.cuprusLife.reviewTitle"),
    src: "/media/cases/cuprus-life/screenshot.webp",
    alt: text("Відгук Cuprus Life", "Cuprus Life review"),
    text: key("videoCases.cuprusLife.reviewText"),
    author: key("videoCases.cuprusLife.reviewAuthor"),
    avatarName: "Alina",
    w: 600,
    h: 800,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.cuprusLife.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
