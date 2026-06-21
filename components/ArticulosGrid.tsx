const articles = [
  {
    category: "Banxico",
    title: "La trampa de la tasa: por qué Banxico no puede bajar más rápido",
    author: "Redacción Mundinero",
    date: "27 may 2026",
    time: "6 min",
  },
  {
    category: "Cripto",
    title: "Bitcoin a $83k: ¿corrección sana o inicio del bear market?",
    author: "Análisis Técnico",
    date: "26 may 2026",
    time: "8 min",
  },
  {
    category: "Peso",
    title: "USD/MXN: los tres escenarios para junio 2026",
    author: "Desk FX",
    date: "26 may 2026",
    time: "5 min",
  },
  {
    category: "Remesas",
    title: "Récord en abril: $5,200 mdd — ¿y el costo? Sigue siendo brutal",
    author: "Redacción Mundinero",
    date: "25 may 2026",
    time: "4 min",
  },
  {
    category: "Presupuesto",
    title: "SHCP y el PEF 2027: déficit, recortes y la prueba de credibilidad",
    author: "Macroeconomía MX",
    date: "24 may 2026",
    time: "7 min",
  },
  {
    category: "Fed",
    title: "Powell en pausa: qué significa para México cada mes que la Fed espera",
    author: "Global Desk",
    date: "23 may 2026",
    time: "5 min",
  },
];

export default function ArticulosGrid() {
  return (
    <section id="noticias" className="px-6 md:px-14 lg:px-20 py-24 border-t border-hairline-dark">
      <div className="max-w-[1400px] mx-auto">

        {/* Heading */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-muted-dark mb-4">
              Análisis
            </p>
            <h2
              className="h-serif font-bold text-crema"
              style={{ fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 0.92, letterSpacing: "-0.02em" }}
            >
              Noticias
            </h2>
          </div>
          <a
            href="#"
            className="font-sans text-azuldk text-sm font-medium hover:text-crema transition-colors tracking-wide"
          >
            Ver todo →
          </a>
        </div>

        {/* Lista tipográfica — sin cards, sin thumbnails */}
        <div>
          {articles.map((a, i) => (
            <article
              key={i}
              className="py-8 border-b border-hairline-dark last:border-0 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-3 md:gap-10 group cursor-pointer"
            >
              {/* Categoría con tick azuldk */}
              <div className="flex items-center gap-3 md:pt-1">
                <span className="h-px w-5 flex-shrink-0 bg-azuldk" />
                <span className="font-sans text-[11px] font-medium tracking-[0.14em] uppercase text-azuldk">
                  {a.category}
                </span>
              </div>

              {/* Titular + meta */}
              <div>
                <h3
                  className="font-serif font-bold text-crema leading-[1.1] group-hover:text-azuldk transition-colors"
                  style={{ fontSize: "clamp(20px, 2.2vw, 28px)", letterSpacing: "-0.01em" }}
                >
                  {a.title}
                </h3>
                <div className="flex items-center gap-2 mt-3 font-sans text-muted-dark text-xs">
                  <span>{a.author}</span>
                  <span className="text-hairline-dark">·</span>
                  <span>{a.date}</span>
                  <span className="text-hairline-dark">·</span>
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
