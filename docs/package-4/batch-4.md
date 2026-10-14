# Партія 4 — дизайн: 10 із 11 кейсів (Пакет 4)

Стан: **перенесено й перевірено; виправлення після незалежної перевірки
внесено (див. §12 і `batch-4-fixes.md`); зупинено для повторної перевірки.**
Публікацію не виконано. Локальний перегляд: **http://localhost:3011**.

**Підсумок реєстру:** 45 кейсів перенесено (21 IT + 23 design + 1 video),
sitemap **157**. Залишилося **55 кейсів** = **1 design** (`moto-school-window-branding`,
див. §2) + **54 video** (відео не переносимо за цим рішенням).

## 1. Read-only survey

`node scripts/migrate-case.mjs --survey --dir design` (нічого не пише;
`survey-design.txt`, оновлено): **10 мапляться, 1 не мапиться** —
`moto-school-window-branding`.

Відкладені структури з попередньої зупинки — усі оброблені:

| Структура | Статус | Як |
|---|---|---|
| hero-відео | ✅ | новий варіант hero `video` (src + poster + позначки `duration`/`format`; **інтерактивна плитка** відкриває спільний повноекранний плеєр — див. §12) + рендер у `CaseHero` |
| `finalGroups` | ✅ | нова секція `galleryGroups`: батьківський заголовок + підзаголовки груп + зображення за індексами; рендер у `CaseMedia` |
| inline-зображення | ✅ | `mht-clinic-billboard` — **ручне перенесення** (генератор відмовився, `--force` не застосовувався) |
| hero зі змінною (`src={artwork}`) | ✅ | генератор розв'язує верхньорівневі константи в hero |
| **нове:** композитні секції зі «сценами» + деталями | ❌ | `moto-school-window-branding` — відкладено, див. §2 |

## 2. Чому `moto-school-window-branding` не перенесено

Сторінка не вкладається в наявні типи, і будь-який із двох варіантів порушив би
умови партії:

- її секції — **композитні картки «сцени»** (позначка `01 / …`, заголовок,
  вступ, зображення з підписом, сітка «деталей» із шаблонними alt-ключами
  `detail.*`) плюс окремі текстові секції (`transition`, `details`);
- зображення `artwork` у вихідній сторінці рендериться **декілька разів**
  (hero, картка артшкілу, сітка деталей у мобільному й десктопному макетах) —
  запис не вміє виразити таке дублювання, тож або втратився б зміст, або
  зламався б контроль кратності.

Тому: запис **не створено**, вихідна сторінка й `layout.tsx` **збережені як
були**, кейс прибраний з реєстру і зі списку мовних пар. Це перше завдання
партії 5 — спочатку рішення щодо схеми (секція «сцена» + політика
responsive-дублювання), потім перенесення. `--force` не застосовувався.

## 3. Розширення схеми/мапінга в цій партії

| Що | Навіщо | Де |
|---|---|---|
| hero `video` | `color-correction`: відео з постером без керування | `types.ts`, `CaseHero.tsx`, збір медіа |
| секція `galleryGroups` | `hope-media-group`: батьківський заголовок + 3 групи зі своїми підзаголовками (групування збережено) | `types.ts`, `CaseMedia.tsx`, `CaseDetail.tsx` |
| `ReviewBlock.screenshot.author?` | `color-correction`: скріншот-відгук без тексту й автора | `types.ts`, `CaseDetail.tsx` (порожній блок не рендериться) |
| hero: розв'язування констант, кілька літеральних зображень, унікалізація | hero з `src={ARTWORK}`, hero-сітка з кількох `<Image>`, без повторів у сітці | `scripts/migrate-case.mjs` |
| позиція секції за наявністю заголовка | масив мапиться кілька разів (hero + галерея) — секція береться там, де є її заголовок | `renderPosWithHeading()` |
| джерела без рендеру (`Set`, повторні константи) не валідуються як втрата | файли є в записі; конструкція, яку сторінка споживає в логіці (напр., `mobileSplitItems` через `.has()`), позначається як live-логіка, а не мертвий код — `package4-media-check.mjs` |
| групована галерея поза перевіркою порядку джерела | групи **переставляють** ті самі зображення навмисно; порядок груп перевіряється в DOM | `recordBlocks()` |

## 4. Список кейсів і адрес

| # | Кейс | UA | EN | Медіа | Секції запису | Відгук |
|---|---|---|---|---|---|---|
| 1 | `design/color-correction` | `/cases/design/color-correction` | `/en/cases/design/color-correction` | 3 | brief → checklist(4) → results(3) | **screenshot** (без тексту/автора) |
| 2 | `design/crypto-chat-manager-vacancy` | `/cases/design/crypto-chat-manager-vacancy` | `/en/cases/design/crypto-chat-manager-vacancy` | 1 | brief → gallery(1) → results(3) | text |
| 3 | `design/divorce-legal-ad` | `/cases/design/divorce-legal-ad` | `/en/cases/design/divorce-legal-ad` | 1 | brief → gallery(1) → results(4) | text |
| 4 | `design/f5-guitars-youtube` | `/cases/design/f5-guitars-youtube` | `/en/cases/design/f5-guitars-youtube` | 1 | brief → gallery(1) → results(3) | text |
| 5 | `design/giesbrecht-pv` | `/cases/design/giesbrecht-pv` | `/en/cases/design/giesbrecht-pv` | 1 | brief → gallery(1) → results(3) | text |
| 6 | `design/gopro-hero13` | `/cases/design/gopro-hero13` | `/en/cases/design/gopro-hero13` | 1 | brief → gallery(1) → results(3) | text |
| 7 | `design/hope-media-group` | `/cases/design/hope-media-group` | `/en/cases/design/hope-media-group` | 9 | brief → gallery(8, підписи+`wide`) → **galleryGroups{3}** → results(4) | **video** |
| 8 | `design/mht-clinic-billboard` | `/cases/design/mht-clinic-billboard` | `/en/cases/design/mht-clinic-billboard` | 1 | brief → gallery(1, ручне) → results(3) | text |
| 9 | `design/nastya-smm` | `/cases/design/nastya-smm` | `/en/cases/design/nastya-smm` | 3 | gallery(2) → brief → results(3) | **video** |
| 10 | `design/prestige-school-billboard` | `/cases/design/prestige-school-billboard` | `/en/cases/design/prestige-school-billboard` | 1 | brief → gallery(1) → results(3) | text |

## 5. Нові тексти

**`texts.md`, розділ 13 — на погодження власника:** H1 ×10, SEO title ×10,
2 EN meta description і 1 EN alt. UA-описи й карткові тексти не змінювалися;
непідтверджені цифри в нові тексти не виносилися.

## 6. Звірка матеріалів до/після

`scripts/package4-media-check.mjs` — **45/45 кейсів без порушень**
(склад, порядок, кратність, повторне використання, підписи, посилання, OG,
HTML обох мов; невідомих втрат тексту **0**, «мають дім» **45/45**).

| Кейс | Медіа до → після | Порядок | Підписи | Посилання |
|---|---|---|---|---|
| `color-correction` | 3 → 3 | ✓ | ✓ | 1 → 0 |
| `crypto-chat-manager-vacancy` | 1 → 1 | ✓ | ✓ | 1 → 0 |
| `divorce-legal-ad` | 1 → 1 | ✓ | ✓ | 1 → 0 |
| `f5-guitars-youtube` | 1 → 1 | ✓ | ✓ | 1 → 0 |
| `giesbrecht-pv` | 1 → 1 | ✓ | ✓ | 1 → 0 |
| `gopro-hero13` | 1 → 1 | ✓ | ✓ | 1 → 0 |
| `hope-media-group` | 9 → 9 | ✓ | ✓ | 1 → 0 |
| `mht-clinic-billboard` | 1 → 1 | ✓ | ✓ | 1 → 0 |
| `nastya-smm` | 3 → 3 | ✓ | ✓ | 1 → 0 |
| `prestige-school-billboard` | 1 → 1 | ✓ | ✓ | 1 → 0 |

Різниця 1 → 0 — спільний CTA `t.me/freelance_ua` → `siteConfig`
(п.9 правил редактури), пояснено в `media-before-after.md`.

## 7. Результати перевірок

| Перевірка | Результат |
|---|---|
| `npm run build` | ✅ exit 0, **164 сторінки** (154 → 164: +10 EN, −1 EN відкладеного кейсу) |
| `npx tsc --noEmit` | ✅ 0 |
| `npm run lint` | 1 error (стара) + **12 warnings** — без нових |
| `check-urls.selftest` | ✅ 27/27 |
| `inventory` | 45 перенесених, sitemap **157**, очікування **163 `current` + 55 `target`**, issues **7** (усі попередні) |
| `check-urls --phase current` | ✅ **PASS**: 163 URL, **157** сторінок 200, 6 redirects, **0** порушень, hreflang **204** перевірки / 0 помилок, sitemap 157, og:image звірено з файлом |
| `check-urls --phase all` | ❌ 55 — усі ще не перенесені EN-кейси (100 → … → **55**) |
| `package4-media-check` | ✅ **45/45** (див. §6) |
| `package4-case-check` Chromium+WebKit (усі 45 кейсів, включно з раніше перенесеними) | ✅ **10319/10319**, 0 відмов — `browser-report-batch4.txt`; додатково HTTP-доступність медіа записів **268/268** |

## 8. Регресія спільних компонентів

Повний прогін `package4-case-check` охоплює **всі 45 перенесених кейсів**
(3 пілот + 12 + 8 + 10 + 1 ручний) у двох мовах і двох движках — це
контроль того, що зміни спільних компонентів (`CaseDetail`, `CaseMedia`,
`CaseHero`, `FadeIn`, `GalleryImage`, `ImageModal`) нічого не зламали на
раніше перенесених кейсах: breadcrumb, мовний перемикач, галереї, відеоплеєр,
аудіо/відео-кнопки, схожі роботи, back/forward, мобільний вигляд,
`prefers-reduced-motion`, світла тема. Додатково `browser-scenarios`
(напрямкові сторінки) — 342/342.

## 9. Відкриті питання партії 4

1. **H1 / SEO title / EN-описи / EN alt** — `texts.md`, розділ 13 (на
   погодження).
2. **`moto-school-window-branding`** — відкладено до партії 5: потрібне рішення
   щодо схеми (секція «сцена» + responsive-дублювання). Вихідна сторінка
   збережена, жодного контенту не втрачено.
3. **Цифри в наявних текстах** — не змінювалися, `facts-to-confirm.md`
   (A/C) до перевірки перед публікацією; прибрані раніше за погодженням —
   `texts.md`, розділ 9.5.
4. **`orphanedI18nLink`** — ті самі 4 прапорці (darkshare, eva, importera,
   ruslan); у дизайн-кейсах партії нових немає.
5. **Групована галерея hope-media** — групи переставляють ті самі зображення
   (як в оригіналі); порядок груп перевіряється в DOM, порядок джерела — для
   основної галереї. Підтвердити таку модель груп.

## 10. Як відтворити

```bash
npm run build
kill $(lsof -nP -iTCP:3011 -sTCP:LISTEN -t) 2>/dev/null
npm run start -- -p 3011

node scripts/migrate-case.mjs --survey --dir design   # read-only
node scripts/inventory.mjs
node scripts/check-urls.mjs --base http://localhost:3011 --mode acceptance --phase current \
  --out docs/package-4/check-acceptance-current.json
node scripts/package4-media-check.mjs
node scripts/package4-case-check.mjs --base http://localhost:3011 \
  --out docs/package-4/browser-report-batch4.txt        # ~90 хв для 45 кейсів
```

## 11. Наступний крок

**Зупинка.** Далі — незалежна перевірка партії 4. Після погодження —
партія 5: `moto-school-window-branding` (після рішення щодо схеми) і перші
10–14 **відео**-кейсів — з тим самим набір перевірень. Публікація — окремим
рішенням власника.

## 12. Виправлення після незалежної перевірки

Незалежна перевірка виявила дві втрати функціоналу (`color-correction` —
запуск hero-відео; `hope-media-group` — responsive-розбиття й обмеження
портрета) та неточності генератора/перевірок (розпізнавання кнопки плеєра,
`Set` через `.has()`). Усі виправлення описані в **`batch-4-fixes.md`**;
диф — **`diff-batch4-fixes.patch`**, повний патч Пакета 4 перегенеровано.
Після виправлень повторено: build/tsc/lint, `package4-media-check` (45/45)
і повний `package4-case-check` у Chromium і WebKit —
`browser-report-batch4-fixes.txt`.
