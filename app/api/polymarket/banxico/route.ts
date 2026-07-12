import { NextResponse } from "next/server";

// Token del resultado "Sin cambio" (93.5% / el dominante)
const TOKEN_NO_CHANGE =
  "37593934726560873533197883439457294079580315564021085969196243071890347690669";

const EVENT_SLUG = "bank-of-mexico-decision-in-august";

export async function GET() {
  try {
    const [histRes, evtRes] = await Promise.all([
      fetch(
        `https://clob.polymarket.com/prices-history?market=${TOKEN_NO_CHANGE}&interval=all&fidelity=60`,
        { next: { revalidate: 120 } }
      ),
      fetch(
        `https://gamma-api.polymarket.com/events?slug=${EVENT_SLUG}`,
        { next: { revalidate: 120 } }
      ),
    ]);

    const hist = await histRes.json();
    const evt  = await evtRes.json();

    // Extraer precios actuales por resultado del evento
    const markets: Array<{ question: string; outcomePrices: string; volume: string }> =
      evt[0]?.markets ?? [];

    const outcomes = markets.map((m) => ({
      label:  m.question,
      price:  parseFloat(JSON.parse(m.outcomePrices)[0]),
      volume: parseFloat(m.volume ?? "0"),
    }));

    return NextResponse.json(
      { history: hist.history ?? [], outcomes, volume: evt[0]?.volume ?? 0 },
      { headers: { "Cache-Control": "s-maxage=120, stale-while-revalidate=300" } }
    );
  } catch {
    return NextResponse.json({ error: "upstream_error" }, { status: 502 });
  }
}
