import { key, text, type CaseRecord } from "../types";

/**
 * video/liliya-product-business — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const liliyaProductBusiness: CaseRecord = {
  id: "video/liliya-product-business",
  slug: "liliya-product-business",
  direction: "video",
  subcategory: "youtube",
  uaPath: "/cases/video/liliya-product-business",
  enPath: "/en/cases/video/liliya-product-business",
  h1: text("Бізнес Лілії", "Liliya's business"),
  lead: key("videoCases.liliyaProductBusiness.subtitle"),
  seo: {
    title: text("Бізнес Лілії | Freelance UA", "Liliya's business | Freelance UA"),
    description: text("YouTube-відео для Лілії про product-бізнес — монтаж та структурування контенту", "YouTube video for Liliya about a product business — editing and content structuring"),
    ogImage: "https://freelance-ua.agency/media/cases/liliya-product-business/screen-1.jpg",
  },
  badge: key("videoCases.liliyaProductBusiness.category"),
  glow: { base: "rgba(236, 72, 153, 0.12)", strong: "rgba(236, 72, 153, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/liliya-product-business/screen-3.jpg",
    w: 1200,
    h: 800,
    alt: key("videoCases.liliyaProductBusiness.title"),
    priority: true,
  },

  sections: [
    {
      kind: "links",
      items: [
        { href: "https://t.me/FreelanceUADigitalAgency/161/429", label: text("Дивитись в Telegram", "View in Telegram") },
      ],
    },
    {
      kind: "brief",
      taskTitle: key("videoCases.liliyaProductBusiness.challengeTitle"),
      solutionTitle: key("videoCases.liliyaProductBusiness.solutionTitle"),
      task: key("videoCases.liliyaProductBusiness.challenge"),
      solution: key("videoCases.liliyaProductBusiness.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.liliyaProductBusiness.result1"),
        key("videoCases.liliyaProductBusiness.result2"),
        key("videoCases.liliyaProductBusiness.result3"),
        key("videoCases.liliyaProductBusiness.result4"),
      ],
    },
    {
      kind: "gallery",
      title: text("Кадри з відео", "Video frames"),
      columns: 2,
      items: [
        { src: "/media/cases/liliya-product-business/screen-1.jpg", alt: text("Ліля — крупний план", "Liliya — close-up") },
        { src: "/media/cases/liliya-product-business/screen-2.jpg", alt: text("Ліля — крупний план (варіант)", "Liliya — close-up (variant)") },
        { src: "/media/cases/liliya-product-business/screen-3.jpg", alt: text("Ліля за столом з MacBook", "Liliya at a desk with a MacBook") },
        { src: "/media/cases/liliya-product-business/screen-4.jpg", alt: text("Ліля — субтитри", "Liliya — subtitles") },
        { src: "/media/cases/liliya-product-business/screen-5.jpg", alt: text("Ліля — B-roll кадр", "Liliya — B-roll shot") },
        { src: "/media/cases/liliya-product-business/screen-6.jpg", alt: text("Ліля — рожевий диван", "Liliya — pink sofa") },
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.liliyaProductBusiness.reviewTitle"),
    text: key("videoCases.liliyaProductBusiness.reviewText"),
    author: key("videoCases.liliyaProductBusiness.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.liliyaProductBusiness.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
