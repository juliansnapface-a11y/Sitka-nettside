// ============================================================
//  SPRÅK
//  Nettsiden finnes på norsk (no) og engelsk (en).
//  Her står adressene til hver side på begge språk.
// ============================================================

export type Sprak = "no" | "en";

export const sider = {
  forside: { no: "/", en: "/en" },
  problem: { no: "/problem-og-losning", en: "/en/problem-and-solution" },
  baerekraft: { no: "/baerekraft", en: "/en/sustainability" },
} as const;

export type Side = keyof typeof sider;

// Lenker som forteller Google at siden finnes på to språk (hreflang)
export function sprakLenker(side: Side) {
  return {
    canonical: sider[side].no,
    languages: { "nb-NO": sider[side].no, en: sider[side].en, "x-default": sider[side].no },
  };
}
export function sprakLenkerEn(side: Side) {
  return {
    canonical: sider[side].en,
    languages: { "nb-NO": sider[side].no, en: sider[side].en, "x-default": sider[side].no },
  };
}
