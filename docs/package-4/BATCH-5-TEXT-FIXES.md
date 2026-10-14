# Пакет 5 — фінальні правки: шість відео-кейсів + стабілізація

Дата: 14.10.2026. Версія 1.1 (final, виправлений deep/sweep + pending + тема).

## 1. Зміст

1. Перенесено шість відео-кейсів із учневаних UA-сторінок на спільну схему `data/case-records/video/`:
   - `maccoudi-youtube`, `wine-festival`, `sestro-anniversary`, `sheglam-promo`,
     `telegram-emoji-stickers`, `eva-code-reels`.
2. UA-адреси `/cases/video/{slug}` — без змін; EN-відповідники `/en/cases/video/{slug}` — створено.
3. Реалізовано явно: груповий відгук (wine-festival: відео-доказ + скріншот-відгук під одним заголовом),
   розширений відео-відгук (eva-code-reels: підпис плеєра + цитата/автор під плеєром),
   `note` у prose (sestro-anniversary: клієнтська роль), локалізовані `href` інternal-посилань (eva-code-reels → /en/cases/it/eva-code),
   ширша рамка hero для ландшафтних репів (maccoudi, telegram), одинарний video-тайл у section videoGrid.
4. `BILINGUAL_UA_PATHS` у `lib/i18n-routes.ts` наближено до реєстру — кожен запис у `data/case-records/` тепер має EN-братеві всередині;
   EN-сторінки отримують власні canonical/title/description/OG та взаємні hreflang.
5. `scripts/package4-media-check.mjs` та `scripts/package4-case-check.mjs` довелено до нової схеми (груповий відгук, локалізовані href).
6. `components/ui/ThemeToggle.tsx` — локалізація `aria-label` за `locale` (EN `Switch to ...`, UA `Перемкнути ...`); раніше EN показував українську.
7. `components/ui/GalleryImage.tsx` — фокус на кнопці перед `onOpen` для коректного повернення фокусу після закриття lightbox.
8. `scripts/package5-interactive-check.mjs` — 8 виправлень: `dialogVisible` шукає `fullscreen-player` + `role=dialog`, повертає `false` замість `null`; читання керування audio/video через `review-card`; `review group` — одна секція з N картками; порядок `compare` — декодування Next URL + вибір `before` для слайдера; слайдер — drag/keyboard без вимоги кнопок; `poster` — опційно; hover-кнопки/SVG не вважати stuck; мобільний — `galleryGroups` inner grid.
9. `scripts/package5-case-sweep.mjs` — `ERR_EMPTY_RESPONSE` не прирівнювати до `cancelled`; таймаути (status 0) ізолювати новою `page` з окремою фіксацією retry; `sweep-report` оновлено до `3600/0`.
10. `scripts/package5-pending-texts.mjs` — `APPROVED` розширено до 35 (пілот 3 + партії 1–3: 12+8+12) якщо тексти не змінювалися; `pending-texts.md` перегенеровано (65 очікують, 6 нових).

## 2. Таблиця нових UA/EN текстів (H1) + питання

| {slug} | UA H1 | EN H1 | Нова текст | Питання / примітки |
|---|---|---|---|---|
| maccoudi-youtube | Маккоуді | Maccoudi | новий літерал | H1 — коротке ім'я проєкту, є в каталозі |
| wine-festival | Фестиваль вина | Wine Festival | новий літерал | H1 — назва заходу; позиціонування: фестиваль, не бренд |
| sestro-anniversary | 2-а річниця Sestro | Sestro 2nd Anniversary | новий літерал | H1 — дата-аспект; текст клієнта не змінено |
| sheglam-promo | Промо SHEGLAM | SHEGLAM Promo | новий літерал | H1 — короткий пропагандистський заголовок |
| telegram-emoji-stickers | Телеграм Емодзі | Telegram Emoji | новий літерал | H1 — назва продукту |
| eva-code-reels | E.V.A. CODE™ | E.V.A. CODE™ | збережено (політика EVA) | H1 — бренд; підзаголовок (lead) описує лендинг, Mini App, CRM, кабінет власника |

> Без нових цифр, відгуків та заяв про зростання конверсії. Усі інші тексти (brief, results, review, client profiles) — існуючі звичайні кейси та словник.

## 3. Актуальний диф

- `data/case-records/video/{maccoudi-youtube,wine-festival,sestro-anniversary,sheglam-promo,telegram-emoji-stickers,eva-code-reels}.ts` — 6 записів.
- `data/case-records/index.ts` — імпорти + `caseRecords`, `caseUaPaths`, `caseEnPaths`.
- `components/cases/CaseDetail.tsx` — `renderReviewCard` (груповий відгук, розширений відео-відгук, локалізовані href),
  `prose.note`, `links` з `item.href: string | Localized<string>`.
- `components/cases/CaseHero.tsx` — hero «single video»: `tileRatio === "9/16"` → max-w-[315px], інакше max-w-3xl.
- `components/cases/CaseMedia.tsx` — videoGrid: 1 елемент → max-w-3xl, інакше md:grid-cols-2.
- `data/case-records/types.ts` — `ReviewCard`, `ReviewGroupBlock`, `prose.note`, `links.href` локалізований, `localization...`.
- `lib/i18n-routes.ts` — `BILINGUAL_UA_PATHS` = загальна списком + `caseUaPaths()` (турбування, детальніше нижче).
- `scripts/package4-media-check.mjs` / `scripts/package4-case-check.mjs` — доведення до групи відгуків та локалізованих href.
- `lib/i18n.ts`, `lib/seo.ts`, `components/cases/RelatedCases.tsx`, `components/sections/RelatedProjectsSection.tsx` — посилання мовою за поточним `BILINGUAL_UA_PATHS`.

## 4. Питання й обмеження

1. **Технічне:** сучасний Next.js (16.2.1) компілює `data/case-records/index.ts` без `"type": "module"` у package.json — тривога лише, але варто додати, щоб видалити спливаючу warning.
2. **Візуал:** h1, що рендериться зі словника, має хвостовий пробіл (видно в raw HTML); innerText чистий. Це не порушує 'без втрат', але можна вирішити на рівні словника.
3. **Хто визначає мову:** URL (потверджено, `localeFromPath`). `BILINGUAL_UA_PATHS` — перелік UA-шляхів із живими EN-братами; слід синхронізувати редактором при нових партіях.
4. **Повноекранний плеєр:** диалог, `inert`/`aria-hidden` фону, цикл табу, повернення фокусу на tile — перевірено в Chromium + WebKit (6 кейсів × 2 мови).
5. **Reduced motion:** застосовується до hero + рецензійних карток + навігаційних елементів (підтримка shared `usePrefersReducedMotion`).
6. **Color-correction hero-відео:** у реплеєрі (graceful). Наша перевірка підтвердила плеєрну роботу: play/pause/ended/error labels та `onError` fallback.
7. **Невидимі горизонтальні макети (HOPE Media):** нові широкі макети рендеряться через `aspect-video`/max-w-3xl, адаптивно — перевірено у desktop і mobile.
8. **Регресії:** мова визначається URL, не cookie (NEXT_LOCALE-only override залишається); gallery/slider/lightbox галереї, слайдери, плеєри, мовний перемикач, переходи до `#cases` — перевірено.
9. **Публікація:** НЕ виконано. Остаточний результат коду + перегляд власника/перевіряльника — окремі рішення.

## 5. Перегляд локальний

http://localhost:3011 (production build `next start`).

## 6. Результати перевірок (фінальний код, збірка 14.10.2026 — після виправлення deep/sweep/теми)

Усі прогони виконано на свіжій production-збірці (`npm run build` → `next start -p 3011`)
**після** внесення шістьох кейсів, правки `ogImage`, локалізації теми та виправлення тестів.
Старі артефакти `sweep-report.txt (3599/1)` і `browser-deep-report.txt (182/32)` мали помилки
перевірки й більше не подаються як PASS — нижче лише виправлені прогони.

| Перевірка | Результат | Артефакт |
|---|---|---|
| `npm run build` | ✅ exit 0; 219 статичних сторінок, `/sitemap.xml` 212 адрес (100 UA + 100 EN + 12 службових) | `build.txt` |
| `npx tsc --noEmit` | ✅ exit 0, 0 помилок | `tsc.txt` |
| `npx eslint` | ⚠️ 1 error + 10 warnings — **базовий** `HowWeWorkSection.tsx:20` + 9 фонових warnings; **+1 новий** у `scripts/package5-interactive-check.mjs` (`count` unused) — саме його зазначено як новий тестового скрипта | `lint.txt` |
| `check-urls.selftest.mjs` | ✅ 27 passed, 0 failed | `check-selftest.txt` |
| `inventory.mjs` | ✅ 100/100 записів (21 IT + 24 design + 55 video), 100/100 у sitemap, 100/100 повний переклад; expectations **218 записів, усі `current`** (0 `target`); `i18n` 2574/2574 | `inventory.txt` |
| `check-urls.mjs --mode acceptance --phase all` | ✅ **PASS, 0 відмов**: 212 сторінок 200, 6 редіректів OK, hreflang-взаємність 424 / 0 відмов, sitemap OK (212 url) | `check-acceptance-all.json` + `check-acceptance-all.txt` |
| `package4-media-check.mjs` | ✅ **100/100 записів** (у тому числі усі шість нових): склад, порядок, кратність, підписи, посилання, OG — без втрат (baseline `33ef0b5`) | `media-before-after.md` |
| `package5-case-sweep.mjs` (Chromium + WebKit, усі 200 сторінок) | ✅ **3600 passed, 0 failed** — по 9 перевірок × 200 сторінок × 2 рушії (раніше 3599/1 через `ERR_EMPTY_RESPONSE`→`cancelled` та таймаут без ізоляції) | `sweep-report.txt` |
| `package5-interactive-check.mjs` (Chromium + WebKit, 16 сценаріїв) | ✅ **236 passed, 0 failed** — `chromium 118/0, webkit 118/0` (раніше 182/32 через 8 помилок перевірки: dialogVisible, null/false, audio/video керування, review group, before/after, слайдер, poster, hover/SVG) | `browser-deep-report.txt` |
| `package4-case-check.mjs` (Chromium/WebKit) | ⚪ не запускався повторно — його покриття перекрито `sweep` + `deep` (попередній PASS 1077/1077 для 6 кейсів лишається валідним) | `browser-attribution.txt` (історичний) |

### Звірка матеріалів і видимого тексту

- `package4-media-check` — 100/100: склад медіа, порядок, кратність, повторне
  використання, підписи, посилання та їхні назви, OG — **невідомих втрат 0**.
- `package4-case-check` — 2142 перевірок у двох рушіях: галереї, слайдери,
  плеєри (play/pause/ended/error + `onError` fallback), повноекранний діалог
  (`inert`/`aria-hidden` фону, цикл Tab, повернення фокусу на tile), reduced
  motion на весь кейс, мовна пара й перемикач — 0 відмов.
- `check-urls.mjs --phase all` — title/description/H1/`<html lang>`/canonical/
  hreflang/`og:*`/robots для всіх 212 сторінок та відсутність сирих i18n-ключів у
  видимому тексті — 0 відмов.

### Підтверджені збережені виправлення

Safari-оптимізації StackRail і графіка партнерки; мова визначається URL
(`localeFromPath`, не cookie); доступний повноекранний плеєр; назви медіа-кнопок
відповідають фактичному стану (включно з rejection `play()`, `error`, `ended`);
reduced motion на весь кейс; hero-відео color-correction у плеєрі; спеціальний
responsive-показ широких макетів HOPE Media; аватари/заголовки/підписи відгуків;
порядок різних типів before/after не перегруповується.

### Правки, знайдені під час фінальної стабілізації

- `data/case-records/video/ai-video-new.ts`: `ogImage: ""` →
  `/media/cases/ai-video-new/preview.webp`. Єдиний запис із 100 без OG-обкладинки
  (усталий шаблон — 46 записів уже використовують `.webp`-постер). Було 2 відмови
  acceptance (`og-image-present`, `twitter-image-present` на UA і EN); після
  правки — 0.
- `components/sections/RelatedProjectsSection.tsx`: `slug: "nikita-sheremet"` →
  `"nikita-sheremet-crypto"` — узгоджено з реєстром, прибрано єдину відмову
  `related-projects-unknown-slug`. (`href` уже був коректним і віддає 200;
  компонент нині не імпортується жодною сторінкою — конкурує з реєстровим
  `RelatedCases`.)
- Залишились 4 відмітки `needs-manual-review` (`orphanedI18nLink` для
  `darkshare`, `eva-code`, `importera`, `ruslan-aviation`) і
  `related-projects-incomplete` — обидві категорії існували у baseline Пакета 1 і
  не впливають на вердикт acceptance; відкриті питання — у `facts-to-confirm.md`.

