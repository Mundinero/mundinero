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
    <section id="eventos" className="py-16 px-4 border-t border-crema/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="text-crema/50 text-xs font-semibold tracking-[0.22em] uppercase">
            Agenda
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-crema mt-1">
            Eventos
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {eventos.map((e, i) => (
            <div
              key={i}
              className="border border-crema/10 rounded-lg p-5 hover:border-crema/25 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-serif text-3xl font-bold text-azuldk leading-none">
                    {e.date}
                  </p>
                  <p className="text-crema/40 text-[10px] font-semibold tracking-wide mt-0.5">
                    {e.year}
                  </p>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm bg-crema/10 text-crema/65">
                  {e.type}
                </span>
              </div>
              <h3 className="font-serif text-base font-bold text-crema leading-snug mb-1">
                {e.name}
              </h3>
              <p className="text-crema/40 text-[11px] font-medium mb-2">{e.org}</p>
              <p className="text-crema/50 text-xs leading-relaxed">{e.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
