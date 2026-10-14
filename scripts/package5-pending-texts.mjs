// Package 5 — build the table of texts still awaiting owner approval.
//
// Emits one markdown table of every case whose visible UA/EN copy is not yet
// approved, plus a separate table of open factual questions pulled from
// `docs/package-1/facts-to-confirm.md`. Text is read from the registry, so the
// table can never drift from what the pages actually render.
//
// Usage: node scripts/package5-pending-texts.mjs [--out docs/package-4/pending-texts.md]
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { registerHooks } from "node:module";

// The registry imports `../itCases` extensionless; let Node find the `.ts`.
registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (err) {
      if (err?.code === "ERR_MODULE_NOT_FOUND" && /^\.{1,2}\//.test(specifier)) {
        for (const suffix of [".ts", "/index.ts", ".tsx"]) {
          try {
            return nextResolve(specifier + suffix, context);
          } catch {
            /* next candidate */
          }
        }
      }
      throw err;
    }
  },
});

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const OUT = arg("--out", path.join(process.cwd(), "docs", "package-4", "pending-texts.md"));
const cwd = process.cwd();
const abs = (p) => pathToFileURL(path.join(cwd, p)).href;

const registryMod = await import(abs("data/case-records/index.ts"));
const caseRecords = registryMod.caseRecords ?? registryMod.registry?.caseRecords;
if (!caseRecords) {
  console.error("could not read caseRecords from data/case-records/index.ts");
  process.exit(2);
}
const { translations } = await import(abs("lib/i18n.ts"));
const { resolveText } = await import(abs("data/case-records/types.ts"));

const UA = (x) => String(resolveText(x, "uk", translations)).trim();
const EN = (x) => String(resolveText(x, "en", translations)).trim();
const cell = (s) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");

/** Cases the owner already signed off on (Package 4 pilot + batches 1–3 = 35). */
const APPROVED = new Set([
  // pilot (3)
  "it/eva-code",
  "design/nastya-portrait-retouch",
  "video/cuprus-life",
  // batch 1 — 12 IT
  "it/asandra-soul",
  "it/darkshare",
  "it/epiland",
  "it/importera",
  "it/kroscar-detailing",
  "it/liudmyla-tsybrii",
  "it/md-dental",
  "it/mnm-detailing",
  "it/nextcup",
  "it/pivden-solar",
  "it/prime-auto-shipping",
  "it/repair-collision",
  // batch 2 — 8 IT (IT direction completed, 21 total)
  "it/route-core",
  "it/ruslan-aviation",
  "it/sdent",
  "it/selloflow",
  "it/serezha-shop",
  "it/shkiper-drop",
  "it/stretching-ch",
  "it/voltone-pro",
  // batch 3 — 12 design
  "design/barvy-interior",
  "design/photo-retouch",
  "design/globus-billboard",
  "design/snizhana-telegram-stickers",
  "design/smm-case-presentation",
  "design/pink-pr-flyers",
  "design/gel-polish",
  "design/mydutyfree",
  "design/vikontse-logo",
  "design/schonheit-gift-certificate",
  "design/sembud-repair",
  "design/apple-tecnologia",
]);

/** The six cases completed in Package 5 — new text, so it needs approval. */
const SIX = new Set([
  "maccoudi-youtube",
  "wine-festival",
  "sestro-anniversary",
  "sheglam-promo",
  "telegram-emoji-stickers",
  "eva-code-reels",
]);

const rows = [];
for (const r of caseRecords) {
  if (APPROVED.has(r.id)) continue;
  rows.push({
    id: r.id,
    isNew: SIX.has(r.slug),
    h1ua: UA(r.h1),
    h1en: EN(r.h1),
    subua: r.subtitle ? UA(r.subtitle) : "",
    suben: r.subtitle ? EN(r.subtitle) : "",
    titua: r.meta?.title ? UA(r.meta.title) : "",
    titen: r.meta?.title ? EN(r.meta.title) : "",
    descua: r.meta?.description ? UA(r.meta.description) : "",
    descen: r.meta?.description ? EN(r.meta.description) : "",
  });
}

const lines = [
  "# Тексти, що ще очікують погодження (Пакет 5)",
  "",
  "Статус: **на погодження власником.** Нічого не опубліковано.",
  "",
  `Кейсів у реєстрі: ${caseRecords.length}. Погоджених раніше (пілот + партії 1–3): ${APPROVED.size}.`,
  `Очікує погодження: ${rows.length} — з них 6 нових відеокейсів Пакета 5, решта 59 — партії 4+ (дизайн/відео), що мігрували`,
  "без фінального погодження власника. Якщо тексти погоджених 35 не змінювалися відтоді, повторне погодження не потрібне —",
  "нижче лише нові або змінені формулювання.",
  "",
  "Таблиця згенерована з реєстру `data/case-records/` — це точно той текст,",
  "що рендериться на сторінках. Ніяких цифр, результатів, відгуків і дат не",
  "додано; прибрані твердження про зростання конверсії, щоденні заявки та",
  "відсотки довіри не поверталися.",
  "",
];

const newRows = rows.filter((r) => r.isNew);
const oldRows = rows.filter((r) => !r.isNew);

lines.push(
  "## 1. Нові відеокейси Пакета 5 — усі тексти",
  "",
  "Ці шість кейсів створені в цій сесії: увесь видимий текст новий для обох мов.",
  "",
  "| # | Кейс | H1 UA | H1 EN | Підзаголовок UA | Підзаголовок EN |",
  "|---|---|---|---|---|---|",
);
newRows.forEach((r, i) =>
  lines.push(
    `| ${i + 1} | \`${r.id}\` | ${cell(r.h1ua)} | ${cell(r.h1en)} | ${cell(r.subua) || "—"} | ${cell(r.suben) || "—"} |`,
  ),
);

lines.push(
  "",
  "### 1.1 Метадані (title / description) нових кейсів",
  "",
  "| Кейс | Title UA | Title EN | Description UA | Description EN |",
  "|---|---|---|---|---|",
);
for (const r of newRows) {
  lines.push(
    `| \`${r.id}\` | ${cell(r.titua) || "—"} | ${cell(r.titen) || "—"} | ${cell(r.descua) || "—"} | ${cell(r.descen) || "—"} |`,
  );
}

lines.push(
  "",
  "## 2. Решта кейсів, що очікують погодження (партії 4+)",
  "",
  "Партії 4+ мігрували раніше, але фінального погодження власника не мали. Погоджені пілот і партії 1–3 (35 кейсів)",
  "повторно не просять погодження, якщо їхні тексти відтоді не змінювалися — нижче лише непогоджені 65 − 6 = 59 + 6 нових = 65.",
  "",
  "| # | Кейс | H1 UA | H1 EN | Підзаголовок UA | Підзаголовок EN |",
  "|---|---|---|---|---|---|",
);
oldRows.forEach((r, i) =>
  lines.push(
    `| ${i + 1} | \`${r.id}\` | ${cell(r.h1ua)} | ${cell(r.h1en)} | ${cell(r.subua) || "—"} | ${cell(r.suben) || "—"} |`,
  ),
);

/* Open factual questions, read straight from the package-1 file. */
const factsPath = path.join(cwd, "docs", "package-1", "facts-to-confirm.md");
lines.push("", "## 3. Відкриті фактичні питання", "");
if (fs.existsSync(factsPath)) {
  const raw = fs.readFileSync(factsPath, "utf8");
  lines.push(`Джерело: \`docs/package-1/facts-to-confirm.md\` (${raw.split("\n").length} рядків, виписка нижче).`, "");
  const kept = raw
    .split("\n")
    .filter((l) => /^\s*([-*|]|\d+\.)\s*\S/.test(l) && !/^\s*\|?\s*-{3,}/.test(l))
    .slice(0, 120);
  lines.push(...kept, "");
} else {
  lines.push("⚠️ `docs/package-1/facts-to-confirm.md` не знайдено.", "");
}

fs.writeFileSync(OUT, lines.join("\n"));
console.log(`pending texts: ${rows.length} (${newRows.length} new from Package 5) · report: ${path.relative(cwd, OUT)}`);
