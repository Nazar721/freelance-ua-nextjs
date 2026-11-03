import { key, text, type CaseRecord } from "../types";

/**
 * video/plc-auction-motion — motion-відеоінструкція для сайту автомобільного
 * аукціону PLC Auction. Hero — легке 4-секундне прев'ю (card.mp4), повний
 * ролик зі звуком (hero.mp4) відкривається плеєром і окремо стоїть у секції
 * «Повний ролик». Відгук — реальний скріншот повідомлення Kristina Honchar.
 * Склад команди не зазначено: замовник надасть його окремо.
 */
export const plcAuctionMotion: CaseRecord = {
  id: "video/plc-auction-motion",
  slug: "plc-auction-motion",
  direction: "video",
  subcategory: "motion",
  uaPath: "/cases/video/plc-auction-motion",
  enPath: "/en/cases/video/plc-auction-motion",

  h1: text("PLC Auction — motion-відеоінструкція для сайту", "PLC Auction — Motion Video Instruction for a Website"),
  lead: key("videoCases.plcAuction.subtitle"),
  seo: {
    title: text(
      "PLC Auction — motion-відеоінструкція для сайту | Freelance UA",
      "PLC Auction — motion video instruction for a website | Freelance UA",
    ),
    description: key("videoCases.plcAuction.seoDesc"),
    ogImage: "/media/cases/plc-auction-motion/og.jpg",
    ogImageAlt: text(
      "Обкладинка відеоінструкції: авто під чорною тканиною та напис «How to Sell a Car on PLC Auction?»",
      "Cover of the video instruction: a car under a black cloth with the line “How to Sell a Car on PLC Auction?”",
    ),
  },
  badge: key("videoCases.plcAuction.category"),
  glow: { base: "rgba(220, 38, 38, 0.15)", strong: "rgba(220, 38, 38, 0.3)" },

  hero: {
    kind: "video",
    src: "/media/cases/plc-auction-motion/card.mp4",
    poster: "/media/cases/plc-auction-motion/hero-poster.webp",
    fullSrc: "/media/cases/plc-auction-motion/hero.mp4",
    alt: text(
      "Вертикальне motion-відео: екран смартфона з інтерфейсом сайту PLC Auction",
      "Vertical motion video: a smartphone screen showing the PLC Auction website interface",
    ),
    duration: text("~20 с", "~20 s"),
    format: "9:16",
    ratio: "9/16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.websiteMessageAnimation.challengeTitle"),
      solutionTitle: key("videoCases.websiteMessageAnimation.solutionTitle"),
      task: key("videoCases.plcAuction.challenge"),
      solution: key("videoCases.plcAuction.solution"),
    },
    {
      kind: "videoGrid",
      title: key("videoCases.plcAuction.fullTitle"),
      intro: key("videoCases.plcAuction.fullDesc"),
      ratio: "9/16",
      items: [
        {
          src: "/media/cases/plc-auction-motion/hero.mp4",
          poster: "/media/cases/plc-auction-motion/full-poster.webp",
          duration: text("~20 с", "~20 s"),
          format: "9:16",
        },
      ],
    },
    {
      kind: "results",
      title: text("Виконана робота", "Work delivered"),
      columns: 1,
      items: [
        key("videoCases.plcAuction.result1"),
        key("videoCases.plcAuction.result2"),
        key("videoCases.plcAuction.result3"),
        key("videoCases.plcAuction.result4"),
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.plcAuction.reviewTitle"),
    src: "/media/cases/plc-auction-motion/review.webp",
    alt: text("Відгук Kristina Honchar у Telegram", "Review from Kristina Honchar in Telegram"),
    text: key("videoCases.plcAuction.reviewText"),
    w: 1146,
    h: 278,
    author: key("videoCases.plcAuction.reviewAuthor"),
  },

  team: {
    label: key("videoCases.projectTeam"),
    value: text("Андрій — motion-дизайнер", "Andrii — motion designer"),
  },

  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
