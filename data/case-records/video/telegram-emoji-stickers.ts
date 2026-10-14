import { key, text, type CaseRecord } from "../types";

/**
 * video/telegram-emoji-stickers — перенесено з оригінальної сторінки (Пакет 4, фінальна партія).
 * Паки стікерів — videoGrid 1:1 з підписами; відгук — скріншот із цитатою
 * (автора на сторінці не було — у записі теж не додаємо).
 */
export const telegramEmojiStickers: CaseRecord = {
  id: "video/telegram-emoji-stickers",
  slug: "telegram-emoji-stickers",
  direction: "video",
  subcategory: "motion",
  uaPath: "/cases/video/telegram-emoji-stickers",
  enPath: "/en/cases/video/telegram-emoji-stickers",

  h1: text("Телеграм Емодзі", "Telegram Emoji"),
  lead: key("videoCases.telegramEmojiStickers.subtitle"),
  seo: {
    title: text(
      "Emoji стікери для Telegram | Freelance UA",
      "Emoji stickers for Telegram | Freelance UA",
    ),
    description: text(
      "Анімація emoji стікерів для Telegram — моушн-дизайн та монтаж",
      "Animated emoji stickers for Telegram — motion design and editing",
    ),
    ogImage: "https://freelance-ua.agency/media/cases/telegram-emoji-stickers/screenshot.webp",
  },
  badge: key("videoCases.telegramEmojiStickers.category"),
  glow: { base: "rgba(34, 197, 94, 0.12)", strong: "rgba(34, 197, 94, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/telegram-emoji-stickers/hero.mp4",
    alt: key("videoCases.telegramEmojiStickers.title"),
    duration: text("~15с", "~15s"),
    format: "16:9",
    ratio: "16/9",
  },

  sections: [
    {
      kind: "videoGrid",
      title: key("videoCases.telegramEmojiStickers.packsTitle"),
      intro: key("videoCases.telegramEmojiStickers.packsDesc"),
      ratio: "1/1",
      items: [
        {
          src: "/media/cases/telegram-emoji-stickers/process-1.mp4",
          duration: text("~10с", "~10s"),
          format: "1:1",
          label: key("videoCases.telegramEmojiStickers.pack1Label"),
        },
        {
          src: "/media/cases/telegram-emoji-stickers/process-2.mp4",
          duration: text("~10с", "~10s"),
          format: "1:1",
          label: key("videoCases.telegramEmojiStickers.pack2Label"),
        },
      ],
    },
    {
      kind: "brief",
      taskTitle: key("videoCases.telegramEmojiStickers.challengeTitle"),
      solutionTitle: key("videoCases.telegramEmojiStickers.solutionTitle"),
      task: key("videoCases.telegramEmojiStickers.challenge"),
      solution: key("videoCases.telegramEmojiStickers.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 2,
      items: [
        key("videoCases.telegramEmojiStickers.result1"),
        key("videoCases.telegramEmojiStickers.result2"),
        key("videoCases.telegramEmojiStickers.result3"),
        key("videoCases.telegramEmojiStickers.result4"),
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.telegramEmojiStickers.reviewTitle"),
    src: "/media/cases/telegram-emoji-stickers/review-screenshot.webp",
    alt: key("videoCases.telegramEmojiStickers.reviewTitle"),
    text: key("videoCases.telegramEmojiStickers.reviewText"),
    w: 1200,
    h: 800,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.telegramEmojiStickers.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
