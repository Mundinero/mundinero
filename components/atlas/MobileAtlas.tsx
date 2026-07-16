"use client";

interface CurrencyRow {
  code: string;
  label: string;
  rate: number;
  delta30d: number;
}

interface Props {
  rates: Record<string, { rate: number; delta30d: number }> | null;
  usdmxn: number | null;
  pessoMode: boolean;
}

const LABELS: Record<string, string> = {
  USD: "Dólar EE.UU.",
  EUR: "Euro",
  GBP: "Libra esterlina",
  CAD: "Dólar canadiense",
  JPY: "Yen japonés",
  BRL: "Real brasileño",
  COP: "Peso colombiano",
  ARS: "Peso argentino",
};

export default function MobileAtlas({ rates, usdmxn, pessoMode }: Props) {
  if (!rates) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: "52px",
              borderRadius: "4px",
              background: "var(--color-surface-dark)",
              opacity: 0.5,
            }}
          />
        ))}
      </div>
    );
  }

  const rows: CurrencyRow[] = Object.entries(rates)
    .filter(([code]) => LABELS[code])
    .map(([code, { rate, delta30d }]) => ({
      code,
      label: LABELS[code] ?? code,
      // In peso mode: show MXN per foreign currency; in normal mode: foreign per MXN
      rate: pessoMode ? (usdmxn != null ? rate * usdmxn : 0) : rate,
      delta30d,
    }))
    .sort((a, b) => {
      const order = ["USD", "EUR", "GBP", "CAD", "JPY", "BRL", "COP", "ARS"];
      return order.indexOf(a.code) - order.indexOf(b.code);
    });

  const fmt = (n: number, code: string) => {
    if (code === "JPY" && !pessoMode) return n.toFixed(6);
    if (pessoMode && (code === "ARS" || code === "COP")) return `$${n.toFixed(4)}`;
    return n.toFixed(4);
  };

  return (
    <div className="flex flex-col gap-0">
      {rows.map((row, i) => {
        const isPos = row.delta30d >= 0;
        return (
          <div
            key={row.code}
            className="flex items-center justify-between py-3"
            style={{
              borderBottom: i < rows.length - 1
                ? "0.5px solid var(--color-hairline-dark)"
                : "none",
            }}
          >
            <div>
              <p className="font-sans font-semibold" style={{ fontSize: "13px", color: "var(--color-crema)" }}>
                {row.code}
              </p>
              <p className="font-sans" style={{ fontSize: "10px", color: "var(--color-muted-dark)" }}>
                {row.label}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono tnum font-semibold" style={{ fontSize: "14px", color: "var(--color-crema)" }}>
                {fmt(row.rate, row.code)}
              </p>
              <p
                className="font-mono tnum"
                style={{
                  fontSize: "10px",
                  color: isPos ? "var(--color-positivo)" : "var(--color-negativo)",
                }}
              >
                {isPos ? "+" : ""}{row.delta30d.toFixed(2)}%
              </p>
            </div>
          </div>
        );
      })}

      {/* Corredor */}
      <div
        className="mt-4 rounded-sm p-4"
        style={{ background: "var(--color-surface-dark)" }}
      >
        <p className="font-sans font-semibold uppercase" style={{ fontSize: "9px", letterSpacing: "0.26em", color: "var(--color-azuldk)", marginBottom: "8px" }}>
          Corredor México → EE.UU.
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-mono tnum font-bold" style={{ fontSize: "22px", color: "var(--color-crema)" }}>
            {usdmxn != null ? usdmxn.toFixed(2) : "—"}
          </span>
          <span className="font-sans" style={{ fontSize: "11px", color: "var(--color-muted-dark)" }}>MXN por USD</span>
        </div>
        <p className="font-sans mt-2" style={{ fontSize: "10px", color: "var(--color-soft-dark)" }}>
          Remesas 2024: $63.3B USD · BANXICO
        </p>
      </div>
    </div>
  );
}
