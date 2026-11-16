import { nettstedNavn, nettstedUrl, forsideBeskrivelse } from "@/lib/nettsted";
import { kontakt } from "@/components/innhold";

// «Strukturert data» (JSON-LD): en maskinlesbar beskrivelse av bedriften
// som hjelper Google å forstå hvem Sitka er og hva dere lager.
export default function StrukturertData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${nettstedUrl}/#organisasjon`,
        name: nettstedNavn,
        url: `${nettstedUrl}/`,
        logo: `${nettstedUrl}/media/sitka-logo.png`,
        email: kontakt.epost,
        description: forsideBeskrivelse,
        areaServed: "NO",
        knowsAbout: ["Biokull", "Biochar", "Strø", "Strømiddel", "Sitkagran", "Fjørfe", "Ammoniakk", "Jordforbedring"],
      },
      {
        "@type": "WebSite",
        "@id": `${nettstedUrl}/#nettsted`,
        name: nettstedNavn,
        url: `${nettstedUrl}/`,
        inLanguage: "nb-NO",
        publisher: { "@id": `${nettstedUrl}/#organisasjon` },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
