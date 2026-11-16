import type { MetadataRoute } from "next";
import { nettstedUrl } from "@/lib/nettsted";

// Lager /sitemap.xml automatisk: en liste over alle sidene, som Google leser.
// Legger dere til en ny side, legg den til her også.
export default function sitemap(): MetadataRoute.Sitemap {
  const sistEndret = "2026-11-16";
  return [
    { url: `${nettstedUrl}/`, lastModified: sistEndret, changeFrequency: "monthly", priority: 1 },
    { url: `${nettstedUrl}/problem-og-losning`, lastModified: sistEndret, changeFrequency: "monthly", priority: 0.8 },
  ];
}
