import type { MetadataRoute } from "next";
import { nettstedUrl } from "@/lib/nettsted";
import { sider, type Side } from "@/lib/sprak";

// Lager /sitemap.xml automatisk: en liste over alle sidene, som Google leser.
// Hver side finnes på norsk og engelsk. Legger dere til en ny side, legg den til i lib/sprak.ts og her.
export default function sitemap(): MetadataRoute.Sitemap {
  const sistEndret = "2026-11-16";
  const prioritet: Record<Side, number> = { forside: 1, problem: 0.8, baerekraft: 0.8 };
  return (Object.keys(sider) as Side[]).flatMap((side) => {
    const languages = { "nb-NO": `${nettstedUrl}${sider[side].no}`, en: `${nettstedUrl}${sider[side].en}` };
    return (["no", "en"] as const).map((l) => ({
      url: `${nettstedUrl}${sider[side][l]}`,
      lastModified: sistEndret,
      changeFrequency: "monthly" as const,
      priority: l === "no" ? prioritet[side] : prioritet[side] - 0.1,
      alternates: { languages },
    }));
  });
}
