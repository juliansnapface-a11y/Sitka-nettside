import type { Metadata } from "next";
import { SprakProvider } from "@/components/Sprak";
import ProblemSide from "@/components/sider/ProblemSide";
import { sprakLenkerEn } from "@/lib/sprak";

// The English version of «Problemet og løsningen». Text lives in components/sider/ProblemSide.tsx

export const metadata: Metadata = {
  title: "Biochar bedding: the problem and the solution",
  description:
    "Why ammonia in barns, stables and poultry houses and invasive Sitka spruce in nature are two problems, and how biochar bedding made from Sitka spruce can solve both.",
  alternates: sprakLenkerEn("problem"),
  openGraph: {
    title: "Biochar bedding: the problem and the solution | Sitka",
    description:
      "How biochar bedding made from Sitka spruce is designed to bind ammonia in the stable and turn an invasive tree into a resource.",
    url: "/en/problem-and-solution",
    locale: "en_GB",
    alternateLocale: ["nb_NO"],
    type: "article",
    siteName: "Sitka",
  },
};

export default function Page() {
  return (
    <SprakProvider lang="en">
      <ProblemSide lang="en" />
    </SprakProvider>
  );
}
