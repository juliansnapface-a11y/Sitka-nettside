import type { Metadata } from "next";
import { SprakProvider } from "@/components/Sprak";
import BaerekraftSide from "@/components/sider/BaerekraftSide";
import { sprakLenkerEn } from "@/lib/sprak";

// The English version of «Bærekraft». Text lives in components/sider/BaerekraftSide.tsx

export const metadata: Metadata = {
  title: "Sustainability: carbon, nitrogen and the cycle",
  description:
    "How biochar bedding made from Sitka spruce is designed to store carbon, keep nitrogen, remove an invasive species and become fertiliser. The triple bottom line: planet, people and profit.",
  alternates: sprakLenkerEn("baerekraft"),
  openGraph: {
    title: "Sustainability | Sitka",
    description: "Carbon that stays in the soil, nitrogen that stays in the manure and an invasive tree that becomes a resource.",
    url: "/en/sustainability",
    locale: "en_GB",
    alternateLocale: ["nb_NO"],
    type: "article",
    siteName: "Sitka",
  },
};

export default function Page() {
  return (
    <SprakProvider lang="en">
      <BaerekraftSide lang="en" />
    </SprakProvider>
  );
}
