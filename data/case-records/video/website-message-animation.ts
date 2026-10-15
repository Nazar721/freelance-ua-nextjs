import { key, text, type CaseRecord } from "../types";

/**
 * video/website-message-animation — анімований чат Tripanio для корпоративного сайту.
 * Клієнтка: Maria. Відеомонтаж: Андрій Пахар.
 */
export const websiteMessageAnimation: CaseRecord = {
  id: "video/website-message-animation",
  slug: "website-message-animation",
  direction: "video",
  subcategory: "motion",
  uaPath: "/cases/video/website-message-animation",
  enPath: "/en/cases/video/website-message-animation",
  h1: text(
    "Tripanio — анімація повідомлень для сайту",
    "Tripanio — Website Message Animation",
  ),
  lead: key("videoCases.websiteMessageAnimation.subtitle"),
  seo: {
    title: text(
      "Tripanio — анімація повідомлень для сайту | Freelance UA",
      "Tripanio — Website Message Animation | Freelance UA",
    ),
    description: text(
      "Відео з анімованим діалогом у мобільному чаті Tripanio для корпоративного сайту.",
      "A video featuring an animated Tripanio mobile chat conversation for a corporate website.",
    ),
    ogImage: "/media/cases/website-message-animation/card-poster.webp",
    ogImageAlt: text(
      "Обкладинка відео: анімований чат Tripanio на екрані смартфона.",
      "Video cover: an animated Tripanio chat on a smartphone screen.",
    ),
  },
  badge: key("videoCases.websiteMessageAnimation.category"),
  glow: { base: "rgba(99, 102, 241, 0.12)", strong: "rgba(99, 102, 241, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/website-message-animation/hero.mp4",
    poster: "/media/cases/website-message-animation/hero-poster.webp",
    alt: text(
      "Анімований діалог Tripanio на екрані смартфона",
      "Animated Tripanio chat on a smartphone screen",
    ),
    duration: text("~13,5 с", "~13.5 s"),
    format: "9:16",
    ratio: "9/16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.websiteMessageAnimation.challengeTitle"),
      solutionTitle: key("videoCases.websiteMessageAnimation.solutionTitle"),
      task: key("videoCases.websiteMessageAnimation.challenge"),
      solution: key("videoCases.websiteMessageAnimation.solution"),
    },
    {
      kind: "results",
      title: text("Виконана робота", "Work delivered"),
      columns: 1,
      items: [
        key("videoCases.websiteMessageAnimation.result1"),
        key("videoCases.websiteMessageAnimation.result2"),
        key("videoCases.websiteMessageAnimation.result3"),
        key("videoCases.websiteMessageAnimation.result4"),
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.websiteMessageAnimation.reviewTitle"),
    src: "/media/cases/website-message-animation/review.webp",
    alt: text("Відгук клієнта Maria у Telegram", "Client review from Maria in Telegram"),
    text: key("videoCases.websiteMessageAnimation.reviewText"),
    w: 1024,
    h: 746,
    author: key("videoCases.websiteMessageAnimation.reviewAuthor"),
  },

  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.websiteMessageAnimation.teamMember"),
  },

  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
