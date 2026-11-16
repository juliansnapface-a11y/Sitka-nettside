"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { sider, type Side, type Sprak } from "@/lib/sprak";

const SprakContext = createContext<Sprak>("no");

// Pakker inn en side og forteller alle delene hvilket språk de skal bruke
export function SprakProvider({ lang, children }: { lang: Sprak; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "nb";
  }, [lang]);
  return <SprakContext.Provider value={lang}>{children}</SprakContext.Provider>;
}

export function useSprak() {
  return useContext(SprakContext);
}

// Liten bryter «NO / EN» som går til samme side på det andre språket
export function SprakBytter({ side, className = "" }: { side: Side; className?: string }) {
  const lang = useSprak();
  return (
    <div className={`flex items-center gap-1 font-display text-xs uppercase tracking-[0.2em] ${className}`} aria-label="Språk / Language">
      {(["no", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-40">/</span>}
          {l === lang ? (
            <span className="underline decoration-2 underline-offset-4" aria-current="true">
              {l === "no" ? "NO" : "EN"}
            </span>
          ) : (
            <a href={sider[side][l]} hrefLang={l === "no" ? "nb" : "en"} className="opacity-70 transition-opacity hover:opacity-100">
              {l === "no" ? "NO" : "EN"}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}
