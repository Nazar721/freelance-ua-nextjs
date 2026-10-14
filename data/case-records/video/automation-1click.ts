import { key, text, type CaseRecord } from "../types";

/**
 * video/automation-1click — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const automation1click: CaseRecord = {
  id: "video/automation-1click",
  slug: "automation-1click",
  direction: "video",
  subcategory: "youtube",
  uaPath: "/cases/video/automation-1click",
  enPath: "/en/cases/video/automation-1click",
  h1: text("Автоматизація за 1 клік", "1-click automation"),
  lead: key("videoCases.automation1click.subtitle"),
  seo: {
    title: text("Автоматизація за 1 клік | Freelance UA", "1-click automation | Freelance UA"),
    description: text("YouTube-відео про автоматизацію бізнесу за 1 клік — монтаж та моушн-дизайн", "YouTube video about 1-click business automation — editing and motion design"),
    ogImage: "https://freelance-ua.agency/media/cases/automation-1click/screenshot-3.jpg",
  },
  badge: key("videoCases.automation1click.category"),
  glow: { base: "rgba(245, 158, 11, 0.12)", strong: "rgba(245, 158, 11, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/automation-1click/screenshot-3.jpg",
    w: 1200,
    h: 800,
    alt: key("videoCases.automation1click.title"),
    priority: true,
  },

  sections: [
    {
      kind: "links",
      items: [
        { href: "https://t.me/FreelanceUADigitalAgency/161/430", label: text("Дивитись в Telegram", "View in Telegram") },
      ],
    },
    {
      kind: "brief",
      taskTitle: key("videoCases.automation1click.challengeTitle"),
      solutionTitle: key("videoCases.automation1click.solutionTitle"),
      task: key("videoCases.automation1click.challenge"),
      solution: key("videoCases.automation1click.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.automation1click.result1"),
        key("videoCases.automation1click.result2"),
        key("videoCases.automation1click.result3"),
        key("videoCases.automation1click.result4"),
      ],
    },
    {
      kind: "gallery",
      title: text("Кадри з відео", "Video frames"),
      columns: 2,
      items: [
        { src: "/media/cases/automation-1click/screenshot-1.jpg", alt: text("Спікер з мікрофоном RØDE — Автоматизація в 1 клік", "Speaker with an RØDE microphone — 1-click automation") },
        { src: "/media/cases/automation-1click/screenshot-2.jpg", alt: text("Сітка — автоматизація, Telegram-бот, спікер", "Grid — automation, Telegram bot, speaker") },
        { src: "/media/cases/automation-1click/screenshot-3.jpg", alt: text("Тайтл — Як створити автоматизацію для бізнесу", "Title — How to create automation for business") },
        { src: "/media/cases/automation-1click/screenshot-4.jpg", alt: text("Спікер з анімованим персонажем", "Speaker with an animated character") },
        { src: "/media/cases/automation-1click/screenshot-5.jpg", alt: text("Хто потребує автоматизацій та навіщо", "Who needs automations and why") },
        { src: "/media/cases/automation-1click/screenshot-6.jpg", alt: text("3 типи автоматизацій", "3 types of automations") },
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.automation1click.reviewTitle"),
    text: key("videoCases.automation1click.reviewText"),
    author: key("videoCases.automation1click.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.automation1click.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
