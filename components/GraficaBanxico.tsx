"use client";

import { useState, useEffect } from "react";

// ── Tipos ─────────────────────────────────────────────────────────────────────

interface PricePoint { t: number; p: number; }

interface Outcome { label: string; price: number; volume: number; }

interface ApiData {
  history:  PricePoint[];
  outcomes: Outcome[];
  volume:   number;
}

// ── Fallback mientras carga / si la API falla ─────────────────────────────────

const FALLBACK_OUTCOMES: Outcome[] = [
  { label: "Sin cambio",  price: 0.935,  volume: 29633 },
  { label: "−25 pb",      price: 0.045,  volume: 2554  },
  { label: "−50+ pb",     price: 0.011,  volume: 2003  },
  { label: "+25 pb",      price: 0.0015, volume: 1966  },
  { label: "+50+ pb",     price: 0.0015, volume: 2052  },
];

// ── Helpers SVG ───────────────────────────────────────────────────────────────

const SVG_W = 280;
const SVG_H = 72;

function downsample(arr: PricePoint[], n: number): PricePoint[] {
  if (arr.length <= n) return arr;
  const step = arr.length / n;
  return Array.from({ length: n }, (_, i) => arr[Math.floor(i * step)])
    .concat(arr[arr.length - 1]);
}

function buildPaths(pts: PricePoint[]): { line: string; area: string; lastX: number; lastY: number } {
  if (pts.length < 2) return { line: "", area: "", lastX: 0, lastY: 0 };

  const minT = pts[0].t;
  const maxT = pts[pts.length - 1].t;
  const tRange = maxT - minT || 1;

  const prices = pts.map(d => d.p);
  const minP   = Math.max(0,  Math.min(...prices) - 0.06);
  const maxP   = Math.min(1,  Math.max(...prices) + 0.04);
  const pRange = maxP - minP || 1;

  const x = (d: PricePoint) => ((d.t - minT) / tRange) * SVG_W;
  const y = (d: PricePoint) => SVG_H - ((d.p - minP) / pRange) * SVG_H;

  const segs = pts.map((d, i) => `${i === 0 ? "M" : "L"}${x(d).toFixed(1)},${y(d).toFixed(1)}`);
  const line = segs.join(" ");
  const area = `${line} L${SVG_W},${SVG_H} L0,${SVG_H} Z`;

  const last = pts[pts.length - 1];
  return { line, area, lastX: x(last), lastY: y(last) };
}

// ── Formatters ────────────────────────────────────────────────────────────────

const fmtPct = (p: number) =>
  p < 0.005 ? "<1%" : `${(p * 100).toFixed(p < 0.01 ? 1 : 1)}%`;

const fmtDate = (ts: number) =>
  new Date(ts * 1000).toLocaleDateString("es-MX", { day: "numeric", month: "short" });

const fmtVol = (v: number) =>
  v >= 1000 ? `$${(v / 1000).toFixed(1)}K` : `$${v.toFixed(0)}`;

// ── Etiquetas legibles para los resultados ─────────────────────────────────────

function labelFromQuestion(raw: string): string {
  if (/no.change|sin.cambio|unchanged/i.test(raw)) return "Sin cambio";
  if (/decrease.*50|50.*decrease|50.*bps.*dec/i.test(raw)) return "−50+ pb";
  if (/decrease.*25|25.*decrease|25.*bps.*dec/i.test(raw)) return "−25 pb";
  if (/increase.*50|50.*increase|50.*bps.*inc/i.test(raw)) return "+50+ pb";
  if (/increase.*25|25.*increase|25.*bps.*inc/i.test(raw)) return "+25 pb";
  return raw.slice(0, 18);
}

// ── Componente ────────────────────────────────────────────────────────────────

export default function GraficaBanxico() {
  const [data, setData]       = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/polymarket/banxico")
      .then(r => r.json())
      .then((d: ApiData) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Usa datos de API o fallback
  const outcomes = data?.outcomes?.length
    ? data.outcomes.map(o => ({ ...o, label: labelFromQuestion(o.label) }))
    : FALLBACK_OUTCOMES;

  const noChange   = outcomes.find(o => /sin.cambio|no.change/i.test(o.label)) ?? outcomes[0];
  const currentPct = (noChange.price * 100).toFixed(1);

  const history    = downsample(data?.history ?? [], 80);
  const { line, area, lastX, lastY } = buildPaths(history);

  const startLabel = history.length ? fmtDate(history[0].t)                  : "8 jun";
  const endLabel   = history.length ? fmtDate(history[history.length - 1].t) : "11 jul";
  const totalVol   = fmtVol(data?.volume ?? 38209);

  return (
    <div>
      {/* Header */}
      <p
        className="font-sans font-bold uppercase mb-2"
        style={{ fontSize: "9px", letterSpacing: "0.22em", color: "var(--color-muted-dark)" }}
      >
        El mercado predice
      </p>
      <p
        className="font-sans leading-snug mb-3"
        style={{ fontSize: "12px", color: "var(--color-soft-dark)" }}
      >
        ¿Qué decidirá Banxico en agosto?
      </p>

      {/* Probabilidad dominante */}
      <p
        className="h-serif font-bold tnum"
        style={{
          fontSize:      "clamp(44px, 5.5vw, 66px)",
          lineHeight:    0.95,
          letterSpacing: "-0.03em",
          color:         "var(--color-crema)",
        }}
      >
        {currentPct}
        <span style={{ fontSize: "0.42em", color: "var(--color-muted-dark)", letterSpacing: 0 }}>%</span>
      </p>
      <p
        className="font-sans mt-1 mb-4"
        style={{ fontSize: "10px", color: "var(--color-muted-dark)", letterSpacing: "0.06em" }}
      >
        SIN CAMBIO · 7 AGO 2026
      </p>

      {/* Sparkline ─────────────────────────────── */}
      <div className="w-full mb-1" style={{ height: `${SVG_H}px` }}>
        {loading ? (
          /* Skeleton */
          <div
            className="w-full h-full rounded"
            style={{ background: "var(--color-surface-dark)", opacity: 0.6 }}
          />
        ) : history.length > 1 ? (
          <svg
            width="100%"
            height={SVG_H}
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            preserveAspectRatio="none"
            overflow="visible"
          >
            <defs>
              <linearGradient id="bx-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#5170ff" stopOpacity="0.20" />
                <stop offset="100%" stopColor="#5170ff" stopOpacity="0.02" />
              </linearGradient>
              {/* Clip para que el área no desborde */}
              <clipPath id="bx-clip">
                <rect x="0" y="0" width={SVG_W} height={SVG_H} />
              </clipPath>
            </defs>

            {/* Grid sutil — línea central */}
            <line
              x1="0" y1={SVG_H / 2} x2={SVG_W} y2={SVG_H / 2}
              stroke="var(--color-hairline-dark)" strokeWidth="0.5"
            />

            {/* Área y línea */}
            <path d={area} fill="url(#bx-fill)" clipPath="url(#bx-clip)" />
            <path
              d={line}
              stroke="#5170ff"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Punto actual */}
            {lastX > 0 && (
              <>
                <circle cx={lastX} cy={lastY} r="4"   fill="var(--color-tinta)" />
                <circle cx={lastX} cy={lastY} r="2.5" fill="#5170ff" />
              </>
            )}
          </svg>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center rounded"
            style={{ background: "var(--color-surface-dark)" }}
          >
            <span className="font-sans text-[9px] text-muted-dark">Sin datos</span>
          </div>
        )}
      </div>

      {/* Eje tiempo */}
      <div className="flex justify-between mb-4">
        {[startLabel, endLabel].map(l => (
          <span
            key={l}
            className="font-sans tnum"
            style={{ fontSize: "9px", color: "var(--color-muted-dark)", letterSpacing: "0.04em" }}
          >
            {l}
          </span>
        ))}
      </div>

      {/* Desglose de resultados ──────────────────── */}
      <div className="flex flex-col gap-1.5 mb-3">
        {outcomes.map(o => (
          <div key={o.label} className="flex items-center gap-2">
            <span
              className="font-sans flex-shrink-0"
              style={{ fontSize: "10px", color: "var(--color-muted-dark)", width: "62px" }}
            >
              {o.label}
            </span>
            <div
              className="flex-1 rounded-full overflow-hidden"
              style={{ height: "3px", background: "var(--color-hairline-dark)" }}
            >
              <div
                style={{
                  width:     `${Math.max(o.price * 100, o.price > 0 ? 0.8 : 0)}%`,
                  height:    "100%",
                  background: o.label === "Sin cambio"
                    ? "var(--color-crema)"
                    : /^−/.test(o.label)
                    ? "var(--color-azuldk)"
                    : "var(--color-negativo)",
                  borderRadius: "9999px",
                }}
              />
            </div>
            <span
              className="font-sans tnum flex-shrink-0"
              style={{ fontSize: "10px", color: "var(--color-soft-dark)", width: "30px", textAlign: "right" }}
            >
              {fmtPct(o.price)}
            </span>
          </div>
        ))}
      </div>

      {/* Footer meta */}
      <p
        className="font-sans tnum"
        style={{ fontSize: "9px", color: "rgba(139,136,127,0.55)", letterSpacing: "0.06em" }}
      >
        Vol {totalVol} USDC · Polymarket · Cierra 6 ago
      </p>
    </div>
  );
}
