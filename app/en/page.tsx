import type { Metadata } from "next";
import Forside from "@/components/Forside";
import { sprakLenkerEn } from "@/lib/sprak";

// The front page in English. Text lives in components/innhold.ts (under «en»)

const title = "Sitka – Sustainable biochar bedding from Sitka spruce";
const description =
  "Sitka makes sustainable bedding and bedding additives with biochar from invasive Sitka spruce. Designed to bind ammonia, odour and moisture in barns, stables and poultry houses.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: sprakLenkerEn("forside"),
  openGraph: { title, description, url: "/en", locale: "en_GB", alternateLocale: ["nb_NO"], type: "website", siteName: "Sitka" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Home() {
  return <Forside lang="en" />;
}
