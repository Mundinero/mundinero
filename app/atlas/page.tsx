import Ticker from "@/components/Ticker";
import ManchetaNav from "@/components/ManchetaNav";
import Footer from "@/components/Footer";
import AtlasClient from "@/components/atlas/AtlasClient";

export const revalidate = 3600;

interface FrankfurterData {
  rates:  Record<string, { rate: number; delta30d: number }>;
  usdmxn: number;
  date:   string;
}

async function getFrankfurterData(): Promise<FrankfurterData | null> {
  try {
    const BASE    = "https://api.frankfurter.app";
    const symbols = "USD,EUR,CAD,GBP,JPY,BRL,COP,ARS";

    const today = new Date();
    const past  = new Date(today);
    past.setDate(past.getDate() - 30);
    const pastStr = past.toISOString().slice(0, 10);

    const [latest, historical] = await Promise.all([
      fetch(`${BASE}/latest?from=MXN&to=${symbols}`, { next: { revalidate: 3600 } }).then((r) => r.json()),
      fetch(`${BASE}/${pastStr}?from=MXN&to=${symbols}`, { next: { revalidate: 3600 } }).then((r) => r.json()),
    ]);

    const rates: Record<string, { rate: number; delta30d: number }> = {};
    for (const sym of symbols.split(",")) {
      const now  = latest.rates?.[sym];
      const then = historical.rates?.[sym];
      if (now == null) continue;
      rates[sym] = {
        rate:    now,
        delta30d: then != null ? ((now - then) / then) * 100 : 0,
      };
    }

    const usdmxn = 1 / (rates["USD"]?.rate ?? 0.05);
    return { rates, usdmxn, date: latest.date };
  } catch {
    return null;
  }
}

export default async function AtlasPage() {
  const data = await getFrankfurterData();

  return (
    <>
      <Ticker />
      <div className="h-9" />
      <ManchetaNav />
      <main>
        <AtlasClient initialData={data} />
      </main>
      <Footer />
    </>
  );
}
