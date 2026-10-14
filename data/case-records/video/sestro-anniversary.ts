import { key, text, type CaseRecord } from "../types";

/**
 * video/sestro-anniversary — перенесено з оригінальної сторінки (Пакет 4, фінальна партія).
 * Клієнтський блок зберігає банер Sestro окремим зображенням prose-секції;
 * роль клієнта винесено в `note`, щоб жоден з трьох рядків картки не загубився.
 */
export const sestroAnniversary: CaseRecord = {
  id: "video/sestro-anniversary",
  slug: "sestro-anniversary",
  direction: "video",
  subcategory: "reels",
  uaPath: "/cases/video/sestro-anniversary",
  enPath: "/en/cases/video/sestro-anniversary",

  h1: text("2-а річниця Sestro", "Sestro 2nd Anniversary"),
  lead: key("videoCases.sestroAnniversary.subtitle"),
  seo: {
    title: text(
      "Відео до 2-ї річниці Sestro | Freelance UA",
      "Sestro 2nd anniversary video | Freelance UA",
    ),
    description: text(
      "Reels-відео для 2-ї річниці салону краси Sestro — від ідеї до реалізації, повний цикл виробництва промо-контенту",
      "Reels video for the 2nd anniversary of the Sestro beauty salon — from idea to delivery, a full production cycle",
    ),
    ogImage: "https://freelance-ua.agency/media/brands/sestro.jpg",
  },
  badge: key("videoCases.sestroAnniversary.category"),
  pill: text("Instagram Reels", "Instagram Reels"),
  glow: { base: "rgba(244, 114, 182, 0.12)", strong: "rgba(244, 114, 182, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/sestro-anniversary/hero.mp4",
    alt: key("videoCases.sestroAnniversary.title"),
    duration: text("~15с", "~15s"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.sestroAnniversary.challengeTitle"),
      solutionTitle: key("videoCases.sestroAnniversary.solutionTitle"),
      task: key("videoCases.sestroAnniversary.challenge"),
      solution: key("videoCases.sestroAnniversary.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 2,
      items: [
        key("videoCases.sestroAnniversary.result1"),
        key("videoCases.sestroAnniversary.result2"),
        key("videoCases.sestroAnniversary.result3"),
        key("videoCases.sestroAnniversary.result4"),
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.sestroAnniversary.clientTitle"),
      image: {
        src: "/media/brands/sestro.jpg",
        w: 800,
        h: 200,
        alt: text("Sestro Beauty Studio logo", "Sestro Beauty Studio logo"),
      },
      subtitle: key("videoCases.sestroAnniversary.clientName"),
      note: key("videoCases.sestroAnniversary.clientRole"),
      text: key("videoCases.sestroAnniversary.clientDesc"),
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.sestroAnniversary.reviewTitle"),
    text: key("videoCases.sestroAnniversary.reviewText"),
    author: key("videoCases.sestroAnniversary.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.sestroAnniversary.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
