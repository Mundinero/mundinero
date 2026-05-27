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
    <section id="pulso-mx" className="py-16 px-4 border-t border-crema/10">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-8">
          <span className="text-crema/50 text-xs font-semibold tracking-[0.22em] uppercase">
            Indicadores
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-crema mt-1">
            Pulso MX
          </h2>
        </div>

        {/* 2×2 stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((s, i) => (
            <div
              key={i}
              className="border border-crema/10 rounded-lg p-4 hover:border-crema/25 transition-colors"
            >
              <p className="text-crema/50 text-[11px] font-semibold tracking-widest uppercase mb-2">
                {s.label}
              </p>
              <p className="font-serif text-2xl md:text-3xl font-bold text-crema">
                {s.value}
              </p>
              {s.change && (
                <p
                  className={`text-sm font-semibold mt-1 ${
                    s.up ? "text-positivo" : "text-negativo"
                  }`}
                >
                  {s.up ? "▲" : "▼"} {s.change}
                </p>
              )}
              <p className="text-crema/35 text-[10px] mt-2 leading-relaxed">
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Calculadora */}
        <div className="border border-crema/10 rounded-lg p-6 md:p-8">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-crema mb-1">
            Calculadora de Remesas
          </h3>
          <p className="text-crema/50 text-sm mb-6">
            ¿Cuánto pierde tu familia en comisiones?
          </p>

          <div className="flex items-center gap-3 mb-8 max-w-xs">
            <span className="text-crema/50 font-semibold text-sm flex-shrink-0">
              USD $
            </span>
            <input
              type="number"
              value={usd}
              onChange={(e) => setUsd(e.target.value)}
              className="flex-1 bg-tinta border border-crema/20 rounded px-3 py-2 text-crema font-semibold text-lg focus:outline-none focus:border-azul transition-colors"
              min="0"
              step="100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tradicional */}
            <div className="border border-negativo/25 rounded-lg p-5 bg-negativo/5">
              <p className="text-crema/50 text-[11px] font-semibold tracking-widest uppercase mb-3">
                Tradicional (5.4% comisión)
              </p>
              <p className="font-serif text-3xl font-bold text-crema">
                ${fmt(tradicional)}
              </p>
              <p className="text-negativo text-sm font-semibold mt-2">
                Pierdes ${fmt(amount - tradicional)}
              </p>
            </div>

            {/* Stablecoin */}
            <div className="border border-positivo/25 rounded-lg p-5 bg-positivo/5">
              <p className="text-crema/50 text-[11px] font-semibold tracking-widest uppercase mb-3">
                Stablecoin (&lt;1% comisión)
              </p>
              <p className="font-serif text-3xl font-bold text-crema">
                ${fmt(stablecoin)}
              </p>
              <p className="text-positivo text-sm font-semibold mt-2">
                Ahorras ${fmt(ahorro)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
