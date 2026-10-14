import { key, text, type CaseRecord } from "../types";

/**
 * video/podcast-editing — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const podcastEditing: CaseRecord = {
  id: "video/podcast-editing",
  slug: "podcast-editing",
  direction: "video",
  subcategory: "youtube",
  uaPath: "/cases/video/podcast-editing",
  enPath: "/en/cases/video/podcast-editing",
  h1: text("Монтаж подкасту", "Podcast editing"),
  lead: key("videoCases.podcastEditing.subtitle"),
  seo: {
    title: text("Монтаж подкасту | Freelance UA", "Podcast editing | Freelance UA"),
    description: text("Монтаж подкасту — професійний монтаж тривалого аудіо/відео формату", "Podcast editing — professional editing of long-form audio/video"),
    ogImage: "https://freelance-ua.agency/media/cases/podcast-editing/screenshot-1.jpg",
  },
  badge: key("videoCases.podcastEditing.category"),
  glow: { base: "rgba(239, 68, 68, 0.12)", strong: "rgba(239, 68, 68, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/podcast-editing/screenshot-1.jpg",
    w: 1200,
    h: 800,
    alt: key("videoCases.podcastEditing.title"),
    priority: true,
  },

  sections: [
    {
      kind: "links",
      items: [
        { href: "https://t.me/FreelanceUADigitalAgency/161/1036", label: text("Дивитись в Telegram", "View in Telegram") },
      ],
    },
    {
      kind: "brief",
      taskTitle: key("videoCases.podcastEditing.challengeTitle"),
      solutionTitle: key("videoCases.podcastEditing.solutionTitle"),
      task: key("videoCases.podcastEditing.challenge"),
      solution: key("videoCases.podcastEditing.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.podcastEditing.result1"),
        key("videoCases.podcastEditing.result2"),
        key("videoCases.podcastEditing.result3"),
        key("videoCases.podcastEditing.result4"),
      ],
    },
    {
      kind: "gallery",
      title: text("Кадри з відео", "Video frames"),
      columns: 2,
      items: [
        { src: "/media/cases/podcast-editing/screenshot-1.jpg", alt: text("The Strategic Hotbox — тайтл", "The Strategic Hotbox — title") },
        { src: "/media/cases/podcast-editing/screenshot-2.jpg", alt: text("Jozell Byron — Сент-Вінсент та Гренадіни", "Jozell Byron — Saint Vincent and the Grenadines") },
        { src: "/media/cases/podcast-editing/screenshot-3.jpg", alt: text("Сітка учасників — 6 спікерів", "Participants grid — 6 speakers") },
        { src: "/media/cases/podcast-editing/screenshot-4.jpg", alt: text("Heloisa Helena Lopes — Бразилія", "Heloisa Helena Lopes — Brazil") },
        { src: "/media/cases/podcast-editing/screenshot-5.jpg", alt: text("Сітка учасників — Нігерія, Домінікана", "Participants grid — Nigeria, Dominican Republic") },
        { src: "/media/cases/podcast-editing/screenshot-6.jpg", alt: text("Washington Ferreira Nascimento — субтитри", "Washington Ferreira Nascimento — subtitles") },
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.podcastEditing.reviewTitle"),
    src: "/media/cases/podcast-editing/review-avatar.jpg",
    alt: text("Відгук Angelina", "Angelina's review"),
    text: key("videoCases.podcastEditing.reviewText"),
    author: key("videoCases.podcastEditing.reviewAuthor"),
    w: 400,
    h: 600,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.podcastEditing.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
