import type { MetadataRoute } from "next";

import { nav, site } from "@/lib/site";

/**
 * Zemljevid strani, izpeljan iz navigacije, da nova stran ne more nastati brez
 * vnosa tukaj. Domača stran ima najvišjo prioriteto, cenik sledi — to sta
 * strani, na kateri ljudje pridejo iz iskalnika.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return nav.map((item) => ({
    url: new URL(item.href, site.url).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : item.href === "/cenik" ? 0.9 : 0.7,
  }));
}
