import { key, text, type CaseRecord } from "../types";

/**
 * video/serhii-yarmolenko-reels — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const serhiiYarmolenkoReels: CaseRecord = {
  id: "video/serhii-yarmolenko-reels",
  slug: "serhii-yarmolenko-reels",
  direction: "video",
  subcategory: "reels",
  uaPath: "/cases/video/serhii-yarmolenko-reels",
  enPath: "/en/cases/video/serhii-yarmolenko-reels",
  h1: text("Сергій Ярмоленко", "Serhii Yarmolenko"),
  lead: key("videoCases.serhiiYarmolenkoReels.subtitle"),
  seo: {
    title: text("Сергій Ярмоленко | Freelance UA", "Serhii Yarmolenko | Freelance UA"),
    description: key("videoCases.serhiiYarmolenkoReels.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/serhii-yarmolenko-reels/profile.webp",
  },
  badge: key("videoCases.serhiiYarmolenkoReels.category"),
  glow: { base: "rgba(236, 72, 153, 0.12)", strong: "rgba(236, 72, 153, 0.25)" },

  hero: {
    kind: "imageGrid",
    items: [
      { src: "/media/cases/serhii-yarmolenko-reels/video-1.mp4", alt: key("videoCases.serhiiYarmolenkoReels.title") },
      { src: "/media/cases/serhii-yarmolenko-reels/video-2.mp4", alt: key("videoCases.serhiiYarmolenkoReels.title") },
      { src: "/media/cases/serhii-yarmolenko-reels/video-3.mp4", alt: key("videoCases.serhiiYarmolenkoReels.title") },
    ],
  },

  sections: [
    {
      kind: "videoGrid",
      fullscreen: true,
      ratio: "9/16",
      items: [
        { src: "/media/cases/serhii-yarmolenko-reels/video-1.mp4", duration: text("~56с", "~56s") },
        { src: "/media/cases/serhii-yarmolenko-reels/video-2.mp4", duration: text("~1:20", "~1:20") },
        { src: "/media/cases/serhii-yarmolenko-reels/video-3.mp4", duration: text("~60с", "~60s") },
      ],
    },
    {
      kind: "brief",
      taskTitle: key("videoCases.serhiiYarmolenkoReels.challengeTitle"),
      solutionTitle: key("videoCases.serhiiYarmolenkoReels.solutionTitle"),
      task: key("videoCases.serhiiYarmolenkoReels.challenge"),
      solution: key("videoCases.serhiiYarmolenkoReels.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.serhiiYarmolenkoReels.result1"),
        key("videoCases.serhiiYarmolenkoReels.result2"),
        key("videoCases.serhiiYarmolenkoReels.result3"),
        key("videoCases.serhiiYarmolenkoReels.result4"),
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.serhiiYarmolenkoReels.clientName"),
      subtitle: key("videoCases.serhiiYarmolenkoReels.clientRole"),
      text: key("videoCases.serhiiYarmolenkoReels.clientDesc"),
      image: { src: "/media/cases/serhii-yarmolenko-reels/profile.webp", alt: text("Профіль Сергія Ярмоленка — Instagram", "Serhii Yarmolenko's profile — Instagram") },
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.serhiiYarmolenkoReels.reviewTitle"),
    src: "/media/cases/serhii-yarmolenko-reels/review.webp",
    alt: text("Відгук Сергія Ярмоленка", "Serhii Yarmolenko's review"),
    text: key("videoCases.serhiiYarmolenkoReels.reviewText"),
    author: key("videoCases.serhiiYarmolenkoReels.reviewAuthor"),
    w: 977,
    h: 292,
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
