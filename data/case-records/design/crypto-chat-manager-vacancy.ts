import { key, text, type CaseRecord } from "../types";

/**
 * design/crypto-chat-manager-vacancy — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const cryptoChatManagerVacancy: CaseRecord = {
  id: "design/crypto-chat-manager-vacancy",
  slug: "crypto-chat-manager-vacancy",
  direction: "design",
  subcategory: "banners",
  uaPath: "/cases/design/crypto-chat-manager-vacancy",
  enPath: "/en/cases/design/crypto-chat-manager-vacancy",

  h1: text("Вакансія для крипто-офісу", "Job vacancy for a crypto office"),
  lead: key("designCases.cryptoChatManagerVacancy.subtitle"),
  seo: {
    title: text("Банер вакансії для крипто-офісу в Дніпрі | Freelance UA", "Job banner for a crypto office in Dnipro | Freelance UA"),
    description: key("designCases.cryptoChatManagerVacancy.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/crypto-chat-manager-vacancy/crypto-chat-manager-vacancy-preview.webp",
  },
  badge: key("designCases.cryptoChatManagerVacancy.category"),
  glow: { base: "rgba(132, 204, 22, 0.12)", strong: "rgba(132, 204, 22, 0.28)" },

  hero: {
    kind: "image",
    src: "/media/cases/crypto-chat-manager-vacancy/crypto-chat-manager-vacancy1.webp",
    w: 1200,
    h: 800,
    alt: key("designCases.cryptoChatManagerVacancy.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.cryptoChatManagerVacancy.challenge"),
      solution: key("designCases.cryptoChatManagerVacancy.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.cryptoChatManagerVacancy.finalsTitle"),
      intro: key("designCases.cryptoChatManagerVacancy.finalsIntro"),
      columns: 2,
      items: [
        { src: "/media/cases/crypto-chat-manager-vacancy/crypto-chat-manager-vacancy1.webp", w: 720, h: 1280, title: key("designCases.cryptoChatManagerVacancy.item1.title"), caption: key("designCases.cryptoChatManagerVacancy.item1.caption") },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.cryptoChatManagerVacancy.result1"),
        key("designCases.cryptoChatManagerVacancy.result2"),
        key("designCases.cryptoChatManagerVacancy.result3"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("designCases.cryptoChatManagerVacancy.reviewTitle"),
    text: key("designCases.cryptoChatManagerVacancy.reviewText"),
    author: key("designCases.cryptoChatManagerVacancy.reviewAuthor"),
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.cryptoChatManagerVacancy.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
