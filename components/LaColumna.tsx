import SelloMundinero from "./SelloMundinero";

export default function LaColumna() {
  return (
    <section id="columna" className="px-6 md:px-14 lg:px-20 py-24 border-t border-hairline-dark">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-muted-dark mb-4">
            Opinión
          </p>
          <h2
            className="h-serif font-bold text-crema"
            style={{ fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 0.92, letterSpacing: "-0.02em" }}
          >
            La Columna
          </h2>
        </div>

        {/* Contenido editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">

          {/* Meta panel izquierdo */}
          <div className="rounded-xl bg-surface-dark border border-hairline-dark p-6 flex flex-col gap-4">
            {/* Marca isotipo */}
            <div className="w-10 h-10 rounded-lg border border-hairline-dark flex items-center justify-center">
              <span className="h-serif text-xl font-bold text-azuldk leading-none">₥</span>
            </div>
            <div>
              <p className="font-sans text-[10px] font-semibold tracking-widest uppercase text-muted-dark mb-1">
                Equipo Editorial
              </p>
              <p className="font-sans text-soft-dark text-sm">Semana 22, 2026</p>
            </div>
            <div className="border-t border-hairline-dark pt-4">
              <p className="font-sans text-muted-dark text-xs leading-relaxed">
                Cada semana, el equipo editorial de Mundinero analiza la señal
                que importa detrás del ruido financiero.
              </p>
            </div>
            <a
              href="#"
              className="font-sans text-azuldk text-sm font-medium hover:text-crema transition-colors"
            >
              Leer la columna completa →
            </a>
          </div>

          {/* Texto columna */}
          <div>
            <h3
              className="h-serif font-bold text-crema leading-[1.05] mb-6"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-0.02em" }}
            >
              El peso que nos une: remesas, tipo de cambio y el contrato
              social silencioso
            </h3>
            <p className="font-sans text-soft-dark text-[15px] leading-[1.75] mb-5">
              Cada dólar que cruza la frontera hacia México lleva una historia
              de separación y esperanza. Pero entre el envío y el recibo, las
              instituciones cobran un peaje que nadie votó y que todos pagamos.
            </p>
            <p className="font-sans text-muted-dark text-[15px] leading-[1.75]">
              Esta semana, los números del récord de remesas esconden una
              pregunta más profunda: ¿quién diseñó este sistema y a favor de
              quién?
            </p>
          </div>

        </div>

        {/* Colofón */}
        <div className="flex flex-col items-center gap-3 mt-16 pt-10 border-t border-hairline-dark">
          <SelloMundinero size={56} rotate="entry" />
          <p
            className="font-sans font-medium uppercase"
            style={{ fontSize: "9px", letterSpacing: "0.24em", color: "var(--color-muted-dark)" }}
          >
            Mundinero · 2026
          </p>
        </div>

      </div>
    </section>
  );
}
