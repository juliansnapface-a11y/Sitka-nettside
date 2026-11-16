// ============================================================
//  INNSTILLINGER FOR GOOGLE (SEO)
//  Alt som handler om adressen til nettsiden og hvordan den
//  vises i Google-søk ligger her, på ett sted.
// ============================================================

// Adressen til nettsiden, uten skråstrek på slutten.
// BYTT DENNE når dere får eget domene, f.eks. "https://sitkabedding.com".
// (Kan også overstyres med miljøvariabelen NEXT_PUBLIC_SITE_URL i Vercel.)
export const nettstedUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://sitka-nettside.vercel.app").replace(/\/$/, "");

export const nettstedNavn = "Sitka";

// Tittelen som vises som blå lenke i Google (hold den under ca. 60 tegn)
export const forsideTittel = "Sitka – Bærekraftig strø med biokull fra sitkagran";

// Teksten som vises under lenken i Google (hold den under ca. 160 tegn)
export const forsideBeskrivelse =
  "Sitka lager bærekraftig strø og strømiddel med biokull (biochar) fra sitkagran. Skal binde ammoniakk, lukt og fukt i fjøs, stall og hønsehus.";

// Søkeord. Google bruker dem lite selv, men de gjør det tydelig hva siden handler om.
export const sokeord = [
  "biokull",
  "biochar",
  "biokull strø",
  "strø",
  "strømiddel",
  "bærekraftig strø",
  "strø til hønsehus",
  "strø til fjørfe",
  "fjørfe",
  "kyllingstrø",
  "stallstrø",
  "strø til hest",
  "sitkagran",
  "sitka",
  "ammoniakk i stall",
  "ammoniakk i hønsehus",
  "fremmede treslag",
  "jordforbedring",
  "karbonlagring",
];

// FYLL INN: Koden fra Google Search Console (metoden «HTML-tagg»).
// Lim inn bare selve koden, f.eks. "AbC123xyz...", ikke hele <meta>-taggen.
export const googleVerifisering = "";
