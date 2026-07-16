import { NextResponse } from "next/server";

export const revalidate = 3600; // cache 1hr en edge

const BASE = "https://api.frankfurter.app";

async function fetchJSON(url: string) {
  const r = await fetch(url, { next: { revalidate: 3600 } });
  if (!r.ok) throw new Error(`Frankfurter ${r.status}`);
  return r.json();
}

export async function GET() {
  try {
    const today = new Date();
    const past = new Date(today);
    past.setDate(past.getDate() - 30);
    const pastStr = past.toISOString().slice(0, 10);

    // Pares clave desde MXN
    const symbols = "USD,EUR,CAD,GBP,JPY,BRL,COP,ARS";

    const [latest, historical] = await Promise.all([
      fetchJSON(`${BASE}/latest?from=MXN&to=${symbols}`),
      fetchJSON(`${BASE}/${pastStr}?from=MXN&to=${symbols}`),
    ]);

    const rates: Record<string, { rate: number; delta30d: number }> = {};
    for (const sym of symbols.split(",")) {
      const now = latest.rates?.[sym];
      const then = historical.rates?.[sym];
      if (now == null) continue;
      rates[sym] = {
        rate:    now,
        delta30d: then != null ? ((now - then) / then) * 100 : 0,
      };
    }

    // Tipo de cambio inverso: cuántos MXN por 1 USD (para "modo peso")
    const usdmxn = 1 / (rates["USD"]?.rate ?? 0.05);

    return NextResponse.json({ rates, usdmxn, date: latest.date }, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600" },
    });
  } catch (err) {
    console.error("Frankfurter error:", err);
    return NextResponse.json({ error: "no disponible" }, { status: 502 });
  }
}
