import { key, text, type CaseRecord } from "../types";

/**
 * video/eva-code-reels — перенесено з оригінальної сторінки (Пакет 4, фінальна партія).
 * H1 — назва бренду E.V.A. CODE™ (затверджений підхід), лід — схвалений
 * підзаголовок про склад екосистеми. Картка «Систему теж розробили ми» —
 * links-секція з локалізованим внутрішнім посиланням на IT-кейс; відгук —
 * відео з підписом і цитатою під плеєром.
 */
export const evaCodeReels: CaseRecord = {
  id: "video/eva-code-reels",
  slug: "eva-code-reels",
  direction: "video",
  subcategory: "reels",
  uaPath: "/cases/video/eva-code-reels",
  enPath: "/en/cases/video/eva-code-reels",

  h1: text("E.V.A. CODE™", "E.V.A. CODE™"),
  lead: key("videoCases.evaCodeReels.subtitle"),
  seo: {
    title: text("Reels для E.V.A. CODE | Freelance UA", "E.V.A. CODE reels | Freelance UA"),
    description: text(
      "Монтаж Reels для проєкту E.V.A. CODE™ — серія відео для Instagram",
      "Reels editing for the E.V.A. CODE™ project — a series of videos for Instagram",
    ),
    ogImage: "https://freelance-ua.agency/media/cases/eva-code-reels/hero-poster.jpg",
  },
  badge: key("videoCases.evaCodeReels.category"),
  pill: text("E.V.A. CODE™", "E.V.A. CODE™"),
  glow: { base: "rgba(236, 72, 153, 0.12)", strong: "rgba(236, 72, 153, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/eva-code-reels/hero.mp4",
    poster: "/media/cases/eva-code-reels/hero-poster.jpg",
    alt: key("videoCases.evaCodeReels.title"),
    duration: text("~2:45", "~2:45"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.evaCodeReels.challengeTitle"),
      solutionTitle: key("videoCases.evaCodeReels.solutionTitle"),
      task: key("videoCases.evaCodeReels.challenge"),
      solution: key("videoCases.evaCodeReels.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 2,
      decorated: true,
      items: [
        key("videoCases.evaCodeReels.result1"),
        key("videoCases.evaCodeReels.result2"),
        key("videoCases.evaCodeReels.result3"),
        key("videoCases.evaCodeReels.result4"),
      ],
    },
    {
      kind: "links",
      items: [
        {
          href: { uk: "/cases/it/eva-code", en: "/en/cases/it/eva-code" },
          internal: true,
          title: key("videoCases.evaCodeReels.relatedItTitle"),
          text: key("videoCases.evaCodeReels.relatedItDesc"),
          label: key("videoCases.evaCodeReels.relatedItCta"),
          image: {
            src: "/media/cases/eva-web.webp",
            w: 800,
            h: 500,
            alt: text(
              "E.V.A. CODE™ — цифрова екосистема",
              "E.V.A. CODE™ — the digital ecosystem",
            ),
          },
        },
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.evaCodeReels.clientName"),
      subtitle: key("videoCases.evaCodeReels.clientRole"),
      text: key("videoCases.evaCodeReels.clientDesc"),
    },
  ],

  review: {
    kind: "video",
    title: key("videoCases.evaCodeReels.reviewTitle"),
    src: "/media/testimonials/video-1.mp4",
    label: key("videoCases.evaCodeReels.reviewVideoLabel"),
    text: key("testimonial.21.text"),
    author: key("videoCases.evaCodeReels.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.evaCodeReels.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
