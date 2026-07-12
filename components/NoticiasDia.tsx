"use client";

const noticias = [
  {
    cat: "Tipo de cambio",
    titular: "Peso cierra semana en 17.12, tercer avance consecutivo",
    desc: "El peso acumula 1.4% de apreciación semanal, impulsado por flujos de remesas y datos favorables de inflación.",
    tiempo: "hace 1h",
  },
  {
    cat: "Mercados",
    titular: "IPC BMV alcanza 60,420 puntos en jornada récord",
    desc: "Fibras y bancos lideraron las alzas. El volumen operado superó 3.2 veces el promedio de 30 días.",
    tiempo: "hace 2h",
  },
  {
    cat: "Inflación",
    titular: "INEGI reporta inflación de 4.1% en junio; debajo de expectativas",
    desc: "La inflación subyacente cedió a 3.7%, el nivel más bajo en 36 meses. Alimentos y energéticos siguen presionados.",
    tiempo: "hace 3h",
  },
  {
    cat: "Finanzas Personales",
    titular: "SAT amplía plazo para declaración complementaria al 31 de julio",
    desc: "Contribuyentes con ingresos mixtos tienen 20 días adicionales para corregir su declaración anual sin multas.",
    tiempo: "hace 4h",
  },
  {
    cat: "Remesas",
    titular: "Envíos de mayo superan $5,400 mdd, nuevo récord mensual",
    desc: "El 96% provino de EE.UU. La apreciación del peso redujo el poder adquisitivo en MXN un 3.2% vs mayo 2025.",
    tiempo: "ayer",
  },
  {
    cat: "Fintech",
    titular: "CNBV autoriza tres nuevas plataformas de crédito bajo esquema sandbox",
    desc: "Operarán en modalidad regulada hasta 2027, cuando deberán obtener licencia definitiva.",
    tiempo: "ayer",
  },
];

export default function NoticiasDia() {
  return (
    <section className="bg-tinta px-6 md:px-14 lg:px-20 pt-8 pb-12">
      <div className="max-w-[1400px] mx-auto">
        <p
          className="font-sans font-bold uppercase mb-5"
          style={{ fontSize: "10px", letterSpacing: "0.22em", color: "var(--color-muted-dark)" }}
        >
          Noticias del día
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {noticias.map((n, i) => (
            <article
              key={n.titular}
              className="rounded-xl p-5 flex flex-col gap-2.5 cursor-pointer transition-colors fade-rise"
              style={{
                background:     "var(--color-surface-dark)",
                border:         "1px solid var(--color-hairline-dark)",
                animationDelay: `${300 + i * 40}ms`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-soft-dark)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-hairline-dark)";
              }}
            >
              <p
                className="font-sans font-bold uppercase"
                style={{ fontSize: "9px", letterSpacing: "0.22em", color: "var(--color-azuldk)" }}
              >
                {n.cat}
              </p>
              <h3
                className="h-serif font-bold leading-snug"
                style={{ fontSize: "14px", color: "var(--color-crema)" }}
              >
                {n.titular}
              </h3>
              <p
                className="font-sans leading-relaxed"
                style={{ fontSize: "12px", color: "var(--color-muted-dark)", lineHeight: 1.65 }}
              >
                {n.desc}
              </p>
              <p
                className="font-sans mt-auto pt-1"
                style={{ fontSize: "10px", color: "var(--color-hairline-dark)", letterSpacing: "0.06em" }}
              >
                {n.tiempo}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
