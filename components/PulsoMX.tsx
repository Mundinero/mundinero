"use client";

import { useState } from "react";

const stats = [
  {
    label: "USD/MXN",
    value: "18.24",
    change: "+0.12%",
    up: true,
    sub: "Tipo de cambio spot · Banxico",
  },
  {
    label: "BTC",
    value: "$83,240",
    change: "+1.84%",
    up: true,
    sub: "Bitcoin · USD · 24h",
  },
  {
    label: "CETES Real Yield",
    value: "+5.73%",
    change: null,
    up: true,
    sub: "CETES 28d 9.50% − Inflación 3.77%",
  },
  {
    label: "Remesas 2026",
    value: "$5,200M",
    change: "+7.3%",
    up: true,
    sub: "Abril 2026 · Récord mensual · Banxico",
  },
];

export default function PulsoMX() {
  const [usd, setUsd] = useState("1000");

  const amount = parseFloat(usd) || 0;
  const tradicional = amount * (1 - 0.054);
  const stablecoin  = amount * (1 - 0.008);
  const ahorro = stablecoin - tradicional;

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <section id="pulso-mx" className="px-6 md:px-14 lg:px-20 py-24 border-t border-hairline-dark">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-muted-dark mb-4">
            Indicadores
          </p>
          <h2
            className="h-serif font-bold text-crema"
            style={{ fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 0.92, letterSpacing: "-0.02em" }}
          >
            Pulso MX
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-xl bg-surface-dark border border-hairline-dark p-5 hover:border-soft-dark transition-colors"
            >
              <p className="font-sans text-[10px] font-semibold tracking-widest uppercase text-muted-dark mb-3">
                {s.label}
              </p>
              <p
                className="font-sans font-bold text-crema leading-none tabular-nums"
                style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontVariantNumeric: "tabular-nums" }}
              >
                {s.value}
              </p>
              {s.change && (
                <p className={`font-sans text-sm font-semibold mt-2 ${s.up ? "text-positivo" : "text-negativo"}`}>
                  {s.up ? "▲" : "▼"} {s.change}
                </p>
              )}
              <p className="font-sans text-muted-dark text-[10px] mt-3 leading-relaxed">
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Calculadora */}
        <div className="rounded-xl bg-surface-dark border border-hairline-dark p-6 md:p-8">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="font-sans text-[10px] font-semibold tracking-widest uppercase text-muted-dark mb-2">
                Calculadora
              </p>
              <h3 className="h-serif text-xl md:text-2xl font-bold text-crema">
                Costo de las Remesas
              </h3>
            </div>
            <p className="font-sans text-muted-dark text-xs hidden sm:block pt-1">
              ¿Cuánto pierde tu familia en comisiones?
            </p>
          </div>

          {/* Input */}
          <div className="flex items-center gap-3 mb-8 max-w-[260px]">
            <span className="font-sans text-muted-dark text-sm flex-shrink-0">USD $</span>
            <input
              type="number"
              value={usd}
              onChange={(e) => setUsd(e.target.value)}
              className="flex-1 rounded-lg border border-hairline-dark bg-tinta text-crema font-sans font-semibold text-lg px-3 py-2 focus:outline-none focus:border-azuldk transition-colors"
              style={{ fontVariantNumeric: "tabular-nums" }}
              min="0"
              step="100"
            />
          </div>

          {/* Comparativa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-hairline-dark p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="font-sans text-[10px] font-semibold tracking-widest uppercase text-muted-dark">
                  Tradicional
                </p>
                <span className="font-sans text-[10px] font-bold text-negativo bg-negativo/10 border border-negativo/20 rounded-md px-2 py-0.5">
                  5.4% comisión
                </span>
              </div>
              <p className="h-serif text-3xl font-bold text-crema tabular-nums">${fmt(tradicional)}</p>
              <p className="font-sans text-negativo text-sm font-semibold mt-2">
                Pierdes ${fmt(amount - tradicional)}
              </p>
            </div>

            <div className="rounded-xl border border-hairline-dark p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="font-sans text-[10px] font-semibold tracking-widest uppercase text-muted-dark">
                  Stablecoin
                </p>
                <span className="font-sans text-[10px] font-bold text-positivo bg-positivo/10 border border-positivo/20 rounded-md px-2 py-0.5">
                  &lt;1% comisión
                </span>
              </div>
              <p className="h-serif text-3xl font-bold text-crema tabular-nums">${fmt(stablecoin)}</p>
              <p className="font-sans text-positivo text-sm font-semibold mt-2">
                Ahorras ${fmt(ahorro)}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
