// Lager de bølgete årringene fra Sitka-logoen (samme oppskrift som logofilene)

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export type RingPath = { points: [number, number][]; t: number };

export function ringPoints(cx: number, cy: number, R: number, n = 8, steps = 180): RingPath[] {
  const rnd = rand(3);
  const ox = -0.08 * R;
  const oy = 0.05 * R;
  const rings: RingPath[] = [];
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 0.6);
    const ph1 = rnd() * 6.3;
    const ph2 = rnd() * 6.3;
    const pts: [number, number][] = [];
    for (let k = 0; k < steps; k++) {
      const th = (2 * Math.PI * k) / steps;
      const rr = R * 0.86 * t * (1 + 0.022 * Math.sin(3 * th + ph1) + 0.012 * Math.sin(5 * th + ph2));
      pts.push([cx + ox * (1 - t) + rr * Math.sin(th), cy + oy * (1 - t) - rr * Math.cos(th)]);
    }
    rings.push({ points: pts, t });
  }
  return rings;
}

export function ringSvgPaths(cx: number, cy: number, R: number, n = 8) {
  return ringPoints(cx, cy, R, n).map(
    (r) => "M" + r.points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L") + " Z",
  );
}

export const LOADED_EVENT = "sitka:loaded";
