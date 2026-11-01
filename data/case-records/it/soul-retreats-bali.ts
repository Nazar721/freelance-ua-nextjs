import { key, text, type CaseRecord } from "../types";

/**
 * it/soul-retreats-bali — case for the Soul Evolution Bali women's retreat
 * landing page (bali.soulsretreats.org), a separate project of the same
 * client as the Asandra Soul Telegram Mini App.
 *
 * Copy is based on the client's brief and the site screenshots taken on
 * 2026-11-01. No CRM, pixel or ad-platform names are published, no measured
 * results are claimed, and the enquiry form was never submitted by us — the
 * post-submit WhatsApp handover is described as it is stated on the site.
 *
 * The participant-reviews screenshot (03-reviews-desktop.png) is NOT used:
 * it shows personal data of retreat participants whose consent to publish
 * has not been confirmed yet. The block is described in text only.
 */
export const soulRetreatsBali: CaseRecord = {
  id: "it/soul-retreats-bali",
  slug: "soul-retreats-bali",
  direction: "it",
  subcategory: "landing",
  uaPath: "/cases/it/soul-retreats-bali",
  enPath: "/en/cases/it/soul-retreats-bali",

  h1: text(
    "SOUL RETREATS — лендінг жіночого ретриту на Балі з формою заявки",
    "SOUL RETREATS — a Bali women's retreat landing page with an enquiry form",
  ),
  lead: text(
    "Створили атмосферний лендінг Soul Evolution Bali — жіночого ретриту на Балі: сторінка знайомить із програмою та ведучою, показує умови й відгуки та веде відвідувачку від першого екрана до заявки й особистої розмови в WhatsApp.",
    "We built an atmospheric landing page for Soul Evolution Bali, a women's retreat in Bali: the page introduces the programme and the host, shows the terms and reviews, and leads a visitor from the first screen to an enquiry and a personal WhatsApp conversation.",
  ),
  seo: {
    title: text(
      "SOUL RETREATS — лендінг ретриту на Балі | Freelance UA",
      "SOUL RETREATS — Bali Retreat Landing Page | Freelance UA",
    ),
    description: text(
      "Кейс розробки лендінгу жіночого ретриту на Балі: програма, відгуки, форма заявки, WhatsApp та інтеграція CRM.",
      "A Bali women's retreat landing page with a programme, testimonials, enquiry form, WhatsApp and CRM integration.",
    ),
    ogImage: "/media/cases/soul-retreats-bali/hero-screen.webp",
    ogImageAlt: text(
      "Перший екран лендінгу Soul Evolution Bali: океан, палми та заголовок «11 днів на Балі для себе»",
      "First screen of the Soul Evolution Bali landing page: the ocean, palm trees and the headline about 11 days in Bali",
    ),
  },
  badge: key("itCases.soulRetreats.category"),
  glow: { base: "rgba(20, 184, 166, 0.12)", strong: "rgba(20, 184, 166, 0.28)" },

  hero: {
    kind: "image",
    src: "/media/cases/soul-retreats-bali/soul-retreats-mockup.webp",
    w: 964,
    h: 570,
    alt: text(
      "Мокап лендінгу Soul Evolution Bali на екранах ноутбука й телефона",
      "Soul Evolution Bali landing page mockup shown on a laptop and a phone",
    ),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: text(
        "Передати атмосферу 11 днів ретриту й допомогти відвідувачці познайомитися з програмою, умовами та перейти до розмови з командою.",
        "Convey the atmosphere of the 11-day retreat and help a visitor get to know the programme and the terms, and move on to a conversation with the team.",
      ),
      solution: text(
        "Адаптивний лендінг у зелених і бірюзових відтінках із фотографіями Балі: практики й програма за днями, знайомство з наставницею, умови, FAQ і форма заявки, після якої — особиста розмова в WhatsApp.",
        "A responsive landing page in green and turquoise tones with Bali photography: practices and a day-by-day programme, an introduction to the mentor, the terms, an FAQ and an enquiry form followed by a personal WhatsApp conversation.",
      ),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: text("Перший екран і візуальний стиль", "First screen and visual style"),
          desc: text(
            "Зелені та бірюзові відтінки, фотографії океану й пальм і спокійна типографіка: перший екран представляє ретрит і веде до навігації та кнопки зв'язку. Верстка адаптивна — з окремим мобільним варіантом першого екрана.",
            "Green and turquoise tones, photos of the ocean and palm trees and calm typography: the first screen introduces the retreat and leads to the navigation and a contact button. The layout is responsive, with a separate mobile version of the first screen.",
          ),
          images: [
            {
              src: "/media/cases/soul-retreats-bali/hero-screen.webp",
              w: 1440,
              h: 900,
              alt: text(
                "Перший екран лендінгу Soul Evolution Bali: океан, палми та заголовок про 11 днів на Балі",
                "First screen of the Soul Evolution Bali landing page: the ocean, palm trees and a headline about 11 days in Bali",
              ),
            },
          ],
          link: {
            href: "https://bali.soulsretreats.org/",
            label: text("Переглянути сайт", "View website"),
          },
        },
        {
          title: text("Практики та програма за днями", "Practices and the day-by-day programme"),
          desc: text(
            "Розділ про те, що чекає на ретриті: картки практик із нумерацією та описами й програма за днями — від трансформаційних практик до йоги та медитацій.",
            "A section about what awaits participants: numbered practice cards with descriptions and a day-by-day programme, from transformational practices to yoga and meditation.",
          ),
          images: [
            {
              src: "/media/cases/soul-retreats-bali/program.webp",
              w: 1440,
              h: 900,
              alt: text(
                "Розділ практик і програми на лендінгу Soul Evolution Bali: картки практик із нумерацією",
                "Practices and programme section of the Soul Evolution Bali landing page: numbered practice cards",
              ),
            },
          ],
        },
        {
          title: text("Знайомство з наставницею", "Meet the mentor"),
          desc: text(
            "Окремий розділ про ведучу ретриту: її підхід і досвід, а також команда майстрів, які супроводжують учасниць протягом подорожі.",
            "A dedicated section about the retreat host: her approach and experience, plus the team of practitioners who accompany the participants throughout the journey.",
          ),
          images: [
            {
              src: "/media/cases/soul-retreats-bali/mentor.webp",
              w: 1440,
              h: 900,
              alt: text(
                "Розділ знайомства з наставницею ретриту на лендінгу Soul Evolution Bali",
                "Mentor introduction section of the Soul Evolution Bali landing page",
              ),
            },
          ],
        },
        {
          title: text("Відгуки учасниць", "Participant reviews"),
          desc: text(
            "Блок відгуків учасниць попередніх ретритів — соціальний доказ на самому лендінгу клієнтки.",
            "A block of reviews from previous retreat participants — social proof on the client's own landing page.",
          ),
        },
        {
          title: text("Умови та відповіді на запитання", "Terms and FAQ"),
          desc: text(
            "Умови участі та розділ частих запитань із розкриваними відповідями; поруч кнопка, що веде до особистого запитання в WhatsApp.",
            "Participation terms and an FAQ section with expandable answers, next to a button that leads to a personal question in WhatsApp.",
          ),
          images: [
            {
              src: "/media/cases/soul-retreats-bali/faq.webp",
              w: 1440,
              h: 900,
              alt: text(
                "Розділ частих запитань на лендінгу Soul Evolution Bali: розкривні відповіді та кнопка запитання",
                "FAQ section of the Soul Evolution Bali landing page: expandable answers and a question button",
              ),
            },
          ],
        },
        {
          title: text("Форма заявки", "Enquiry form"),
          desc: text(
            "Форма заявки збирає ім'я, номер WhatsApp і необов'язкове запитання. На сайті зазначено, що після успішної відправки відвідувачку автоматично переводить у WhatsApp, де команда відповідає особисто; доставку заявок ми незалежно не тестували.",
            "The enquiry form collects a name, a WhatsApp number and an optional question. The site states that after a successful submission the visitor is automatically taken to WhatsApp, where the team replies personally; we have not independently tested form delivery.",
          ),
          images: [
            {
              src: "/media/cases/soul-retreats-bali/form.webp",
              w: 1440,
              h: 900,
              alt: text(
                "Форма заявки на участь на лендінгу Soul Evolution Bali: ім'я, номер WhatsApp і запитання",
                "The participation enquiry form on the Soul Evolution Bali landing page: name, WhatsApp number and a question",
              ),
            },
          ],
        },
        {
          title: text("CRM-інтеграція та аналітика", "CRM integration and analytics"),
          desc: text(
            "За інформацією замовника: заявки інтегровані з CRM, підключено піксельну аналітику, а сторінка технічно підготовлена до рекламних кампаній і пошукової оптимізації.",
            "Per the client's information: enquiries are integrated with a CRM, pixel analytics is connected, and the page is technically prepared for advertising campaigns and search optimisation.",
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
          "Лендінг презентує ретрит: знайомство з програмою, практиками й наставницею, умови та FAQ в одній послідовній розповіді",
          "The landing page presents the retreat: the programme, practices and mentor, the terms and FAQ in one coherent story",
        ),
        text(
          "Зелені й бірюзові відтінки та фотографії Балі витримані від першого екрана до форми заявки — на desktop і mobile",
          "Green and turquoise tones and Bali photography are consistent from the first screen to the enquiry form — on desktop and mobile",
        ),
        text(
          "Зрозумілий шлях відвідувачки: від програми до заявки з ім'ям і номером WhatsApp та подальшої особистої розмови в чаті",
          "A clear visitor path: from the programme to an enquiry with a name and WhatsApp number, and a personal conversation in chat",
        ),
        text(
          "Інтеграція з CRM, піксельна аналітика та технічна підготовка до реклами й SEO — за інформацією замовника",
          "CRM integration, pixel analytics and technical preparation for advertising and SEO — per the client's information",
        ),
      ],
    },
    {
      kind: "links",
      items: [
        {
          href: { uk: "/cases/it/asandra-soul", en: "/en/cases/it/asandra-soul" },
          internal: true,
          title: text("Ще один проєкт для Асандри", "Another project for Asandra"),
          text: text(
            "Asandra Soul — Telegram Mini App із курсами та практиками клієнтки.",
            "Asandra Soul — a Telegram Mini App with the client's courses and practices.",
          ),
          label: text("Переглянути кейс", "View the case"),
          image: {
            src: "/media/cases/asandraapp-mocap.webp",
            w: 1200,
            h: 800,
            alt: text(
              "Мокап Telegram Mini App Asandra Soul",
              "Asandra Soul Telegram Mini App mockup",
            ),
          },
        },
      ],
    },
  ],

  review: {
    kind: "audio",
    title: text("Відгук клієнтки", "Client review"),
    src: "/media/testimonials/asandra-bali-retreat.m4a",
    author: text("Асандра", "Asandra"),
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
