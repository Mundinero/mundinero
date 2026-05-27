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

const badgeClass: Record<SignalType, string> = {
  Alerta:  "bg-negativo text-tinta",
  Evento:  "bg-azul text-crema",
  Vigilar: "bg-crema/15 text-crema",
  Dato:    "bg-positivo text-tinta",
};

function SignalCard({ type, title, desc, time }: Signal) {
  return (
    <div className="border border-crema/10 rounded p-4 hover:border-crema/25 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <span
          className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-sm uppercase flex-shrink-0 ${badgeClass[type]}`}
        >
          {type}
        </span>
        <span className="text-crema/35 text-xs font-medium flex-shrink-0">{time}</span>
      </div>
      <p className="text-crema font-semibold text-sm leading-snug mb-1">{title}</p>
      <p className="text-crema/55 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

export default function RadarMundinero() {
  return (
    <section id="radar" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-radar rounded-lg p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full bg-positivo flex-shrink-0"
                style={{ animation: "blink 1.4s ease-in-out infinite" }}
              />
              <h2 className="font-serif text-2xl font-bold text-crema">
                Radar Mundinero
              </h2>
            </div>
            <span className="text-crema/35 text-xs font-medium tracking-wide hidden sm:block">
              27 MAY 2026 · 14:32 CST
            </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {signals.map((s, i) => (
              <SignalCard key={i} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
