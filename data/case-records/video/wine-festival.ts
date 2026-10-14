import { key, text, type CaseRecord } from "../types";

/**
 * video/wine-festival — перенесено з оригінальної сторінки (Пакет 4, фінальна партія).
 * Hero — два горизонтальні відео з підписами; соціальний доказ згруповано в
 * одному блоці: відео «Доказ використання» + скріншот-відгук Elizabeth —
 * саме так, як їх рендеривала оригінальна сторінка (review-група).
 */
export const wineFestival: CaseRecord = {
  id: "video/wine-festival",
  slug: "wine-festival",
  direction: "video",
  subcategory: "youtube",
  uaPath: "/cases/video/wine-festival",
  enPath: "/en/cases/video/wine-festival",

  h1: text("Фестиваль вина", "Wine Festival"),
  lead: key("videoCases.wineFestival.subtitle"),
  seo: {
    title: text(
      "Відео для винного фестивалю | Freelance UA",
      "Wine festival promo videos | Freelance UA",
    ),
    description: text(
      "YouTube-відео для винного фестивалю — монтаж з атмосферними кадрами",
      "YouTube videos for a wine festival — editing with atmospheric shots",
    ),
    ogImage: "https://freelance-ua.agency/media/cases/wine-festival/poster.jpg",
  },
  badge: key("videoCases.wineFestival.category"),
  pill: text("YouTube", "YouTube"),
  glow: { base: "rgba(168, 85, 247, 0.12)", strong: "rgba(168, 85, 247, 0.25)" },

  hero: {
    kind: "videoGrid",
    ratio: "16/9",
    items: [
      {
        src: "/media/cases/wine-festival/video-1.mp4",
        poster: "/media/cases/wine-festival/poster-1.jpg",
        duration: text("~20с", "~20s"),
        format: "16:9",
        label: key("videoCases.wineFestival.video1Label"),
      },
      {
        src: "/media/cases/wine-festival/video-2.mp4",
        poster: "/media/cases/wine-festival/poster-2.jpg",
        duration: text("~20с", "~20s"),
        format: "16:9",
        label: key("videoCases.wineFestival.video2Label"),
      },
    ],
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.wineFestival.challengeTitle"),
      solutionTitle: key("videoCases.wineFestival.solutionTitle"),
      task: key("videoCases.wineFestival.challenge"),
      solution: key("videoCases.wineFestival.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 2,
      decorated: true,
      items: [
        key("videoCases.wineFestival.result1"),
        key("videoCases.wineFestival.result2"),
        key("videoCases.wineFestival.result3"),
        key("videoCases.wineFestival.result4"),
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.wineFestival.clientName"),
      subtitle: key("videoCases.wineFestival.clientRole"),
      text: key("videoCases.wineFestival.clientDesc"),
    },
  ],

  review: {
    kind: "group",
    title: key("videoCases.wineFestival.reviewTitle"),
    items: [
      {
        kind: "video",
        title: text("Доказ використання", "Proof of use"),
        src: "/media/testimonials/video-5.mp4",
        poster: "/media/testimonials/video-5-poster.jpg",
      },
      {
        kind: "screenshot",
        src: "/media/testimonials/tg-screenshots/15-unnamed.webp",
        alt: text("Відгук Elizabeth в Telegram", "Elizabeth's review on Telegram"),
        text: text(
          "Задоволена співпрацею! Відео відповідає задуму, не підвели зі строками. Дякую за оперативність та уважність до деталей",
          "Happy with the collaboration! The video matches the idea, no delays. Thank you for the responsiveness and attention to detail",
        ),
        author: text("Elizabeth", "Elizabeth"),
        w: 600,
        h: 800,
      },
    ],
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.wineFestival.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
