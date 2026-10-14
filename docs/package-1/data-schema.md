# Схема даних кейсів (Пакет 1)

Ціль: одне джерело правди для карток головної/каталогу/напрямів, детальних сторінок, метаданих і sitemap. Замінює розрізнені `data/itCases.ts`, `data/designCases.ts`, `data/videoCases.ts`, дубльований список у `RelatedProjectsSection.tsx` і ручний перелік URL у `app/sitemap.ts`.

## 1. Реєстр (registry)

```ts
// types/registry.ts (назви файлів — пропозиція)
export type Direction = "it" | "design" | "video";
export type Status = "published" | "draft";

/**
 * Первинний ключ запису — `id = "${direction}/${slug}"`.
 * `slug` САМ ПО СОБІ НЕ Є унікальним ключем: пошук/виключення «схожих робіт»
 * і будь-які зіставлення must йти за `id` або парою `direction + slug`.
 * (На зараз колізій slug між напрямами немає — перевірено інвентаризацією,
 * див. issues.json → duplicate-direction-slug; але поточний RelatedProjectsSection
 * використовує лише slug — крихкий патерн, прибирається при перенесенні.)
 */
export interface CaseRecord {
  id: string;                     // "it/eva-code" — унікальний, стабільний
  slug: string;                   // "eva-code"
  direction: Direction;
  // direction + slug разом теж унікальні (інваріант реєстру, перевіряється
  // scripts/inventory.mjs → duplicate-direction-slug)
  subcategory: Subcategory;       // it: ecommerce|landing|saas-telegram;
                                  // design: banners|branding|photo-retouch;
                                  // video: reels|motion|youtube|ai
  tags?: string[];                // додаткові теги для «схожих робіт»
  status: Status;                 // публікується в реєстрі чи ні

  // ── Маршрути ─────────────────────────────────────────────────
  uaPath: string;                 // "/cases/it/eva-code" — чинний, не змінюється
  enPath: string;                 // "/en/cases/it/eva-code"

  // ── Локалізовані тексти ──────────────────────────────────────
  title: Localized<string>;       // видимий H1 (UA/EN)
  cardDescription: Localized<string>; // 1–2 речення для картки
  intro: Localized<string>;       // вступ: хто/що це, кому потрібно, обсяг
  seo: Localized<{
    title: string;                // <title>, конкретний, без дублювання ключів
    description: string;          // meta description
  }>;

  // ── Зміст (опціональні блоки — порожні не показуються) ────────
  content?: {
    context?: Localized<string>;      // контекст/фон
    task?: Localized<string>;         // реальний запит клієнта
    agencyRole?: Localized<string>;   // внесок Freelance UA (спільні проєкти — розмежувати)
    solution?: Localized<string>;     // рішення
    process?: Localized<string>;      // процес (якщо є факти)
    results?: Localized<string[]>;    // підтверджені результати
  };

  // ── Медіа ────────────────────────────────────────────────────
  media: MediaBlock[];            // дискримінований union, порядок = порядок показу

  // ── Оформлення картки (зі збережених data-файлів) ────────────
  // Усі поля поточних CaseEntry/VideoCaseEntry, які впливають на вигляд
  // картки у каталогах/добірках, зберігаються як cardStyle — вони не
  // повинні загубитися при переході на єдиний реєстр.
  cardStyle?: {
    glowColor: string;            // напр. "rgba(99, 102, 241, 0.15)"
    glowColorStrong: string;
    imageFit?: "cover" | "contain";
    objectPosition?: string;      // напр. "center 65%"
    hoverImage?: string;          // альтернативне зображення при hover (smm-case-presentation)
    badge?: { text: string; variant?: string; animation?: string }; // тип підтримується карткою, зараз не використовується
    hideCta?: boolean;            // приховати CTA «Дивитись» на картці
  };

  // ── Особливі блоки ───────────────────────────────────────────
  special?: SpecialBlock[];

  // ── Соціальне підтвердження ──────────────────────────────────
  review?: {
    kind: "text" | "video" | "audio" | "screenshot";
    text?: Localized<string>;
    author: string;               // тільки підтверджене авторство
    videoSrc?: string;
    audioSrc?: string;
    screenshotSrc?: string;
    caption?: Localized<string>;
  };
  team?: Localized<string>;       // «Автор розробки» / команда
  externalLinks?: Array<{ href: string; label: Localized<string> }>;

  // ── Метадані сторінки ────────────────────────────────────────
  ogImage?: string;               // шлях у public/, за наявності
  updated?: string;               // ISO-дата лише якщо відома (git/факт)
}
```

`Localized<T>` = `{ uk: T; en: T }`.

## 2. Медіаблоки (union — дискриміновані типи)

```ts
type MediaBlock =
  | { type: "image";        src: string; alt: Localized<string>; width?: number; height?: number;
      caption?: Localized<string>; fit?: "cover" | "contain"; objectPosition?: string;
      openInModal?: boolean }
  | { type: "gallery";      items: Array<{ src: string; alt?: Localized<string>;
      title?: Localized<string>; caption?: Localized<string>;
      width?: number; height?: number; wide?: boolean }>;   // wide — з finalItems
      columns?: 2 | 3; openInModal?: boolean }
  | { type: "video";        src: string; poster?: string; caption?: Localized<string>;
      aspect?: string; autoPlayPreview?: boolean; preload?: "none"|"metadata"|"auto";
      tracks?: Array<{ src: string; lang: "uk" | "en" }> }  // субтитри лише за наявності
  | { type: "videoGallery"; items: Array<{ src: string; poster?: string; preview?: string;
      label?: Localized<string>; title?: string; duration?: string }> } // videos/caseVideos/cuprus/vsehub
  | { type: "beforeAfter";  before: string; after: string; title?: Localized<string>;
      beforeAlt?: Localized<string>; afterAlt?: Localized<string>; aspect?: string }
      // джерела полів: before/after ** або ** sliderBefore/sliderAfter (IT-кейси sdent/mnm/shkiper)
  | { type: "audio";        src: string; caption?: Localized<string> }   // аудіовідгуки
  | { type: "html";         key: string };  // обмежений спец-варіант
```

Порожній `media[]` або `content` — блок не рендериться.

## 3. Особливі блоки (зі збереженням існуючих сторінок)

Існуючі сторінки використовують наступні структури (фактичний парсинг inventory v2:
100/100 кейсів, 452 медіа-референси, 0 нерозпізнаних). При перенесенні КОЖЕН збережений
блок; невідомі значення не викидати.

```ts
type SpecialBlock =
  // IT "components" (eva-code, darkshare, importera, ruslan, selloflow, epiland,
  // kroscar, repair-collision, prime-auto, sdent, mnm, shkiper…): заголовок+опис,
  // список зображень, опційний зовнішній лінк з підписом, опційний before/after
  // (sliderBefore/sliderAfter), опційне одиночне image
  | { type: "featureList";  items: Array<{
        title: Localized<string>; desc: Localized<string>;
        images?: string[]; image?: string;
        link?: string; linkLabel?: Localized<string>;
        sliderBefore?: string; sliderAfter?: string;
        icon?: string }> }
  // Дизайн-групи (hope-media finalGroups): індекси в галереї + заголовок/інтро
  | { type: "indexGroups";  title: Localized<string>; intro?: Localized<string>; itemIndexes: number[] }
  // Текстові переліки (results/resultItems/approachItems) — вже локалізовані ключі
  | { type: "textList";     items: Localized<string[]> }
  // Прості списки медіа-шляхів (heroImages, nikita process list)
  | { type: "mediaList";    items: string[] }
  // Посилання на продукт (link: з масивів, href={CONST}, i18n *.link)
  | { type: "linkCard";     label: Localized<string>; href: string; source: "array"|"jsx"|"i18n" }
  // Підтверджені метрики (лише за наявності доказів — див. facts-to-confirm.md)
  | { type: "metrics";      items: Array<{ value: string; label: Localized<string> }> }
  | { type: "socialLinks";  youtube?: string; tiktok?: string; instagram?: string; telegram?: string }
  | { type: "finalGallery"; title: Localized<string>; items: string[] };
```

**Порядок і прив'язка.** Jараз інвентаризація фіксує кожен блок з `name`, `kind`,
`line` (позиція в джерелі) та елементами в порядку появи; медіа — з ролями
(`src`, `before`, `after`, `sliderBefore`, `sliderAfter`, `poster`, `preview`,
`image`, `images[i]`, `inline@line`, `const:NAME`). Підписи зберігаються як
`titleKey`/`captionKey`/`alt`/`label`/`duration` + розв'язані UA/EN значення.
При перенесенні цей порядок і прив'язка відтворюються в `media[]`/`special[]`;
повторне використання файлів (медіа-мапа в registry.json → `mediaReuse`) —
зберігати спільні файли за їхніми чинними шляхами, без дублікатів під `/en/`.

**Inline-масиви.** Частина відео-грідів оголошується прямо в JSX
(`{[ {src, poster}, … ].map(…)}` — vsehub, cuprus, nikita) і парситься як
анонімний блок `jsxArray@{line}`; при міграції переносити в `videoGallery`/`mediaList`.

**Посилання.** Зовнішні лінки кейсів надходять із трьох джерел, усі зберігаються
з ознакою походження: `href="…"` / `href={CONST}` (JSX), `link:` у масивах
(евентуально `link: BOT_URL` — константа), значення-URL в i18n (`*.link`).
Невикористані i18n-лінки (4 шт., `orphanedI18nLink`) — рішення власника:
використати в новій сторінці чи видалити ключі (див. facts-to-confirm.md D).

## 4. Похідні виходи

| Вихід | Джерело |
|---|---|
| Картки головної (добірки 2+2+2) | `registry` + явний список «головних» за напрямом |
| Каталог `/cases`, фільтри | `registry` за `direction`/`subcategory` |
| Сторінки напрямів `/services/{d}#cases` | `registry.filter(direction)` |
| Детальна сторінка | `registry[slug]` + `generateMetadata` |
| Related/схожі роботи | `registry` за `subcategory`/`tags`, виключаючи поточний `id` |
| `app/sitemap.ts` | `registry.filter(status==="published")` — ручний перелік видалити |
| Breadcrumb | `uaPath`/`enPath` ланцюжком |

## 5. Правила

1. **slug/напрям не змінюються**: `/cases/{direction}/{slug}` лишається назавжди (не перейменовувати в `/services/{direction}/{slug}`).
2. **Один запис = один URL-відповідник** у кожній мові; EN без `/uk/`-префікса для UA-сторінок.
3. Спільні медіа (`/media/testimonials/*`, `/media/cases/*`) — без перенесення під `/en/`, без дублікатів.
4. Невідомий slug → `notFound()` (справжній 404), не порожній шаблон з 200.
5. Тексти, отримані з реєстру, містять лише локалізовані значення; сирі ключі (`itCases.*`) у рендері заборонені — перевіряється `scripts/check-urls.mjs`.
6. Джерела фактів і редакційні питання зберігати поза публічним реєстром (окремий файл, не деплоїться).

## 6. Мапінг зі старого (етап перенесення)

| Старе джерело | Значення в новій схемі |
|---|---|
| `CaseEntry.slug/href` | `slug`, `uaPath` (id = `direction/slug`) |
| `itCategory/category/subCategory` | `subcategory` |
| `titleKey/descriptionKey/categoryKey` | `title`, `cardDescription` + окремий «бейдж категорії» |
| `glowColor`, `glowColorStrong`, `imageFit`, `objectPosition`, `hoverImage`, `badge`, `hideCta` | `cardStyle.*` (зберігаються повністю) |
| `galleryImages[]` | `media: [{type:"gallery"}]` |
| `heroVideo/poster/thumbnail/processVideos/duration/format`, `previewVideo`, `screenshot` | `media: [video, videoGallery]` + `duration/format` у caption |
| сторінкові `const components[]` (IT) | `special: featureList` зі збереженням `images[]`, `link`, `linkLabelKey`, `sliderBefore/After`, порядку |
| сторінкові `galleryItems/finalItems[]` (дизайн) | `media: gallery` з `w/h`, `wide`, `titleKey/captionKey` |
| сторінкові `sliderPairs/sliderFinals[]` | `media: beforeAfter` |
| сторінкові `videos/caseVideos[]` + JSX-масиви | `media: videoGallery` (`poster/preview/duration/title`) |
| сторінкові `screenshots[]` | `media: gallery` з локалізованим `alt` |
| сторінкові `results/resultItems/approachItems[]` | `special: textList` / `content.results` |
| inline `<video>/<audio>/<Image>` та `openFullscreen(...)` | `media: video/audio/image` з `poster`, `preload` |
| `href="…"`/`href={CONST}`/`link:`/i18n `*.link` | `externalLinks[]` з ознакою джерела |
| i18n `*.challenge/solution/resultN` | `content.task/solution/results[]` |
| `RelatedProjectsSection.allCases` | обчислюється з `registry` за `id`/`direction+slug` (не за slug) |
| `app/sitemap.ts` (ручний масив) | обчислюється з `registry` |
| `layout.tsx` кожного кейсу | `seo` + `generateMetadata` з `registry` |

## 7. Обсяг на зараз (за інвентаризацією v2)

- Записів: 100 маршрутів кейсів (21 IT / 24 design / 55 video), з них 98 у data-файлах, 2 лише в sitemap.
- Медіа-референсів у сторінках: **452** (структуровано 100%, нерозпізнаних 0); медіа-файлів у `public/media`: 680+, 442 МБ (82 mp4 ≈ 380 МБ).
- Зовнішніх лінок: 98 кейсів мають посилання (3 джерела: JSX href, array link:, i18n URL); 4 i18n-лінка невикористані (`orphanedI18nLink`).
- Блоки: 98/100 кейсів мають структуровані `const`-масиви; решта — inline-контент.
- Текстових ключів: 2522 UA / 2503 EN; 2201 ключ належить кейсам.
- Потребують ручної звірки: 4 кейси (усі — `orphanedI18nLink`).
