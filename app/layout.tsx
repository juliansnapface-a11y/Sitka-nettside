import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
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
    <html lang="nb" className={`${oswald.variable} ${inter.variable} antialiased`}>
      <body>
        <StrukturertData />
        {children}
      </body>
    </html>
  );
}
