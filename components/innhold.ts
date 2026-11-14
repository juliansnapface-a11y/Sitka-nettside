// ============================================================
//  INNHOLD PÅ NETTSIDEN
//  Her kan du endre tekst uten å røre resten av koden.
//  Ting merket «FYLL INN» kan dere fylle ut senere.
// ============================================================

export const kontakt = {
  // E-postadressen som vises i kontakt-delen nederst på siden
  epost: "sitkabiokull@gmail.com",
  // FYLL INN: Instagram-brukernavn uten @ (la stå tom "" hvis dere ikke har)
  instagram: "",
};

export const losning = [
  {
    nr: "01",
    tittel: "Porøs struktur",
    tekst:
      "Biokull er fullt av bittesmå porer. Det gir en enorm overflate som kan holde på væske og gasser.",
  },
  {
    nr: "02",
    tittel: "Binder fukt og ammoniakk",
    tekst:
      "Porene kan suge opp fuktighet og ammoniakk fra urin og møkk, slik at mindre havner i lufta.",
  },
  {
    nr: "03",
    tittel: "Tørrere inneklima",
    tekst:
      "Målet er mindre lukt og et tørrere underlag. Bedre for dyrene, og bedre for de som jobber i stallen.",
  },
];

export const prosess = [
  {
    nr: "01",
    tittel: "Sitkagran fjernes",
    tekst:
      "Sitkagran fjernes allerede mange steder for å ta vare på naturen. I dag blir trærne ofte liggende igjen eller brent. Vi bruker dem som råvare i stedet.",
  },
  {
    nr: "02",
    tittel: "Pyrolyse",
    tekst:
      "Treet varmes opp til rundt 600 grader nesten uten oksygen. Da brenner det ikke opp, men brytes ned og blir til biokull.",
    video: true,
  },
  {
    nr: "03",
    tittel: "Blandes til strø",
    tekst:
      "Biokullet blandes med flis. Resultatet er et strø, eller en tilsetning til vanlig strø, for hønsehus og staller.",
    bilde: "flis" as const,
  },
  {
    nr: "04",
    tittel: "Tilbake til jorda",
    tekst:
      "Brukt strø kan komposteres og bli jordforbedring. Karbonet i biokullet blir liggende i jorda i stedet for å gå ut i lufta.",
  },
];

export const kunder = [
  { navn: "Hønsehus", tekst: "Lukt og ammoniakk er et kjent problem i hønsehus." },
  { navn: "Rideskoler", tekst: "Mange hester, mye strø og mange folk i stallen hver dag." },
  { navn: "Private staller", tekst: "Hesteeiere som vil ha et bedre stallmiljø." },
  { navn: "Trav og galopp", tekst: "Større anlegg med høyt forbruk av strø." },
];
