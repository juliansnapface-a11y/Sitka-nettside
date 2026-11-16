import type { Metadata } from "next";
import Forside from "@/components/Forside";
import { sprakLenker } from "@/lib/sprak";

// Forsiden på norsk. Teksten ligger i components/innhold.ts

export const metadata: Metadata = {
  alternates: sprakLenker("forside"),
};

export default function Home() {
  return <Forside lang="no" />;
}
