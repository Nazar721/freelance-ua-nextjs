import { key, text, type CaseRecord } from "../types";

/**
 * video/sheglam-promo — перенесено з оригінальної сторінки (Пакет 4, фінальна партія).
 * Клієнтський блок містить скріншот Instagram SHEGLAM (prose з зображенням),
 * решта — бриф, декоровані результати та текстовий відгук.
 */
export const sheglamPromo: CaseRecord = {
  id: "video/sheglam-promo",
  slug: "sheglam-promo",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/sheglam-promo",
  enPath: "/en/cases/video/sheglam-promo",

  h1: text("Промо SHEGLAM", "SHEGLAM Promo"),
  lead: key("videoCases.sheglamPromo.subtitle"),
  seo: {
    title: text("Промо SHEGLAM | Freelance UA", "SHEGLAM promo | Freelance UA"),
    description: text(
      "Промо-ролик для косметичного бренду SHEGLAM — монтаж з motion-графікою та колабораціями",
      "Promo video for the cosmetics brand SHEGLAM — editing with motion graphics and collaborations",
    ),
    ogImage: "https://freelance-ua.agency/media/cases/sheglam-promo/hero-poster.jpg",
  },
  badge: key("videoCases.sheglamPromo.category"),
  glow: { base: "rgba(236, 72, 153, 0.12)", strong: "rgba(236, 72, 153, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/sheglam-promo/hero.mp4",
    poster: "/media/cases/sheglam-promo/hero-poster.jpg",
    alt: key("videoCases.sheglamPromo.title"),
    duration: text("~31c", "~31s"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.sheglamPromo.challengeTitle"),
      solutionTitle: key("videoCases.sheglamPromo.solutionTitle"),
      task: key("videoCases.sheglamPromo.challenge"),
      solution: key("videoCases.sheglamPromo.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 2,
      decorated: true,
      items: [
        key("videoCases.sheglamPromo.result1"),
        key("videoCases.sheglamPromo.result2"),
        key("videoCases.sheglamPromo.result3"),
        key("videoCases.sheglamPromo.result4"),
      ],
    },
    {
      kind: "prose",
      image: {
        src: "/media/cases/sheglam-promo/screenshot.jpg",
        w: 600,
        h: 400,
        alt: text("SHEGLAM Instagram", "SHEGLAM Instagram"),
      },
      title: key("videoCases.sheglamPromo.clientName"),
      subtitle: key("videoCases.sheglamPromo.clientRole"),
      text: key("videoCases.sheglamPromo.clientDesc"),
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.sheglamPromo.reviewTitle"),
    text: key("videoCases.sheglamPromo.reviewText"),
    author: key("videoCases.sheglamPromo.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.sheglamPromo.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
