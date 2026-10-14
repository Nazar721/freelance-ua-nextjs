import { key, text, type CaseRecord } from "../types";

/**
 * video/skool-10-features — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const skool10Features: CaseRecord = {
  id: "video/skool-10-features",
  slug: "skool-10-features",
  direction: "video",
  subcategory: "youtube",
  uaPath: "/cases/video/skool-10-features",
  enPath: "/en/cases/video/skool-10-features",
  h1: text("Огляд Skool 10 Features", "Skool 10 features review"),
  lead: key("videoCases.skool10Features.subtitle"),
  seo: {
    title: text("Огляд Skool 10 Features | Freelance UA", "Skool 10 features review | Freelance UA"),
    description: text("YouTube-відео з оглядом 10 фіч Skool — монтаж та монтування тривалого контенту", "YouTube review video of 10 Skool features — editing long-form content"),
    ogImage: "https://freelance-ua.agency/media/cases/skool-10-features/screen-4.jpg",
  },
  badge: key("videoCases.skool10Features.category"),
  glow: { base: "rgba(251, 146, 60, 0.12)", strong: "rgba(251, 146, 60, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/skool-10-features/screen-4.jpg",
    w: 1200,
    h: 800,
    alt: key("videoCases.skool10Features.title"),
    priority: true,
  },

  sections: [
    {
      kind: "links",
      items: [
        { href: "https://t.me/FreelanceUADigitalAgency/161/1025", label: text("Дивитись в Telegram", "View in Telegram") },
      ],
    },
    {
      kind: "brief",
      taskTitle: key("videoCases.skool10Features.challengeTitle"),
      solutionTitle: key("videoCases.skool10Features.solutionTitle"),
      task: key("videoCases.skool10Features.challenge"),
      solution: key("videoCases.skool10Features.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.skool10Features.result1"),
        key("videoCases.skool10Features.result2"),
        key("videoCases.skool10Features.result3"),
        key("videoCases.skool10Features.result4"),
      ],
    },
    {
      kind: "gallery",
      title: text("Кадри з відео", "Video frames"),
      columns: 2,
      items: [
        { src: "/media/cases/skool-10-features/screen-1.jpg", alt: text("Ведучий з іконкою Skool", "Host with a Skool icon") },
        { src: "/media/cases/skool-10-features/screen-2.webp", alt: text("B-roll — Lamborghini", "B-roll — Lamborghini") },
        { src: "/media/cases/skool-10-features/screen-3.jpg", alt: text("Візуалізація автоматизації", "Automation visualization") },
        { src: "/media/cases/skool-10-features/screen-4.jpg", alt: text("Тайтл — 10 фішок", "Title — 10 features") },
        { src: "/media/cases/skool-10-features/screen-5.webp", alt: text("Переваги Claude AI", "Benefits of Claude AI") },
        { src: "/media/cases/skool-10-features/screen-6.jpg", alt: text("Демо Claude AI — аналіз ринку", "Claude AI demo — market analysis") },
        { src: "/media/cases/skool-10-features/screen-7.jpg", alt: text("Організація файлів", "File organization") },
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.skool10Features.reviewTitle"),
    text: key("videoCases.skool10Features.reviewText"),
    author: key("videoCases.skool10Features.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.skool10Features.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
