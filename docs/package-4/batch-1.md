# Партія 1 — 12 IT-кейсів (Пакет 4)

Стан: **перенесено й перевірено; зупинено для незалежної перевірки.**
Публікацію не виконано. Локальний перегляд: **http://localhost:3011**.

Решта **85 кейсів** — **8 IT + 23 design + 54 video = 85**
(21 − 13 перенесених IT, 24 − 1 design, 55 − 1 video; разом 100 − 15 = 85) —
залишилися у вихідному вигляді. Масове перенесення продовжується лише після
перевірки цієї партії.

## 1. Перенесені кейси

Усі UA-адреси збережено, EN-сторінки створено. Порядок — як у реєстрі.

| # | Кейс | UA | EN | Медіа | Компонентів | Результатів | Відгук | Особливості |
|---|---|---|---|---|---|---|---|---|
| 1 | `it/asandra-soul` | `/cases/it/asandra-soul` | `/en/cases/it/asandra-soul` | 18 | 5 | 8 | **audio** | аудіовідгук: кнопка відтворення + автор + підпис |
| 2 | `it/darkshare` | `/cases/it/darkshare` | `/en/cases/it/darkshare` | 8 | 6 | 9 | text | зовнішній лінк лише в `*.link` (див. питання) |
| 3 | `it/epiland` | `/cases/it/epiland` | `/en/cases/it/epiland` | 7 | 6 | 10 | text | `link: BOT_URL` (константа) — розв'язано генератором |
| 4 | `it/importera` | `/cases/it/importera` | `/en/cases/it/importera` | 7 | 6 | 10 | text | спільний проєкт (текст уже містить розмежування) |
| 5 | `it/kroscar-detailing` | `/cases/it/kroscar-detailing` | `/en/cases/it/kroscar-detailing` | 8 | 4 | 8 | text | |
| 6 | `it/liudmyla-tsybrii` | `/cases/it/liudmyla-tsybrii` | `/en/cases/it/liudmyla-tsybrii` | 5 | 4 | 8 | text | |
| 7 | `it/md-dental` | `/cases/it/md-dental` | `/en/cases/it/md-dental` | 7 | 5 | 8 | text | окрема секція `links` (`md-dental.in.ua`) |
| 8 | `it/mnm-detailing` | `/cases/it/mnm-detailing` | `/en/cases/it/mnm-detailing` | 9 | 4 (**4 слайдери**) | 8 | text | картки зі слайдером «до/після» замість галереї |
| 9 | `it/nextcup` | `/cases/it/nextcup` | `/en/cases/it/nextcup` | 5 | 4 | 8 | text | |
| 10 | `it/pivden-solar` | `/cases/it/pivden-solar` | `/en/cases/it/pivden-solar` | 5 | 4 | 8 | text | |
| 11 | `it/prime-auto-shipping` | `/cases/it/prime-auto-shipping` | `/en/cases/it/prime-auto-shipping` | 5 | 4 | 8 | text | **без заголовка відгуку** (як в оригіналі); секція `links` |
| 12 | `it/repair-collision` | `/cases/it/repair-collision` | `/en/cases/it/repair-collision` | 5 | 5 | 8 | text | **без заголовка відгуку**; секція `links` |

Разом у реєстрі **15 кейсів** (12 партії + 3 пілотні), 127 адрес у sitemap.

## 2. Розширення спільної схеми

Нові кейси принесли три типи, яких не було в пілоті. Схему розширено, а не
обхідно «підлаштовувати» сторінку під наявний шаблон:

| Розширення | Навіщо | Де |
|---|---|---|
| `FeatureItem.slider` | `mnm-detailing`: картка компонента зі слайдером «до/після» (а не галерея) — раніше такий запис не міг бути виражений | `data/case-records/types.ts`, рендер у `components/cases/CaseMedia.tsx` |
| `ReviewBlock.kind = "audio"` | `asandra-soul`: голосовий відгук (`<audio>` + кнопка + автор + підпис) | `types.ts`, рендер у `CaseDetail.tsx` |
| `ReviewBlock.title?` (опціональний) | `prime-auto-shipping`, `repair-collision`: в оригіналі секція відгуку **без** заголовка | `types.ts`, рендер у `CaseDetail.tsx` |
| `CaseRecord.subtitle` (опціональний) | уточнення власника для EVA: H1 = назва, тип і склад роботи — окремим підзаголовком | `types.ts`, рендер у `CaseHero.tsx` |

Також виправлено два місця, які масове перенесення зламало б:

- `collectRecordMedia` враховує `slider` у компонентах і poster/poster-type
  медіа рев'ю — перевірка покриття тепер показує будь-яке поле запису, яке
  ігнорується;
- `CaseFeatureList` рендерить слайдер; `CaseCompare` (пілот) не змінювався.

## 3. Як це згенеровано

`scripts/migrate-case.mjs` — **чернетковий інструмент** для наступних партій:

```
node scripts/migrate-case.mjs --dir it --limit 12        # чергова партія
node scripts/migrate-case.mjs --id design/foo --dry-run  # перегляд без запису
```

Він читає **оригінальну сторінку** (розмітка, медіа, лінки, підписи),
мапить її на схему, пише запис, замінює UA-сторінку тонкою оболонкою,
створює EN-сторінку, видаляє старий `layout.tsx` і додає запис до реєстру.
**Редакційні поля (H1, SEO title) він залишає плейсхолдерами** — їх пише
люд, і саме вони винесені на погодження в `texts.md` (розділ 9).

Що він друкує як `ATTENTION` — те не було змаплено автоматично і потребує
уваги (у цій партії: 6 EN-описів, 2 відгуки без заголовка).

**Незрозумілі блоки не пропускаються мовчки.** Відтепер генератор має
`blockers`: якщо сторінка містить масив, який схема ще не вміє виразити
(`sliderPairs`, `finalItems`, `galleryItems`, `screenshots`, `videos`,
`heroImages`, `approachItems`, `finalGroups`…), або інлайн-JSX медіа-масив,
або hero не є звичайним зображенням — **запис не записується**, а в консоль
виводиться перелік причин (`NOT WRITTEN`). Без `--force` такий кейс не
можна згенерувати випадково.

### Перевірка структур дизайну й відео ПЕРЕД застосуванням генератора

`node scripts/migrate-case.mjs --survey --dir design|video` (read-only,
нічого не пише). Повні профілі: `docs/package-4/survey-design.txt`,
`docs/package-4/survey-video.txt`.

| Напрям | Залишилося | Мапиться зараз | Потрібна робота схеми/мапера |
|---|---|---|---|
| design | 23 | **1** | 22 — галереї (`finalItems` ×15, `galleryItems` ×3), `sliderPairs` ×2, `heroImages` ×2, текстові списки `approachItems` ×3 / `finalGroups` ×1, 4 hero зі змінною-джерелом + 1 hero-відео |
| video | 54 | **0** | 54 — hero-відео ×40 (і ще 5 невизначених hero, 1 videoGrid), `screenshots` ×8, `videos`/`caseVideos` ×2, інлайн-JSX медіа-масиви ×3 |

Висновок: генератор зараз підходить лише для сторінок з hero-зображенням і
блоками `components`/`results` (поточний IT-профіль). Перед партією 2 для
дизайну/відео потрібно додати мапінг hero-відео, `gallery`/`videoGrid`/
`compare`/`textList` та інлайн-JSX масивів — і знову прогнати `--survey`. Це
записано як наступний крок, а не виконано зараз.

## 4. Нові тексти

`docs/package-4/texts.md`, **розділ 9 — усе на погодження власника**:

- H1 ×12 (UA/EN);
- SEO title ×12 (UA/EN);
- EN meta description ×6 (UA-описи **збережено дослівно**, перекладено лише
  EN; цифри перекладені як є, без змін і без нових);
- підпис аудіовідгуку «Голосовий відгук» / «Voice review»;
- раніше погоджені: H1 EVA = «E.V.A. CODE™», його підзаголовок і детальний
  SEO title (розділи 1.1 і 2).

## 5. Результати перевірок

| Перевірка | Результат |
|---|---|
| `npm run build` | ✅ exit 0, **134 сторінки** (122 → 134: +12 EN) |
| `npx tsc --noEmit` | ✅ exit 0 |
| `npm run lint` | 1 error + **14 warnings** — без нових; шість попереджень зникло разом із переписаними сторінками (baseline був 1 + 22) |
| `inventory` | ✅ 100 маршрутів, sitemap **127**, очікування **133 current + 85 target**, issues **7** (усі — попередні; `media-path-whitespace` зник, бо mnm тепер має шлях без пробілу) |
| `check-urls --phase current` | ✅ **PASS**: 133 URL, **127** сторінок 200, 6 redirects, **0** порушень, hreflang **84** перевірки / 0 помилок, sitemap 127, og:image звірено з файлом |
| `check-urls --phase all` | ❌ 85 (усі — ще не перенесені EN-кейси; очікувано) |
| `package4-media-check` | ✅ **15/15 кейсів**: склад, порядок (джерело ← запис ← DOM), кратність, повторне використання, підписи, посилання, OG, HTML обох мов |
| `package4-case-check` Chromium+WebKit | ✅ **3319/3319** — `browser-report-batch1.txt`: для всіх 15 кейсів у двох мовах — прямий відкриття, `<html lang>`, H1/lead локалізовані, canonical/hreflang, breadcrumb (3 пункти), лінок «назад», мовний перемикач (з.cookie `NEXT_LOCALE`), 3 схожі роботи без поточного, модалки галереї, повноекранний плеєр із пасткою фокуса, back/forward, мобільний 390×844 без переповнення, reduced motion по всіх блоках, світла тема |

## 6. Відкриті питання цієї партії

1. **Формулювання H1 / SEO title / EN-описів** — `texts.md`, розділ 9
   (на погодження).
2. **`orphanedI18nLink: itCases.<case>.link`** — ключ існує в словнику, але на
   сторінці URL використовується іншим чином (або взагалі не використовується).
   Прапорці після партії: `asandra-soul` (URL є в записі ✓, ключ не
   використовується), `epiland` (URL є ✓), `kroscar`, `md-dental`, `mnm`,
   `prime`, `repair` (URL є в записі ✓), а також **раніше відомі** `darkshare`,
   `importera` (URL на сторінці відсутній — як і до перенесення) і `eva-code`
   (не додано за рішенням власника). Питання: використати ключі в нових
   сторінках чи видалити їх (раніше: `facts-to-confirm.md`, розділ D).
3. **Цифри в meta description** (`250+`, `50+`, `23`, `10+`, `−40%`, «2 дні»,
   «зростання конверсії», «щоденні заявки») — залишені як є (переклад без
   змін), у `facts-to-confirm.md`, розділ C. Нічого не прибрано й не
   додано мовчки.
4. **`it/prime-auto-shipping`, `it/repair-collision`** — відгук без заголовка:
   залишено як в оригіналі. Підтвердити, що це навмисно.
5. **`it/asandra-soul`** — підпис «Голосовий відгук» раніше був лише в UA
   (захардкоджений); EN-переклад запропоновано.
6. **`it/epiland`** — дубль посилання на бота в hero прибрано (URL збережено
   в картці компонента). Підтвердити.

## 7. Як відтворити

```bash
npm run build && kill $(lsof -nP -iTCP:3011 -sTCP:LISTEN -t) 2>/dev/null
npm run start -- -p 3011

node scripts/inventory.mjs
node scripts/check-urls.mjs --base http://localhost:3011 --mode acceptance --phase current \
  --out docs/package-4/check-acceptance-current.json
node scripts/package4-media-check.mjs
node scripts/package4-case-check.mjs --base http://localhost:3011   # ~35 хв для 15 кейсів
```

Артефакти партії: `browser-report-batch1.txt`, `check-acceptance-current.json`,
`check-acceptance-all.json`, `media-before-after.md`, `inventory.txt`,
`build.txt`, `lint.txt`, `tsc.txt`, `check-selftest.txt`, `diff-package4.patch`,
`texts.md` (розділ 9).

## 8. Наступний крок

**Зупинка.** Далі — незалежна перевірка партії 1. Після її погодження:
партія 2 (решта 8 IT: `route-core`, `ruslan-aviation`, `sdent`, `selloflow`,
`serezha-shop`, `shkiper-drop`, `stretching-ch`, `voltone-pro`), потім дизайн
і відео — по 10–15, з тим самим набором перевірень після кожної партії.

## 9. Виправлення перед завершенням партії

### 9.1 Аватари текстових відгуків

Звірено всі 12 перенесених сторінок із вихідними (git-індекс): **кожна з 12
мала `ReviewAvatar name={t(authorKey)}`** — у `asandra-soul` (аудіо),
`darkshare`, `epiland`, `importera`, `kroscar-detailing`, `liudmyla-tsybrii`,
`md-dental`, `mnm-detailing`, `nextcup`, `pivden-solar`, `prime-auto-shipping`,
`repair-collision`.

- `CaseDetail` раніше рендерив аватар **лише** для `kind="screenshot"` —
  текстові відгуки втратили його. Тепер аватар рендериться для
  `text` / `screenshot` / `audio` (тобто для всього, крім `video`), з
  обгорткою `data-case-block="review-avatar"`.
- **Де аватарів не було — їх не додано:** відеовідгуки `it/eva-code` і
  `design/nastya-portrait-retouch` аватара не мали і не мають (перевірка
  нижче вимагає саме `0`).
- Аватар у записі описано явно: `avatarName` потрібен лише там, де насіння
  аватара відрізняється від автора (це вже зроблено в `video/cuprus-life`:
  «Alina» проти «Аліна Ушакова»). Для всіх 12 оригінал подавав
  **локалізований текст автора**, тому запис не дублює рядок, а рендерер
  бере `avatarName ?? автор` — пояснення додано в коментар до `ReviewBlock`.

### 9.2 Aria-label аудіовідгуку

Нові ключі (обидві мови), ключ «Відтворити відео» на аудіокнопці більше не
використовується:

| Контекст | UA | EN | Ключ |
|---|---|---|---|
| до відтворення | Відтворити аудіовідгук | Play audio review | `cases.ui.playAudioReview` |
| під час відтворення | Призупинити аудіовідгук | Pause audio review | `cases.ui.pauseAudioReview` |

Нова перевірка проходить усю послідовність: **поява → натиск (пауза) →
`ended` (назад до «відтворити») → повторне відтворення → пауза**.

**Обробка `play()` (друге відтворене відхилення).** Спочатку стан
«відтворюється» встановлювався одразу після виклику `play()` — якщо проміс
відхилявся, `audio.paused` лишався `true`, а кнопка показувала
«Pause audio review». Тепер:

- стан «відтворюється» встановлюється **лише за фактичним початком** —
  коли проміс `play()` виконується **і** елемент справді грає
  (`setPlaying(!el.paused)`); синхронно стан дає подія `onPlay`;
- **відмова** (`reject`) повертає стан і назву кнопки до «Відтворити» —
  `attempt.then(onFulfilled, onRejected)`, тобто порожнього `catch` немає;
  `onError` на елементі дублює це для помилок, що не відхиляють проміс;
- розгалуження — за `element.paused` (фізичний стан), а назва кнопки завжди
  випливає з подій `onPlay` / `onPause` / `onEnded`, тому вона не може
  розійтися з елементом;
- **відеовідгук**: додано `onEnded` (завершення → «Відтворити відео») і
  `onError`; для аудіо `onEnded` уже був;
- повторна спроба після відмови працює: наступний клік знову викликає
  `play()` (гілка `paused`), а не «застрягає» в стані паузи.

Те саме застосовано до `toggleReviewVideo` (відеовідгук), де раніше була
та сама оптимістична постановка стану.

### 9.3 Браузерні перевірки доповнено

`package4-case-check` → нова функція `checkReviewSocialProof` (обидві мови,
Chromium + WebKit):

- аватар: **наявність рівно 1** там, де запис передбачає автора
  (`text`/`screenshot`/`audio`), і **рівно 0** для `video`;
- **назва кнопки ↔ реальний стан медіа** (аудіо **і** відеовідгук, обидві
  мови): інваріант `paused ⇒ «Відтворити»`, `playing ⇒ «Призупинити»`
  перевіряється після кожного кроку — 84 перевірки;
- послідовність: початковий стан → натиск (успішний старт або відмова) →
  пауза → **симульована відмова `play()`** (проміс rejected → назва має
  залишитися «Відтворити» — це і є відтворений дефект) → **повторна спроба**
  після відновлення справжнього `play()` → `ended`;
- для аудіо додатково: що напис саме з назвою «аудіовідгук», а не «відео»;
- позитивний шлях теж перевірено: у Chromium і WebKit `play()` реально
  стартує (`click outcome consistent — playing → Pause label`), тож успішне
  відтворення й пауза підтверджені, а не лише імітовані.

### 9.4 Підрахунки в документах

- `batch-1.md`: залишок виправлено на **8 IT + 23 design + 54 video = 85**
  (21 − 13, 24 − 1, 55 − 1; 100 − 15 = 85).
- lint узгоджено з фактичним останнім звітом: **1 error + 14 warnings**
  (`lint.txt`), у `README.md` і тут замість застарілих 20.

### 9.5 Генератор — чернетковий інструмент

- Після кожної структурної невідповідності генератор тепер **відмовляється
  писати запис** (`NOT WRITTEN …`) замість тихого пропуску: нерозпізнаний
  масив, інлайн-JSX медіа-масив, hero не у вигляді зображення, відсутній
  brief.
- Перед дизайном/відео проведено read-only перевірку `--survey`:
  **design — 1 із 23 мапиться зараз, video — 0 із 54** (профілі в
  `survey-design.txt`, `survey-video.txt`). Основні прогалини: hero-відео
  (40+5 у video), галереї `finalItems`/`galleryItems`/`screenshots`,
  `videoGrid`-масиви, `sliderPairs`, `heroImages`, текстові списки
  `approachItems`/`finalGroups`, інлайн-JSX масиви. Ці структури
  **не обійдено** — партія 2 не починається, доки мапінг не доповнено.

## 10. Результати перевірки виправлень

| Перевірка | Результат |
|---|---|
| `npm run build` | ✅ 134 сторінки |
| `npx tsc --noEmit` | ✅ 0 |
| `npm run lint` | 1 error (стара) + **14 warnings** — без нових |
| `check-urls.selftest` | ✅ 27/27 |
| `inventory` | 100 маршрутів, sitemap 127, 133/85, issues 7 |
| `check-urls --phase current` | ✅ PASS (133 URL, 127×200, hreflang 84, sitemap 127) |
| `package4-media-check` | ✅ 15/15 |
| `package4-case-check` Chromium+WebKit | ✅ **3547/3547** — `browser-report-batch1.txt` (15 кейсів × UA/EN × Chromium/WebKit; зокрема **60** перевірок аватарів, **84** — інваріанту «назва кнопки ↔ стан медіа», **12** — відмови `play()`, **12** — завершення, **137/137** медіафайлів) |

Наступна партія та публікація **не починалися**. Нові заголовки й фактичні
твердження (`texts.md`, розділи 1–9) залишаються на погодження.

