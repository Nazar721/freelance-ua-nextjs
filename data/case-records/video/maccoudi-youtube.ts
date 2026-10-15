import { key, text, type CaseRecord } from "../types";

const freelanceVideoMedia = "/media/cases/maccoudi-freelance-youtube";

/**
 * video/maccoudi-youtube — перенесено з оригінальної сторінки (Пакет 4, фінальна партія).
 * Матеріали, блоки, посилання та підписи взято з неї: hero 16:9 з другим
 * відео окремим блоком, додатковий ролик, бриф, результати та картка клієнта
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
      "Монтаж трьох YouTube-відео для блогера Маккоуді: два короткі ролики та довга історія про шлях у фрилансі.",
      "Editing three YouTube videos for blogger Maccoudi: two short videos and a long-form story about his path into freelancing.",
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
      kind: "links",
      title: text("Ще один ролик для YouTube", "Another YouTube video"),
      items: [
        {
          href: "https://www.youtube.com/watch?v=Y0VL6XmQ-1M",
          label: text("Дивитися на YouTube", "Watch on YouTube"),
          title: text(
            "Від офіціанта до $17 000 на фрилансі",
            "From a Waiter to $17,000 as a Freelancer",
          ),
          text: text(
            "Довге відео про шлях Маккоуді у фрилансі.",
            "A long-form video about Maccoudi’s journey into freelancing.",
          ),
          image: {
            src: `${freelanceVideoMedia}/money-title.webp`,
            w: 1297,
            h: 768,
            alt: text(
              "Кадр із відео Маккоуді з титром «Заробити гроші».",
              "Frame from Maccoudi’s video with the title “Make Money”.",
            ),
          },
        },
      ],
    },
    {
      kind: "gallery",
      title: text("Кадри з довгого відео", "Frames from the long-form video"),
      columns: 2,
      items: [
        {
          src: `${freelanceVideoMedia}/mcdonalds-scene.webp`,
          w: 1313,
          h: 768,
          alt: text(
            "Маккоуді в кадрі ресторану McDonald’s; на екрані сума 300 гривень.",
            "Maccoudi in a McDonald’s restaurant scene; the screen shows 300 hryvnias.",
          ),
        },
        {
          src: `${freelanceVideoMedia}/earnings-graphic.webp`,
          w: 1326,
          h: 768,
          alt: text(
            "Графічна вставка з телефоном і сумою 210 доларів.",
            "A graphic insert showing a phone and the amount $210.",
          ),
        },
        {
          src: `${freelanceVideoMedia}/freelance-income.webp`,
          w: 1380,
          h: 768,
          alt: text(
            "Маккоуді в кадрі; поверх відео показано суму 17 000 доларів.",
            "Maccoudi on screen with an overlay showing $17,000.",
          ),
        },
        {
          src: `${freelanceVideoMedia}/graduation-graphic.webp`,
          w: 1369,
          h: 768,
          alt: text(
            "Графічна вставка зі штампом «GRADUATED» та запитанням.",
            "A graphic insert with a “GRADUATED” stamp and question marks.",
          ),
        },
        {
          src: `${freelanceVideoMedia}/money-title.webp`,
          w: 1297,
          h: 768,
          alt: text(
            "Маккоуді в кадрі з титром «Заробити гроші».",
            "Maccoudi on screen with the title “Make Money”.",
          ),
        },
        {
          src: `${freelanceVideoMedia}/platforms-graphic.webp`,
          w: 1311,
          h: 768,
          alt: text(
            "Графічна композиція з логотипами Fiverr і YouTube та символами валют.",
            "A graphic composition featuring Fiverr and YouTube logos with currency symbols.",
          ),
        },
        {
          src: `${freelanceVideoMedia}/phone-scene.webp`,
          w: 1313,
          h: 768,
          alt: text(
            "Маккоуді дивиться в телефон; унизу кадру розміщено український титр.",
            "Maccoudi looks at his phone with a Ukrainian caption along the bottom.",
          ),
        },
        {
          src: `${freelanceVideoMedia}/creator-overlay.webp`,
          w: 1290,
          h: 768,
          alt: text(
            "Маккоуді в кадрі з анімованими емодзі та зображенням грошей.",
            "Maccoudi on screen with animated emoji and a money illustration.",
          ),
        },
        {
          src: `${freelanceVideoMedia}/wedding-scene.webp`,
          w: 1315,
          h: 768,
          alt: text(
            "Вертикальна відеовставка зі святкуванням весілля.",
            "A vertical cutaway showing a wedding celebration.",
          ),
        },
        {
          src: `${freelanceVideoMedia}/trading-visual.webp`,
          w: 1320,
          h: 768,
          alt: text(
            "Темний план із графіком торгів на екрані.",
            "A dark shot of a trading chart on screen.",
          ),
        },
      ],
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
    kind: "group",
    title: key("videoCases.maccoudiYoutube.reviewTitle"),
    items: [
      {
        kind: "screenshot",
        src: "/media/cases/maccoudi-youtube/review-chat.png",
        alt: text("Відгук Маккоуді в Telegram", "Maccoudi's Telegram review"),
        text: key("videoCases.maccoudiYoutube.reviewText"),
        author: key("videoCases.maccoudiYoutube.reviewAuthor"),
        w: 720,
        h: 400,
      },
      {
        kind: "screenshot",
        src: `${freelanceVideoMedia}/client-review.webp`,
        alt: text(
          "Повідомлення Маккоуді у Telegram: «І вам дякую хлопці за роботу».",
          "Maccoudi’s Telegram message: “And thank you too, guys, for your work.”",
        ),
        text: text(
          "І вам дякую хлопці за роботу",
          "And thank you too, guys, for your work.",
        ),
        author: text("Маккоуді", "Maccoudi"),
        w: 660,
        h: 244,
      },
    ],
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
