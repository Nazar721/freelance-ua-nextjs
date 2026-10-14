import { key, text, type CaseRecord } from "../types";

/**
 * video/youtube-conversational-video — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const youtubeConversationalVideo: CaseRecord = {
  id: "video/youtube-conversational-video",
  slug: "youtube-conversational-video",
  direction: "video",
  subcategory: "youtube",
  uaPath: "/cases/video/youtube-conversational-video",
  enPath: "/en/cases/video/youtube-conversational-video",
  h1: text("Розмовне відео", "Conversational video"),
  lead: key("videoCases.youtubeConversationalVideo.subtitle"),
  seo: {
    title: text("Розмовне відео | Freelance UA", "Conversational video | Freelance UA"),
    description: text("Монтаж розмовного YouTube-відео — професійна подача та монтаж", "Editing a conversational YouTube video — professional delivery and editing"),
    ogImage: "https://freelance-ua.agency/media/cases/youtube-conversational-video/screenshot-1.jpg",
  },
  badge: key("videoCases.youtubeConversationalVideo.category"),
  glow: { base: "rgba(180, 120, 60, 0.12)", strong: "rgba(180, 120, 60, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/youtube-conversational-video/screenshot-1.jpg",
    w: 1200,
    h: 800,
    alt: key("videoCases.youtubeConversationalVideo.title"),
    priority: true,
  },

  sections: [
    {
      kind: "links",
      items: [
        { href: "https://www.youtube.com/watch?v=TODO", label: text("Дивитись на Telegram", "View on Telegram") },
      ],
    },
    {
      kind: "gallery",
      title: text("Кадри з відео", "Video frames"),
      columns: 2,
      items: [
        { src: "/media/cases/youtube-conversational-video/screenshot-1.jpg", alt: text("Розмовне відео — загальний кадр", "Conversational video — wide shot") },
        { src: "/media/cases/youtube-conversational-video/screenshot-2.jpg", alt: text("Розмовне відео — крупний план", "Conversational video — close-up") },
        { src: "/media/cases/youtube-conversational-video/screenshot-3.jpg", alt: text("Розмовне відео — ракурс збоку", "Conversational video — side angle") },
      ],
    },
    {
      kind: "brief",
      taskTitle: key("videoCases.youtubeConversationalVideo.challengeTitle"),
      solutionTitle: key("videoCases.youtubeConversationalVideo.solutionTitle"),
      task: key("videoCases.youtubeConversationalVideo.challenge"),
      solution: key("videoCases.youtubeConversationalVideo.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.youtubeConversationalVideo.result1"),
        key("videoCases.youtubeConversationalVideo.result2"),
        key("videoCases.youtubeConversationalVideo.result3"),
        key("videoCases.youtubeConversationalVideo.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.youtubeConversationalVideo.reviewTitle"),
    text: key("videoCases.youtubeConversationalVideo.reviewText"),
    author: key("videoCases.youtubeConversationalVideo.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.youtubeConversationalVideo.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
