# Структура трьох сторінок напрямів (Пакет 3)

Адреси: `/services/it`, `/services/design`, `/services/video` + EN `/en/services/{direction}`.
Чинні оглядові сторінки `/cases/{direction}` після готовності перенаправляються (308) на `{new}#cases`.

## Загальний каркас (однаковий компонент, різний контент)

1. **H1 + короткий опис** — локалізований, з позиціонуванням напряму (не дублювати brand-тезу).
2. **Видимий перехід «Переглянути роботи» → `#cases`** (обов'язково: сторінка довга, одразу після вступу).
3. **Задачі клієнтів** — реальні запити, без вигаданих проблем.
4. **Реальні послуги** — склад звіряти з фактичними матеріалами (див. нижче), не розширювати обіцянки.
5. **Що входить / який результат** — на підставі наявних кейсів.
6. **Процес і умови** — переиспользовать підтверджені блоки `process.*` / `pricing.*` з головної; без нових цін і строків, якщо підтвердження немає.
7. **`<span id="cases">` — блок усіх кейсів напряму** (повний каталог напряму, не добірка). Допустима пагінація звичайними `<a href>` (напр. `#cases-page-2` або query), прямий відкриття працює без JS.
8. **Відповіді на доречні питання** — тільки якщо є реальні питання; порожні/штучні FAQ не створювати (зараз FAQ-ключів у i18n немає → питання власнику, див. questions.md).
9. **Звернення** — контактні кнопки (Telegram з `siteConfig`) можна також ставити після вступу і після процесу.

Фіксований header: `scrollPaddingTop: 120px` вже встановлений на `<html>` — `#cases` не перекривається; перевірити фактичний скрол у браузері (Chromium + WebKit).

## IT — `/services/it` (21 кейс)

Джерела послуг (наявні в i18n `services.it.1–7` + `data/services.ts`):
Telegram-боти · Веб-сайти та лендінги · Інтернет-магазини · CRM-системи · API-інтеграції · Автоматизація бізнесу · Мобільна розробка.

Підтвердження з кейсів: SaaS/платформи (eva-code, darkshare, selloflow), e-commerce (ruslan-aviation, voltone-pro, nextcup), Telegram Mini App/боти (asandra-soul, epiland), CRM (eva-code, repair-collision), інтеграції (pivden-solar — WhatsApp/Telegram, importera), landing/сайти (12 кейсів підкатегорії landing).

Спеціальні медіа з модалки: before/after слайдер `code-before.webp → website-after.webp` (перенести на сторінку). Медіа-обмеження: `?v=2` query-шляхи вже працюють з поточним `localPatterns` (перевірено у production build), але при зміні конфігу додати `search`.

Фільтр підкатегорій: `ecommerce` (3), `landing` (12), `saas-telegram` (6).

## Дизайн — `/services/design` (24 кейси)

Послуги (`services.design.1–5`): Графічний дизайн · Брендинг та логотипи · YouTube-банери · Банери для соцмереж · Презентації.
Підтвердження з кейсів: брендінг (9), банери (11), фото/відео-обробка (4). Додатково з кейсів: стікери Telegram, вітрини, флаєри, презентації, ретуш.

Спеціальні медіа з модалки: before/after `design-before.webp → design-after.webp`.

Фільтр: `banners`, `branding`, `photo-retouch`.

## Відео — `/services/video` (55 кейсів)

Послуги (`services.video.1–6`): Відеомонтаж · Моушн-дизайн · Рекламні ролики · Reels та Shorts · Відеоогляди · AI-відео.
Підтвердження з кейсів: reels (12), motion (12), youtube (12), ai (17) + 2 поза data (див. questions.md).

Спеціальні медіа з модалки: відео-слайдер (`video-poster.webp?v=2` + `nikita-sheremet-crypto/process-3.mp4`).

**Увага до продуктивності:** чинна сторінка `/cases/video` віддає 43 `<link rel="preload" as="image">`, `/cases/design` — 25 (бо `preload` безумовний для всіх карток). У новій реалізації: `preload`/`fetchPriority` лише для перших 1–2 карток (як у `/cases/it`, де `i < 2`), решта — lazy. Відеокартки: poster-зображення, `preload="none"` до viewport (LazyVideo вже так робить).

## Навігація та зв'язки

- Головна: три картки послуг → реальні `<Link href="/services/{d}">` (без fragment); «Всі IT-кейси» → `/services/it#cases` (аналогічно design/video); «Дізнатись більше» → `/services/{d}`.
- Header: «Послуги» на підсторінках → `/services/it` (або `/…#services` залежно від сторінки — уточнити в Package 3, зараз поведінка `#services` на головній).
- Кейси: breadcrumb «Головна → напрям → кейс», напрям веде на `/services/{d}` (не на `/cases/{d}`).
- Меню/футер: замінити `/cases?tab=…` на `/services/{d}` (79 поточних посилань `?tab=` у кейсах — після redirect активуються в Package 3).
- Каталог `/cases` залишається загальним; посилання на напрями в ньому — `/services/{d}#cases`.

## Redirect (активувати в Package 3, коли сторінки готові)

```
/cases/it      → /services/it#cases       (308)
/cases/design  → /services/design#cases   (308)
/cases/video   → /services/video#cases    (308)
/en/cases/it   → /en/services/it#cases    (308)
/en/cases/design → /en/services/design#cases
/en/cases/video  → /en/services/video#cases
```

Реалізація: `next.config.ts` → `redirects()` (permanent: true → 308). Нюанси fragment:
- фрагмент запиту ніколи не доходить до сервера — сервер не бачить, чи був `#cases`; якщо в `Location` фрагмента немає, браузер за замовчуванням зберігає фрагмент запиту (треба перевірити на практиці);
- сервер може віддати `Location` з фрагментом (`/services/it#cases`) — браузери його використовують; треба перевірити, що `redirects()` у Next 16 пропускає `#` у destination (якщо ні — альтернатива: destination без fragment + клієнтський скрол/`scroll-padding-top`, який уже встановлений на `<html>` як 120px);
- **обов'язкова ручна перевірка в браузері:** (а) `/cases/it#cases` → чи наявність fragment у запиті дає скрол на `#cases` цільової сторінки; (б) `/cases/it` без fragment → чи landing відбувається на `#cases` (бо destination містить fragment) і чи заголовок блоку не перекривається фіксованим header; (в) status 308, один перехід, без ланцюжків і циклів; (г) те саме для `/en/…`.

Мають працювати відразу після redirect: старі зовнішні посилання, `?tab=` посилання (вони ведуть на `/cases`, який не редиректиться), breadcrumb.
