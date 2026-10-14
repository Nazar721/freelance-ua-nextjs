import { key, text, type CaseRecord } from "../types";

/**
 * video/maccoudi-youtube — перенесено з оригінальної сторінки (Пакет 4, фінальна партія).
 * Матеріали, блоки, посилання та підписи взято з неї: hero 16:9 з другим
 * відео окремим блоком, бриф, результати, картка клієнта з двома
 * скріншотами каналів (клікабельні) та скріншот-відгук з цитатою.
 */
export const maccoudiYoutube: CaseRecord = {
  id: "video/maccoudi-youtube",
  slug: "maccoudi-youtube",
  direction: "video",
  subcategory: "youtube",
  uaPath: "/cases/video/maccoudi-youtube",
  enPath: "/en/cases/video/maccoudi-youtube",

  h1: text("Маккоуді", "Maccoudi"),
  lead: key("videoCases.maccoudiYoutube.subtitle"),
  seo: {
    title: text(
      "Маккоуді — YouTube про фріланс | Freelance UA",
      "Maccoudi — YouTube videos about freelancing | Freelance UA",
    ),
    description: text(
      "Монтаж двох YouTube-відео для популярного блогера Маккоуді — динамічний контент про фріланс",
      "Editing two YouTube videos for the popular blogger Maccoudi — dynamic freelancing content",
    ),
    ogImage: "https://freelance-ua.agency/media/cases/maccoudi-youtube/poster-1.jpg",
  },
  badge: key("videoCases.maccoudiYoutube.category"),
  pill: text("YouTube", "YouTube"),
  glow: { base: "rgba(34, 197, 94, 0.12)", strong: "rgba(34, 197, 94, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/maccoudi-youtube/video-1.mp4",
    poster: "/media/cases/maccoudi-youtube/poster-1.jpg",
    alt: key("videoCases.maccoudiYoutube.title"),
    duration: text("~1хв", "~1 min"),
    format: "16:9",
    ratio: "16/9",
  },

  sections: [
    {
      kind: "videoGrid",
      items: [
        {
          src: "/media/cases/maccoudi-youtube/video-2.mp4",
          poster: "/media/cases/maccoudi-youtube/poster-2.jpg",
          duration: text("~52с", "~52s"),
          format: "16:9",
        },
      ],
      ratio: "16/9",
    },
    {
      kind: "brief",
      taskTitle: key("videoCases.maccoudiYoutube.challengeTitle"),
      solutionTitle: key("videoCases.maccoudiYoutube.solutionTitle"),
      task: key("videoCases.maccoudiYoutube.challenge"),
      solution: key("videoCases.maccoudiYoutube.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 2,
      decorated: true,
      items: [
        key("videoCases.maccoudiYoutube.result1"),
        key("videoCases.maccoudiYoutube.result2"),
        key("videoCases.maccoudiYoutube.result3"),
        key("videoCases.maccoudiYoutube.result4"),
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.maccoudiYoutube.clientName"),
      subtitle: key("videoCases.maccoudiYoutube.clientRole"),
      text: key("videoCases.maccoudiYoutube.clientDesc"),
    },
    {
      kind: "links",
      items: [
        {
          href: "https://www.youtube.com/@Maccoudii",
          label: key("videoCases.maccoudiYoutube.clientYoutube"),
          image: {
            src: "/media/cases/maccoudi-youtube/youtube-channel.png",
            w: 640,
            h: 360,
            alt: text("YouTube канал Маккоуді", "Maccoudi's YouTube channel"),
          },
        },
        {
          href: "https://www.tiktok.com/@maccoudi",
          label: key("videoCases.maccoudiYoutube.clientTiktok"),
          image: {
            src: "/media/cases/maccoudi-youtube/tiktok-profile.png",
            w: 640,
            h: 360,
            alt: text("TikTok профіль Маккоуді", "Maccoudi's TikTok profile"),
          },
        },
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.maccoudiYoutube.reviewTitle"),
    src: "/media/cases/maccoudi-youtube/review-chat.png",
    alt: text("Відгук Маккоуді в Telegram", "Maccoudi's review on Telegram"),
    text: key("videoCases.maccoudiYoutube.reviewText"),
    author: key("videoCases.maccoudiYoutube.reviewAuthor"),
    w: 720,
    h: 400,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.maccoudiYoutube.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
