type SignalType = "Alerta" | "Evento" | "Vigilar" | "Dato";

interface Signal {
  type: SignalType;
  title: string;
  desc: string;
  time: string;
}

const signals: Signal[] = [
  {
    type: "Alerta",
    title: "Banxico mantiene tasa en 9.0% — divergencia con Fed",
    desc: "La Junta de Gobierno votó 4-1. La brecha de tasas con EE.UU. sigue comprimida al mínimo desde 2019.",
    time: "hace 2h",
  },
  {
    type: "Evento",
    title: "SHCP presenta Paquete Económico 2027 el 8 de junio",
    desc: "El presupuesto llegará con déficit proyectado del 3.9% del PIB. Mercado espera más recortes al gasto.",
    time: "hoy",
  },
  {
    type: "Vigilar",
    title: "USD/MXN cerca de zona técnica clave: 18.40–18.50",
    desc: "Si el dólar rompe esa resistencia, el siguiente objetivo técnico es 18.80. Posicionamiento especulativo largo.",
    time: "hace 4h",
  },
  {
    type: "Dato",
    title: "Remesas en abril: $5,200 mdd — récord histórico mensual",
    desc: "Crecimiento del 7.3% anual. El 96% llega desde EE.UU. Efecto estacional y migración reciente.",
    time: "ayer",
  },
];

/* Badges como chips planos — colores semánticos de Mundinero */
const badgeStyle: Record<SignalType, React.CSSProperties> = {
  Alerta:  { background: "rgba(255,107,107,0.12)", color: "#FF6B6B", borderColor: "rgba(255,107,107,0.22)" },
  Evento:  { background: "rgba(81,112,255,0.14)",  color: "#6B87FF", borderColor: "rgba(81,112,255,0.25)" },
  Vigilar: { background: "rgba(207,204,196,0.08)", color: "#cfccc4", borderColor: "rgba(207,204,196,0.15)" },
  Dato:    { background: "rgba(52,216,127,0.12)",  color: "#34D87F", borderColor: "rgba(52,216,127,0.22)" },
};

function SignalRow({ type, title, desc, time }: Signal) {
  return (
    <div className="py-7 grid grid-cols-1 md:grid-cols-[140px_1fr_72px] gap-3 md:gap-8 items-start border-b border-hairline-dark last:border-0 group">
      <div>
        <span
          className="font-sans text-[10px] font-bold tracking-[0.14em] px-2.5 py-1 uppercase rounded-md border"
          style={badgeStyle[type]}
        >
          {type}
        </span>
      </div>
      <div>
        <p
          className="font-serif font-bold text-crema leading-[1.15] group-hover:text-azuldk transition-colors"
          style={{ fontSize: "clamp(18px, 2vw, 22px)", letterSpacing: "-0.01em" }}
        >
          {title}
        </p>
        <p className="font-sans text-muted-dark text-sm leading-relaxed mt-1.5">{desc}</p>
      </div>
      <p className="font-sans text-muted-dark text-xs font-medium pt-0.5 md:text-right">{time}</p>
    </div>
  );
}

export default function RadarMundinero() {
  return (
    <section id="radar" className="px-6 md:px-14 lg:px-20 py-24 border-t border-hairline-dark">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="w-2 h-2 rounded-full bg-positivo flex-shrink-0"
                style={{ animation: "blink 1.4s ease-in-out infinite" }}
              />
              <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-muted-dark">
                En vivo
              </p>
            </div>
            <h2
              className="h-serif font-bold text-crema"
              style={{ fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 0.92, letterSpacing: "-0.02em" }}
            >
              Radar<br />Mundinero
            </h2>
          </div>
          <span className="font-sans text-muted-dark text-xs font-medium tracking-wide hidden sm:block">
            27 MAY 2026 · 14:32 CST
          </span>
        </div>

        {/* Filas */}
        <div>
          {signals.map((s, i) => (
            <SignalRow key={i} {...s} />
          ))}
        </div>

      </div>
    </section>
  );
}
