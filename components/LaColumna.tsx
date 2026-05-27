export default function LaColumna() {
  return (
    <section id="columna" className="py-16 px-4 border-t border-crema/10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <span className="text-crema/50 text-xs font-semibold tracking-[0.22em] uppercase">
            Opinión
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-crema mt-1 mb-8">
            La Columna
          </h2>

          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-azul/20 border border-azul/30 flex items-center justify-center">
              <span className="font-serif text-2xl font-bold text-azuldk">M</span>
            </div>

            <div>
              <p className="text-crema/45 text-[11px] font-semibold tracking-wide uppercase mb-1">
                Por el equipo editorial · Semana 22, 2026
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-crema leading-snug mb-3">
                El peso que nos une: remesas, tipo de cambio y el contrato
                social silencioso
              </h3>
              <p className="text-crema/55 text-sm leading-relaxed mb-4">
                Cada dólar que cruza la frontera hacia México lleva una historia
                de separación y esperanza. Pero entre el envío y el recibo, las
                instituciones cobran un peaje que nadie votó y que todos pagamos.
                Esta semana, los números del récord de remesas esconden una
                pregunta más profunda: ¿quién diseñó este sistema y a favor de
                quién?
              </p>
              <a href="#" className="text-azuldk text-sm font-semibold hover:underline">
                Leer la columna completa →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
