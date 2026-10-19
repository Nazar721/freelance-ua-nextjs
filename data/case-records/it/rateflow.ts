import { key, text, type CaseRecord } from "../types";

/**
 * it/rateflow — bilingual case for the NFC/QR Google-review service.
 *
 * Facts come from the delivered admin panel (dashboard, venues, NFC/QR cards,
 * sync log) and from the supplied mockup. No stack, timeline, budget,
 * integration or measured business effect is claimed, and no number visible
 * inside a screenshot is used as an agency result.
 *
 * The client review is NOT part of this record: the approved draft lives in
 * `docs/package-1/facts-to-confirm.md` and must be signed off by Artem before
 * it may be rendered as a real review.
 */
export const rateflow: CaseRecord = {
  id: "it/rateflow",
  slug: "rateflow",
  direction: "it",
  subcategory: "saas-telegram",
  uaPath: "/cases/it/rateflow",
  enPath: "/en/cases/it/rateflow",

  h1: text(
    "RateFlow — від NFC-картки до відгуку в Google",
    "RateFlow — from an NFC card to a Google review",
  ),
  lead: text(
    "RateFlow поєднує фізичні NFC-картки та QR-коди зі сторінкою відгуку в Google: гість торкається картки або сканує код — і одразу потрапляє на форму відгуку. Для бізнесу ми зробили вебкабінет, де керують закладами й картками та дивляться статистику переходів і нових відгуків.",
    "RateFlow links physical NFC cards and QR codes to a Google review page: a guest taps a card or scans a code and lands on the review form. For the business we built a web dashboard to manage venues and cards and to watch visit and new-review stats.",
  ),
  seo: {
    title: text(
      "RateFlow — NFC/QR-сервіс Google-відгуків | Freelance UA",
      "RateFlow — NFC/QR Google Review Platform | Freelance UA",
    ),
    description: text(
      "Розробка RateFlow: адмін-панель для закладів, керування NFC/QR-картками, статистика переходів і Google-відгуків та генерація QR-кодів.",
      "RateFlow case study: an admin dashboard for venues, NFC/QR card management, visit and Google review analytics, and QR code generation.",
    ),
    ogImage: "https://freelance-ua.agency/media/cases/rateflow/rateflow-mockup.webp",
    ogImageAlt: text(
      "Мокап кабінету RateFlow: дашборд на ноутбуці та екран карток із QR-кодом на смартфоні",
      "RateFlow dashboard mockup on a laptop with the cards screen and a QR code on a smartphone",
    ),
  },
  badge: key("itCases.rateflow.category"),
  glow: { base: "rgba(99, 102, 241, 0.12)", strong: "rgba(99, 102, 241, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/rateflow/rateflow-mockup.webp",
    w: 1088,
    h: 642,
    alt: text(
      "Мокап RateFlow: адмін-панель на ноутбуці та список карток із QR-кодом на смартфоні",
      "RateFlow mockup: the admin dashboard on a laptop and a card list with a QR code on a smartphone",
    ),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: text(
        "Спростити шлях клієнта до відгуку в Google і централізувати керування закладами та картками. Один дотик до NFC-картки або скан QR-коду має відкривати сторінку відгуку без зайвих кроків, а бізнесу — бути зрозуміло, які заклади підключені, до яких карток вони прив'язані й що відбувається з переходами.",
        "Simplify the customer's path to a Google review and centralise the management of venues and cards. A single tap on an NFC card or a QR scan should open the review page with no extra steps, while the business gets a clear view of which venues are connected, which cards they are linked to and what happens to visits.",
      ),
      solution: text(
        "Розробили вебкабінет RateFlow: адмін-панель для закладів, керування NFC/QR-картками з прив'язкою до закладів і створення QR-кодів. Дашборд зводить статистику переходів і нових відгуків за обраний період — з графіком активності та вибором діапазону дат. Окремий журнал показує запуски синхронізацій, їхні статуси та обсяг завантажених відгуків.",
        "We built the RateFlow web dashboard: an admin panel for venues, NFC/QR card management with venue binding and QR code generation. The dashboard consolidates visits and new reviews for a selected period, with an activity chart and a date-range picker. A separate log shows sync runs, their statuses and how many reviews were downloaded.",
      ),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: text("Дашборд", "Dashboard"),
          desc: text(
            "Зведення по всіх закладах: активні заклади, картки, переходи та нові відгуки за обраний період. Графік переходів за днями, вибір періоду — від «цього місяця» до довільних дат — і рейтинг закладів за переходами.",
            "A summary across all venues: active venues, cards, visits and new reviews for the selected period. A daily visits chart, a period picker ranging from “this month” to custom dates, and venues ranked by visits.",
          ),
          images: [
            {
              src: "/media/cases/rateflow/dashboard.webp",
              w: 2822,
              h: 1558,
              alt: text(
                "Дашборд RateFlow: статистика закладів, графік переходів за днями і вибір періоду",
                "RateFlow dashboard: venue stats, a daily visits chart and a period picker",
              ),
            },
          ],
        },
        {
          title: text("Заклади", "Venues"),
          desc: text(
            "Список закладів із пошуком за назвою, містом і категорією та фільтрами за тарифом і статусом. Для кожного закладу видно тариф, кількість карток, рейтинг і кількість відгуків; активні й вимкнені заклади розділені статусами.",
            "A venue list with search by name, city and category plus filters by tariff and status. Every venue shows its tariff, card count, rating and review count; active and disabled venues are separated by status.",
          ),
          images: [
            {
              src: "/media/cases/rateflow/venues.webp",
              w: 2838,
              h: 1566,
              alt: text(
                "Список закладів у RateFlow: пошук, фільтри за тарифом і статусом, рейтинг і кількість відгуків",
                "RateFlow venues list: search, tariff and status filters, rating and review counts",
              ),
            },
          ],
        },
        {
          title: text("Картки NFC/QR", "NFC/QR cards"),
          desc: text(
            "Керування картками: прив'язка NFC і QR-карток до закладів, тип і статус кожної картки, копіювання посилання та отримання QR-коду. QR-код можна створити для картки й завантажити готовим зображенням.",
            "Card management: binding NFC and QR cards to venues, each card's type and status, copying its link and getting a QR code. A QR code can be created for a card and downloaded as an image.",
          ),
          images: [
            {
              src: "/media/cases/rateflow/nfc-qr-cards.webp",
              w: 2820,
              h: 1558,
              alt: text(
                "Картки NFC/QR: прив'язка до закладів, тип і статус картки, посилання та QR-код",
                "NFC/QR cards: venue binding, card type and status, link and QR code",
              ),
            },
          ],
        },
        {
          title: text("Журнал синхронізацій", "Sync log"),
          desc: text(
            "Журнал показує останні синхронізації: час запуску, заклад, тип запуску, статус, скільки відгуків завантажено та скільки з них нових. Запуски зі статусом OK відділені від помилкових, тож видно не лише результат, а й сам процес оновлення.",
            "The log lists recent syncs: run time, venue, run type, status, how many reviews were downloaded and how many of them were new. Successful runs are separated from failed ones, so you see the update process itself and not only its outcome.",
          ),
          images: [
            {
              src: "/media/cases/rateflow/sync-log.webp",
              w: 2818,
              h: 1556,
              alt: text(
                "Журнал синхронізацій RateFlow: останні запуски, статуси та кількість завантажених відгуків",
                "RateFlow sync log: recent runs, statuses and the number of downloaded reviews",
              ),
            },
          ],
        },
      ],
    },
    {
      kind: "gallery",
      title: text("Мобільна версія", "Mobile version"),
      intro: text(
        "Кабінет адаптований під смартфони: закладами, картками й статистикою можна керувати з телефона. На макеті — той самий сервіс у мобільному вигляді: список карток і QR-код, який можна скопіювати або завантажити.",
        "The dashboard adapts to phones: venues, cards and stats can be managed from a smartphone. The mockup shows the same service on mobile: the card list and a QR code that can be copied or downloaded.",
      ),
      columns: 1,
      items: [
        {
          src: "/media/cases/rateflow/rateflow-mockup.webp",
          w: 1088,
          h: 642,
          alt: text(
            "Мобільна версія RateFlow: керування картками й QR-кодом на смартфоні",
            "RateFlow mobile version: managing cards and a QR code on a smartphone",
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
          "Єдиний сервіс для керування NFC/QR-картками, закладами та аналітикою переходів",
          "One service for managing NFC/QR cards, venues and visit analytics",
        ),
        text(
          "Перехід від NFC-картки або QR-коду на сторінку відгуку в Google в один дотик",
          "From an NFC card or QR code to the Google review page in a single tap",
        ),
        text(
          "Дашборд переходів і нових відгуків із графіком активності та вибором періоду",
          "A visits and new-review dashboard with an activity chart and a period picker",
        ),
        text(
          "Керування закладами: пошук, фільтри за тарифом і статусом, дані кожного закладу в одному місці",
          "Venue management: search, tariff and status filters, every venue's data in one place",
        ),
        text(
          "Картки NFC і QR з прив'язкою до закладів, статусами та створенням QR-кодів",
          "NFC and QR cards bound to venues, with statuses and QR code generation",
        ),
        text(
          "Журнал синхронізацій: запуски, статуси та обсяг завантажених відгуків",
          "A sync log with runs, statuses and the volume of downloaded reviews",
        ),
        text(
          "Адаптивний інтерфейс — керування сервісом зі смартфона",
          "A responsive interface — manage the service from a smartphone",
        ),
      ],
    },
  ],

  team: {
    label: text("Команда проєкту", "Project team"),
    value: text("Андрій — розробник", "Andrii — Developer"),
  },
  backToList: {
    label: key("itCases.backToList"),
    href: { uk: "/services/it#cases", en: "/en/services/it#cases" },
  },
};
