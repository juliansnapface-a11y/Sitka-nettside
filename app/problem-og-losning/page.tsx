import type { Metadata } from "next";
import { SprakProvider } from "@/components/Sprak";
import ProblemSide from "@/components/sider/ProblemSide";
import { sprakLenker } from "@/lib/sprak";

// Teksten på denne siden ligger i components/sider/ProblemSide.tsx

export const metadata: Metadata = {
  title: "Biokull i strø: problemet og løsningen",
  description:
    "Hvorfor ammoniakk i fjøs, stall og hønsehus og sitkagran i naturen er to problemer, og hvordan strø med biokull (biochar) fra sitkagran kan løse begge.",
  alternates: sprakLenker("problem"),
  openGraph: {
    title: "Biokull i strø: problemet og løsningen | Sitka",
    description:
      "Hvordan strø med biokull (biochar) fra sitkagran skal binde ammoniakk i stallen og gjøre en fremmed tresort til en ressurs.",
    url: "/problem-og-losning",
    locale: "nb_NO",
    alternateLocale: ["en_GB"],
    type: "article",
    siteName: "Sitka",
  },
};

export default function Page() {
  return (
    <SprakProvider lang="no">
      <ProblemSide lang="no" />
    </SprakProvider>
  );
}
