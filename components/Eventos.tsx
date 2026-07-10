const eventos = [
  {
    date: "8 JUN",
    year: "2026",
    name: "Presentación PEF 2027",
    org: "SHCP — Ciudad de México",
    type: "Fiscal",
    detail: "Paquete Económico 2027. Mercados atentos al déficit proyectado.",
  },
  {
    date: "19 JUN",
    year: "2026",
    name: "Decisión de tasa — Banxico",
    org: "Banco de México — Remota",
    type: "Política Monetaria",
    detail: "Reunión de política monetaria. Mercado descuenta recorte de 25pb.",
  },
  {
    date: "26 JUN",
    year: "2026",
    name: "Foro de Finanzas Digitales",
    org: "AMIB — Ciudad de México",
    type: "Industria",
    detail: "Cripto, stablecoins y regulación en México. Registro abierto.",
  },
  {
    date: "10 JUL",
    year: "2026",
    name: "Informe Inflación — INEGI",
    org: "INEGI — Nacional",
    type: "Dato",
    detail: "Primera quincena de julio. Clave para la próxima reunión de Banxico.",
  },
];

export default function Eventos() {
  return (
    <section id="eventos" className="px-6 md:px-14 lg:px-20 py-24 border-t border-hairline-dark">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-muted-dark mb-4">
            Agenda
          </p>
          <h2
            className="h-serif font-bold text-crema"
            style={{ fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 0.92, letterSpacing: "-0.02em" }}
          >
            Eventos
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {eventos.map((e, i) => (
            <div
              key={i}
              className="rounded-xl bg-surface-dark border border-hairline-dark p-5 flex flex-col gap-3 hover:border-soft-dark transition-colors"
            >
              {/* Date + type */}
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="h-serif font-bold text-azuldk leading-none"
                    style={{ fontSize: "clamp(24px, 2.5vw, 30px)" }}
                  >
                    {e.date}
                  </p>
                  <p className="font-sans text-muted-dark text-[10px] font-medium tracking-wide mt-0.5">
                    {e.year}
                  </p>
                </div>
                <span className="font-sans text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-md border border-hairline-dark text-muted-dark">
                  {e.type}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-hairline-dark" />

              {/* Content */}
              <div>
                <h3 className="font-serif text-base font-bold text-crema leading-snug mb-1">
                  {e.name}
                </h3>
                <p className="font-sans text-muted-dark text-[11px] font-medium mb-2">{e.org}</p>
                <p className="font-sans text-soft-dark text-xs leading-relaxed">{e.detail}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
