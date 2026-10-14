import { key, text, type CaseRecord } from "../types";

/**
 * it/asandra-soul — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const asandraSoul: CaseRecord = {
  id: "it/asandra-soul",
  slug: "asandra-soul",
  direction: "it",
  subcategory: "saas-telegram",
  uaPath: "/cases/it/asandra-soul",
  enPath: "/en/cases/it/asandra-soul",

  h1: text("Asandra Soul — Telegram Mini App для курсів і практик", "Asandra Soul — Telegram Mini App for courses and practices"),
  lead: key("itCases.asandraSoul.description"),
  seo: {
    title: text("Asandra Soul — Telegram Mini App і backend для автоматизації продажів | Freelance UA", "Asandra Soul — Telegram Mini App and backend for sales automation | Freelance UA"),
    description: key("itCases.asandraSoul.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/asandraapp-mocap.webp",
  },
  badge: key("itCases.asandraSoul.category"),
  glow: { base: "rgba(200, 150, 80, 0.15)", strong: "rgba(200, 150, 80, 0.3)" },

  hero: {
    kind: "image",
    src: "/media/cases/asandraapp-mocap.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.asandraSoul.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.asandraSoul.challenge"),
      solution: key("itCases.asandraSoul.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.asandraSoul.component1Title"),
          desc: key("itCases.asandraSoul.component1Desc"),
          images: [
            { src: "/media/cases/asandra1.webp" },
          ],
          link: { href: "https://t.me/asandrasoul_bot", label: key("itCases.asandraSoul.viewSiteLabel") },
        },
        {
          title: key("itCases.asandraSoul.component2Title"),
          desc: key("itCases.asandraSoul.component2Desc"),
          images: [
            { src: "/media/cases/asandra2.jpeg" },
          ],
        },
        {
          title: key("itCases.asandraSoul.component3Title"),
          desc: key("itCases.asandraSoul.component3Desc"),
          images: [
            { src: "/media/cases/asandra3.jpeg" },
          ],
        },
        {
          title: key("itCases.asandraSoul.component4Title"),
          desc: key("itCases.asandraSoul.component4Desc"),
          images: [
            { src: "/media/cases/asandra5-13.webp" },
          ],
        },
        {
          title: key("itCases.asandraSoul.component5Title"),
          desc: key("itCases.asandraSoul.component5Desc"),
          images: [
            { src: "/media/cases/asandra5-1.webp" },
            { src: "/media/cases/asandra5-2.webp" },
            { src: "/media/cases/asandra5-3.webp" },
            { src: "/media/cases/asandra5-4.webp" },
            { src: "/media/cases/asandra5-5.webp" },
            { src: "/media/cases/asandra5-6.webp" },
            { src: "/media/cases/asandra5-7.webp" },
            { src: "/media/cases/asandra5-8.webp" },
            { src: "/media/cases/asandra5-9.webp" },
            { src: "/media/cases/asandra5-10.webp" },
            { src: "/media/cases/asandra5-11.webp" },
            { src: "/media/cases/asandra5-12.webp" },
            { src: "/media/cases/asandra5-13.webp" },
          ],
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.asandraSoul.result1"),
        key("itCases.asandraSoul.result2"),
        key("itCases.asandraSoul.result3"),
        key("itCases.asandraSoul.result4"),
        key("itCases.asandraSoul.result5"),
        key("itCases.asandraSoul.result6"),
        key("itCases.asandraSoul.result7"),
        key("itCases.asandraSoul.result8"),
      ],
    },
  ],

  review: {
    kind: "audio",
    title: key("itCases.asandraSoul.reviewTitle"),
    src: "/media/testimonials/asandra.m4a",
    author: key("itCases.asandraSoul.reviewAuthor"),
    caption: text("Голосовий відгук", "Voice review"),
  },
  team: {
    label: key("itCases.projectTeam"),
    value: key("itCases.team.bohdanDeveloper"),
  },
  backToList: {
    label: key("itCases.backToList"),
    href: { uk: "/cases/it", en: "/en/cases/it" },
  },
};
