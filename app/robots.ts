import type { MetadataRoute } from "next";
import { nettstedUrl } from "@/lib/nettsted";

// Lager /robots.txt: sier at Google gjerne må lese hele siden, og hvor sitemap ligger.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${nettstedUrl}/sitemap.xml`,
    host: nettstedUrl,
  };
}
