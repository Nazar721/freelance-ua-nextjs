import { key, text, type CaseRecord } from "../types";

/**
 * it/brunetkaa-hair — case for the client's London hair-specialist website.
 *
 * No verified public URL, so there is no `links` block: the only call to
 * action on the client's own page is a WhatsApp enquiry, and the case page
 * must not invent one. Every functional claim below is taken from the
 * supplied screenshots; the booking form collects name / service / date /
 * comment and opens WhatsApp with a prepared message — the final time is
 * agreed in chat, so the copy never calls it an online booking.
 */
export const brunetkaaHair: CaseRecord = {
  id: "it/brunetkaa-hair",
  slug: "brunetkaa-hair",
  direction: "it",
  subcategory: "landing",
  uaPath: "/cases/it/brunetkaa-hair",
  enPath: "/en/cases/it/brunetkaa-hair",

  h1: text(
    "BRUNETKAA HAIR — сайт для майстрині з догляду за волоссям у Лондоні",
    "BRUNETKAA HAIR — website for a London hair specialist",
  ),
  lead: key("itCases.brunetkaa.description"),
  seo: {
    title: text(
      "BRUNETKAA HAIR — сайт для майстрині з догляду за волоссям у Лондоні | Freelance UA",
      "BRUNETKAA HAIR — website for a London hair specialist | Freelance UA",
    ),
    description: key("itCases.brunetkaa.description"),
    ogImage: "/media/cases/brunetkaa-hair/hero-screen.webp",
    ogImageAlt: text(
      "Перший екран сайту BRUNETKAA HAIR із заголовком про кератин і ботокс для волосся в Лондоні",
      "First screen of the BRUNETKAA HAIR website with a headline about keratin and hair botox in London",
    ),
  },
  badge: key("itCases.brunetkaa.category"),
  glow: { base: "rgba(212, 175, 110, 0.12)", strong: "rgba(212, 175, 110, 0.28)" },

  // The square source mockup leaves large empty margins above and below the
  // devices; the hero uses a crop trimmed to the visible content plus a small
  // padding, so the devices do not shrink inside the frame.
  hero: {
    kind: "image",
    src: "/media/cases/brunetkaa-hair/brunetkaa-hair-mockup-hero.webp",
    w: 1178,
    h: 715,
    alt: text(
      "Мокап сайту BRUNETKAA HAIR на екранах ноутбука й телефона",
      "BRUNETKAA HAIR website mockup shown on a laptop and a phone",
    ),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.brunetkaa.challenge"),
      solution: key("itCases.brunetkaa.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.brunetkaa.component1Title"),
          desc: key("itCases.brunetkaa.component1Desc"),
          images: [
            {
              src: "/media/cases/brunetkaa-hair/hero-screen.webp",
              w: 2842,
              h: 1562,
              alt: text(
                "Перший екран сайту BRUNETKAA HAIR із заголовком про кератин і ботокс для волосся в Лондоні",
                "BRUNETKAA HAIR first screen with a headline about keratin and hair botox in London",
              ),
            },
          ],
        },
        {
          title: key("itCases.brunetkaa.component2Title"),
          desc: key("itCases.brunetkaa.component2Desc"),
          images: [
            {
              src: "/media/cases/brunetkaa-hair/about.webp",
              w: 2806,
              h: 1568,
              alt: text(
                "Розділ знайомства з майстринею Yelyzaveta на сайті BRUNETKAA HAIR",
                "Section introducing the specialist Yelyzaveta on the BRUNETKAA HAIR website",
              ),
            },
          ],
        },
        {
          title: key("itCases.brunetkaa.component3Title"),
          desc: key("itCases.brunetkaa.component3Desc"),
          images: [
            {
              src: "/media/cases/brunetkaa-hair/services-prices.webp",
              w: 2824,
              h: 1410,
              alt: text(
                "Розділ послуг і цін на сайті BRUNETKAA HAIR",
                "Services and prices section of the BRUNETKAA HAIR website",
              ),
            },
          ],
        },
        {
          title: key("itCases.brunetkaa.component4Title"),
          desc: key("itCases.brunetkaa.component4Desc"),
          images: [
            {
              src: "/media/cases/brunetkaa-hair/results.webp",
              w: 2832,
              h: 1570,
              alt: text(
                "Розділ результатів робіт із порівнянням «до» і «після» на сайті BRUNETKAA HAIR",
                "Results section with a before/after comparison on the BRUNETKAA HAIR website",
              ),
            },
          ],
        },
        {
          title: key("itCases.brunetkaa.component5Title"),
          desc: key("itCases.brunetkaa.component5Desc"),
          images: [
            {
              src: "/media/cases/brunetkaa-hair/reviews.webp",
              w: 2838,
              h: 1568,
              alt: text(
                "Блок відгуків Google Maps на сайті BRUNETKAA HAIR",
                "Google Maps reviews block on the BRUNETKAA HAIR website",
              ),
            },
          ],
        },
        {
          title: key("itCases.brunetkaa.component6Title"),
          desc: key("itCases.brunetkaa.component6Desc"),
          images: [
            {
              src: "/media/cases/brunetkaa-hair/faq.webp",
              w: 2834,
              h: 1574,
              alt: text(
                "Блок відповідей на запитання FAQ на сайті BRUNETKAA HAIR",
                "FAQ block on the BRUNETKAA HAIR website",
              ),
            },
          ],
        },
        {
          title: key("itCases.brunetkaa.component7Title"),
          desc: key("itCases.brunetkaa.component7Desc"),
          images: [
            {
              src: "/media/cases/brunetkaa-hair/booking-contacts.webp",
              w: 2846,
              h: 1530,
              alt: text(
                "Форма звернення, карта та посилання на Instagram на сайті BRUNETKAA HAIR",
                "Enquiry form, map and Instagram link on the BRUNETKAA HAIR website",
              ),
            },
          ],
        },
        {
          title: key("itCases.brunetkaa.component8Title"),
          desc: key("itCases.brunetkaa.component8Desc"),
          images: [
            {
              src: "/media/cases/brunetkaa-hair/footer.webp",
              w: 2836,
              h: 1554,
              alt: text(
                "Футер сайту BRUNETKAA HAIR із навігацією, контактами та великим словесним знаком",
                "BRUNETKAA HAIR footer with navigation, contacts and a large wordmark",
              ),
            },
          ],
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.brunetkaa.result1"),
        key("itCases.brunetkaa.result2"),
        key("itCases.brunetkaa.result3"),
        key("itCases.brunetkaa.result4"),
        key("itCases.brunetkaa.result5"),
        key("itCases.brunetkaa.result6"),
        key("itCases.brunetkaa.result7"),
        key("itCases.brunetkaa.result8"),
        key("itCases.brunetkaa.result9"),
      ],
    },
  ],

  // Exact transcription of the client's Telegram message, kept as-is (the
  // original already carries the chat blur). The EN line is a translation of
  // the same words — nothing added, no metric invented.
  review: {
    kind: "screenshot",
    title: key("itCases.brunetkaa.reviewTitle"),
    src: "/media/cases/brunetkaa-hair/client-review.webp",
    w: 590,
    h: 1280,
    // Portrait phone screenshot: capped so it reads as a phone preview
    // instead of stretching the review column past 1000px tall.
    maxWidth: "280px",
    alt: text(
      "Скріншот повідомлення Єлизавети з відгуком про розробку сайту BRUNETKAA HAIR",
      "Screenshot of a message from Yelyzaveta reviewing the BRUNETKAA HAIR website development",
    ),
    caption: text(
      "Відгук про розробку сайту BRUNETKAA HAIR",
      "Feedback on the BRUNETKAA HAIR website development",
    ),
    text: key("itCases.brunetkaa.reviewText"),
    // The collapsed summary reads "Прочитати відгук" / "Read review" instead
    // of the shared "Текст відгуку" so it stays a verb inviting a click.
    transcriptLabel: text("Прочитати відгук", "Read review"),
    author: key("itCases.brunetkaa.reviewAuthor"),
  },
  team: {
    label: text("Команда проєкту", "Project team"),
    value: text("Назар — розробник", "Nazar — Developer"),
  },
  backToList: {
    label: key("itCases.backToList"),
    href: { uk: "/cases/it", en: "/en/cases/it" },
  },
};
