import { key, text, type CaseRecord } from "../types";

/**
 * video/stork-sticker-pack — анімований стікерпак із персонажем-лелекою для
 * Telegram. Hero — анімована композиція з чотирьох окремих стікерів (той самий
 * файл, що й у картці каталогу); нижче — повний запис усього пака в чаті
 * (вертикальна плитка 9:16). Відгуку немає; із команди — motion-дизайнер.
 */
export const storkStickerPack: CaseRecord = {
  id: "video/stork-sticker-pack",
  slug: "stork-sticker-pack",
  direction: "video",
  subcategory: "motion",
  uaPath: "/cases/video/stork-sticker-pack",
  enPath: "/en/cases/video/stork-sticker-pack",

  h1: text("Анімований стікерпак «Лелека»", "Animated Stork sticker pack"),
  lead: text(
    "Анімовані стікери з персонажем-лелекою для Telegram — жваві емоції та реакції, які легко ділитися в чатах",
    "Animated stickers with a stork character for Telegram — lively emotions and reactions that are easy to share in chats",
  ),
  seo: {
    title: text(
      "Анімований стікерпак «Лелека» для Telegram | Freelance UA",
      "Animated Stork sticker pack for Telegram | Freelance UA",
    ),
    description: text(
      "Анімований стікерпак для Telegram із персонажем-лелекою: моушн-дизайн, плавні циклічні анімації та оптимізація під месенджер",
      "Animated Telegram sticker pack with a stork character: motion design, smooth looping animations and messenger-ready optimization",
    ),
    ogImage: "https://freelance-ua.agency/media/cases/stork-sticker-pack/og.jpg",
  },
  badge: key("videoCases.telegramEmojiStickers.category"),
  glow: { base: "rgba(42, 171, 238, 0.12)", strong: "rgba(42, 171, 238, 0.28)" },

  hero: {
    kind: "video",
    src: "/media/cases/stork-sticker-pack/card.mp4",
    poster: "/media/cases/stork-sticker-pack/card-poster.webp",
    alt: text(
      "Композиція з чотирьох анімованих стікерів із персонажем-лелекою",
      "A composition of four animated stickers with the stork character",
    ),
    duration: text("~3с", "~3s"),
    format: "16:9",
    ratio: "16/9",
  },

  sections: [
    {
      kind: "videoGrid",
      title: key("videoCases.storkStickerPack.fullTitle"),
      intro: key("videoCases.storkStickerPack.fullDesc"),
      ratio: "9/16",
      items: [
        {
          src: "/media/cases/stork-sticker-pack/hero.mp4",
          poster: "/media/cases/stork-sticker-pack/full-poster.jpg",
          duration: text("~48с", "~48s"),
          format: "9:16",
        },
      ],
    },
    {
      kind: "brief",
      taskTitle: text("Завдання", "The task"),
      solutionTitle: text("Наше рішення", "Our solution"),
      task: key("videoCases.storkStickerPack.challenge"),
      solution: key("videoCases.storkStickerPack.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 2,
      items: [
        key("videoCases.storkStickerPack.result1"),
        key("videoCases.storkStickerPack.result2"),
        key("videoCases.storkStickerPack.result3"),
        key("videoCases.storkStickerPack.result4"),
      ],
    },
  ],

  team: {
    label: key("videoCases.projectTeam"),
    value: text("Андрій — motion-дизайнер", "Andrii — motion designer"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
