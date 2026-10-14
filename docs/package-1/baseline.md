# Baseline перевірок (Пакет 1)

Зафіксовано **до** будь-яких змін коду (2026-10-10), щоб відрізнити наявні проблеми від регресій.

## 1. Автоматичні команди

| Команда | Результат | Артефакт |
|---|---|---|
| `npx tsc --noEmit` | ✅ exit 0 | `baseline/tsc.txt` |
| `npm run lint` (eslint) | ❌ exit 1: **1 помилка + 22 попередження** (наявні) | `baseline/lint.txt` |
| `npm run build` (next build, Turbopack) | ✅ exit 0, 113 сторінок згенеровано | `baseline/build.txt` |

### Наявна lint-помилка (не наша, не виправляти мовчки)
- `components/sections/HowWeWorkSection.tsx:20` — `react-hooks/set-state-in-effect` (setState усередині useEffect).

### Наявні попередження (22)
`HowWeWorkSection` unused `isMobile`; `PartnershipSection` unused `Percent`; `StackRail` `<img>` замість `next/image`; `CurvedDashedLines` missing deps; решта — ті самі правила.

## 2. Автоматична перевірка URL (`scripts/check-urls.mjs`)

Сервер: production build (`next start`, :3011). Очікувані значення — з
`docs/package-1/expectations.json` (генерується `inventory.mjs`: 218 записів —
106 current + 112 target). Чекер веріфікує: status, redirect (Location, один
перехід), canonical, title/description, H1, `<html lang>`, robots meta,
X-Robots-Tag, hreflang із зворотними мовними зв'язками, відсутність сирих
ключів i18n у видимому тексті.

Режими:
- `--mode baseline` — знімок ЧИННОЇ системи; порушення фіксуються, exit 0
  (розділено з прийманням майбутньої системи);
- `--mode acceptance` — приймання ЦІЛЬОВОЇ системи; будь-яке порушення → FAIL
  і ненульовий exit code. Redirect-очікувані адреси НІКОЛИ не вимагають 200.

| Метрика (baseline, phase=all) | Результат |
|---|---|
| Перевірено URL | **218** (106 current + 112 target) |
| UA URL зі статусом 200 | **106/106** |
| Метадані наявних сторінок (canonical/lang/title/description/H1/robots/keys) | ✅ **0 порушень** (усі 106) |
| EN та цільові сторінки (`/en/*`, `/services/*`) | 109 × статус 404 — **очікувано до Пакетів 2–3** |
| EN-редіректи категорій (`/en/cases/{d}` → `/en/services/{d}`) | 3 × неактивні — очікувано до Пакета 3 |
| hreflang | ❌ відсутній усюди (0 пар) — очікувано до Пакета 2 |
| noindex у production | ❌ не знайдено жодного (meta + X-Robots-Tag) |
| Сирі ключі i18n у видимому HTML | ✅ 0 |
| Acceptance mode (контроль інструмента) | ✅ працює: FAIL, exit 1, 421 порушення (усі — відсутні EN/redirect/hreflang) |

Повний звіт: `baseline/check-report.json` (baseline) + `check-acceptance.json` (контрольний прогін acceptance).

## 3. Мовна поведінка (cookie `NEXT_LOCALE`)

| Сценарій | Результат (baseline) |
|---|---|
| `/`, без cookie | `lang="uk"`, UA-контент |
| `/` з `NEXT_LOCALE=en` | `lang="en"`, H1 і контент EN, але **title/description — UA** (статичні в layout) |
| `/cases` з EN-cookie | `lang="en"`, H1 «Our cases», title «Кейси — Freelance UA» — **мова метаданих не змінюється** |
| `/cases/it/eva-code` з EN-cookie | `lang="en"`, контент частково EN, title — UA |
| `/partners` з EN-cookie | `lang="en"`, H1/контент **змішані**: 22 кириличні слова залишаються хардкодом |
| EN-URL `/en/...` | **404** (усі) |
| `/uk/...` | 308 → `/uk` → 404 |

**Висновок:** одна адреса стабільно не повертає одну мову — саме це виправляє Пакет 2.

## 4. EN-контент: сирі ключі (видимий дефект зараз)

Перевірено всі 106 UA-сторінок з cookie `NEXT_LOCALE=en`, видимий текст без script/style:

| Сторінка | Сирі ключі |
|---|---|
| `/cases/video/ai-promo-misha` | 14 (`videoCases.aiPromoMisha.*`) |
| `/cases/video` (каталог) | 2 (title + shortDesc того самого кейсу) |
| `/cases/design/barvy-interior` | 1 (`designCases.team.andriiRetoucher`) |
| Решта 103 сторінок | 0 |

Причина: 19 відсутніх EN-ключів у `lib/i18n.ts` (2522 UA / 2503 EN).

## 5. Метадані: наявні прогалини

- `og:image` відсутній: `/cases`, `/cases/it`, `/cases/design`, `/cases/video`, `/partners`, `/cases/video/ai-video-new` (6 сторінок).
- Twitter-метадані кейсів успадковують головну: `/cases/it/eva-code` → `twitter:title = "Freelance UA || Digital Agency"`, `twitter:description` — UA-текст головної, `twitter:image = /og-image.jpg`.
- Дублікатів title серед 100 кейсів немає; description — на всіх; нижній регісл у 5 design-title.
- `lastmod` у sitemap = момент білду для всіх 106 URL.

## 6. Продуктивність (production HTML)

| Сторінка | HTML | `<link rel="preload" as="image">` |
|---|---|---|
| `/` | 989 КБ | 2 |
| `/cases` | 570 КБ | 3 |
| `/cases/it` | 568 КБ | 3 |
| `/cases/design` | 607 КБ | **25** |
| `/cases/video` | 700 КБ | **43** |
| `/cases/it/eva-code` | 582 КБ | 3 |

Причина: `preload` без умови для **всіх** карток на сторінках design/video (`app/cases/design/page.tsx:35`, `app/cases/video/page.tsx:34`), тоді як IT використовує `i < 2`.
Відео в каталозі: 0 `<video>` у серверному HTML (LazyVideo відкладає) — ✅.
Кешовані файли зображень з `?v=2` працюють (200, image/jpeg) — `localPatterns` без `search` зараз не блокує; при зміні конфігу дотриматися документації Next 16.

## 7. Навігація та структура

- `#cases` на головній: рівно 1 елемент (`ItCasesSection`), `scrollPaddingTop: 120px` на `<html>`.
- **Неробочий пункт меню «Контакти»**: Header веде на `#contact-form`, такого id на головній немає (`ContactFormSection` не підключений). `id="contacts"` є тільки в футері.
- Посилання `?tab=`: 22 design, 56 video, 3 photo-retouch, 1 it — усі ведуть на `/cases` з фільтром; canonical завжди `/cases`; невалідні значення ігноруються безпечно.
- Зворотні посилання кейсів: IT → `/cases/it` (21), design → `/cases?tab=design` (24), video → `/cases?tab=video` (55).
- Breadcrumb: відсутній на всіх сторінках. JSON-LD: Organization+WebSite (спільний), BreadcrumbList відсутній.

## 8. Каталожна цілісність

- 100 маршрутів кейсів = 106 URL у sitemap (6 статичних + 100 кейсів); розбіжності каталог↔sitemap↔data — `issues.json` (12 записів):
  2 маршрути поза data (`ai-video-new`, `eva-code-reels` — не в каталозі), 1 slug-розбіжження (`nikita-sheremet`), 1 хвостовий пробіл у шляху медіа, 2 прогалини EN-перекладу, 4 `orphanedI18nLink` (невикористані i18n-лінки — питання власника), 1 неповний список `RelatedProjectsSection` (43 кейси відсутні, 1 хибний slug), 0 дублікатів `direction+slug`.
- Каталог `/cases?tab=video` показує 53 з 55 кейсів (2 поза data). Design — 24/24, IT — 21/21.
- `RelatedProjectsSection` містить 59 із 100 кейсів (43 відсутні, 1 хибний slug `nikita-sheremet`) — «схожі роботи» не бачать половину каталогу.
- Мертві модулі без жодного імпорту: `CasesSection`, `ContactFormSection`, `PartnershipSection`, `data/cases.ts`, `data/services.ts`, `CaseBackLink`, `CaseReview`, `CaseTechnicalComponents`, `LoadingScreen`, `TechBadge`, `DeviceMockup`, `LaptopMockup`, `PhoneMockup`.

## 9. Інфраструктурні спостереження (поза кодом)

- `https://www.freelance-ua.agency` — TLS hostname mismatch (з'єднання не встановлюється; підтверджено у попередньому аудиті).
- `http://freelance-ua.agency` → 308 → https ✅; trailing slash → 308 без слеша ✅; вигадлена адреса → справжній 404 ✅.
- `googlea5b7709b08127ce7.html` у корені репо, не в `public/` → **404 на production** (перевірено).
- Search Console: live test sitemap/EVA успішний; звіт sitemap — помилка читання; EVA — «Невідома Google URL-адреса». Причина не встановлена.
- `.env.local` (не у git): `TOKENROUTER_API_KEY`, `GOROUTER_API_KEY`; маршрут `/api/chat` клієнтом не використовується.

## 10. Що НЕ перевірялося в baseline

- Ручні браузерні сценарії (Package 5), реальний Safari, швидкість до/після на однакових сценаріях.
- Доступність: контраст, фокус, reduced motion — частково (наявні фікси Safari/StackRail/BecomePartner зберегти, перевірити після змін).
- Індексація в Google — окремий етап після публікації (Package 6).
