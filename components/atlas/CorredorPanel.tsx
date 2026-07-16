"use client";

interface Props {
  usdmxn: number | null;
  delta30d: number | null;
  pessoMode: boolean;
}

const REMESAS_2024 = 63_310; // millones USD — BANXICO 2024

export default function CorredorPanel({ usdmxn, delta30d, pessoMode }: Props) {
  const fmtRate = (n: number) =>
    n.toLocaleString("es-MX", { minimumFractionDigits: 4, maximumFractionDigits: 4 });

  const isPositive = (delta30d ?? 0) >= 0;

  return (
    <aside
      className="flex flex-col gap-5"
      style={{ borderLeft: "0.5px solid var(--color-hairline-dark)", paddingLeft: "24px" }}
    >
      {/* Encabezado corredor */}
      <div>
        <p
          className="font-sans font-semibold uppercase"
          style={{ fontSize: "9px", letterSpacing: "0.28em", color: "var(--color-azuldk)" }}
        >
          Corredor principal
        </p>
        <p
          className="font-sans font-bold mt-1"
          style={{ fontSize: "15px", color: "var(--color-crema)" }}
        >
          México → EE.UU.
        </p>
      </div>

      {/* Tipo de cambio */}
      <div>
        <p className="font-sans" style={{ fontSize: "11px", color: "var(--color-muted-dark)", marginBottom: "4px" }}>
          {pessoMode ? "USD / MXN" : "MXN / USD"}
        </p>
        <p
          className="font-mono tnum font-bold"
          style={{ fontSize: "26px", letterSpacing: "-0.02em", color: "var(--color-crema)", lineHeight: 1 }}
        >
          {usdmxn != null
            ? fmtRate(pessoMode ? usdmxn : 1 / usdmxn)
            : "—"}
        </p>
        {delta30d != null && (
          <p
            className="font-mono tnum font-medium mt-1"
            style={{
              fontSize: "11px",
              color: isPositive ? "var(--color-positivo)" : "var(--color-negativo)",
            }}
          >
            {isPositive ? "+" : ""}{delta30d.toFixed(2)}% (30d)
          </p>
        )}
      </div>

      {/* Remesas */}
      <div style={{ borderTop: "0.5px solid var(--color-hairline-dark)", paddingTop: "16px" }}>
        <p className="font-sans" style={{ fontSize: "11px", color: "var(--color-muted-dark)", marginBottom: "4px" }}>
          Remesas México–EE.UU. 2024
        </p>
        <p
          className="font-mono tnum font-bold"
          style={{ fontSize: "22px", letterSpacing: "-0.02em", color: "var(--color-crema)", lineHeight: 1 }}
        >
          ${(REMESAS_2024 / 1000).toFixed(1)}B <span className="font-sans" style={{ fontSize: "12px", fontWeight: 400, color: "var(--color-muted-dark)" }}>USD</span>
        </p>
        <p className="font-sans" style={{ fontSize: "10px", color: "var(--color-soft-dark)", marginTop: "4px" }}>
          El corredor de remesas más grande del mundo · BANXICO
        </p>
      </div>

      {/* Costo de envío — dato fijo demostrativo */}
      <div style={{ borderTop: "0.5px solid var(--color-hairline-dark)", paddingTop: "16px" }}>
        <p className="font-sans" style={{ fontSize: "11px", color: "var(--color-muted-dark)", marginBottom: "8px" }}>
          Enviar $400 USD → México
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-sans" style={{ fontSize: "11px", color: "var(--color-soft-dark)" }}>
              Banco tradicional
            </span>
            <span
              className="font-mono tnum font-semibold"
              style={{ fontSize: "12px", color: "var(--color-negativo)" }}
            >
              ~4.2%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-sans" style={{ fontSize: "11px", color: "var(--color-soft-dark)" }}>
              Fintech digital
            </span>
            <span
              className="font-mono tnum font-semibold"
              style={{ fontSize: "12px", color: "var(--color-positivo)" }}
            >
              ~1.8%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-sans" style={{ fontSize: "11px", color: "var(--color-soft-dark)" }}>
              Stablecoin
            </span>
            <span
              className="font-mono tnum font-semibold"
              style={{ fontSize: "12px", color: "var(--color-positivo)" }}
            >
              ~0.8%
            </span>
          </div>
        </div>
      </div>

      {/* Selector de país — próximamente */}
      <div style={{ borderTop: "0.5px solid var(--color-hairline-dark)", paddingTop: "16px", opacity: 0.5 }}>
        <p className="font-sans" style={{ fontSize: "11px", color: "var(--color-muted-dark)", marginBottom: "8px" }}>
          Explorar otro corredor
        </p>
        <div
          className="flex items-center justify-between font-sans"
          style={{
            border:       "0.5px solid var(--color-hairline-dark)",
            borderRadius: "4px",
            padding:      "8px 10px",
            fontSize:     "12px",
            color:        "var(--color-muted-dark)",
            cursor:       "not-allowed",
          }}
        >
          <span>Seleccionar país</span>
          <span style={{ fontSize: "9px", letterSpacing: "0.14em", color: "var(--color-azuldk)" }}>
            PRÓXIMAMENTE
          </span>
        </div>
      </div>
    </aside>
  );
}
