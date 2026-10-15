import { key, text, type CaseRecord } from "../types";

export const barvyInteriorReels: CaseRecord = {
  id: "video/barvy-interior-reels",
  slug: "barvy-interior-reels",
  direction: "video",
  subcategory: "reels",
  uaPath: "/cases/video/barvy-interior-reels",
  enPath: "/en/cases/video/barvy-interior-reels",
  h1: text(
    "BARVY interior — два Reels для студії ремонту",
    "BARVY interior — Two Reels for a Renovation Studio",
  ),
  lead: text(
    "Два вертикальні відео для Instagram про дизайн інтер’єру та ремонт під ключ у Києві.",
    "Two vertical Instagram videos about interior design and turnkey renovation in Kyiv.",
  ),
  seo: {
    title: text(
      "BARVY interior — два Reels для студії ремонту | Freelance UA",
      "BARVY interior — Two Reels for a Renovation Studio | Freelance UA",
    ),
    description: text(
      "Два вертикальні Instagram Reels для BARVY interior — студії дизайну інтер’єру та ремонту під ключ у Києві.",
      "Two vertical Instagram Reels for BARVY interior, an interior design and turnkey renovation studio in Kyiv.",
    ),
    ogImage: "/media/cases/barvy-interior-reels/reel-01-poster.webp",
    ogImageAlt: text(
      "Кадр Reels для BARVY interior: Катерина розповідає про євроремонт.",
      "BARVY interior Reels frame: Kateryna talking about European-style renovation.",
    ),
  },
  badge: key("videoCases.barvyInteriorReels.category"),
  pill: text("2 Reels", "2 Reels"),
  glow: { base: "rgba(52, 211, 153, 0.12)", strong: "rgba(52, 211, 153, 0.25)" },
  hero: {
    kind: "videoGrid",
    ratio: "9/16",
    items: [
      {
        src: "/media/cases/barvy-interior-reels/reel-01.mp4",
        poster: "/media/cases/barvy-interior-reels/reel-01-poster.webp",
        duration: text("~1 хв 13 с", "~1 min 13 sec"),
        format: "9:16",
        label: text(
          "Reels 1 — «Пам’ятаєте цей євроремонт?»",
          "Reel 1 — “Do you remember this European-style renovation?”",
        ),
      },
      {
        src: "/media/cases/barvy-interior-reels/reel-02.mp4",
        poster: "/media/cases/barvy-interior-reels/reel-02-poster.webp",
        duration: text("~1 хв 1 с", "~1 min 1 sec"),
        format: "9:16",
        label: text(
          "Reels 2 — «Іноді в мене складається враження…»",
          "Reel 2 — “Sometimes I get the impression…”",
        ),
      },
    ],
  },
  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.barvyInterior.challengeTitle"),
      solutionTitle: key("videoCases.barvyInterior.solutionTitle"),
      task: text(
        "Підготувати два Reels для профілю BARVY interior про дизайн інтер’єру та ремонт.",
        "Prepare two Reels for the BARVY interior profile about interior design and renovation.",
      ),
      solution: text(
        "Підготували два вертикальні ролики у форматі 9:16. У відео поєднано спікерку в кадрі, українські екранні титри та фрагменти інтер’єрів.",
        "Prepared two vertical videos in 9:16 format, combining an on-camera speaker, Ukrainian on-screen captions, and interior footage.",
      ),
    },
    {
      kind: "results",
      title: text("Результат роботи", "Project outcomes"),
      columns: 1,
      items: [
        text("Два готові відео для Instagram Reels.", "Two finished videos for Instagram Reels."),
        text(
          "Вертикальний формат 9:16 та українські титри у відео.",
          "Vertical 9:16 format with Ukrainian captions in the videos.",
        ),
      ],
    },
    {
      kind: "prose",
      title: text("Про клієнта", "About the client"),
      subtitle: text(
        "Дизайн інтер’єру · ремонт під ключ · Київ",
        "Interior design · turnkey renovation · Kyiv",
      ),
      text: text(
        "BARVY interior — студія дизайну інтер’єру та ремонту під ключ у Києві.",
        "BARVY interior is an interior design and turnkey renovation studio in Kyiv.",
      ),
      image: {
        src: "/media/cases/barvy-interior-reels/instagram-profile.webp",
        w: 1045,
        h: 261,
        alt: text(
          "Профіль BARVY interior в Instagram із описом послуг: дизайн інтер’єру та ремонт під ключ у Києві.",
          "BARVY interior Instagram profile showing interior design and turnkey renovation services in Kyiv.",
        ),
      },
    },
  ],
  review: {
    kind: "screenshot",
    title: text("Відгук клієнтки", "Client review"),
    src: "/media/cases/barvy-interior-reels/client-review-crop.webp",
    alt: text("Відгук Катерини про роботу над Reels для BARVY interior", "Kateryna’s review of the BARVY interior Reels"),
    text: text(
      "Все круто! Усі побажання, які в мене були, виконали на всі 100%, а то й більше. Швидко, якісно 🔥🔥🔥 Дякую 🙏",
      "Everything is great! You fulfilled every request I had, 100% and even more. Fast, high-quality work 🔥🔥🔥 Thank you 🙏",
    ),
    author: text("Катерина — BARVY interior", "Kateryna — BARVY interior"),
    w: 760,
    h: 181,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: text("Андрій — монтаж", "Andrii — editing"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
