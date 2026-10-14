# Пакет 2 — мовна система та SEO-основа

Дата: 10.10.2026. Статус: **реалізовано + ревізія 2 (два root-layout дерева), на прийманні**. Публікація не виконувалася.

## 1. Що зроблено

### Мова за URL (два root-layout дерева; без cookie-перенаправлень)

| Компонент | Рішення |
|---|---|
| `app/(uk)/layout.tsx` + `app/en/layout.tsx` | **Окремі root-layout дерева**: UK-дерево володіє всіма URL без `/en`, EN-дерево — `/en/*`. `<html lang>`, словник і provider — з одного дерева; за документацією Next.js навігація між root-layout = повний document load, тому URL/мова/контент не можуть розійтися при прямому відкритті, внутрішніх переходах і back/forward (регресійні сценарії — `regression-report.md`) |
| `components/RootDocument.tsx` | Спільний тіло документа (JSON-LD, ContentProtection, Providers) |
| `lib/root-layout.ts`, `lib/root-fonts.ts` | Спільна тема (cookie `SITE_THEME`), шрифти, дефолтні метадані (без openGraph/twitter — їх володіють сторінки) |
| `proxy.ts` | **Видалено** — мова тепер структура дерева, не заголовок запиту |
| `lib/LanguageContext.tsx` | Прибрано cookie+reload; контекст несе `locale`/`t` поточного дерева |
| `lib/i18n-routes.ts` | Готові двомовні пари (`BILINGUAL_UA_PATHS`), `counterpartPath()`, `localeFromPath()` |
| `app/(uk)/[...slug]`, `app/en/[...slug]` | Catch-all → `notFound()` → локалізований 404 кожного дерева (`components/NotFound.tsx`) |

### `/en/` сторінки (спільні компоненти, окремі метадані)

| URL | Файл | Метадані |
|---|---|---|
| `/en` | `app/en/page.tsx` | title бренд; description — наявний EN `hero.desc`; canonical `/en`; hreflang пара |
| `/en/cases` | `app/en/cases/{layout,page}.tsx` | `meta.cases.*` (переклад наявного UA-опису); каталог — той самий клієнт-компонент `components/cases/CasesCatalog.tsx` |
| `/en/partners` | `app/en/partners/{layout,page}.tsx` | `meta.partners.*` (переклад наявного UA-опису) |

UA-сторінки: `app/cases/page.tsx` став тонким серверним файлом (каталог винесено в `components/cases/CasesCatalog.tsx` — спільний для UA/EN). `app/page.tsx`, `app/partners/layout.tsx` — локалізовані метадані.

### Перемикач мови

`components/ui/LanguageToggle.tsx` — **посилання** на відповідник поточної сторінки:
- зберігає `?query` і `#fragment` (браузерний сценарій: `/en/cases?tab=design` → `/cases?tab=design`; `/en/cases#test-anchor` → `/cases#test-anchor` — ✅ перевірено);
- cookie `NEXT_LOCALE` пишеться лише як допоміжна перевага; вміст відкриває URL;
- якщо відповідника немає (зараз: EN-версія кейсів) — сегмент **disabled** з `aria-disabled` і підказкою, **без мовчазного редіректу на головну**.

### canonical / hreflang / метадані

- `lib/seo.ts`: `localizedAlternates()` (мовні пари тільки для НАЯВНИХ відповідників), `localizedMetadata()` — **спільний генератор повного комплекту** метаданих: title, description, self-canonical (повний абсолютний URL), hreflang, OG (title/description/**url**/locale/siteName/image) і Twitter (card/title/description/image). Для `locale:"en"` без зареєстрованого відповідника генератор **кидає помилку** (без fallback на UA-canonical). Без `x-default`.
- Усі 6 сторінок трьох готових пар генеруються через `localizedMetadata()` — жодна не успадковує openGraph/twitter від іншої (root-layout їх не має).
- Кейс-сторінки: canonical без змін, hreflang відсутній (EN ще не готовий — жодних хибних відповідників); Twitter фолбекить на og:title (коректно).
- Локалізовані 404: `notFound.*` ключі; catch-alls у кожному дереві повертають справжній 404 з локалізованим текстом.

## Ревізія 2 (виправлення за зауваженнями перед Пакетом 3)

1. **Мовний контекст при внутрішній навігації** — спільний root layout замінено на два root-layout дерева (див. вище); додано регресійні браузерні сценарії (`regression-report.md`): EN-каталог→UA-кейс→reload, назад/вперед через мовну межу, переходи між EN-сторінками. Локалізовано внутрішні лінки добірок/партнерки/схожих робіт/карток.
2. **Повнота метаданих пар** — 13 OG/Twitter-перевірок на кожну з 6 сторінок-пар у чекері; `/en/partners` більше не успадковує twitter:title головної, og:url присутній на всіх.
3. **Fallback canonical прибрано** — відсутній EN-відповідник = явна помилка генератора.
4. **Картка EVA** — зображення `FeaturedCaseCard` загорнуте в `<Link>` (як у `VideoCaseCard`): клік по зображенню веде на кейс; розслідування в `regression-report.md` (проблема верстки, не тестового скролу).

### Sitemap

`lib/site-routes.ts` + `app/sitemap.ts`: **109 URL** — усі реально готові canonical-сторінки (106 UA + 3 EN). Без `lastmod` (рішення власника). Hreflang у sitemap не дублюється (є в HTML). Чекер тепер валідує sitemap: кожен `loc` має бути готовою сторінкою 200, сторонні/майбутні URL і `lastmod` — порушення.

### Навігація

`Header`/`Footer`: внутрішні посилання локалізовані (`/en/#about`, `/en/partners`); `routeToSection` і `isHomePage` працюють для `/en`. Скрол-пам'ять каталогу перейменована на `cases-scroll:{pathname}` (UA/EN не змішуються).

### Чекер (виправлення за зауваженнями)

`scripts/lib/urlchecks.mjs` (чисті функції) + `scripts/check-urls.mjs` + `scripts/check-urls.selftest.mjs`:
- зворотний hreflang перевіряється **за мовою вихідної сторінки** (UA→EN вимагає на EN зворотного `uk`→UA);
- canonical/hreflang — **повні абсолютні URL** (протокол+домен);
- кінець redirect має повернути **200** (404/500 = FAIL) — однаково для `redirect` і `redirectPlannedTo` (активація через `redirectActive`);
- категорійні redirect-очікування зберігають `#cases`; чекер вимагає fragment у `Location`; фактичний скрол і відступ від header — браузерним сценарієм (Пакет 3);
- hreflang-пари примусові лише коли ОБИДВІ сторінки 200 (без хибних відповідників);
- `href[Ll]ang` зіставляється без урахування регістру (Next виводить camelCase).

## 2. Контрольні перевірки (selftest) — 16/16 PASS

```
✓ коректна мовна пара UA→EN і EN→UA проходить
✓ canonical на хибному домені провалюється
✓ canonical повним абсолютним URL проходить (слеш кореня толерується)
✓ відсутній зворотний hreflang провалюється; зворотній на чужий URL — теж
✓ counterpart не готовий → перевірка пропускається (без хибної пари)
✓ хибний домен у hreflang провалюється; відсутній self_hreflang — теж
✓ redirect на 404 провалюється
✓ відсутній потрібний #fragment провалюється
✓ коректний redirect із #cases до 200-сторінки проходить
```

Контроль зловив реальний баг: зламаний конкатенація шляху в `normalizeAbsUrl` (`/services/it` → `agencyservices/it`) — виправлено.

## 3. Результати приймання

| Прогін | Результат |
|---|---|
| `tsc --noEmit` | ✅ 0 помилок |
| `npm run lint` | 1 помилка + 22 попередження — **рівно baseline** |
| `npm run build` | ✅ 113+3=116 сторінок; `ƒ Proxy (Middleware)` активний |
| `selftest` | ✅ **16/16 PASS**, exit 0 |
| `acceptance --phase current` | ✅ **PASS, exit 0**: 109/109 сторінок 200; 0 порушень метаданих; 12 перевірених hreflang-пар, 0 збоїв; sitemap OK (109 URL, без lastmod) |
| `acceptance --phase all` | FAIL (exit 1), **118 порушень — усі phase=target**: 106 EN-кейсів (Пакет 4), 6 сторінок `/services/*`+`/en/services/*` (Пакет 3), 3 EN-редіректи категорій (Пакет 3) |
| `baseline --phase all` | exit 0; знімок: 109 current 200 + 109 target 404/redirect |

Звіти: `docs/package-2/check-acceptance-current.json`, `check-acceptance-all.json`, `docs/package-1/baseline/check-report.json`.

## 4. Браузерні сценарії (Chromium, agent-browser)

| # | Сценарій | Результат |
|---|---|---|
| 1 | Головна → клік EN → `/en`, `lang=en` | ✅ |
| 2 | `/en/cases?tab=design` → клік UA → `/cases?tab=design`, `lang=uk`, 24 дизайн-картки | ✅ (запит збережено) |
| 3 | Кейс-сторінка: EN-сегмент disabled (`aria-disabled`), посилання на `/en/case` немає | ✅ (без мовчазного редіректу) |
| 4 | `/en/cases#test-anchor` → UA → `/cases#test-anchor` | ✅ (fragment збережено) |
| 5 | `/en/no-such-page` → 404 «Page not found» (EN) | ✅ |

Додатково (curl): `/en/` → 308 → `/en`; cookie `NEXT_LOCALE` не змінює вміст жодної явно відкритої адреси; `og:locale` en_US/uk_UA; robots.txt без змін.

**Не перевірялося в браузері (Пакет 3):** скрол на `#cases` після redirect і відступ від фіксованого header — redirect категорій ще не активні (`redirectActive: false`).

## 5. Змінені файли (диф)

**Нові:**
`proxy.ts` · `lib/i18n-routes.ts` · `lib/seo.ts` · `lib/site-routes.ts` · `components/cases/CasesCatalog.tsx` · `app/en/page.tsx` · `app/en/cases/{layout,page}.tsx` · `app/en/partners/{layout,page}.tsx` · `scripts/lib/urlchecks.mjs` · `scripts/check-urls.selftest.mjs` · `docs/package-2/*`

**Змінені:**
`app/layout.tsx` (locale з headers, generateMetadata, без canonical у корені) · `app/page.tsx` (alternates+locale) · `app/cases/page.tsx` (тонкий серверний файл) · `app/partners/layout.tsx` (alternates+locale) · `app/sitemap.ts` (генерація з site-routes) · `app/not-found.tsx` (локалізований) · `components/layout/{Header,Footer}.tsx` (локалізовані лінки) · `components/ui/LanguageToggle.tsx` (посилання+disabled) · `lib/LanguageContext.tsx` (без cookie-reload) · `lib/i18n.ts` (+8 ключів: `meta.cases.*`, `meta.partners.*`, `notFound.*`) · `scripts/inventory.mjs` · `scripts/check-urls.mjs`

**Не чіпали:** API (`/api/chat`), LFS (`scripts/pull-lfs.mjs`), сторонні модулі, кейс-сторінки, факти/цифри/відгуки/послуги (`facts-to-confirm.md` — без змін), невикористані лінки не додавалися.

## 6. Відомі обмеження

1. EN-версій немає для 100 кейсів і 3 сторінок напрямів — перемикач на них disabled; hreflang відсутній (навмисно). Пакети 3–4.
2. `/cases/{d}` досі живі 200-сторінки в sitemap; redirect активується в Пакеті 3 (`redirectActive: false` в очікуваннях).
3. Словник передається клієнту повним набором кожної мови (~300 КБ) — оптимізація «тільки потрібні ключі» в Пакеті 4.
4. Каталог UA/EN рендериться динамічно (headers() у root layout) — як і до змін (усі маршрути вже були `ƒ`).
5. Playwright WebKit не використовувався; браузерні сценарії — Chromium (agent-browser). WebKit/Safari — окремо за потреби.

## 7. План повернення до попередньої версії

Усі зміни — у git (не запушені). Відкат: `git checkout -- app components lib proxy.ts` + видалити `app/en components/cases lib/i18n-routes.ts lib/seo.ts lib/site-routes.ts scripts/lib scripts/check-urls.selftest.mjs`, потім `npm run build`. Стан до змін: коміт `33ef0b5`.

## 8. Наступний крок

**Пакет 3:** три сторінки `/services/{d}` (+EN), перенесення матеріалів модальних вікон, оновлення головної, активація redirect `/cases/{d}` → `/services/{d}#cases` (з браузерною перевіркою скролу і відступу від header), розширення `BILINGUAL_UA_PATHS`.
