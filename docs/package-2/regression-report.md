# Регресійні сценарії (виправлення перед Пакетом 3)

Дата: 10.10.2026. Браузер: Chromium (agent-browser 0.38.1), сервер: production-збірка, `http://localhost:3011`.

## 1. Мовний контекст при внутрішній навігації

**Причина невідповідності:** root layout у Пакеті 2 був спільним для `/en/*` і решти URL; при м'якій навігації Next.js не перерендеровує layout, тому `<html lang>`, словник і provider лишалися від попередньої мови (reload виправляв).

**Виправлення:** два **root-Layout дерева** — `app/(uk)/layout.tsx` (`<html lang="uk">`) та `app/en/layout.tsx` (`<html lang="en">`). За документацією Next.js навігація між root-Layout = **повний document load**, тому URL, словник і `lang` не можуть розійтися ні при прямому відкритті, ні при внутрішніх переходах, ні при back/forward. `proxy.ts` видалено (мова тепер — структура дерева, не заголовок запиту). Спільний тіло документа — `components/RootDocument.tsx`; шрифти/тема/дефолтні метадані — `lib/root-fonts.ts`, `lib/root-layout.ts`.

| # | Сценарій | Очікування | Результат |
|---|---|---|---|
| 1a | `/en/cases` → клік по картці EVA (UA-кейс) | `lang=uk`, UA-вміст одразу | ✅ `/cases/it/eva-code`, `lang="uk"`, H1 «E.V.A. CODE™» |
| 1b | reload після 1a | мова не змінюється | ✅ той самий URL, `lang="uk"`, той самий H1 |
| 2a | назад через мовну межу | повернення на EN-сторінку з `lang=en` | ✅ `/en/cases`, `lang="en"` |
| 2b | вперед | повернення на UA-кейс з `lang=uk` | ✅ `/cases/it/eva-code`, `lang="uk"` |
| 3a | `/en` → кнопка «All IT cases» | клієнтський перехід у межах EN-дерева | ✅ `/en/cases?tab=it`, `lang="en"` |
| 3b | `/en` → header «Partners» | `/en/partners`, `lang=en` | ✅ |
| 3c | `/en/partners` → header «Cases» (якір) | `/en#cases`, `lang=en` | ✅ |
| 4 | невідомі URL | локалізований 404 зі статусом 404 | ✅ `/xyz` → «Сторінку не знайдено»; `/en/xyz` → «Page not found» (catch-all у кожному дереві + `notFound()`) |

Додатково виправлено внутрішні лінки, що межували мови: добірки на головній (`/cases?tab=…` → `${lp}/cases?tab=…`), CTA партнерки (`/partners` → `${lp}/partners`), «схожі роботи» та картки кейсів (`counterpartPath(href,"en") ?? href` — після міграції кейсів у Package 4 картки автоматично вестимуть на EN-версії).

## 2. Повнота метаданих готових пар

`localizedMetadata()` тепер генерує **повний комплект**: title, description, self-canonical (повний абсолютний URL), hreflang-пара, OG (title/description/**url**/locale/siteName/image) і Twitter (card/title/description/image). Root-layout більше не має openGraph/twitter — жодна сторінка не успадковує чужих карток. У чекері додано 13 перевірок OG/Twitter для кожної з 6 сторінок-пар (`bilingualPair`).

| Сторінка | og:url | twitter:title | og:locale | Результат |
|---|---|---|---|---|
| `/` | `/` | бренд | uk_UA | ✅ |
| `/en` | `/en` | бренд | en_US | ✅ |
| `/cases` | `/cases` | «Кейси — Freelance UA» | uk_UA | ✅ |
| `/en/cases` | `/en/cases` | «Cases — Freelance UA» | en_US | ✅ |
| `/partners` | `/partners` | «Партнерка — Freelance UA» | uk_UA | ✅ |
| `/en/partners` | `/en/partners` | **«Partners — Freelance UA»** (раніше успадковував головну) | en_US | ✅ виправлено |

## 3. Fallback канонічної адреси

`localizedMetadata({locale:"en", uaPath})` без зареєстрованого відповідника тепер **кидає помилку** (`no EN counterpart registered…`) замість канонікалізації на UA-URL. Відсутній відповідник = явна помилка на збірці/рендері.

## 4. Кнопка EVA (картка кейсу)

**Розслідування:** у `FeaturedCaseCard` корінь мав `cursor-pointer`, але єдиним посиланням був hover-CTA; **зображення картки не було інтерактивним** (на відміну від `VideoCaseCard`, де прев'ю загорнуте в `<Link>`). Клік по зображенню нікуди не вів — це **проблема верстки/семантики, а не артефакт тестового скролу** (хоча рух під час FadeIn-анімації міг додатково зсувати координати в автоматизації).

**Виправлення:** медіа-область `FeaturedCaseCard` загорнута в `<Link aria-label="Переглянути кейс: …">` (той самий патерн, що вже був у `VideoCaseCard`), з видимим focus-ring. CTA-лінк залишився окремим (не вкладений).

**Перевірка після виправлення (Chromium):** `/cases/it` → клік по зображенню EVA-картки → `/cases/it/eva-code` ✅ (обидва лінки: медіа e618 і CTA e619 ведуть на кейс).

## 5. Автоматичні перевірки (без браузера)

| Прогін | Результат |
|---|---|
| `selftest` (контрольні правила чекера) | ✅ 16/16 PASS |
| `acceptance --phase current` | ✅ **PASS, exit 0**: 109/109, 0 порушень (включаючи 13 OG/Twitter-перевірок × 6 сторінок), 12 hreflang-пар без збоїв, sitemap OK |
| `tsc` / `lint` / `build` | ✅ 0 / **рівно baseline** (1+22) / ✅ 119 сторінок |

## Відомі нюанси

1. Серверний HTML для `notFound()` з catch-all має порожньому `<html>`-оболонці Next (`id="__next_error__"`) без `lang`; після гідратації документ має правильний `lang` і локалізований текст (перевірено в браузері). Статус — справжній 404, `noindex` присутній.
2. Крос-мовна навігація — повний document load (задокументована поведінка Next для різних root-layout) — це і є гарантія відповідності; навігація в межах однієї мови лишається клієнтською.
3. Кейс-сторінки досі без hreflang (EN не готовий) і без власного Twitter ( успадковується og:title — коректний фолбек Twitter). Повний Twitter для кейсів — Package 4.
