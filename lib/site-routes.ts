// Public route list for the sitemap — only pages that actually exist and are
// canonical (200, indexable). No `lastmod`: we do not have a reliable
// per-page content date yet, and a build timestamp is not one (approved
// decision). Unknown or not-yet-migrated pages are excluded, not guessed.
import { itCases } from "@/data/itCases";
import { designCases } from "@/data/designCases";
import { videoCases } from "@/data/videoCases";
import { caseEnPaths } from "@/data/case-records";

export interface PublicRoute {
  path: string;
  changefreq?: "weekly" | "monthly";
  priority?: number;
}

// Case detail routes: the three data files are the catalogue source. No
// hand-maintained URL list on top of them — a route that is not in a data
// file is not in the sitemap either (and vice versa).
const casePaths: string[] = [
  ...itCases.map((c) => c.href),
  ...designCases.map((c) => c.href),
  ...videoCases.map((c) => c.href),
];

export function publicRoutes(): PublicRoute[] {
  const routes: PublicRoute[] = [
    // Ukrainian (default, no prefix)
    { path: "/", changefreq: "monthly", priority: 1.0 },
    { path: "/cases", changefreq: "weekly", priority: 0.9 },
    // Direction pages (Package 3) — the old /cases/{direction} URLs now
    // permanently redirect here and are no longer listed in the sitemap.
    { path: "/services/it", changefreq: "weekly", priority: 0.8 },
    { path: "/services/design", changefreq: "weekly", priority: 0.8 },
    { path: "/services/video", changefreq: "weekly", priority: 0.8 },
    { path: "/partners", changefreq: "monthly", priority: 0.7 },
    ...casePaths.map((path) => ({ path, changefreq: "monthly" as const, priority: 0.7 })),
    // English versions that exist today (Packages 2–3). EN case pages are
    // added only once their record is in the case registry (Package 4) —
    // a not-yet-migrated case never appears as an English URL.
    { path: "/en", changefreq: "monthly", priority: 1.0 },
    { path: "/en/cases", changefreq: "weekly", priority: 0.9 },
    { path: "/en/services/it", changefreq: "weekly", priority: 0.8 },
    { path: "/en/services/design", changefreq: "weekly", priority: 0.8 },
    { path: "/en/services/video", changefreq: "weekly", priority: 0.8 },
    { path: "/en/partners", changefreq: "monthly", priority: 0.7 },
    ...caseEnPaths().map((path) => ({ path, changefreq: "monthly" as const, priority: 0.7 })),
  ];
  // Defensive dedupe: the sitemap must list every canonical URL exactly once.
  const seen = new Set<string>();
  return routes.filter((r) => {
    if (seen.has(r.path)) return false;
    seen.add(r.path);
    return true;
  });
}
