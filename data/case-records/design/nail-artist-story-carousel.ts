import { key, text, type CaseRecord } from "../types";

/**
 * design/nail-artist-story-carousel — Instagram carousel of a nail artist's
 * personal story. 11 slides, 1080×1350 (4:5), Ukrainian layouts kept as they
 * were designed (the EN page translates the surrounding copy only, never the
 * artwork).
 *
 * A duplicate source export (`Frame 396 (1).png`, SHA-256 identical to
 * `Frame 396.png`) is intentionally published once: 12 source files → 11
 * unique slides.
 */
export const nailArtistStoryCarousel: CaseRecord = {
  id: "design/nail-artist-story-carousel",
  slug: "nail-artist-story-carousel",
  direction: "design",
  subcategory: "banners",
  uaPath: "/cases/design/nail-artist-story-carousel",
  enPath: "/en/cases/design/nail-artist-story-carousel",

  h1: text(
    "Історія майстрині манікюру — дизайн Instagram-каруселі",
    "A nail artist’s story — Instagram carousel design",
  ),
  lead: text(
    "Серія з 11 слайдів для Instagram: особиста історія майстрині манікюру — від зміни професії та перших клієнток до власної справи.",
    "An 11-slide Instagram series: a nail artist’s personal story — from changing her profession and her first clients to her own business.",
  ),
  seo: {
    title: text(
      "Дизайн Instagram-каруселі для майстрині манікюру | Freelance UA",
      "Instagram Carousel Design for a Nail Artist | Freelance UA",
    ),
    description: text(
      "Дизайн Instagram-каруселі про шлях майстрині манікюру: 11 слайдів із фотографіями, типографікою та бордовими акцентами. Кейс Freelance UA.",
      "Instagram carousel design telling a nail artist’s story through 11 slides, photography, typography and burgundy accents. A Freelance UA case study.",
    ),
    ogImage: "/media/cases/nail-artist-story-carousel/nail-artist-story-carousel-preview.webp",
    ogImageAlt: text(
      "Обкладинка Instagram-каруселі «Моя історія» — історія майстрині манікюру",
      "“My story” Instagram carousel cover — a nail artist’s story",
    ),
  },
  badge: key("designCases.nailArtistStory.category"),
  glow: { base: "rgba(136, 19, 55, 0.14)", strong: "rgba(136, 19, 55, 0.3)" },

  hero: {
    kind: "imageGrid",
    layout: "compact",
    items: [
      {
        src: "/media/cases/nail-artist-story-carousel/slide-01.webp",
        w: 1080,
        h: 1350,
        alt: text("Обкладинка каруселі «Моя історія»", "“My story” carousel cover"),
      },
      {
        src: "/media/cases/nail-artist-story-carousel/slide-09.webp",
        w: 1080,
        h: 1350,
        alt: text("Слайд каруселі про повний запис", "Carousel slide about a fully booked schedule"),
      },
      {
        src: "/media/cases/nail-artist-story-carousel/slide-10.webp",
        w: 1080,
        h: 1350,
        alt: text("Слайд каруселі про досвід майстрині", "Carousel slide about the nail artist’s experience"),
      },
    ],
  },

  sections: [
    {
      kind: "brief",
      task: text(
        "Подати особисту історію майстрині як зрозумілу серію для Instagram, яка знайомить із людиною та розкриває її професійний шлях.",
        "Present the nail artist’s personal story as an easy-to-follow Instagram series that introduces the person and reveals her professional path.",
      ),
      solution: text(
        "Послідовна композиція з фотографій, великих заголовків, текстових блоків, колажів і бордових виділень.",
        "A sequential composition of photographs, large headlines, text blocks, collages and burgundy highlights.",
      ),
    },
    {
      kind: "checklist",
      title: text("Дизайнерський підхід", "Design approach"),
      columns: 2,
      items: [
        text(
          "Ієрархія заголовків і основного тексту",
          "Hierarchy of headlines and body text",
        ),
        text(
          "Контраст для читабельності на фотографіях",
          "Contrast that keeps the text readable over photographs",
        ),
        text(
          "Бордові акценти на ключових тезах",
          "Burgundy accents on the key points",
        ),
        text(
          "Чергування портретів, архівних кадрів і прикладів робіт",
          "Alternating portraits, archive shots and examples of her work",
        ),
        text(
          "Перехід від початку історії до досвіду та завершального заклику",
          "A progression from the start of the story to her experience and the closing call to action",
        ),
      ],
    },
    {
      kind: "gallery",
      title: text("Галерея: 11 слайдів серії", "Gallery: the 11 slides of the series"),
      intro: text(
        "Слайди розміщені в порядку публікації — від обкладинки до завершального заклику.",
        "The slides are shown in publication order — from the cover to the closing call to action.",
      ),
      columns: 2,
      items: [
        {
          src: "/media/cases/nail-artist-story-carousel/slide-01.webp",
          w: 1080,
          h: 1350,
          title: text("01 — Обкладинка «Моя історія»", "01 — Cover “My story”"),
          alt: text(
            "Слайд 01: обкладинка «Моя історія» — портрет майстрині в бордовому піджаку на чорному тлі",
            "Slide 01: cover “My story” — a nail artist in a burgundy blazer on a black background",
          ),
        },
        {
          src: "/media/cases/nail-artist-story-carousel/slide-02.webp",
          w: 1080,
          h: 1350,
          title: text("02 — Робота в офісі до манікюру", "02 — Office job before nails"),
          alt: text(
            "Слайд 02: робота в центральному офісі до манікюру — фото біля офісної будівлі та текст про маркетингові дослідження",
            "Slide 02: the office job before manicure — a photo outside an office building with text about marketing research",
          ),
        },
        {
          src: "/media/cases/nail-artist-story-carousel/slide-03.webp",
          w: 1080,
          h: 1350,
          title: text("03 — Материнство та пошук гнучкої роботи", "03 — Motherhood and a search for flexible work"),
          alt: text(
            "Слайд 03: материнство та пошук гнучкої роботи — розмите фото з дитиною, архівне фото на святі та текст про власні гроші",
            "Slide 03: motherhood and a search for flexible work — a blurred photo with her child, an archive party photo and text about earning her own money",
          ),
        },
        {
          src: "/media/cases/nail-artist-story-carousel/slide-04.webp",
          w: 1080,
          h: 1350,
          title: text("04 — Досвід торгівлі на ринку", "04 — Experience trading at the market"),
          alt: text(
            "Слайд 04: досвід торгівлі на ринку — чорно-біле архівне фото з прилавком поруч із сучасним фото майстрині",
            "Slide 04: experience trading at the market — a black-and-white archive stall photo next to a current photo of the nail artist",
          ),
        },
        {
          src: "/media/cases/nail-artist-story-carousel/slide-05.webp",
          w: 1080,
          h: 1350,
          title: text("05 — Побажання до власної справи", "05 — What she wanted from her own business"),
          alt: text(
            "Слайд 05: побажання до власної справи — фото біля озера з візочком і текст про роботу в теплі поруч із дитиною",
            "Slide 05: what she wanted from her own business — a photo by a lake with a stroller and text about working in a warm place next to her child",
          ),
        },
        {
          src: "/media/cases/nail-artist-story-carousel/slide-06.webp",
          w: 1080,
          h: 1350,
          title: text("06 — Рішення спробувати манікюр", "06 — The decision to try manicure"),
          alt: text(
            "Слайд 06: рішення спробувати манікюр — майстриня з келихом, скріншот списку майстрів і бордове виділення ключової думки",
            "Slide 06: the decision to try manicure — the nail artist with a glass, a screenshot list of masters and a burgundy highlight on the key idea",
          ),
        },
        {
          src: "/media/cases/nail-artist-story-carousel/slide-07.webp",
          w: 1080,
          h: 1350,
          title: text("07 — Перші роботи для близьких", "07 — First works for friends and family"),
          alt: text(
            "Слайд 07: перші роботи для близьких — колаж із чотирьох фото ранніх манікюрів",
            "Slide 07: first works for friends and family — a collage of four early manicure photos",
          ),
        },
        {
          src: "/media/cases/nail-artist-story-carousel/slide-08.webp",
          w: 1080,
          h: 1350,
          title: text("08 — Перші незнайомі клієнтки", "08 — Her first new clients"),
          alt: text(
            "Слайд 08: перші незнайомі клієнтки — два фото майстрині за роботою та текст про першу клієнтку за кухонним столом",
            "Slide 08: her first new clients — two photos of the nail artist at work and text about her first client at a kitchen table",
          ),
        },
        {
          src: "/media/cases/nail-artist-story-carousel/slide-09.webp",
          w: 1080,
          h: 1350,
          title: text("09 — Як з’явився повний запис", "09 — How the fully booked schedule came about"),
          alt: text(
            "Слайд 09: як з’явився повний запис — фото майстрині в чорній сукні та вклеєне фото розкладу запису на тиждень",
            "Slide 09: how the fully booked schedule came about — the nail artist in a black dress with an inset photo of a weekly appointment planner",
          ),
        },
        {
          src: "/media/cases/nail-artist-story-carousel/slide-10.webp",
          w: 1080,
          h: 1350,
          title: text("10 — Поточний досвід майстрині", "10 — The nail artist’s experience today"),
          alt: text(
            "Слайд 10: поточний досвід майстрині — руки з манікюром бордового кольору та текст про багаторічну практику",
            "Slide 10: the nail artist’s experience today — hands with a burgundy manicure and text about years of practice",
          ),
        },
        {
          src: "/media/cases/nail-artist-story-carousel/slide-11.webp",
          w: 1080,
          h: 1350,
          title: text(
            "11 — Про блог і навчання, завершальний заклик",
            "11 — About the blog and training, closing call to action",
          ),
          alt: text(
            "Слайд 11: про блог і навчання — скріншот профілю в Instagram, приклади відео та заклик заповнити анкету",
            "Slide 11: about the blog and training — an Instagram profile screenshot, video examples and a call to fill in the form",
          ),
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        text(
          "Готова візуально цілісна серія з 11 слайдів у спільній стилістиці",
          "A finished, visually cohesive series of 11 slides in a single style",
        ),
        text(
          "Послідовна подача історії: від початку шляху до досвіду та завершального заклику",
          "A sequential story: from the start of the path to her experience and the closing call to action",
        ),
        text(
          "Формат 4:5, підготовлений для читання з телефона",
          "A 4:5 format prepared for reading on a phone",
        ),
      ],
    },
  ],

  team: {
    label: key("designCases.projectTeam"),
    value: text("Сніжана — дизайнер", "Snizhana — Designer"),
  },
  backToList: {
    label: key("designCases.nailArtistStory.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
