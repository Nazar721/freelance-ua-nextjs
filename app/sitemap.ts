import type { MetadataRoute } from "next";
import { publicRoutes } from "@/lib/site-routes";
import { absUrl } from "@/lib/i18n-routes";

// Sitemap is generated from the list of pages that are actually ready and
// canonical. `lastmod` is omitted on purpose — without a reliable content
// date a build timestamp would be misleading (approved decision). Hreflang
// pairs are declared in the HTML of each page; they are not duplicated here
// so the two sources cannot drift apart.
export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes().map((route) => ({
    url: absUrl(route.path),
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));
}
