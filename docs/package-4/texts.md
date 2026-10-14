# Нові UA/EN тексти та відкриті фактичні питання (Пакет 4)

Статус: **на погодження власником.** Нічого не опубліковано.

Джерела: `docs/package-1/editorial-rules.md` (9 кроків), наявні ключі `lib/i18n.ts`,
оригінальні сторінки до Пакета 4 (git-індекс), медіа в `public/media/`.

## 1. H1 — нові формулювання (обидві мови)

Раніше H1 був просто назвою картки («E.V.A. CODE™», «Ретуш портретів»,
«Cuprus Life») — без типу роботи, що вимагає п.1 правил редактури.

| Кейс | UA (новий) | EN (новий) |
|---|---|---|
| `it/eva-code` | **E.V.A. CODE™** | **E.V.A. CODE™** |
| `design/nastya-portrait-retouch` | Ретуш портретів: кольорокорекція та обробка фото | Portrait retouching: color grading and photo editing |
| `video/cuprus-life` | Cuprus Life — 3 промо-Reels для соціальних мереж | Cuprus Life — 3 promo Reels for social media |

Обґрунтування: тип роботи береться з наявних фактів кейсу (склад рішення,
підзаголовок сторінки), жодної нової цифри чи обіцянки не додано.
Карткові назви в `data/*Cases.ts` і ключі `*.title` **не змінювались** —
каталог лишається як був.

### 1.1 Погоджено власником (оновлено)

- **H1 усіх трьох пілотів погоджено.** Для EVA — уточнення: видимий H1 має
  бути тільки назвою проєкту **«E.V.A. CODE™»** в обох мовах.
- **Тип і склад виконаної роботи** винесено в **окремий локалізований
  підзаголовок** (поле `subtitle` у записі, рендериться одразу під H1):

| Кейс | UA | EN |
|---|---|---|
| `it/eva-code` | Розробили лендинг, Telegram Mini App, CRM для експертів і кабінет власника | We built a landing page, Telegram Mini App, CRM for experts and an owner dashboard |

  **Погоджено власником** (короткий варіант). H1 «E.V.A. CODE™» і детальний
  SEO title (розділ 2) — без змін. Лід `itCases.evaCode.description` більше
  не рендериться: його роль виконує підзаголовок (у таблиці ключів у
  `media-before-after.md` це позначено окремо).

## 2. SEO title — нові (обидві мови)

| Кейс | UA | EN |
|---|---|---|
| `it/eva-code` | E.V.A. CODE™ — лендинг, Telegram Mini App і CRM \| Freelance UA | E.V.A. CODE™ — landing, Telegram Mini App and CRM \| Freelance UA |
| `design/nastya-portrait-retouch` | Ретуш портретів і кольорокорекція \| Freelance UA | Portrait retouching and color grading \| Freelance UA |
| `video/cuprus-life` | Reels для Cuprus Life — монтаж промо-роликів \| Freelance UA | Reels for Cuprus Life — promo video editing \| Freelance UA |

Раніше: `E.V.A. CODE™ | Freelance UA`, `Ретуш портретів | Freelance UA`,
`Reels для Cuprus Life | Freelance UA` — **лише в українській версії** (у
`layout.tsx`), EN-сторінок не існувало. EN-варіанти перекладені вперше.

## 3. Meta description

| Кейс | Рішення |
|---|---|
| `it/eva-code` | Збережено наявний ключ `itCases.evaCode.shortDesc` (обидві мови вже перекладені) — нового тексту немає |
| `design/nastya-portrait-retouch` | Збережено наявний ключ `designCases.nastyaPortraitRetouch.shortDesc` — нового тексту немає |
| `video/cuprus-life` | UA: текст із старого `layout.tsx` збережено дослівно. **EN — новий переклад:** «3 Instagram Reels for the Cuprus Life brand — dynamic video editing» |

## 4. Вступ (lead під H1) — без нових текстів

| Кейс | Ключ (UA+EN) |
|---|---|
| `it/eva-code` | `itCases.evaCode.description` |
| `design/nastya-portrait-retouch` | `designCases.nastyaPortraitRetouch.subtitle` |
| `video/cuprus-life` | `videoCases.cuprusLife.subtitle` |

## 5. Тексти секцій — наявні ключі, перенесені в запис

Жоден текст виклику не змінювався по суті; змінилась структура.

| Секція | Ключі (UA+EN) |
|---|---|
| Задача / Рішення | `*.challenge`, `*.solution` (для cuprus — свої заголовки `*.challengeTitle`, `*.solutionTitle`) |
| Матеріали (IT) | `itCases.technicals` + `component1…5 Title/Desc/LinkLabel` |
| Порівнання до/після | `*.processTitle`, `*.processIntro`, `slider1…3 Title/Caption` |
| Галерея фіналів | `*.finalsTitle`, `*.finalsIntro` |
| Результати | `itCases.results` + `result1…N` |
| Відгук | `*.reviewTitle`, `*.reviewText`, `*.reviewAuthor` |
| Команда | `itCases.projectTeam` / `designCases.projectTeam` / `videoCases.projectTeam` + `*.teamMember` |
| Наступний крок | `itCases.nextStep`, `itCases.nextStepDesc`, `itCases.nextStepCta` |
| Схожі роботи | `itCases.relatedProjects`, `itCases.viewProject` |

**Покращення без зміни фактів:**

- Цитата відгуку Cuprus Life була **захардкоджена в JSX українською**
  (`page.tsx`) — тепер це ключ `videoCases.cuprusLife.reviewText`, який уже
  має EN-переклад. Alt скріншота локалізовано («Відгук Cuprus Life» /
  «Cuprus Life review»).
- alt зображень EVA були англійськими в українській сторінці
  («… — desktop/mobile») — тепер alt дорівнює локалізованій назві блоку.

## 6. Нові локалізовані написи (більше немає захардкоджених)

| Що | UA | EN | Де |
|---|---|---|---|
| Хлібні крихти: головна | Головна | Home | `cases.breadcrumb.home` |
| aria-label навігації | Навігаційний ланцюжок | Breadcrumb | `cases.breadcrumb.label` |
| Закрити модалку | Закрити | Close | `cases.ui.close` |
| Попереднє/наступне зображення | Попереднє зображення / Наступне зображення | Previous image / Next image | `cases.ui.previous`, `cases.ui.next` |
| Розгорнути зображення | Переглянути зображення повністю | View image fullscreen | `cases.ui.openImage` |
| Відкрити відео | Відкрити відео повністю | Open video fullscreen | `cases.ui.openVideo` |
| Плей/пауза відеовідгуку | Відтворити відео / Пауза | Play video / Pause | `cases.ui.play`, `cases.ui.pause` |
| Назва діалога повноекранного плеєра | Перегляд відео | Video player | `cases.ui.player` |
| Аудіовідгук: до відтворення | Відтворити аудіовідгук | Play audio review | `cases.ui.playAudioReview` |
| Аудіовідгук: під час відтворення | Призупинити аудіовідгук | Pause audio review | `cases.ui.pauseAudioReview` |
| Тривалість роликів Cuprus | ~33с / ~39с / ~45с | ~33s / ~39s / ~45s | запис `data/case-records/video/cuprus-life.ts` |
| Підписи плиток Cuprus | Reels 1 / 2 / 3 | ті самі | запис (назва формату не перекладається) |

> Усі рядки цієї таблиці — **aria-label/назви інтерфейсу, не видимі тексти
> сторінок**. Публічні формулювання (H1, SEO titles, описи) залишаються на
> погодження власника — див. розділи 1–3 і питання 4 розділу 8.

## 7. Посилання

| Що | Було | Стало | Підстава |
|---|---|---|---|
| CTA «Написати в Telegram» | `https://t.me/freelance_ua` (окремо в кожному кейсі) | `siteConfig.telegram.consultationUrl` = `https://t.me/PREMIUM1914` | п.9 правил редактури: «Telegram з `siteConfig`, не стороння адреса»; так уже зроблено в Header, Footer, Hero, сторінках напрямів і плаваючій кнопці |
| Посилання на напрям | не було | «Дивитись всі кейси» → `/services/{d}#cases` (ключ `cases.allCases` вже існував) | п.9: «природне посилання на відповідний напрям і контактний CTA» |
| «Назад до списку» | `/services/it#cases`, `/cases?tab=design&type=photo-retouch`, `/cases?tab=video` | **збережено без змін** (з локалізованим підписом) | фільтри `?tab=`/`?type=` — дійсні, не SEO-сторінки (`docs/package-1/routes.md`) |
| Зовнішні лінки EVA | `evacode.app`, `t.me/evacode_tm_bot` | **збережено** | склад див. `media-before-after.md` |

## 8. Відкриті фактичні питання

1. **`itCases.evaCode.link` = `https://t.me/asandrasoul_bot`** — не
   використовується (як і до Пакета 4): це бот Asandra Soul, а не E.V.A. CODE.
   На сторінці вже є `evacode.app` і `t.me/evacode_tm_bot`. Додати в нову
   сторінку чи видалити ключ? Прапорець `orphanedI18nLink` зберігається в
   реєстрі (`docs/package-1/issues.json` → `it/eva-code`).
2. **Однаковий текст відгуку Asandra Soul** у ключах `itCases.evaCode.reviewText`
   і `itCases.asandraSoul.reviewText`. Сторінка EVA показує лише
   **відео**-відгук (`/media/testimonials/eva-code.mp4`), текстові ключі не
   відображаються — як і раніше. Підтвердити, що текстовий відгук EVA — це не
   помилка.
3. **Куди веде CTA:** `t.me/freelance_ua` (старі кейс-сторінки) проти
   `t.me/PREMIUM1914` з `siteConfig` (шапка, футер, головна, сторінки
   напрямів). Перероблені сторінки використовують `siteConfig` за правилом
   редактури; підтвердити, що `PREMIUM1914` — правильна адреса консультацій,
   і тоді решта старих сторінок (55 після партії 4) буде вирівняна при
   масовому перенесенні.
4. **Авторство дизайну кейсу «Ретуш портретів»:** на сторінці вказано ключ
   `designCases.team.snizhanaDesigner` = «Сніжана — дизайнер» (той самий
   ключ, що й у кейсу snizhana-telegram-stickers). Підтвердити, що це правильно.
5. **Підпис команди EVA:** `itCases.projectTeam` = «Автор розробки» /
   «Developer» + `itCases.team.andriiDeveloper` = «Андрій — Розробник».
   Підтвердити формулювання.
6. **Тривалість роликів Cuprus** `~33с / ~39с / ~45с` — значення з
   оригінальної сторінки. Звірити з самими файлами (`reel-1…3.mp4`), якщо
   потрібна точність до секунди.
7. **Відгук Cuprus:** текст і автор («Аліна Ушакова», аватар «Alina») — з
   оригінальної сторінки; скріншот є доказом. Підтвердити напис імені.
8. **Нові H1 і SEO titles (розділи 1–2) — публічні формулювання.** Потрібне
   погодження власника до публікації.
9. **Вигляд hero-блоку.** Три оригінальні сторінки мали три різних набори
   параметрів scroll-анімації рамки; спільний компонент використовує один
   набір і показує медіа статично за `prefers-reduced-motion`. Це зміна
   вигляду (не змісту) — підтвердити.

## 9. Партія 1 (12 IT-кейсів) — нові публічні тексти

Статус: **усі тексти цього розділу на погодження власника.** Нічого не
опубліковано. UA-описи сторінок (meta description) **збережено без змін** —
вони перенесені з чинних `layout.tsx` дослівно.

### 9.1 H1 (12)

| Кейс | UA | EN |
|---|---|---|
| `it/asandra-soul` | Asandra Soul — Telegram Mini App для курсів і практик | Asandra Soul — Telegram Mini App for courses and practices |
| `it/darkshare` | DARKSHARE — SaaS-платформа для кібербезпеки | DARKSHARE — cybersecurity SaaS platform |
| `it/epiland` | Epiland — Telegram Mini App для парку розваг | Epiland — Telegram Mini App for an amusement park |
| `it/importera` | Імпортера — корпоративний сайт для B2B-дистриб'ютора | Importera — corporate website for a B2B distributor |
| `it/kroscar-detailing` | KROSCAR Detailing — лендінг для детейлінг-студії | KROSCAR Detailing — landing page for a detailing studio |
| `it/liudmyla-tsybrii` | Liudmyla Tsybrii — сайт-портфоліо для бізнес-коуча | Liudmyla Tsybrii — portfolio website for a business coach |
| `it/md-dental` | M+D Dental — сайт двох стоматологічних клінік | M+D Dental — website for two dental clinics |
| `it/mnm-detailing` | MNM Detailing — редизайн сайту детейлінг-студії | MNM Detailing — redesign of a detailing studio website |
| `it/nextcup` | NextCup — оновлення інтернет-магазину | NextCup — online store update |
| `it/pivden-solar` | Південь Солар — конверсійний лендинг для монтажу СЕС | Pivden Solar — conversion landing for solar installation |
| `it/prime-auto-shipping` | Prime Auto Shipping — конверсійний лендинг перевезень авто | Prime Auto Shipping — conversion landing for vehicle shipping |
| `it/repair-collision` | Repair Collision — сайт для автосервісної компанії | Repair Collision — website for a car service company |

### 9.2 SEO title (12)

| Кейс | UA | EN |
|---|---|---|
| `it/asandra-soul` | Asandra Soul — Telegram Mini App і backend для автоматизації продажів \| Freelance UA | Asandra Soul — Telegram Mini App and backend for sales automation \| Freelance UA |
| `it/darkshare` | DARKSHARE — SaaS для кібербезпеки з OSINT-модулями \| Freelance UA | DARKSHARE — cybersecurity SaaS with OSINT modules \| Freelance UA |
| `it/epiland` | Epiland — бронювання днів народжень у Telegram Mini App \| Freelance UA | Epiland — birthday booking in a Telegram Mini App \| Freelance UA |
| `it/importera` | Імпортера — двомовний корпоративний сайт B2B-дистриб'ютора \| Freelance UA | Importera — bilingual corporate website for a B2B distributor \| Freelance UA |
| `it/kroscar-detailing` | KROSCAR Detailing — лендінг із записом онлайн і галереєю робіт \| Freelance UA | KROSCAR Detailing — landing with online booking and a work gallery \| Freelance UA |
| `it/liudmyla-tsybrii` | Liudmyla Tsybrii — сайт-портфоліо з послугами та кейсами \| Freelance UA | Liudmyla Tsybrii — portfolio site with services and cases \| Freelance UA |
| `it/md-dental` | M+D Dental — сайт стоматології з онлайн-записом і послугами \| Freelance UA | M+D Dental — dental clinic website with online booking and services \| Freelance UA |
| `it/mnm-detailing` | MNM Detailing — редизайн сайту зі слайдером до/після \| Freelance UA | MNM Detailing — website redesign with a before/after slider \| Freelance UA |
| `it/nextcup` | NextCup — оновлення каталогу та checkout на Хорошоп \| Freelance UA | NextCup — catalogue and checkout update on Horoshop \| Freelance UA |
| `it/pivden-solar` | Південь Солар — лендинг СЕС із каталогом комплектів \| Freelance UA | Pivden Solar — solar landing with a kit catalogue \| Freelance UA |
| `it/prime-auto-shipping` | Prime Auto Shipping — лендинг для транспортування авто в США \| Freelance UA | Prime Auto Shipping — landing for vehicle shipping in the USA \| Freelance UA |
| `it/repair-collision` | Repair Collision — сайт автосервісу з CRM і портфоліо \| Freelance UA | Repair Collision — auto repair website with CRM and portfolio \| Freelance UA |

### 9.3 EN meta description (6 перекладів; решта 6 — наявні ключі)

UA-текст у цих шести випадках **не змінювався** (узято з `layout.tsx`);
нижче — запропонований EN-переклад:

| Кейс | EN description |
|---|---|
| `it/epiland` | Telegram bot and Mini App for an amusement park: birthday booking in 4 steps, a schedule and requests for managers. |
| `it/importera` | Corporate website for a B2B distributor with 250+ brands, 50+ countries, two languages and a partners gallery. |
| `it/kroscar-detailing` | Landing page for the KROSCAR detailing studio (Lviv) with online booking, a work gallery, a before/after slider and Google reviews. |
| `it/md-dental` | Website for two dental clinics in Sumy: 23 services, a team of dentists with photos, online booking, trust from insurance companies and an FAQ. |
| `it/nextcup` | An online store update on Horoshop with a new design, catalogue, banners and a faster checkout. Result: conversion growth. |
| `it/pivden-solar` | Conversion landing for a solar installation company with a kit catalogue, a works gallery and an admin panel. Daily enquiries from targeted ads. |

> Цифри в цих описах (250+, 50+, 23, 200+ тощо) — **буквальні переклади
> наявних UA-описів**, вони вже опубліковані в UA і залишаються в
> `facts-to-confirm.md` (розділ C) до підтвердження. Жодної нової цифри не
> додано.

### 9.4 Інші нові рядки партії

| Що | UA | EN | Де |
|---|---|---|---|
| Підпис аудіовідгуку (asandra-soul) | Голосовий відгук | Voice review | запис `data/case-records/it/asandra-soul.ts` (раніше був захардкоджений в JSX лише українською) |

### 9.5 Прибрані непідтверджені твердження (за погодженням власника)

Погодження текстів **не закриває** перелік непідтверджених фактів. Прибрано
лише те, що названо власником; решта лишається в `facts-to-confirm.md` до
перевірки перед публікацією.

| Твердження | Де було (UA + EN) | Що зроблено |
|---|---|---|
| «Результат: зростання конверсії» / «Result: conversion growth» (NextCup) | meta description у записі `it/nextcup` | речення прибрано з обох мов |
| «Щоденні заявки з таргетованої реклами» / «Daily enquiries…» (Південь Солар) | meta description у записі `it/pivden-solar` | речення прибрано з обох мов |
| «Забезпечує щоденні заявки…» / «Provides daily leads…» | `itCases.pivdenSolar.description` (лід) і `shortDesc` (картка) | речення прибрано з обох мов і з обох ключів |
| «підвищує довіру на 40%+» / «increases trust by 40%+» | `itCases.repairCollision.result8` | відсоток прибрано, решта речення збережена |
| «побільшує довіру на 40%+» | `itCases.primeAuto.result5` | відсоток прибрано |
| «підвищують довіру на 60%+» / «increase trust by 60%+» | `itCases.pivdenSolar.result5` | відсоток прибрано |

Жодних інших цифр не змінено; наявні (300+, 250+, 4.9⭐, −40% тощо) залишаються
у `facts-to-confirm.md` як такі, що потребують перевірки.

### 9.6 Що змінилося структурно (без нового тексту)

- `it/prime-auto-shipping`, `it/repair-collision` — в оригіналі **немає
  заголовка** секції відгуку (лише цитата): у записі `title` не задано,
  заголовок не рендериться.
- `it/asandra-soul` — відгук був `<audio>`: схему розширено типом
  `review.kind = "audio"` (кнопка відтворення + автор + підпис).
- `it/mnm-detailing` — картки компонентів містять слайдер «до/після» замість
  галереї: схему розширено полем `FeatureItem.slider`.
- `it/epiland` — дубль посилання на бота в hero-блоку прибрано; URL
  `https://t.me/epilandparkbot` збережено в картці першого компонента.

## 11. Партія 2 (8 IT-кейсів) — нові публічні тексти

Статус: **погоджено власником** (заголовки та переклади). UA-описи сторінок
(meta description) збережено без змін. **Непідтверджені цифри в наявних
текстах залишаються відкритими** — `facts-to-confirm.md`, розділи A/C;
перевірити перед публікацією.

### 11.1 H1 (8)

| Кейс | UA | EN |
|---|---|---|
| `it/route-core` | RouteCore — рекрутинговий лендинг для найму інженерів | RouteCore — recruitment landing page for hiring engineers |
| `it/ruslan-aviation` | Ruslan Aviation — інтернет-магазин авіаційних компонентів | Ruslan Aviation — online store of aviation components |
| `it/sdent` | S-Dent — редизайн сайту стоматологічної клініки | S-Dent — dental clinic website redesign |
| `it/selloflow` | Selloflow — платформа для створення магазинів | Selloflow — platform for building online stores |
| `it/serezha-shop` | Serezha Shop — лендінг-каталог кросівок зі США | Serezha Shop — sneaker catalogue landing page |
| `it/shkiper-drop` | Shkiper Drop — лендінг streetwear дроп-магазину | Shkiper Drop — streetwear drop store landing page |
| `it/stretching-ch` | Stretching.ch — Instagram DM бот для фітнес-тренерки | Stretching.ch — Instagram DM bot for a fitness coach |
| `it/voltone-pro` | Voltone.pro — інтернет-магазин павербанків і зарядних пристроїв | Voltone.pro — online store of power banks and chargers |

### 11.2 SEO title (8)

| Кейс | UA | EN |
|---|---|---|
| `it/route-core` | RouteCore — лендинг для найму інженерів з процесом відбору \| Freelance UA | RouteCore — recruitment landing page with a selection process \| Freelance UA |
| `it/ruslan-aviation` | Ruslan Aviation — e-commerce з фільтрами та конверсійним дизайном \| Freelance UA | Ruslan Aviation — e-commerce with filters and a conversion-focused design \| Freelance UA |
| `it/sdent` | S-Dent — сайт стоматології з послугами, лікарями та слайдером до/після \| Freelance UA | S-Dent — dental website with services, dentists and a before/after slider \| Freelance UA |
| `it/selloflow` | Selloflow — SaaS для магазинів: каталог, замовлення, Telegram-бот \| Freelance UA | Selloflow — SaaS for stores: catalogue, orders, Telegram bot \| Freelance UA |
| `it/serezha-shop` | Serezha Shop — каталог кросівок зі США з відгуками \| Freelance UA | Serezha Shop — catalogue of sneakers from the USA with reviews \| Freelance UA |
| `it/shkiper-drop` | Shkiper Drop — лендінг дроп-магазину з каталогом і Telegram-CTA \| Freelance UA | Shkiper Drop — drop store landing with a catalogue and Telegram CTA \| Freelance UA |
| `it/stretching-ch` | Stretching.ch — Instagram DM бот для лідогенерації у фітнесі \| Freelance UA | Stretching.ch — Instagram DM bot for fitness lead generation \| Freelance UA |
| `it/voltone-pro` | Voltone.pro — каталог, кабінет і доставка павербанків \| Freelance UA | Voltone.pro — power bank catalogue, account and delivery \| Freelance UA |

У нових SEO titles **навмисно не винесено непідтверджені цифри** з наявних
описів (14 послуг, 8 лікарів, 4-етапний процес, знижки до −40%, 2 хвилини тощо) —
вони лишилися в текстах, де вже були, і залишаються в `facts-to-confirm.md`.

### 11.3 EN meta description (4 переклади; решта 4 — наявні ключі)

UA-текст цих чотирьох описів **не змінювався**:

| Кейс | EN description |
|---|---|
| `it/route-core` | A recruitment landing page for hiring BAS and ZennoPoster engineers with benefits, requirements and a 4-step selection process. UA/EN multilingual. |
| `it/sdent` | Website redesign for a dental clinic with 14 services, 8 dentists, reviews and a before/after slider. |
| `it/serezha-shop` | Conversion catalogue landing for selling sneakers from the USA, with a model catalogue, reviews and direct contact via Telegram. |
| `it/voltone-pro` | Online store for power banks and chargers with a catalogue, discounts up to −40%, reviews, an account and fast delivery. |

> Це переклади вже опублікованих UA-описів (цифри — як є, без змін); вони
> залишаються в `facts-to-confirm.md` до перевірки перед публікацією.

### 11.4 Структурні примітки (без нового тексту)

- `it/ruslan-aviation` — відгук зі скріншотом; заголовок секції в оригіналі
  є — спільний ключ `itCases.review` («Відгук клієнта 💬» / «Client review 💬»),
  і він **відновлений у записі** (`title: key("itCases.review")`). Без
  заголовка лише `prime-auto-shipping` і `repair-collision` — у їхніх
  вихідних сторінках його справді немає.
- `it/stretching-ch` — компоненти відсутні як `components`-масив (сторінкові
  секції вручну), **перенесено вручну**: `featureList` (component1 з
  зображенням) + `gallery` (component2: заголовок, текст, зображення) —
  порядок і підписи збережені; генератор для такої структури тепер
  видає blockers (див. `batch-2.md`).
- `it/sdent`, `it/shkiper-drop` — картки зі слайдером «до/після»
  (`FeatureItem.slider`), як у `mnm-detailing`.
- Посилання «Відвідати сайт» усіх чотирьох кейсів з лінком збережені з
  підписом; як і в партії 1, секція `links` рендериться перед відгуком
  (у вихідній сторінці цей CTA був ближче до hero).

## 12. Партія 3 (12 дизайн-кейсів) — нові публічні тексти

Статус: **погоджено власником** (H1, SEO titles, EN-переклад). UA-описи
сторінок (meta description) збережено без змін; карткові тексти не
змінювалися. **Непідтверджені цифри в наявних текстах залишаються відкритими**
— `facts-to-confirm.md`, розділи A/C, до перевірки перед публікацією.

### 12.1 H1 (12)

| Кейс | UA | EN |
|---|---|---|
| `design/barvy-interior` | BARVY interior — ретуш і кольорокорекція зйомки | BARVY interior — retouching and color grading of the shoot |
| `design/photo-retouch` | Ретуш і кольорокорекція фото | Photo retouching and color grading |
| `design/globus-billboard` | GLOBUS — дизайн білбордів | GLOBUS — billboard design |
| `design/snizhana-telegram-stickers` | Стікери для Telegram — дизайн пака емоцій | Telegram stickers — emotion pack design |
| `design/smm-case-presentation` | Презентація SMM-кейсів | SMM case presentation |
| `design/pink-pr-flyers` | Pink PR — комплект флаєрів для друку | Pink PR — print flyer set |
| `design/gel-polish` | Gel Polish — рекламний постер | Gel Polish — advertising poster |
| `design/mydutyfree` | MyDutyFree — промо-банер із 3D-персонажем | MyDutyFree — promo banner with a 3D character |
| `design/vikontse-logo` | Віконце — розробка логотипу | Vikontse — logo design |
| `design/schonheit-gift-certificate` | Schönheit — подарунковий сертифікат | Schönheit — gift certificate |
| `design/sembud-repair` | SEMBUD — рекламний банер ремонтної компанії | SEMBUD — banner for a repair company |
| `design/apple-tecnologia` | Apple Tecnologia — рекламний банер техніки | Apple Tecnologia — tech advertising banner |

### 12.2 SEO title (12)

| Кейс | UA | EN |
|---|---|---|
| `design/barvy-interior` | BARVY interior — до/після обробки інтер'єрної зйомки \| Freelance UA | BARVY interior — before/after editing of an interior photo shoot \| Freelance UA |
| `design/photo-retouch` | Ретуш різних типів кадрів — від авто до портретів \| Freelance UA | Retouching of different frame types — from cars to portraits \| Freelance UA |
| `design/globus-billboard` | GLOBUS — білборди для будівельної компанії \| Freelance UA | GLOBUS — billboards for a construction company \| Freelance UA |
| `design/snizhana-telegram-stickers` | Авторські стікери для Telegram: єдина стилістика персонажа \| Freelance UA | Original Telegram stickers: a single character style \| Freelance UA |
| `design/smm-case-presentation` | Шаблон презентації для показу SMM-кейсів \| Freelance UA | Presentation template for showing SMM cases \| Freelance UA |
| `design/pink-pr-flyers` | Друковані флаєри для маркетинг-платформи Pink PR \| Freelance UA | Print flyers for the Pink PR marketing platform \| Freelance UA |
| `design/gel-polish` | Постер гель-лаку: якість, стійкість і колір \| Freelance UA | Gel polish poster: quality, durability and color \| Freelance UA |
| `design/mydutyfree` | Промо-банер MyDutyFree з фірмовим 3D-персонажем \| Freelance UA | MyDutyFree promo banner with a branded 3D character \| Freelance UA |
| `design/vikontse-logo` | Логотип для компанії «Віконце» і фірмова типографіка \| Freelance UA | Logo and brand typography for the Vikontse company \| Freelance UA |
| `design/schonheit-gift-certificate` | Подарунковий сертифікат для б'юті-салону \| Freelance UA | Gift certificate for a beauty salon \| Freelance UA |
| `design/sembud-repair` | Банер ремонтної компанії у Львові: ціна й гарантія \| Freelance UA | Banner for a Lviv repair company: price and warranty \| Freelance UA |
| `design/apple-tecnologia` | Рекламний банер техніки Apple \| Freelance UA | Apple tech advertising banner \| Freelance UA |

У нових H1/SEO titles **не винесено непідтверджені цифри** з наявних текстів
(напр. «знижку до 40%» в `apple-tecnologia`) — вони лишилися там, де були, і
залишаються в `facts-to-confirm.md` до перевірки перед публікацією.

### 12.3 EN meta description (1 переклад; решта 11 — наявні ключі)

UA-текст **не змінювався**; перекладено лише той опис, якого немає в словнику:

| Кейс | EN description |
|---|---|
| `design/barvy-interior` | Color grading and retouching of an interior photo shoot for the BARVY interior design studio: hallway, wardrobe, bedroom, bathroom. Before/after. |

### 12.4 Повернений вихідний текст (без нових формулювань)

За зауваженням перевіряльника повернуто видимий текст, який загубився під
час автоматичного мапінга:

| Кейс | Що повернуто | UA (наявний текст) | EN (наявний текст) |
|---|---|---|---|
| `snizhana-telegram-stickers` | вступ галереї (`galleryDesc`) | Фрагменти пака: від привітань і радості до здивування, смутку та типових реакцій у діалозі — усе намальовано в одній стилістиці. | Fragments of the pack: from greetings and joy to surprise, sadness and typical reply reactions — all drawn in one style. |
| `snizhana-telegram-stickers` | підпис лінка на пак (`packCta`) | Переглянути пак | View the pack |
| `snizhana-telegram-stickers` | напис категорії в hero (`category` замість карткового `categoryShort`) | TELEGRAM STICKERS / BRANDING | TELEGRAM STICKERS / BRANDING |
| `globus-billboard` | підпис скріншота відгуку (`reviewScreenshotCaption`) | Скріншот реального відгуку з переписки | Screenshot of the real review from our chat |
| `pink-pr-flyers` | той самий підпис | Скріншот реального відгуку з переписки | Screenshot of the real review from our chat |

Жодного з цих рядків не перекладалося й не редагувалося — це **наявні**
значення словника. Решта нових текстів партії — розділи 12.1–12.3 вище.

### 12.5 Структурні примітки (без нового тексту)

- **Нові типи секцій** у цій партії (розширення схеми, не переписування
  кейсів під шаблон): `checklist` («підхід» з `approachTitle`/`approachIntro`),
  галерея з підписами кожного зображення (`title`/`caption`/`wide`) і
  колонками `1|2|3`, hero-варіант `imageGrid` (масив `heroImages`), картка
  посилання з заголовком/текстом/іконкою (Telegram-пак Сніжани).
- `design/barvy-interior`, `design/photo-retouch`: hero з 3 зображень,
  `checklist` (4–5 пунктів), `compare` (5–10 слайдерів «до/після» з
  підписами), `results`.
- `design/snizhana-telegram-stickers`: галерея 10 стікерів без підписів +
  промо-картка з лінком на пак (`links` з `title`/`text`/`icon: "telegram"`).
- `design/globus-billboard`: галерея 4 макети з підписами кожного зображення
  (`itemN.title` / `itemN.caption`).
- Решта — галереї з 1 зображенням і секцією `finalsTitle`/`finalsIntro`.
- Відгуки: 4 `screenshot` (з окремим `reviewScreenshotAlt` у globus і pink)
  і 8 `text`; авторство й текст — як у вихідних сторінках.

## 13. Партія 4 (10 дизайн-кейсів) — нові публічні тексти

Статус: **на погодження власника.** UA-описи сторінок (meta description)
збережено без змін; карткові тексти не змінювалися. Непідтверджені цифри в
наявних текстах залишаються відкритими — `facts-to-confirm.md` (A/C).

### 13.1 H1 (10)

| Кейс | UA | EN |
|---|---|---|
| `design/color-correction` | Кольорокорекція відео: світло, колір і настрій кадру | Video color grading: light, color and the mood of the frame |
| `design/crypto-chat-manager-vacancy` | Вакансія для крипто-офісу | Job vacancy for a crypto office |
| `design/divorce-legal-ad` | Юридична консультація — рекламний банер | Legal consultation — advertising banner |
| `design/f5-guitars-youtube` | F5 Guitars — обкладинка для YouTube | F5 Guitars — YouTube thumbnail |
| `design/giesbrecht-pv` | Giesbrecht PV — банер для СЕС | Giesbrecht PV — solar banner |
| `design/gopro-hero13` | GoPro — продуктовий постер | GoPro — product poster |
| `design/hope-media-group` | HOPE Media Group — брендинг для виставки | HOPE Media Group — branding for an exhibition |
| `design/mht-clinic-billboard` | MHT Clinic — білборд для клініки | MHT Clinic — billboard for the clinic |
| `design/nastya-smm` | Instagram-візуали для SMM | Instagram visuals for SMM |
| `design/prestige-school-billboard` | Престиж — білборд приватної школи | Prestige — private school billboard |

### 13.2 SEO title (10)

| Кейс | UA | EN |
|---|---|---|
| `design/color-correction` | Кольорокорекція відео — робота зі світлом, кольором та настроєм кадру \| Freelance UA | Video color grading — working with light, color and the mood of the frame \| Freelance UA |
| `design/crypto-chat-manager-vacancy` | Банер вакансії для крипто-офісу в Дніпрі \| Freelance UA | Job banner for a crypto office in Dnipro \| Freelance UA |
| `design/divorce-legal-ad` | Банер юридичної консультації з розлучення \| Freelance UA | Banner for divorce legal consultation \| Freelance UA |
| `design/f5-guitars-youtube` | Кліковабельна обкладинка для відео про гітари \| Freelance UA | Clickable thumbnail for a guitars video \| Freelance UA |
| `design/giesbrecht-pv` | Рекламний банер сонячних електростанцій для німецькомовного ринку \| Freelance UA | Advertising banner for solar plants for the German-speaking market \| Freelance UA |
| `design/gopro-hero13` | Постер камери GoPro Black з технічними перевагами \| Freelance UA | GoPro Black camera poster with key technical features \| Freelance UA |
| `design/hope-media-group` | Брендинг для виставки в США: листівки, банери, стікери \| Freelance UA | Branding for a US exhibition: postcards, banners, stickers \| Freelance UA |
| `design/mht-clinic-billboard` | Білборд MHT Clinic: дизайн зовнішньої реклами \| Freelance UA | MHT Clinic billboard: outdoor advertising design \| Freelance UA |
| `design/nastya-smm` | Брендовані обкладинки для Instagram-контенту \| Freelance UA | Branded covers for Instagram content \| Freelance UA |
| `design/prestige-school-billboard` | Білборд приватної початкової школи у фірмовому стилі \| Freelance UA | Private primary school billboard in the school's own style \| Freelance UA |

### 13.3 EN meta description (2 переклади) і 1 alt

UA-тексти **не змінювалися**:

| Кейс | Що | EN |
|---|---|---|
| `design/color-correction` | meta description | Video color grading — working with light, color and the mood of the frame. |
| `design/hope-media-group` | meta description | Branding solution for an exhibition in the US: printed postcards and banners, bookmarks, stickers and badges — one visual story for the Prophecy Road Map. |
| `design/color-correction` | alt скріншота відгуку (раніше захардкоджений лише UA) | Review — the editing approach |
| `design/color-correction` | позначка тривалості на hero-плитці (оригінал мав лише UA «~10с») | ~10s |

> Позначки `9:16` (color-correction) і «— QR» / «— content» (hope-media,
> mobile-частини) — оригінальний текст в обох мовах, без перекладу, як у
> вихідних сторінках.

> `design/moto-school-window-branding`: EN-переклад опису було підготовлено,
> але **кейс відкладено** (див. `batch-4.md`), тому текст не застосований.

### 13.4 Структурні примітки (без нового тексту)

- `design/color-correction` — **hero-відео** (варіант hero `video`: відео з
  постером, **інтерактивна плитка** — кнопка відкриває спільний повноекранний
  плеєр, як `openFullscreen` в оригіналі; позначки `~10с`/`~10s` і `9:16`) +
  `checklist` + `results`; відгук — скріншот без тексту/автора (зроблено
  `author` опціональним).
- `design/hope-media-group` — **`galleryGroups`**: батьківський заголовок
  `finalsTitle` + три підзаголовки груп; галерея 8 макетів з підписами й
  `wide` (повний рядок у сітці з 3 колонок); **responsive-розбиття**
  `hope-media4/8.webp` за зразком оригінального `WideImage` (desktop — цілий
  макет, mobile — дві частини однієї картинки; повне зображення залишається
  в галереї та лайтбоксі); обмеження ширини портрета `hope-media5.webp`
  (280px у галереї, `max-w-md` у групах); **відео**-відгук.
- `design/mht-clinic-billboard` — **перенесено вручну** (генератор відмовився
  через inline-зображення поза hero/відгуком): hero → задача/рішення →
  галерея з підписом → результати → відгук.
- `design/nastya-smm` — hero-сітка й галерея з тих самих двох зображень
  (в оригіналі hero рендерить їх на мобільному й десктопному макеті; запис
  зберігає кожен файл один раз — набір і порядок звіряються перевіркою).
- Решта — галереї з 1 зображенням і секцією `finalsTitle`/`finalsIntro`.

