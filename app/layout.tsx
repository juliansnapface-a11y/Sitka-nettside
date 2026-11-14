import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const beskrivelse =
  "Sitka UB lager strø med biokull fra sitkagran, en fremmed tresort i norsk natur. Biokullet skal binde lukt, fukt og ammoniakk i staller og hønsehus, og brukt strø kan bli jordforbedring.";

export const metadata: Metadata = {
  // Adressen til nettsiden. Bytt denne hvis dere får eget domene (f.eks. https://sitka.no)
  metadataBase: new URL("https://sitka-nettside.vercel.app"),
  title: "Sitka – Bærekraftig strø av biokull",
  description: beskrivelse,
  openGraph: {
    title: "Sitka – Bærekraftig strø av biokull",
    description: beskrivelse,
    locale: "nb_NO",
    type: "website",
    siteName: "Sitka UB",
  },
};

export const viewport: Viewport = {
  themeColor: "#0C0505",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="no" className={`${oswald.variable} ${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
