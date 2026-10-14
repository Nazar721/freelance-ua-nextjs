import { key, text, type CaseRecord } from "../types";

/**
 * it/epiland — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const epiland: CaseRecord = {
  id: "it/epiland",
  slug: "epiland",
  direction: "it",
  subcategory: "saas-telegram",
  uaPath: "/cases/it/epiland",
  enPath: "/en/cases/it/epiland",

  h1: text("Epiland — Telegram Mini App для парку розваг", "Epiland — Telegram Mini App for an amusement park"),
  lead: key("itCases.epiland.description"),
  seo: {
    title: text("Epiland — бронювання днів народжень у Telegram Mini App | Freelance UA", "Epiland — birthday booking in a Telegram Mini App | Freelance UA"),
    description: text("Telegram-бот і Mini App для парку розваг: бронювання днів народження у 4 кроки, графік та заявки для менеджерів.", "Telegram bot and Mini App for an amusement park: birthday booking in 4 steps, a schedule and requests for managers."),
    ogImage: "https://freelance-ua.agency/media/cases/epiland-mocap.webp",
  },
  badge: key("itCases.epiland.category"),
  glow: { base: "rgba(236, 72, 153, 0.15)", strong: "rgba(236, 72, 153, 0.3)" },

  hero: {
    kind: "image",
    src: "/media/cases/epiland-mocap.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.epiland.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.epiland.challenge"),
      solution: key("itCases.epiland.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.epiland.component1Title"),
          desc: key("itCases.epiland.component1Desc"),
          link: { href: "https://t.me/epilandparkbot", label: key("itCases.epiland.viewSiteLabel") },
          images: [
            { src: "/media/cases/epiland-menu.webp" },
          ],
        },
        {
          title: key("itCases.epiland.component2Title"),
          desc: key("itCases.epiland.component2Desc"),
          images: [
            { src: "/media/cases/epiland-miniapp.webp" },
          ],
        },
        {
          title: key("itCases.epiland.component3Title"),
          desc: key("itCases.epiland.component3Desc"),
          images: [
            { src: "/media/cases/epiland-wizard.webp" },
          ],
        },
        {
          title: key("itCases.epiland.component4Title"),
          desc: key("itCases.epiland.component4Desc"),
          images: [
            { src: "/media/cases/epiland-validation.webp" },
          ],
        },
        {
          title: key("itCases.epiland.component5Title"),
          desc: key("itCases.epiland.component5Desc"),
          images: [
            { src: "/media/cases/epiland-faq.webp" },
          ],
        },
        {
          title: key("itCases.epiland.component6Title"),
          desc: key("itCases.epiland.component6Desc"),
          images: [
            { src: "/media/cases/epiland-contacts.webp" },
          ],
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.epiland.result1"),
        key("itCases.epiland.result2"),
        key("itCases.epiland.result3"),
        key("itCases.epiland.result4"),
        key("itCases.epiland.result5"),
        key("itCases.epiland.result6"),
        key("itCases.epiland.result7"),
        key("itCases.epiland.result8"),
        key("itCases.epiland.result9"),
        key("itCases.epiland.result10"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("itCases.epiland.reviewTitle"),
    text: key("itCases.epiland.reviewText"),
    author: key("itCases.epiland.reviewAuthor"),
  },
  team: {
    label: key("itCases.projectTeam"),
    value: key("itCases.team.andriiDeveloper"),
  },
  backToList: {
    label: key("itCases.backToList"),
    href: { uk: "/cases/it", en: "/en/cases/it" },
  },
};
