# Партія 3 — 12 дизайн-кейсів (Пакет 4)

Стан: **перенесено й перевірено; зупинено для незалежної перевірки.**
Публікацію не виконано. Локальний перегляд: **http://localhost:3011**.

**Залишок: 65 кейсів** = 11 design (24 − 13) + 54 video (55 − 1); усі 21 IT
перенесено раніше. Разом 100 − 35 = 65.

## 1. Read-only survey і вибір партії

`node scripts/migrate-case.mjs --survey --dir design` (нічого не пише;
профіль у `survey-design.txt`, оновлено).

| Стан до розширення | Стан після розширення схеми/мапера |
|---|---|
| **1 із 23** мапиться | **19 із 23** мапляться |
| 22 — потребують роботи | **4** — потребують роботи/ручного перенесення |

Вибрано **12 кейсів** за фактично наявними структурами (різноманіття, а не
«сила» роботи):

| Група | Кейсів | Структура |
|---|---|---|
| Ретуш + before/after | 2 | hero `imageGrid` (3 фото) + `checklist` + `compare` (5–10 слайдерів) |
| Брендинг | 5 | галереї з підписами / без, промо-картка з лінком |
| Банери | 4 | галереї з 1 зображенням (`finalsTitle`/`finalsIntro`) |
| Презентації/флаєри | 2 | галереї з підписами та `wide` |

**Відкладено (не обходилося, структури не підтримані/незрозумілі):**
`design/color-correction` (hero — відео), `design/hope-media-group`
(`finalGroups` + групована галерея), `design/mht-clinic-billboard`
(окреме inline-зображення поза hero/відгуком — **blocker**, переносити
вручну), `design/moto-school-window-branding` (hero зі змінною-джерелом),
а також решта банерів/брендінгу. Жоден blocker не обходився через `--force`.

## 2. Розширення схеми та мапінга

| Що | Навіщо | Де |
|---|---|---|
| Секція `checklist` (заголовок + інтро + пункти зі «галочкою») | «Підхід» (`approachTitle`/`approachIntro`) — **не** підганяється під `results` | `types.ts`, рендер у `CaseDetail.tsx` |
| `MediaImage.title` / `caption` / `wide` | підписи кожного зображення в галереях (globus, smm, pink…) + прапорець `wide` | `types.ts`, `CaseMedia.tsx` |
| `GallerySection.columns: 1 \\| 2 \\| 3` | дизайн-галереї — одноколонкові, часто з `max-w-xl` для одного зображення | `types.ts`, `CaseMedia.tsx` |
| `LinksSection.items.title/text/icon` | промо-картка з лінком (Telegram-пак Сніжани: заголовок, текст, іконка) | `types.ts`, `CaseDetail.tsx` |
| hero `imageGrid` із масиву `heroImages` | hero-сітка barvy/photo-retouch | мапінг у генераторі (сам тип існував) |

**Виправлення генератора виявлені під час партії:**

1. `renderPos()` — позиція **рендеру** (`{name.map(`), а не використання в
   даних (`const allImages = name.map(`): інакше галерея сортувалася першою
   (globus, snizhana, smm, pink — перегенеровано).
2. Позиція секції `links` бралася з оголошення константи замість тега `<a`
   для `href={CONST}` — промо-картка Сніжани вставала першою (перегенеровано).
3. Alt скріншота відгуку: тепер береться ключ `*reviewScreenshotAlt`, якщо
   сторінка його має (globus, pink — раніше використовувався ключ автора,
   і звірка підписів це зловила).
4. Новий blocker: inline `<Image>/<video>` поза hero і відгуком (наприклад
   `mht-clinic-billboard`) — запис не пишеться, кейс іде на ручний перенесення.
5. `results`-масив шукається за назвою (`/result/i`), щоб не прийняти
   `approachItems` за результати.
6. Survey тепер застосовує ті самі blockers, що й шлях запису.

## 3. Список кейсів і адрес

| # | Кейс | UA | EN | Медіа | Секції запису | Відгук |
|---|---|---|---|---|---|---|
| 1 | `design/barvy-interior` | `/cases/design/barvy-interior` | `/en/cases/design/barvy-interior` | 21 | brief → checklist(5) → **compare(10)** → results | screenshot |
| 2 | `design/photo-retouch` | `/cases/design/photo-retouch` | `/en/cases/design/photo-retouch` | 10 | brief → checklist(4) → **compare(5)** → results | text |
| 3 | `design/globus-billboard` | `/cases/design/globus-billboard` | `/en/cases/design/globus-billboard` | 5 | brief → **gallery(4, з підписами)** → results | screenshot |
| 4 | `design/snizhana-telegram-stickers` | `/cases/design/snizhana-telegram-stickers` | `/en/cases/design/snizhana-telegram-stickers` | 11 | brief → **gallery(10)** → **links-промо** → results | text |
| 5 | `design/smm-case-presentation` | `/cases/design/smm-case-presentation` | `/en/cases/design/smm-case-presentation` | 3 | brief → gallery(3, підписи + `wide`) → results | text |
| 6 | `design/pink-pr-flyers` | `/cases/design/pink-pr-flyers` | `/en/cases/design/pink-pr-flyers` | 4 | brief → gallery(3, підписи) → results | screenshot |
| 7 | `design/gel-polish` | `/cases/design/gel-polish` | `/en/cases/design/gel-polish` | 1 | brief → gallery(1) → results | text |
| 8 | `design/mydutyfree` | `/cases/design/mydutyfree` | `/en/cases/design/mydutyfree` | 1 | brief → gallery(1) → results | text |
| 9 | `design/vikontse-logo` | `/cases/design/vikontse-logo` | `/en/cases/design/vikontse-logo` | 1 | brief → gallery(1) → results | text |
| 10 | `design/schonheit-gift-certificate` | `/cases/design/schonheit-gift-certificate` | `/en/cases/design/schonheit-gift-certificate` | 1 | brief → gallery(1) → results | text |
| 11 | `design/sembud-repair` | `/cases/design/sembud-repair` | `/en/cases/design/sembud-repair` | 1 | brief → gallery(1) → results | text |
| 12 | `design/apple-tecnologia` | `/cases/design/apple-tecnologia` | `/en/cases/design/apple-tecnologia` | 1 | brief → gallery(1) → results | text |

Hero: `imageGrid(3)` для ретуш-кейсів, `image` для решти.
Порядок секцій у записі відтворює порядок рендеру в оригіналі
(перевіряється звіркою порядку).

## 4. Нові тексти

**`texts.md`, розділ 12 — на погодження власника:** H1 ×12, SEO title ×12,
1 EN meta description (`barvy-interior`). UA-описи і карткові тексти не
змінювалися; непідтверджені цифри з наявних текстів у нові не виносилися.

## 5. Звірка матеріалів до/після

`scripts/package4-media-check.mjs` — **35/35 кейсів без порушень**
(склад, порядок ← джерело і ← DOM, кратність, повторне використання,
підписи, посилання, OG, HTML обох мов). Повна таблиця —
`media-before-after.md`. DESIGN-ЧАСТИНА:

| Кейс | Медіа до → після | Порядок | Підписи | Посилання |
|---|---|---|---|---|
| `barvy-interior` | 21 → 21 | ✓ | ✓ | 1 → 0 |
| `photo-retouch` | 10 → 10 | ✓ | ✓ | 1 → 0 |
| `globus-billboard` | 5 → 5 | ✓ | ✓ | 1 → 0 |
| `snizhana-telegram-stickers` | 11 → 11 | ✓ | ✓ | 1 → 1 |
| `smm-case-presentation` | 3 → 3 | ✓ | ✓ | 1 → 0 |
| `pink-pr-flyers` | 4 → 4 | ✓ | ✓ | 1 → 0 |
| `gel-polish` | 1 → 1 | ✓ | ✓ | 1 → 0 |
| `mydutyfree` | 1 → 1 | ✓ | ✓ | 1 → 0 |
| `vikontse-logo` | 1 → 1 | ✓ | ✓ | 1 → 0 |
| `schonheit-gift-certificate` | 1 → 1 | ✓ | ✓ | 1 → 0 |
| `sembud-repair` | 1 → 1 | ✓ | ✓ | 1 → 0 |
| `apple-tecnologia` | 1 → 1 | ✓ | ✓ | 1 → 0 |

Різниця 1 → 0 — спільний CTA `t.me/freelance_ua` → `siteConfig`
(п.9 правил редактури), пояснено в `media-before-after.md`.
`snizhana` 1 → 1: лінк на пак стікерів збережено (тепер як промо-картка).

## 6. Результати перевірок

| Перевірка | Результат |
|---|---|
| `npm run build` | ✅ exit 0, **154 сторінки** (142 → 154: +12 EN) |
| `npx tsc --noEmit` | ✅ 0 |
| `npm run lint` | 1 error (стара) + **13 warnings** — без нових |
| `check-urls.selftest` | ✅ 27/27 |
| `inventory` | 100 маршрутів, sitemap **147**, очікування **153 `current` + 65 `target`**, issues **7** (усі попередні) |
| `check-urls --phase current` | ✅ **PASS**: 153 URL, **147** сторінок 200, 6 redirects, **0** порушень, hreflang **164** перевірки / 0 помилок, sitemap 147, og:image звірено з файлом |
| `check-urls --phase all` | ❌ 65 — усі ще не перенесені EN-кейси (100 → 97 → 85 → 77 → **65**) |
| `package4-media-check` | ✅ **35/35** (див. §5) |
| `package4-case-check` Chromium+WebKit | ✅ **8015/8015** — `browser-report-batch3.txt` (35 кейсів × UA/EN × Chromium/WebKit: H1/lead/каноніка/hreflang, breadcrumb, мовний перемикач, схожі роботи, модалки галерей, повноекранний плеєр, **заголовок відгуку 140**, **аватари 140**, **назва кнопки ↔ стан медіа 84**, back/forward, мобільний, reduced motion, світла тема; **247/247** медіафайлів віддають 200) |

## 7. Відкриті питання партії 3

1. **H1 / SEO title / 1 EN-опис** — `texts.md`, розділ 12 (на погодження).
2. **Відкладені структури** (див. §1): hero-відео, `finalGroups`, inline-зображення
   поза hero/відгуком, hero зі змінною-джерелом — розширити мапінг або
   перенести вручну **до** наступної партії; `--force` не застосовувався.
3. **Цифри в наявних текстах** — не змінювалися, `facts-to-confirm.md`
   (розділи A/C) до перевірки перед публікацією; прибрані раніше за
   погодженням — `texts.md`, розділ 9.5.
4. **Карткові назви з маленької літери** («стікери для Telegram»,
   «флаєри під друк», «сертифікат», «розробка логотипу», «обкладинка YouTube»)
   — правило редактури §1 припускає виправлення «якщо це не навмисний стиль».
   **Не змінювалися** (впливають на каталог): підтвердити намір окремо.
5. **Пробіли в карткових назвах** (`" Обробка зйомки "`, `" сертифікат"`,
   `"MyDutyFree "`) — виправлення вплине на каталог; підтвердити.
6. **`orphanedI18nLink`** — ті самі 4 прапорці, що й раніше (darkshare, eva,
   importera, ruslan); у дизайн-кейсах партії нових немає.

## 8. Як відтворити

```bash
npm run build
kill $(lsof -nP -iTCP:3011 -sTCP:LISTEN -t) 2>/dev/null
npm run start -- -p 3011

node scripts/migrate-case.mjs --survey --dir design   # read-only профіль
node scripts/inventory.mjs
node scripts/check-urls.mjs --base http://localhost:3011 --mode acceptance --phase current \
  --out docs/package-4/check-acceptance-current.json
node scripts/package4-media-check.mjs
node scripts/package4-case-check.mjs --base http://localhost:3011 \
  --out docs/package-4/browser-report-batch3.txt
```

## 9. Наступний крок

**Зупинка.** Далі — незалежна перевірка партії 3. Після погодження:
партія 4 — решта **11 дизайн** (спочатку розширити мапінг для відкладених
структур) і далі **54 відео** по 10–15, з тим самим набором перевірень.
Публікація — окремим рішенням власника.

## 10. Виправлення за результатами незалежної перевірки партії 3

### 10.1 `snizhana-telegram-stickers` — повернутий видимий текст

| Що | Було | Стало |
|---|---|---|
| Вступ галереї | ключ `galleryDesc` загубився (суттєвий текст про фрагменти пака) | `gallery.intro: key("…galleryDesc")` — UA/EN |
| Підпис лінка на пак | `cases.visit` («Відвідати сайт») | `key("…packCta")` → «Переглянути пак» / «View the pack» |
| Напис категорії в hero | картковий `categoryShort` («TELEGRAM STICKERS») | **вихідний** `category` («TELEGRAM STICKERS / BRANDING»), як на сторінці; картка каталогу лишається з `categoryShort` — різницю картки й hero зафіксовано, на погодження не виносилося, бо текст не змінювався |

### 10.2 `globus-billboard` і `pink-pr-flyers` — підпис скріншота відгуку

- Схему розширено: `ReviewBlock.screenshot.caption?: CaseText` —
  локалізований рядок під зображенням;
- рендер (`CaseDetail`) показує його під скріншотом (`text-xs`, як в оригіналі);
- у записи повернуто `caption: key("…reviewScreenshotCaption")` —
  «Скріншот реального відгуку з переписки» / «Screenshot of the real review
  from our chat» (наявні значення, без перекладу).

### 10.3 Причини в генераторі (`scripts/migrate-case.mjs`)

1. **Вступ секції** тепер розпізнає суфікси `Intro` **і `Desc`**
   (`galleryDesc`, `approachIntro`) — раніше лише `Intro`, тому `galleryDesc`
   не потрапляв у запис.
2. **Підпис лінка** читається з **вмісту `<a>`** для обох форм (`href="…"`
   і `href={CONST}`); якщо ключа немає, береться текст вмісту, а якщо й
   його немає — генератор друкує `ATTENTION … falls back to "cases.visit"`
   (тихої підміни більше немає).
3. **Підпис скріншота відгуку**: `*reviewScreenshotCaption` зберігається в
   записі поряд із `*reviewScreenshotAlt`.
4. Додано вивід `sections:` у сухому прогоні — видно ключі
   заголовка/вступу кожної секції до запису файлу.

### 10.4 Посилена перевірка збереження тексту

`scripts/package4-media-check.mjs` раніше **фейлив лише caption-ключі**, а
інші втрати позначав рядком «невідома причина» при загальному PASS — у
`media-before-after.md` було 5 таких рядків. Тепер:

- **кожен** ключ вихідної сторінки має дім: запис, спільний рендерер
  (явний перелік `MOVED_TO_SHARED_RENDERER`) або погоджена редакція
  (явний перелік `REPLACED_BY_LITERAL`);
- усе інше — **FAIL**: `невідома втрата видимого тексту: …`;
- підсумок у звіті: `усі N ключів вихідної сторінки мають дім…`.

Результат: **рядків «невідома причина» — 0** (було 5), «мають дім» — 35 із 35.

### 10.5 Schönheit

SEO title: «бьюті-салону» → **«б'юті-салону»** (українська апостроф-форма).
EN-рядок без змін.

### 10.6 Повторні перевірки

| Перевірка | Результат |
|---|---|
| `package4-media-check` | ✅ **35/35**, невідомих втрат тексту **0**, «мають дім» **35/35** |
| `inventory` | issues **7** (усі попередні), 153 `current` + 65 `target`, sitemap 147 |
| `check-urls --phase current` | ✅ **PASS** (153 URL, 147×200, hreflang 164, sitemap 147) |
| `check-urls --phase all` | ❌ 65 (очікувано) |
| `build` / `tsc` / `lint` / `selftest` | ✅ 154 сторінки · ✅ 0 · 1 error (стара) + 13 warnings · 27/27 |
| `package4-case-check` UA/EN для трьох кейсів (`browser-report-textfix.txt`) | ✅ **661/661** — snizhana, globus, pink: H1/lead/каноніка/hreflang, breadcrumb, перемикач, схожі роботи, галерея/модалка, повноекранний плеєр, заголовок+аватар+назва кнопки, back/forward, мобільний, reduced motion, світла тема |

## 11. Наступний крок

**Зупинка.** Наступна партія та публікація не починаються. Нові заголовки
(розділи 12.1–12.3) залишаються на погодження власника; непідтверджені цифри
в наявних текстах — у `facts-to-confirm.md` до перевірки перед публікацією.

