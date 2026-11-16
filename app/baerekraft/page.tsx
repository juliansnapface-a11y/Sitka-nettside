import type { Metadata } from "next";
import { SprakProvider } from "@/components/Sprak";
import BaerekraftSide from "@/components/sider/BaerekraftSide";
import { sprakLenker } from "@/lib/sprak";

// Teksten på denne siden ligger i components/sider/BaerekraftSide.tsx

export const metadata: Metadata = {
  title: "Bærekraft: karbon, nitrogen og kretsløp",
  description:
    "Hvordan strø med biokull fra sitkagran skal lagre karbon, ta vare på nitrogenet, fjerne en fremmed art og bli til gjødsel. Trippel bunnlinje: miljø, mennesker og økonomi.",
  alternates: sprakLenker("baerekraft"),
  openGraph: {
    title: "Bærekraft | Sitka",
    description: "Karbon som blir i jorda, nitrogen som blir i gjødsla og en fremmed tresort som blir en ressurs.",
    url: "/baerekraft",
    locale: "nb_NO",
    alternateLocale: ["en_GB"],
    type: "article",
    siteName: "Sitka",
  },
};

export default function Page() {
  return (
    <SprakProvider lang="no">
      <BaerekraftSide lang="no" />
    </SprakProvider>
  );
}
