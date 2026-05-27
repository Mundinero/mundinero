const articles = [
  {
    category: "Banxico",
    title: "La trampa de la tasa: por qué Banxico no puede bajar más rápido",
    author: "Redacción Mundinero",
    date: "27 may 2026",
    time: "6 min",
    accent: "bg-azul/15",
  },
  {
    category: "Cripto",
    title: "Bitcoin a $83k: ¿corrección sana o inicio del bear market?",
    author: "Análisis Técnico",
    date: "26 may 2026",
    time: "8 min",
    accent: "bg-positivo/10",
  },
  {
    category: "Peso",
    title: "USD/MXN: los tres escenarios para junio 2026",
    author: "Desk FX",
    date: "26 may 2026",
    time: "5 min",
    accent: "bg-crema/5",
  },
  {
    category: "Remesas",
    title: "Récord en abril: $5,200 mdd — ¿y el costo? Sigue siendo brutal",
    author: "Redacción Mundinero",
    date: "25 may 2026",
    time: "4 min",
    accent: "bg-negativo/10",
  },
  {
    category: "Presupuesto",
    title: "SHCP y el PEF 2027: déficit, recortes y la prueba de credibilidad",
    author: "Macroeconomía MX",
    date: "24 may 2026",
    time: "7 min",
    accent: "bg-azuldk/10",
  },
  {
    category: "Fed",
    title: "Powell en pausa: qué significa para México cada mes que la Fed espera",
    author: "Global Desk",
    date: "23 may 2026",
    time: "5 min",
    accent: "bg-positivo/5",
  },
];

export default function ArticulosGrid() {
  return (
    <section id="noticias" className="py-16 px-4 border-t border-crema/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-crema/50 text-xs font-semibold tracking-[0.22em] uppercase">
              Análisis
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-crema mt-1">
              Noticias
            </h2>
          </div>
          <a href="#" className="text-azuldk text-sm font-semibold hover:underline">
            Ver todo →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <article
              key={i}
              className="border border-crema/10 rounded-lg overflow-hidden hover:border-crema/25 transition-colors group cursor-pointer"
            >
              {/* Placeholder thumbnail */}
              <div
                className={`h-36 ${a.accent} flex items-center justify-center`}
              >
                <span className="text-crema/20 text-[11px] font-bold tracking-widest uppercase">
                  {a.category}
                </span>
              </div>

              <div className="p-5">
                <span className="text-azuldk text-[11px] font-bold tracking-widest uppercase">
                  {a.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-crema mt-1 leading-snug group-hover:text-azuldk transition-colors">
                  {a.title}
                </h3>
                <div className="flex items-center gap-2 mt-3 text-crema/40 text-xs">
                  <span>{a.author}</span>
                  <span>·</span>
                  <span>{a.date}</span>
                  <span>·</span>
                  <span>{a.time} lectura</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
