# Пакет 3 — нові та перероблені тексти сторінок напрямів

На погодження. Джерело — `lib/i18n.ts`, згенеровано скриптом, не переписано вручну.
Правило: жодних непідтверджених тверджень. Склад робіт залежить від завдання,
тому «Що входить» описує процес, а не фіксований склад кожного замовлення.

| # | Ключ | UA | EN |
|---|---|---|---|

### Заголовок і вступ сторінки напряму

| # | Ключ | UA | EN |
|---|---|---|---|
| 1 | `services.it.category` | ІТ-розробка | IT Development |
| 2 | `services.design.category` | Дизайн | Design |
| 3 | `services.video.category` | Відео | Video |
| 4 | `itCases.desc` | Цифрові продукти та рішення, створені під задачі бізнесу. | Digital products and solutions built for business needs. |
| 5 | `designCases.desc` | Брендинг, поліграфія та цілісні візуальні системи для бізнесу й подій. | Brand identity, print design and cohesive visual systems for businesses and events. |
| 6 | `videoCases.desc` | Reels, моушн-дизайн, YouTube та AI-відео | Reels, motion design, YouTube & AI video |

### SEO-метадані (title / description)

| # | Ключ | UA | EN |
|---|---|---|---|
| 7 | `meta.services.it.title` | ІТ-розробка — Freelance UA | IT Development — Freelance UA |
| 8 | `meta.services.it.description` | Telegram-боти, веб-сайти, CRM-системи, інтернет-магазини та API-інтеграції. Портфоліо ІТ-проєктів агенції Freelance UA. | Telegram bots, websites, CRM systems, e-commerce stores and API integrations. Portfolio of IT projects by Freelance UA agency. |
| 9 | `meta.services.design.title` | Дизайн — Freelance UA | Design — Freelance UA |
| 10 | `meta.services.design.description` | Брендинг, поліграфія, банери, ретуш фотографій та SMM-дизайн. Портфоліо дизайнерських проєктів агенції Freelance UA. | Branding, print design, banners, photo retouching and SMM design. Portfolio of design projects by Freelance UA agency. |
| 11 | `meta.services.video.title` | Відео — Freelance UA | Video — Freelance UA |
| 12 | `meta.services.video.description` | Відеомонтаж, моушн-дизайн, рекламні ролики, reels та AI-відео. Портфоліо відео-проєктів агенції Freelance UA. | Video editing, motion design, promo videos, reels and AI video. Portfolio of video projects by Freelance UA agency. |
| 12а | `meta.home.description` | Freelance UA — digital-агенція: IT, дизайн та відео під ключ. Розробка сайтів і Telegram-ботів, брендинг, відеомонтаж та motion-дизайн | Freelance UA is a digital agency delivering end-to-end IT, design and video services |

`meta.home.description` — опис головної сторінки (description, Open Graph,
Twitter). Незалежний від `hero.desc`: видимий текст hero і метадані тепер
розділені, тож зміна одного не тягне зміну іншого. UA-опис — новий, погоджений
власником; EN-опис збережено дослівно.

### Задачі клієнтів

| # | Ключ | UA | EN |
|---|---|---|---|
| 13 | `direction.tasks.it.1` | Потрібен сайт, лендінг чи інтернет-магазин | You need a website, landing page or online store |
| 14 | `direction.tasks.it.2` | Потрібна CRM або автоматизація роботи з клієнтами | You need a CRM or client workflow automation |
| 15 | `direction.tasks.it.3` | Потрібен Telegram-бот, Mini App або інтеграція API | You need a Telegram bot, Mini App or API integration |
| 16 | `direction.tasks.design.1` | Потрібен логотип чи візуальний стиль бренду | You need a logo or a consistent brand identity |
| 17 | `direction.tasks.design.2` | Потрібні банери, флаєри або презентація | You need banners, flyers or a presentation |
| 18 | `direction.tasks.design.3` | Потрібна ретуш або обробка фотографій | You need photo retouching or editing. |
| 19 | `direction.tasks.video.1` | Потрібні Reels або Shorts для соцмереж | You need Reels or Shorts for social media |
| 20 | `direction.tasks.video.2` | Потрібне моушн-оформлення: інтро, логотип, презентація | You need motion design: intros, logos, presentations |
| 21 | `direction.tasks.video.3` | Потрібний рекламний ролик або AI-відео | You need a promo video or AI-generated video |
| 22 | `direction.tasksTitle` | Задачі, які ми вирішуємо | Problems we solve |

### Список послуг

| # | Ключ | UA | EN |
|---|---|---|---|
| 23 | `services.it.1` | Telegram-боти | Telegram bots |
| 24 | `services.it.2` | Веб-сайти та лендінги | Websites & landing pages |
| 25 | `services.it.3` | Інтернет-магазини | E-commerce stores |
| 26 | `services.it.4` | CRM-системи | CRM systems |
| 27 | `services.it.5` | API-інтеграції | API integrations |
| 28 | `services.it.6` | Автоматизація бізнесу | Business automation |
| 29 | `services.it.7` | Мобільна розробка | Mobile development |
| 30 | `services.design.1` | Графічний дизайн | Graphic design |
| 31 | `services.design.2` | Брендинг та логотипи | Branding & logos |
| 32 | `services.design.3` | YouTube-банери | YouTube banners |
| 33 | `services.design.4` | Банери для соцмереж | Social media banners |
| 34 | `services.design.5` | Презентації | Presentations |
| 35 | `services.video.1` | Відеомонтаж | Video editing |
| 36 | `services.video.2` | Моушн-дизайн | Motion design |
| 37 | `services.video.3` | Рекламні ролики | Promo videos |
| 38 | `services.video.4` | Reels та Shorts | Reels & Shorts |
| 39 | `services.video.5` | Відеоогляди | Video reviews |
| 40 | `services.video.6` | AI-відео | AI video |

### Матеріал «before/after» (перенесено з модального вікна)

| # | Ключ | UA | EN |
|---|---|---|---|
| 41 | `services.it.slider` | Від коду до продакшну | From code to production |
| 42 | `services.it.slider.desc` | Перетворюємо чистий код на швидкі, сучасні веб-сайти. | We transform clean code into fast, modern websites. |
| 43 | `services.design.slider` | Від концепту до дизайну | From concept to design |
| 44 | `services.design.slider.desc` | Втілюємо ідеї в життя з вражаючим візуальним дизайном. | We bring ideas to life with stunning visual design. |
| 45 | `services.video.slider` | Від сирого матеріалу до фінального монтажу | From raw footage to final cut |
| 46 | `services.video.slider.desc` | Професійний відеомонтаж та моушн-дизайн. | Professional video editing and motion design. |

### Що входить у роботу

| # | Ключ | UA | EN |
|---|---|---|---|
| 47 | `direction.includes.it.1` | Розробка від концепції та прототипу до запуску | Development from concept and prototype to launch |
| 48 | `direction.includes.it.2` | Інтеграції, які потрібні саме вашому проєкту: Telegram, API, CRM, платіжні системи | Integrations your project actually needs: Telegram, API, CRM, payment systems |
| 49 | `direction.includes.it.3` | Адмін-панель чи кабінет для керування — якщо цього потребує продукт | An admin panel or dashboard — when the product needs one |
| 50 | `direction.includes.design.1` | Концепція та візуальна система | Concept and visual system |
| 51 | `direction.includes.design.2` | Макети для digital і друку | Layouts for digital and print |
| 52 | `direction.includes.design.3` | Підготовка файлів до передачі | Production-ready files for handover |
| 53 | `direction.includes.video.1` | Монтаж і робота з матеріалом | Editing and working with your footage |
| 54 | `direction.includes.video.2` | Моушн-графіка та візуальні акценти | Motion graphics and visual accents |
| 55 | `direction.includes.video.3` | Підготовка у форматах під платформи | Exports prepared for each platform |
| 56 | `direction.includesTitle` | Що входить у роботу | What's included |

### Процес і умови

| # | Ключ | UA | EN |
|---|---|---|---|
| 57 | `process.title` | Як ми працюємо | How we work |
| 58 | `pricing.desc` | Кожен проєкт унікальний — ціна завжди індивідуальна | Every project is unique — pricing is always individual |
| 59 | `process.1.title` | Знайомство | Getting to know you |
| 60 | `process.1.desc` | Обговорюємо вашу ідею, цілі та бюджет. | We discuss your idea, goals, and budget. |
| 61 | `process.2.title` | Планування | Planning |
| 62 | `process.2.desc` | Складаємо ТЗ, визначаємо терміни та етапи. | We create a technical specification, set deadlines and stages. |
| 63 | `process.3.title` | Розробка | Development |
| 64 | `process.3.desc` | Створюємо ваш проєкт з регулярними звітами. | We build your project with regular progress updates. |
| 65 | `process.4.title` | Здача | Delivery |
| 66 | `process.4.desc` | Фінальна перевірка, правки та передача результату. | Final review, revisions, and handover of the finished result. |

### Блок кейсів і кнопки

| # | Ключ | UA | EN |
|---|---|---|---|
| 67 | `services.it.cta.title` | Хочете замовити розробку? | Want to order development? |
| 68 | `services.it.cta.desc` | Опишіть вашу ідею — ми оцінимо проєкт та запропонуємо рішення. | Describe your idea — we'll evaluate the project and suggest a solution. |
| 69 | `services.design.cta.title` | Хочете замовити дизайн? | Want to order design? |
| 70 | `services.design.cta.desc` | Розкажіть про ваш проєкт — створимо візуал, який вражає. | Tell us about your project — we'll create a stunning visual. |
| 71 | `services.video.cta.title` | Хочете замовити відео? | Want to order video? |
| 72 | `services.video.cta.desc` | Опишіть вашу ідею — змонтуємо ролик, який запам'ятовується. | Describe your idea — we'll edit a video that stands out. |
| 73 | `direction.viewWork` | Переглянути роботи | View our work |
| 74 | `direction.casesTitle` | Усі кейси напряму | All cases in this direction |

Усього рядків: 74. Пропущених ключів: 0 (перевірено генератором).

## Питання на погодження

1. `direction.includes.it.2` / `.3` — «Інтеграції, які потрібні саме вашому проєкту»
   та «Адмін-панель чи кабінет — якщо цього потребує продукт». Сформульовано так, щоб
   не обіцяти CRM, платежі й адмін-панель в кожному IT-замовленні. Потрібне підтвердження
   формулювання власником.
2. `direction.tasks.*` — три задачі на кожен напрям. Це добірка, не вичерпний перелік.
   Підтвердити, що саме ці три найкраще описують звернення клієнтів.
3. `services.{it,design,video}.slider*` — підписи до матеріалу before/after, перенесеного
   з колишніх модальних вікон. Тексти не змінювались по суті; потрібне підтвердження, що
   вони доречні поза модальним вікном.
4. `meta.services.*` — SEO title/description. Містять перелік послуг і згадку «Портфоліо».
   Підтвердити перелік і відсутність обіцянок.

## Застосовані рішення власника

### `direction.tasks.design.3` — прибрано згадку відео

Запропоновано три варіанти; власник погодив текст без згадки відеомонтажу
(окремий напрям). Зastосовано:

| Варіант | UA | EN | Статус |
|---|---|---|---|
| A | Фото чи відео потребують професійної обробки | Your photos or videos need professional editing | замінено |
| B | Потрібен ретуш або обробка фотографій | Photos need professional retouching or editing | запропоновано |
| **—** | **Потрібна ретуш або обробка фотографій** | **You need photo retouching or editing.** | **застосовано** |

### Описи головної винесено в окремі ключі метаданих

`meta.home.description` (UA/EN) незалежні від `hero.desc`. Раніше EN-опис
головної читав `hero.desc`, тож зміна видимого hero-тексту автоматично міняла
метадані. Тепер:

| Ключ | Призначення |
|---|---|
| `meta.home.description` (uk) | description / Open Graph / Twitter головної UA |
| `meta.home.description` (en) | description / Open Graph / Twitter головної EN |
| `hero.desc` | лише видимий текст hero, на метадані не впливає |

Чинний EN-опис збережено дослівно. UA-опис — новий, погоджений власником.
