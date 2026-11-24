import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, Oswald } from "next/font/google";
import "./globals.css";
import StrukturertData from "@/components/StrukturertData";
import { nettstedUrl, nettstedNavn, forsideTittel, forsideBeskrivelse, sokeord, googleVerifisering } from "@/lib/nettsted";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Kursiv skrift til små ord i store overskrifter (som «i» i «Stikkende luft i stallen»)
const serif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  // Adressen, tittel, beskrivelse og søkeord endres i lib/nettsted.ts
  metadataBase: new URL(nettstedUrl),
  title: {
    default: forsideTittel,
    template: "%s | Sitka",
  },
  description: forsideBeskrivelse,
  keywords: sokeord,
  applicationName: nettstedNavn,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: forsideTittel,
    description: forsideBeskrivelse,
    url: "/",
    locale: "nb_NO",
    type: "website",
    siteName: nettstedNavn,
  },
  twitter: {
    card: "summary_large_image",
    title: forsideTittel,
    description: forsideBeskrivelse,
  },
  ...(googleVerifisering ? { verification: { google: googleVerifisering } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#0C0505",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nb" className={`${oswald.variable} ${inter.variable} ${serif.variable} antialiased`}>
      <body>
        <StrukturertData />
        {children}
      </body>
    </html>
  );
}
