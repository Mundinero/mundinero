"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@/components/ThemeProvider";
import CorredorPanel from "./CorredorPanel";
import MobileAtlas from "./MobileAtlas";

const GloboAtlas = dynamic(() => import("./GloboAtlas"), {
  ssr:     false,
  loading: () => (
    <div
      style={{
        width: "100%", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <span className="font-mono tnum" style={{ fontSize: "11px", color: "var(--color-muted-dark)", letterSpacing: "0.12em" }}>
        CARGANDO GLOBO…
      </span>
    </div>
  ),
});

interface CurrencyData {
  rates:  Record<string, { rate: number; delta30d: number }>;
  usdmxn: number;
  date:   string;
}

interface Props {
  initialData: CurrencyData | null;
}

export default function AtlasClient({ initialData }: Props) {
  const [pessoMode, setPessoMode]     = useState(false);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const { theme }                     = useTheme();

  const usdmxn   = initialData?.usdmxn ?? null;
  const usdDelta = initialData?.rates?.["USD"]?.delta30d ?? null;

  return (
    <div className="flex flex-col">

      {/* ── Cabecera de sección ──────────────────────────────────── */}
      <div
        style={{
          borderBottom: "0.5px solid var(--color-hairline-dark)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 lg:px-20 py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

            {/* Título */}
            <div>
              <p
                className="font-sans font-semibold uppercase"
                style={{ fontSize: "9px", letterSpacing: "0.28em", color: "var(--color-azuldk)", marginBottom: "6px" }}
              >
                Atlas Mundinero
              </p>
              <h1
                className="h-serif font-bold"
                style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.015em", color: "var(--color-crema)", lineHeight: 1.1 }}
              >
                El dinero del mundo,<br className="hidden md:block" /> en un globo
              </h1>
              <p
                className="font-sans mt-2"
                style={{ fontSize: "13px", color: "var(--color-muted-dark)", maxWidth: "420px" }}
              >
                Tipos de cambio, corredores financieros y remesas —
                visualizados en tiempo real.
              </p>
            </div>

            {/* Toggle modo peso */}
            <div className="flex items-center gap-3">
              {usdmxn != null && (
                <span
                  className="font-mono tnum"
                  style={{ fontSize: "13px", color: "var(--color-muted-dark)" }}
                >
                  1 USD = <strong style={{ color: "var(--color-crema)" }}>${usdmxn.toFixed(2)}</strong> MXN
                </span>
              )}
              <button
                onClick={() => setPessoMode(!pessoMode)}
                className="font-sans font-medium"
                style={{
                  fontSize:      "11px",
                  letterSpacing: "0.10em",
                  padding:       "6px 14px",
                  borderRadius:  "20px",
                  border:        pessoMode
                    ? "0.5px solid var(--color-azuldk)"
                    : "0.5px solid var(--color-hairline-dark)",
                  color:      pessoMode ? "var(--color-azuldk)" : "var(--color-muted-dark)",
                  background: "transparent",
                  cursor:     "pointer",
                  transition: "color 150ms, border-color 150ms",
                  whiteSpace: "nowrap",
                }}
              >
                ¿Cómo va el peso?
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop: globo + panel ────────────────────────────────── */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: "1fr 360px",
          height:              "calc(100svh - 80px)",
          minHeight:           "520px",
          borderBottom:        "0.5px solid var(--color-hairline-dark)",
        }}
      >
        {/* Globo */}
        <div style={{ position: "relative", overflow: "hidden", background: "var(--color-tinta)" }}>
          {hoveredCity && (
            <div
              style={{
                position:  "absolute",
                bottom:    "20px",
                left:      "20px",
                zIndex:    10,
                padding:   "4px 10px",
                borderRadius: "3px",
                background: "var(--color-surface-dark)",
                border:    "0.5px solid var(--color-hairline-dark)",
              }}
            >
              <span className="font-mono" style={{ fontSize: "11px", color: "var(--color-crema)" }}>
                {hoveredCity}
              </span>
            </div>
          )}
          <GloboAtlas
            theme={theme}
            pessoMode={pessoMode}
            onPointHover={setHoveredCity}
          />
        </div>

        {/* Panel derecho */}
        <div
          style={{
            borderLeft:  "0.5px solid var(--color-hairline-dark)",
            overflowY:   "auto",
            padding:     "28px 24px 28px 0",
          }}
        >
          <div style={{ paddingLeft: "24px" }}>
            <CorredorPanel
              usdmxn={usdmxn}
              delta30d={usdDelta}
              pessoMode={pessoMode}
            />

            {/* Tabla de divisas vs MXN */}
            {initialData?.rates && (
              <div style={{ marginTop: "28px", borderTop: "0.5px solid var(--color-hairline-dark)", paddingTop: "20px" }}>
                <p
                  className="font-sans font-semibold uppercase"
                  style={{ fontSize: "9px", letterSpacing: "0.26em", color: "var(--color-azuldk)", marginBottom: "12px" }}
                >
                  Divisas vs. Peso mexicano
                </p>
                <DivisasTable rates={initialData.rates} usdmxn={usdmxn} pessoMode={pessoMode} />
              </div>
            )}

            {initialData?.date && (
              <p
                className="font-sans"
                style={{ fontSize: "9px", color: "var(--color-soft-dark)", marginTop: "20px", letterSpacing: "0.08em" }}
              >
                Fuente: Frankfurter / ECB · {initialData.date}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Móvil: tarjetas ───────────────────────────────────────── */}
      <div className="md:hidden">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <MobileAtlas
            rates={initialData?.rates ?? null}
            usdmxn={usdmxn}
            pessoMode={pessoMode}
          />
        </div>
      </div>

    </div>
  );
}

/* ── Sub-componente tabla de divisas ─────────────────────────── */
const SYMBOL_LABELS: Record<string, string> = {
  USD: "Dólar EE.UU.",
  EUR: "Euro",
  GBP: "Libra esterlina",
  CAD: "Dólar canadiense",
  JPY: "Yen japonés",
  BRL: "Real brasileño",
  COP: "Peso colombiano",
  ARS: "Peso argentino",
};
const SYMBOL_ORDER = ["USD", "EUR", "GBP", "CAD", "JPY", "BRL", "COP", "ARS"];

function DivisasTable({
  rates,
  usdmxn,
  pessoMode,
}: {
  rates: Record<string, { rate: number; delta30d: number }>;
  usdmxn: number | null;
  pessoMode: boolean;
}) {
  return (
    <div className="flex flex-col gap-0">
      {SYMBOL_ORDER.filter((s) => rates[s]).map((sym, i) => {
        const { rate, delta30d } = rates[sym];
        const displayRate = pessoMode && usdmxn != null ? rate * usdmxn : rate;
        const isPos = delta30d >= 0;
        const decimals = sym === "JPY" && !pessoMode ? 6 : 4;
        return (
          <div
            key={sym}
            className="flex items-center justify-between py-2"
            style={{
              borderBottom:
                i < SYMBOL_ORDER.length - 1
                  ? "0.5px solid var(--color-hairline-dark)"
                  : "none",
            }}
          >
            <div>
              <span className="font-sans font-semibold" style={{ fontSize: "12px", color: "var(--color-crema)" }}>
                {sym}
              </span>
              <span className="font-sans" style={{ fontSize: "10px", color: "var(--color-muted-dark)", marginLeft: "6px" }}>
                {SYMBOL_LABELS[sym]}
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono tnum" style={{ fontSize: "12px", color: "var(--color-crema)" }}>
                {displayRate.toFixed(decimals)}
              </span>
              <span
                className="font-mono tnum"
                style={{
                  fontSize:    "10px",
                  color:       isPos ? "var(--color-positivo)" : "var(--color-negativo)",
                  marginLeft:  "6px",
                }}
              >
                {isPos ? "+" : ""}{delta30d.toFixed(2)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
