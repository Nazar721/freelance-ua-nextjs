# Партія 2 — решта 8 IT-кейсів (Пакет 4)

Стан: **перенесено й перевірено; зупинено для незалежної перевірки**
перед дизайном і відео. Публікацію не виконано.
Локальний перегляд: **http://localhost:3011**.

**IT-напрям завершено:** усі 21 IT-кейси в реєстрі. Залишилося **77 кейсів**
= 0 IT + **23 design** + **54 video** (24 − 1 і 55 − 1 перенесених у пілоті).

## 1. Перенесені кейси

| # | Кейс | UA | EN | Медіа | Компонентів | Результатів | Відгук | Особливості |
|---|---|---|---|---|---|---|---|---|
| 1 | `it/route-core` | `/cases/it/route-core` | `/en/cases/it/route-core` | 5 | 4 | 8 | text | лінок «Відвідати сайт» у картці компонента |
| 2 | `it/ruslan-aviation` | `/cases/it/ruslan-aviation` | `/en/cases/it/ruslan-aviation` | 9 | 6 | 5 | **screenshot** | відгук зі скріншотом; заголовок секції — **спільний ключ `itCases.review`** («Відгук клієнта 💬»); секція `links` |
| 3 | `it/sdent` | `/cases/it/sdent` | `/en/cases/it/sdent` | 9 | 4 (**4 слайдери**) | 9 | text | картки зі слайдером «до/після» |
| 4 | `it/selloflow` | `/cases/it/selloflow` | `/en/cases/it/selloflow` | 6 | 5 | 9 | text | спільний проєкт (розмежування в наявному тексті) |
| 5 | `it/serezha-shop` | `/cases/it/serezha-shop` | `/en/cases/it/serezha-shop` | 5 | 4 | 8 | text | |
| 6 | `it/shkiper-drop` | `/cases/it/shkiper-drop` | `/en/cases/it/shkiper-drop` | 7 | 5 (**5 слайдерів**) | 7 | text | картки зі слайдером «до/після» |
| 7 | `it/stretching-ch` | `/cases/it/stretching-ch` | `/en/cases/it/stretching-ch` | 2 | 1 + `gallery` | 7 | text | **перенесено вручну** (див. §3) |
| 8 | `it/voltone-pro` | `/cases/it/voltone-pro` | `/en/cases/it/voltone-pro` | 7 | 5 | 9 | text | |

Разом у реєстрі **23 кейси** (21 IT + 1 design + 1 video), **135 адрес** у sitemap.

## 2. Редакційні поля

H1 ×8, SEO title ×8 і 4 EN-описи — у **`texts.md`, розділ 11** (на погодження).
UA-описи сторінок не змінювалися. У нових SEO titles навмисно не винесено
непідтверджені цифри з наявних текстів (14 послуг, 8 лікарів, 4-етапний
процес, −40%, «2 хвилини») — вони лишилися там, де були, і залишаються
в `facts-to-confirm.md`.

## 3. Генератор: blockers не обійдено

- `scripts/migrate-case.mjs --survey --dir it` перед перенесенням: **8 з 8
  мапляться за поточною схемою** (жодного `--force` не використано).
- **`it/stretching-ch`** — компоненти на сторінці живуть як окремі JSX-секції,
  а не в `components`-масиві. Генератор **відмовився писати** запис
  (structural blocker: *«component blocks exist outside a `components` array»*
  — правило додано після цього випадку), і кейс перенесено **вручну**:
  - `featureList` з одним елементом (component1: заголовок, опис, зображення
    `stretching-ch-mocap.webp` 800×450);
  - `gallery` з `title`/`intro` (component2: заголовок + текст) і зображенням
    `stretching-ch-profile.png` 500×180 — рендерить h2 + абзац + зображення,
    як оригінал;
  - порядок секцій відтворює оригінал: hero → задача/рішення → component1 →
    результати → component2 → посилання → відгук.
- Нові типи блоків у цій партії не знадобилися (усі — `featureList` з
  `slider`, `gallery`, `screenshot`-відгук, уже підтримані в партії 1).

**Виправлено за зауваженням перевіряльника.** У `reviewTitleKey` fallback
викликав `keysIn(page, /t\("itCases\.review"\)/g)` — регулярний вираз без
групи захоплення, тож повертав `undefined`, і `it/ruslan-aviation` втратив
заголовок відгуку, який у вихідній сторінці є (спільний ключ
`itCases.review`). Тепер регулярний вираз має групу
(`/t\("(itCases\.review)"\)/g`), запис Ruslan містить
`title: key("itCases.review")`, а в сухому прогоні з’явився рядок
`reviewTitle=itCases.review` (перевірено на фікстурі з вихідного коду Ruslan;
`prime-auto-shipping` і `repair-collision` **не змінювалися** — у їхніх
вихідних сторінках заголовка справді немає).

Додано контрольну перевірку в `package4-case-check`: для кожного кейсу з
`review.title` у блоці відгуку має бути рівно один `<h2>` із локалізованим
текстом; для записів без `title` — жодного `<h2>`.

## 4. Звірка матеріалів (`package4-media-check`, 23/23 ✅)

| Кейс | Медіа до → після | Порядок | Підписи | Посилання | OG |
|---|---|---|---|---|---|
| `it/route-core` | 5 → 5 | ✓ | ✓ | 2 → 1 | ✓ |
| `it/ruslan-aviation` | 9 → 9 | ✓ | ✓ | 2 → 1 | ✓ |
| `it/sdent` | 9 → 9 | ✓ | ✓ | 3 → 2 | ✓ |
| `it/selloflow` | 6 → 6 | ✓ | ✓ | 2 → 1 | ✓ |
| `it/serezha-shop` | 5 → 5 | ✓ | ✓ | 2 → 1 | ✓ |
| `it/shkiper-drop` | 7 → 7 | ✓ | ✓ | 2 → 1 | ✓ |
| `it/stretching-ch` | 2 → 2 | ✓ | ✓ | 2 → 1 | ✓ |
| `it/voltone-pro` | 7 → 7 | ✓ | ✓ | 2 → 1 | ✓ |

«Порядок» = послідовність запису проти джерельних конструкцій і проти DOM
у межах кожного блока; «кратність» і «повторне використання» теж без
порушень; медіа в HTML обох мов — повністю; різниця в лінках (2 → 1) —
спільний CTA `t.me/freelance_ua`, що замінений на `siteConfig`
(п.9 правил редактури), пояснено в `media-before-after.md`.

## 5. Результати перевірок

| Перевірка | Результат |
|---|---|
| `npm run build` | ✅ exit 0, **142 сторінки** (134 → 142: +8 EN) |
| `npx tsc --noEmit` | ✅ 0 |
| `npm run lint` | 1 error (стара) + **13 warnings** — без нових (зникло попередження з переписаного `voltone-pro`) |
| `check-urls.selftest` | ✅ 27/27 |
| `inventory` | 100 маршрутів, sitemap **135**, очікування **141 `current` + 77 `target`**, issues **7** (усі попередні) |
| `check-urls --phase current` | ✅ **PASS**: 141 URL, **135** сторінок 200, 6 redirects, **0** порушень, hreflang **116** перевірок / 0 помилок, sitemap 135 |
| `check-urls --phase all` | ❌ 77 — усі ще не перенесені EN-кейси (100 → 97 → 85 → **77**) |
| `package4-media-check` | ✅ **23/23** (див. §4) |
| `package4-case-check` Chromium+WebKit | ✅ **5375/5375** — `browser-report-batch2.txt` (23 кейси × UA/EN × Chromium/WebKit: H1/lead/каноніка/hreflang, breadcrumb, мовний перемикач, схожі роботи, модалки, аудіо/відео-кнопки, **заголовок відгуку — 92 перевірки**, back/forward, мобільний, reduced motion, світла тема) |

## 6. Відкриті питання партії 2

1. **H1 / SEO title / 4 EN-описи** — `texts.md`, розділ 11 (на погодження).
2. **`orphanedI18nLink`** (4 прапорці в `issues.json`, усі — попередні):
   `it/darkshare`, `it/eva-code`, `it/importera` (URL на сторінці відсутній —
   як і до перенесення) і `it/ruslan-aviation` (ключ містить `http://…`,
   а сторінка рендерить `https://www.…` — розбіжність протоколу/домену).
   Питання залишається: використати ключі чи видалити їх
   (`facts-to-confirm.md`, розділ D).
3. **Цифри в наявних текстах** (14/8 послуг, 4-етапний процес, −40%,
   «2 хвилини», 300+, 4.9⭐, 200+ магазинів, 50+ авто тощо) — **не змінювалися**,
   залишаються в `facts-to-confirm.md` до перевірки перед публікацією.
   Прибрані раніше за погодженням (зростання конверсії, щоденні заявки,
   відсотки «довіри») — `texts.md`, розділ 9.5.
4. **Позиція CTA «Відвідати сайт»** — у вихідних сторінках він був ближче
   до hero; у записах секція `links` рендериться перед відгуком (як у
   партії 1). URL і підпис збережено; підтвердити позицію.
5. **Відгуки без заголовка** — лише `it/prime-auto-shipping` і
   `it/repair-collision` (з партії 1): у вихідних сторінках заголовка немає —
   не додано. `it/ruslan-aviation` заголовок має (спільний `itCases.review`)
   і відновлено.

## 7. Як відтворити

```bash
npm run build
kill $(lsof -nP -iTCP:3011 -sTCP:LISTEN -t) 2>/dev/null
npm run start -- -p 3011

node scripts/migrate-case.mjs --survey --dir it    # read-only профіль структур
node scripts/inventory.mjs
node scripts/check-urls.mjs --base http://localhost:3011 --mode acceptance --phase current \
  --out docs/package-4/check-acceptance-current.json
node scripts/package4-media-check.mjs
node scripts/package4-case-check.mjs --base http://localhost:3011 --out docs/package-4/browser-report-batch2.txt
```

Артефакти: `browser-report-batch2.txt`, `check-acceptance-current.json`,
`check-acceptance-all.json`, `media-before-after.md`, `inventory.txt`,
`build.txt`, `lint.txt`, `tsc.txt`, `check-selftest.txt`, `diff-package4.patch`,
`texts.md` (розділ 11).

## 8. Наступний крок

**Зупинка.** Далі — незалежна перевірка партії 2. Після погодження —
дизайн (23) і відео (54) по 10–15; перед ними обов'язково
`--survey`: структури design/video поки не мапляться (hero-відео,
`finalItems`/`galleryItems`/`screenshots`, `videos`/`caseVideos`,
`sliderPairs`, `heroImages`, `approachItems`/`finalGroups`, інлайн-JSX
масиви — див. `survey-design.txt`, `survey-video.txt`), і ці блоки
**не обходяться через `--force`**: спочатку розширення схеми/мапера або
ручне перенесення.
