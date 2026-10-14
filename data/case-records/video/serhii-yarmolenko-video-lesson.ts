import { key, text, type CaseRecord } from "../types";

/**
 * video/serhii-yarmolenko-video-lesson — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const serhiiYarmolenkoVideoLesson: CaseRecord = {
  id: "video/serhii-yarmolenko-video-lesson",
  slug: "serhii-yarmolenko-video-lesson",
  direction: "video",
  subcategory: "youtube",
  uaPath: "/cases/video/serhii-yarmolenko-video-lesson",
  enPath: "/en/cases/video/serhii-yarmolenko-video-lesson",
  h1: text("Відео урок Сергія Ярмоленка", "Serhii Yarmolenko video lesson"),
  lead: key("videoCases.serhiiYarmolenko.subtitle"),
  seo: {
    title: text("Відео урок Сергія Ярмоленка | Freelance UA", "Serhii Yarmolenko video lesson | Freelance UA"),
    description: text("Змонтували відео урок на 18 хвилин для блогера у ніші товарного бізнесу — динамічний монтаж, графіка та звукове оформлення", "Edited an 18-minute video lesson for a blogger in the product-business niche — dynamic editing, graphics and sound design"),
    ogImage: "https://freelance-ua.agency/media/cases/serhii-yarmolenko-video-lesson/screen-1.jpg",
  },
  badge: key("videoCases.serhiiYarmolenko.category"),
  glow: { base: "rgba(251, 146, 60, 0.12)", strong: "rgba(251, 146, 60, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/serhii-yarmolenko-video-lesson/screen-1.jpg",
    w: 1200,
    h: 800,
    alt: key("videoCases.serhiiYarmolenko.title"),
    priority: true,
  },

  sections: [
    {
      kind: "links",
      items: [
        { href: "https://t.me/FreelanceUADigitalAgency/161/1098", label: text("Дивитись в Telegram", "View in Telegram") },
      ],
    },
    {
      kind: "brief",
      taskTitle: key("videoCases.serhiiYarmolenko.challengeTitle"),
      solutionTitle: key("videoCases.serhiiYarmolenko.solutionTitle"),
      task: key("videoCases.serhiiYarmolenko.challenge"),
      solution: key("videoCases.serhiiYarmolenko.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.serhiiYarmolenko.result1"),
        key("videoCases.serhiiYarmolenko.result2"),
        key("videoCases.serhiiYarmolenko.result3"),
        key("videoCases.serhiiYarmolenko.result4"),
      ],
    },
    {
      kind: "gallery",
      title: text("Кадри з відео", "Video frames"),
      columns: 2,
      items: [
        { src: "/media/cases/serhii-yarmolenko-video-lesson/screen-1.jpg", alt: text("Кадр з відео уроку — інтро", "Video lesson frame — intro") },
        { src: "/media/cases/serhii-yarmolenko-video-lesson/screen-2.jpg", alt: text("Кадр з відео уроку — основний блок", "Video lesson frame — main segment") },
        { src: "/media/cases/serhii-yarmolenko-video-lesson/screen-3.jpg", alt: text("Кадр з відео уроку — графіка", "Video lesson frame — graphics") },
        { src: "/media/cases/serhii-yarmolenko-video-lesson/screen-4.jpg", alt: text("Кадр з відео уроку — розбір теми", "Video lesson frame — topic breakdown") },
        { src: "/media/cases/serhii-yarmolenko-video-lesson/screen-5.jpg", alt: text("Кадр з відео уроку — візуальні акценти", "Video lesson frame — visual accents") },
        { src: "/media/cases/serhii-yarmolenko-video-lesson/screen-6.jpg", alt: text("Кадр з відео уроку — титри", "Video lesson frame — titles") },
        { src: "/media/cases/serhii-yarmolenko-video-lesson/screen-7.jpg", alt: text("Кадр з відео уроку — завершення", "Video lesson frame — ending") },
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.serhiiYarmolenko.reviewTitle"),
    text: key("videoCases.serhiiYarmolenko.reviewText"),
    author: key("videoCases.serhiiYarmolenko.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.team.andriiMotion"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
