# Міграція UA/EN адрес (стан після Пакета 2)

## Наявні двомовні пари (hreflang активний)

| UA | EN | Статус |
|---|---|---|
| `/` | `/en` | ✅ live, canonical+hreflang, sitemap |
| `/cases` | `/en/cases` | ✅ live, canonical+hreflang, sitemap; фільтри `?tab=`/`?type=` працюють в обох мовах |
| `/partners` | `/en/partners` | ✅ live, canonical+hreflang, sitemap |

Перемикач: посилання на відповідник зі збереженням `?query` і `#fragment`; без відповідника — disabled (без редіректу на головну).

## UA-сторінки без EN (переклад готується)

| UA | Майбутній EN | Пакет | Примітка |
|---|---|---|---|
| `/cases/it`, `/cases/design`, `/cases/video` | `/en/services/{d}` | 3 | самі UA-сторінки стануть redirect-джерелами |
| 100 × `/cases/{d}/{slug}` | `/en/cases/{d}/{slug}` | 4 | hreflang з'явиться лише після появи EN-сторінки |

## Заплановані перенаправлення (активуються в Пакеті 3)

| Джерело (308) | Ціль (має бути 200) | Очікування в чекері |
|---|---|---|
| `/cases/it` | `/services/it#cases` | `redirectPlannedTo`, `redirectActive: false` → увімкнути в Пакеті 3 |
| `/cases/design` | `/services/design#cases` | аналогічно |
| `/cases/video` | `/services/video#cases` | аналогічно |
| `/en/cases/it` | `/en/services/it#cases` | `kind: redirect`, phase=target |
| `/en/cases/design` | `/en/services/design#cases` | аналогічно |
| `/en/cases/video` | `/en/services/video#cases` | аналогічно |

Правила чекера для обох типів: статус 301/308; `Location` відповідає цілі (повний шлях + обов'язковий `#cases`); кінцева сторінка повертає **200** (404/500 = FAIL); один перехід. Фактичний скрол на `#cases` і відступ від фіксованого header (`scroll-padding-top: 120px`) — браузерний сценарій Пакета 3.

## Сирі параметри каталогу (залишаються фільтрами)

`/cases?tab=it|design|video`, `/cases?tab=…&type=…` — працюють в обох мовах (`/en/cases?tab=…`), canonical завжди на `/cases` або `/en/cases`; не породжують окремих SEO-сторінок.
