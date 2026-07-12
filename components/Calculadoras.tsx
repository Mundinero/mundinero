"use client";

import { useState } from "react";

// ── Constantes fiscales México 2026 ────────────────────────────────────────────

const SMDF_MENSUAL = 278.80 * 30.4; // $8,475.52 — SMDF diario × 30.4
const TRES_SMDF    = SMDF_MENSUAL * 3; // $25,426.56 — límite cuota obrera excedente

// ISR mensual — Art. 96 LISR tarifa 2024/2026
const ISR_TABLA = [
  { li: 0.01,      ls: 746.04,     cf: 0.00,       tp: 0.0192 },
  { li: 746.05,    ls: 6_332.05,   cf: 14.32,      tp: 0.0640 },
  { li: 6_332.06,  ls: 11_128.01,  cf: 371.83,     tp: 0.1088 },
  { li: 11_128.02, ls: 12_935.82,  cf: 893.63,     tp: 0.1600 },
  { li: 12_935.83, ls: 15_487.71,  cf: 1_182.88,   tp: 0.1792 },
  { li: 15_487.72, ls: 31_236.49,  cf: 1_640.18,   tp: 0.2136 },
  { li: 31_236.50, ls: 49_233.00,  cf: 5_004.12,   tp: 0.2352 },
  { li: 49_233.01, ls: 93_993.90,  cf: 9_236.89,   tp: 0.3000 },
  { li: 93_993.91, ls: 125_325.20, cf: 22_665.17,  tp: 0.3200 },
  { li: 125_325.21,ls: 375_975.61, cf: 32_691.18,  tp: 0.3400 },
  { li: 375_975.62,ls: Infinity,   cf: 117_912.32, tp: 0.3500 },
];

// Subsidio al Empleo mensual (Art. 1 Decreto 01/01/2008)
const SUBSIDIO_TABLA = [
  { li: 0.01,    ls: 1_768.96, monto: 407.02 },
  { li: 1_768.97,ls: 2_653.38, monto: 406.83 },
  { li: 2_653.39,ls: 3_472.84, monto: 406.62 },
  { li: 3_472.85,ls: 3_537.87, monto: 392.77 },
  { li: 3_537.88,ls: 4_446.15, monto: 382.46 },
  { li: 4_446.16,ls: 4_717.18, monto: 354.23 },
  { li: 4_717.19,ls: 5_335.42, monto: 324.87 },
  { li: 5_335.43,ls: 6_224.67, monto: 294.63 },
  { li: 6_224.68,ls: 7_113.90, monto: 253.54 },
  { li: 7_113.91,ls: 7_382.33, monto: 217.61 },
  { li: 7_382.34,ls: Infinity,  monto: 0      },
];

// ── Funciones de cálculo ───────────────────────────────────────────────────────

function calcIMSS(bruto: number): number {
  // Cuotas obreras (LSS Arts. 25, 106, 141, 147):
  // · Cesantía y Vejez     1.125%
  // · Invalidez y Vida     0.625%
  // · Prestaciones Dinero  0.250%
  // · IMSS Pensionados     0.375%
  // · Cuota obrera excedente 0.40% sobre exceso de 3 SMDF
  const base    = bruto * 0.02375;
  const exceso  = Math.max(0, bruto - TRES_SMDF) * 0.004;
  return base + exceso;
}

function calcISR(bruto: number): number {
  const renglon = ISR_TABLA.find(r => bruto >= r.li && bruto <= r.ls);
  if (!renglon || bruto <= 0) return 0;
  return renglon.cf + (bruto - renglon.li) * renglon.tp;
}

function calcSubsidio(bruto: number): number {
  const renglon = SUBSIDIO_TABLA.find(r => bruto >= r.li && bruto <= r.ls);
  return renglon?.monto ?? 0;
}

// ── UI ─────────────────────────────────────────────────────────────────────────

type Periodo = "quincenal" | "mensual" | "anual";

const PERIODOS: { key: Periodo; label: string; toMensual: number }[] = [
  { key: "quincenal", label: "Quincenal", toMensual: 2      },
  { key: "mensual",   label: "Mensual",   toMensual: 1      },
  { key: "anual",     label: "Anual",     toMensual: 1 / 12 },
];

const mxn = (v: number) =>
  v.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

function RowDeduccion({
  label, hint, value, color,
}: {
  label: string; hint?: string; value: number; color: "negativo" | "positivo" | "crema";
}) {
  const colorMap = {
    negativo: "#FF6B6B",
    positivo: "#34D87F",
    crema:    "rgba(207,204,196,0.8)",
  };
  return (
    <div className="flex items-center justify-between py-3 border-b border-hairline-dark">
      <div className="flex items-center gap-2">
        <span className="font-sans text-sm" style={{ color: colorMap[color] }}>{label}</span>
        {hint && <span className="font-sans text-[10px] text-muted-dark">{hint}</span>}
      </div>
      <span className="font-sans text-sm font-semibold tabular-nums" style={{ color: colorMap[color] }}>
        {value >= 0 ? "+" : "−"}{mxn(Math.abs(value))}
      </span>
    </div>
  );
}

export default function Calculadoras() {
  const [raw, setRaw]         = useState("25000");
  const [periodo, setPeriodo] = useState<Periodo>("mensual");

  const p        = PERIODOS.find(x => x.key === periodo)!;
  const brutoMx  = (parseFloat(raw.replace(/,/g, "")) || 0) * p.toMensual;

  const imss     = calcIMSS(brutoMx);
  const isrPrev  = calcISR(brutoMx);
  const subsidio = calcSubsidio(brutoMx);
  const isrNeto  = Math.max(0, isrPrev - subsidio);
  const neto     = brutoMx - imss - isrNeto;
  const carga    = brutoMx > 0 ? ((brutoMx - neto) / brutoMx) * 100 : 0;
  const imssRate = brutoMx > 0 ? ((imss / brutoMx) * 100).toFixed(2) : "2.38";

  // Helper: convert monthly → display period
  const d = (v: number) => v / p.toMensual;

  const periodoLabel = periodo === "quincenal" ? "quincenal" : periodo === "anual" ? "anual" : "mensual";

  return (
    <section id="calculadoras" className="px-6 md:px-14 lg:px-20 py-24 border-t border-hairline-dark">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-muted-dark mb-4">
            Herramientas
          </p>
          <h2
            className="h-serif font-bold text-crema"
            style={{ fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 0.92, letterSpacing: "-0.02em" }}
          >
            Calculadoras
          </h2>
        </div>

        {/* Calculator card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-[920px]">

          {/* ── Input panel ── */}
          <div className="rounded-xl bg-surface-dark border border-hairline-dark p-6 flex flex-col gap-7">

            {/* Identity */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-sans text-[10px] font-bold text-muted-dark tracking-widest">01</span>
                <span className="w-px h-3 bg-hairline-dark" />
                <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-muted-dark">
                  Salario Neto
                </span>
              </div>
              <h3 className="h-serif text-2xl font-bold text-crema leading-none mb-1">
                ¿Cuánto recibes realmente?
              </h3>
              <p className="font-sans text-muted-dark text-xs leading-relaxed">
                Asalariado · IMSS + ISR Art. 96 · 2026
              </p>
            </div>

            {/* Periodo selector */}
            <div>
              <p className="font-sans text-[10px] font-semibold tracking-widest uppercase text-muted-dark mb-2">
                Período
              </p>
              <div className="flex rounded-lg border border-hairline-dark overflow-hidden">
                {PERIODOS.map((per) => (
                  <button
                    key={per.key}
                    onClick={() => setPeriodo(per.key)}
                    className="flex-1 py-2.5 font-sans text-xs font-semibold transition-all"
                    style={{
                      background: periodo === per.key ? "#F7F6F3" : "transparent",
                      color: periodo === per.key ? "#1f1e1d" : "#8b887f",
                    }}
                  >
                    {per.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Salary input */}
            <div>
              <p className="font-sans text-[10px] font-semibold tracking-widest uppercase text-muted-dark mb-2">
                Salario bruto {periodoLabel}
              </p>
              <div
                className="flex items-center gap-3 rounded-lg border border-hairline-dark bg-tinta px-4 py-3 transition-colors focus-within:border-azuldk"
              >
                <span className="font-sans text-muted-dark text-sm flex-shrink-0 select-none">MXN $</span>
                <input
                  type="number"
                  value={raw}
                  onChange={(e) => setRaw(e.target.value)}
                  className="flex-1 bg-transparent text-crema font-sans font-bold text-2xl focus:outline-none"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                  min="0"
                  step="500"
                  placeholder="0"
                />
              </div>
              <p className="font-sans text-[10px] text-muted-dark mt-2">
                Mín. legal 2026: {mxn(periodo === "quincenal" ? 278.80 * 15.2 : periodo === "anual" ? 278.80 * 365 : 278.80 * 30.4)}
              </p>
            </div>
          </div>

          {/* ── Results panel ── */}
          <div className="rounded-xl bg-surface-dark border border-hairline-dark p-6 flex flex-col">

            <p className="font-sans text-[10px] font-semibold tracking-widest uppercase text-muted-dark mb-4">
              Desglose {periodoLabel}
            </p>

            {/* Rows */}
            <RowDeduccion label="Salario bruto"  value={d(brutoMx)} color="crema" />
            <RowDeduccion
              label={`− IMSS obrero`}
              hint={`(${imssRate}%)`}
              value={-d(imss)}
              color="negativo"
            />
            <RowDeduccion
              label="− ISR"
              hint={`(Art. 96)`}
              value={-d(isrPrev)}
              color="negativo"
            />
            {subsidio > 0 && (
              <RowDeduccion
                label="+ Subsidio al empleo"
                value={d(subsidio)}
                color="positivo"
              />
            )}

            {/* Composition bar */}
            {brutoMx > 0 && (
              <div className="mt-4 mb-5">
                <div className="flex rounded-full overflow-hidden h-1.5">
                  <div style={{ width: `${(neto / brutoMx) * 100}%`, background: "#34D87F" }} />
                  <div style={{ width: `${(imss / brutoMx) * 100}%`, background: "#6B87FF" }} />
                  <div style={{ width: `${(isrNeto / brutoMx) * 100}%`, background: "#FF6B6B" }} />
                </div>
                <div className="flex gap-4 mt-2">
                  {[
                    { label: "Neto", color: "#34D87F" },
                    { label: "IMSS", color: "#6B87FF" },
                    { label: "ISR",  color: "#FF6B6B" },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: l.color }} />
                      <span className="font-sans text-[10px] text-muted-dark">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Net result */}
            <div className="flex items-end justify-between mt-auto pt-4 border-t border-hairline-dark">
              <div>
                <p className="font-sans text-[10px] font-semibold tracking-widest uppercase text-muted-dark mb-1">
                  Salario neto {periodoLabel}
                </p>
                <p
                  className="h-serif font-bold text-positivo"
                  style={{
                    fontSize: "clamp(28px, 3.5vw, 46px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {mxn(d(neto))}
                </p>
              </div>
              <div className="text-right pb-0.5">
                <p className="font-sans text-[10px] font-semibold tracking-widest uppercase text-muted-dark mb-1">
                  Carga fiscal
                </p>
                <p
                  className="font-sans font-bold text-negativo"
                  style={{ fontSize: "28px", fontVariantNumeric: "tabular-nums" }}
                >
                  {carga.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="font-sans text-[11px] text-muted-dark mt-5 max-w-[680px] leading-relaxed">
          Estimación para asalariados con régimen de sueldos y salarios. Incluye IMSS obrero e ISR según Art. 96 LISR.
          No contempla deducciones personales, prestaciones exentas, crédito hipotecario ni tratamientos especiales.
          Consulta a tu contador para cifras exactas.
        </p>

      </div>
    </section>
  );
}
