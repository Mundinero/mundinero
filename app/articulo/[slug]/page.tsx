import type { Metadata } from "next";
import ArticuloNav from "@/components/ArticuloNav";
import SelloMundinero from "@/components/SelloMundinero";
import NewsletterArticulo from "@/components/NewsletterArticulo";
import SigueLeyendo from "@/components/SigueLeyendo";

// ── Mock — en producción esto viene de Ghost CMS por slug ────────────────────

const MOCK = {
  slug:       "banxico-recorte-tasa-8-75-peso-gana-terreno",
  seccion:    "Política Monetaria",
  titulo:     "Banxico y la paradoja del peso fuerte: cómo el recorte a 8.75% redefine el contrato financiero de los mexicanos",
  bajada:     "El banco central bajó su tasa objetivo por segunda vez en el año mientras el peso cotizaba en máximos de 2024. Detrás del movimiento hay una apuesta de largo plazo que afecta desde tu hipoteca hasta tus CETES.",
  autor:      "Redacción Mundinero",
  fecha:      "2026-07-11T10:30:00-06:00",
  lectura:    7,
  asistidoIA: true,
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatFechaMX(iso: string): string {
  const s = new Intl.DateTimeFormat("es-MX", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
    timeZone: "America/Mexico_City",
  }).format(new Date(iso));
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export function generateMetadata(): Metadata {
  return {
    title:       `${MOCK.titulo} — Mundinero`,
    description: MOCK.bajada,
  };
}

// ── Estilos de prosa reutilizables ───────────────────────────────────────────

const prosa: React.CSSProperties = {
  fontFamily:   "var(--font-sans)",
  fontSize:     "18.5px",
  lineHeight:   1.75,
  color:        "#1f1e1d",
  marginBottom: "1.35em",
};

const h2Style: React.CSSProperties = {
  fontFamily:    "var(--font-serif)",
  fontWeight:    500,
  fontSize:      "26px",
  lineHeight:    1.2,
  letterSpacing: "-0.015em",
  color:         "#1f1e1d",
  marginTop:     "2.2em",
  marginBottom:  "0.6em",
};

// ── Artículos relacionados ────────────────────────────────────────────────────

const relacionados = [
  {
    cat:     "Tipo de cambio",
    titular: "Peso en 16.98: ¿hasta dónde puede llegar el rally y qué lo frenaría?",
    tiempo:  "hace 2h",
  },
  {
    cat:     "Ahorro e inversión",
    titular: "CETES vs. fondos de deuda: ¿cuál conviene más ahora que las tasas bajan?",
    tiempo:  "hace 5h",
  },
  {
    cat:     "Economía personal",
    titular: "¿Tienes crédito hipotecario variable? Así calculas tu ahorro real con el recorte",
    tiempo:  "ayer",
  },
];

// ── Página ───────────────────────────────────────────────────────────────────

export default function ArticuloPage() {
  const a = MOCK;
  const fecha = formatFechaMX(a.fecha);

  return (
    <div className="min-h-screen" style={{ background: "#F7F6F3", color: "#1f1e1d" }}>

      {/* ── Nav light ───────────────────────────────────────────────────── */}
      <ArticuloNav titulo={a.titulo} seccion={a.seccion} />

      {/* ── Cabecera ────────────────────────────────────────────────────── */}
      <header className="px-6 md:px-14 lg:px-20 pt-14 pb-10">
        <div className="max-w-[860px] mx-auto">

          {/* Kicker */}
          <p
            className="font-sans font-bold uppercase mb-4"
            style={{ fontSize: "10px", letterSpacing: "0.26em", color: "#3A57E8" }}
          >
            {a.seccion}
          </p>

          {/* Titular */}
          <h1
            className="h-serif font-bold"
            style={{
              fontSize:      "clamp(32px, 4vw, 44px)",
              lineHeight:    1.06,
              letterSpacing: "-0.025em",
              color:         "#1f1e1d",
              marginBottom:  "1rem",
            }}
          >
            {a.titulo}
          </h1>

          {/* Bajada */}
          <p
            className="font-sans"
            style={{ fontSize: "19px", lineHeight: 1.65, color: "#5F5E5A", marginBottom: "1.5rem" }}
          >
            {a.bajada}
          </p>

          {/* Byline */}
          <div
            className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-sans"
            style={{ fontSize: "11px", color: "#5F5E5A" }}
          >
            <span className="font-semibold" style={{ color: "#1f1e1d" }}>{a.autor}</span>

            <span aria-hidden style={{ color: "#B8B4AC" }}>·</span>

            <span className="tnum">{fecha}</span>

            <span aria-hidden style={{ color: "#B8B4AC" }}>·</span>

            <span className="tnum">{a.lectura} min de lectura</span>

            {a.asistidoIA && (
              <>
                <span aria-hidden style={{ color: "#B8B4AC" }}>·</span>
                <span
                  className="font-medium"
                  style={{
                    border:        "0.5px solid #DEDBD4",
                    borderRadius:  "4px",
                    padding:       "1px 7px",
                    fontSize:      "10px",
                    letterSpacing: "0.04em",
                    color:         "#5F5E5A",
                  }}
                >
                  Asistido por IA · editado por humanos
                </span>
              </>
            )}
          </div>
        </div>

        {/* Hairline */}
        <div className="max-w-[860px] mx-auto mt-10">
          <div style={{ height: "0.5px", background: "#DEDBD4" }} />
        </div>
      </header>

      {/* ── Visual: gráfico de datos propio ─────────────────────────────── */}
      {/* Regla Mundinero: sin fotografía de stock.                          */}
      {/* Nota con visual lleva gráfico de datos propio, nunca imagen.       */}
      <div className="px-6 md:px-14 lg:px-20 pb-2">
        <div
          className="max-w-[860px] mx-auto rounded-xl overflow-hidden"
          style={{ background: "#ECEAE5", border: "0.5px solid #DEDBD4" }}
        >
          <div className="px-8 pt-6 pb-2">
            <p
              className="font-sans font-semibold uppercase tnum"
              style={{ fontSize: "9px", letterSpacing: "0.24em", color: "#5F5E5A", marginBottom: "12px" }}
            >
              Tasa objetivo Banxico — Evolución 2023–2026
            </p>
            <svg
              width="100%"
              height="88"
              viewBox="0 0 640 88"
              preserveAspectRatio="none"
              aria-label="Gráfico de evolución de la tasa objetivo de Banxico"
            >
              <defs>
                <linearGradient id="art-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#5170ff" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#5170ff" stopOpacity="0.01" />
                </linearGradient>
                <clipPath id="art-clip">
                  <rect x="0" y="0" width="640" height="88" />
                </clipPath>
              </defs>
              {/* Líneas de cuadrícula */}
              {[22, 48, 74].map(y => (
                <line key={y} x1="0" y1={y} x2="640" y2={y}
                  stroke="#DEDBD4" strokeWidth="0.5" />
              ))}
              {/* Curva tasa: meseta alta → recortes graduales → 8.75% */}
              <path
                d="M0,6 L90,6 L130,14 L170,24 L210,34 L250,42 L290,50 L330,58 L370,64 L410,70 L450,74 L490,78 L530,82 L580,85 L640,88 L640,88 L0,88 Z"
                fill="url(#art-fill)"
                clipPath="url(#art-clip)"
              />
              <path
                d="M0,6 L90,6 L130,14 L170,24 L210,34 L250,42 L290,50 L330,58 L370,64 L410,70 L450,74 L490,78 L530,82 L580,85 L640,88"
                fill="none"
                stroke="#5170ff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Punto actual */}
              <circle cx="640" cy="88" r="4"   fill="#F7F6F3" />
              <circle cx="640" cy="88" r="2.5" fill="#5170ff" />
            </svg>
          </div>
          <div className="flex justify-between px-8 pb-5 pt-1">
            <span className="font-sans tnum" style={{ fontSize: "9px", color: "#5F5E5A" }}>Feb 2023 · 11.25%</span>
            <span className="font-sans tnum" style={{ fontSize: "9px", color: "#5F5E5A" }}>Jul 2026 · 8.75%</span>
          </div>
        </div>
      </div>

      {/* ── Cuerpo de lectura ────────────────────────────────────────────── */}
      <main className="px-6 md:px-14 lg:px-20 py-12">
        <div style={{ maxWidth: "68ch", margin: "0 auto" }}>

          {/* P1 — capitular: span explícito (más robusto que ::first-letter con Tailwind v4) */}
          <p style={{ ...prosa, overflow: "hidden" }}>
            <span
              className="h-serif"
              aria-hidden="true"
              style={{
                float:                "left",
                fontSize:             "5.6em",
                lineHeight:           0.82,
                fontWeight:           600,
                marginRight:          "0.06em",
                marginTop:            "0.05em",
                color:                "#1f1e1d",
                fontVariationSettings: "'opsz' 60, 'SOFT' 0, 'WONK' 0",
              }}
            >L</span>
            a tarde del jueves, la Junta de Gobierno del Banco de México cerró su reunión de política monetaria con un resultado que pocos esperaban en los mercados locales: un recorte unánime de 25 puntos base, llevando la tasa objetivo al <span className="tnum">8.75</span>%. El movimiento llegó mientras el peso cotizaba en <span className="tnum">16.98</span> por dólar —su mejor nivel desde agosto de 2024— y los índices de inflación mostraban una desinflación sostenida por tercer mes consecutivo.
          </p>

          <p style={prosa}>
            No fue sorpresa estadística —el mercado de swaps ya descontaba el recorte en un <span className="tnum">68</span>%—, pero sí fue una declaración de intenciones. La institución que durante más de dos años mantuvo las tasas a niveles máximos históricos decidió que la desinflación ha recorrido suficiente camino como para aligerar el costo del dinero por segunda vez en el año.
          </p>

          {/* H2 */}
          <h2 style={h2Style}>El peso, el gran contraargumento</h2>

          <p style={prosa}>
            El argumento en contra del recorte lo encarnaba el propio peso. En los dos días previos a la decisión, la moneda se había apreciado a <span className="tnum">16.98</span> por dólar. Los capitales extranjeros habían regresado impulsados por el diferencial de tasas con Estados Unidos —aún superior a <span className="tnum">300</span> puntos base—, y había quienes argumentaban que recortar ahora enviaba una señal equivocada: la de un banco central que se mueve antes de tiempo.
          </p>

          <p style={prosa}>
            La Junta respondió con datos. La inflación general cerró junio en <span className="tnum">3.77</span>%, dentro del rango objetivo del <span className="tnum">2</span>–<span className="tnum">4</span>% por tercer mes consecutivo. La inflación subyacente —que excluye energía y alimentos no procesados— cedió a <span className="tnum">3.52</span>%. El modelo de Banxico proyecta convergencia al <span className="tnum">3</span>% a finales de 2026.
          </p>

          {/* Pull quote */}
          <blockquote
            style={{
              borderLeft:  "2px solid #5170ff",
              paddingLeft: "1.5em",
              margin:      "2em 0",
              fontFamily:  "var(--font-serif)",
              fontStyle:   "italic",
              fontSize:    "23px",
              lineHeight:  1.38,
              color:       "#1f1e1d",
              letterSpacing: "-0.01em",
            }}
          >
            «La postura restrictiva ha cumplido su función. El espacio de relajamiento gradual existe sin comprometer la trayectoria desinflacionaria.»
            <footer
              className="font-sans mt-2"
              style={{ fontSize: "11px", color: "#5F5E5A", fontStyle: "normal", fontFamily: "var(--font-sans)" }}
            >
              — Comunicado de política monetaria, Banxico, julio 2026
            </footer>
          </blockquote>

          {/* H2 */}
          <h2 style={h2Style}>¿Qué significa para tu bolsillo?</h2>

          <p style={prosa}>
            La traducción práctica del recorte no es inmediata —los bancos comerciales ajustan sus tasas activas con rezago de cuatro a ocho semanas—, pero el vector está claro. Para quienes tienen{" "}
            <a href="#calculadoras" className="link-body">crédito hipotecario a tasa variable</a>,{" "}
            la reducción de <span className="tnum">25</span> puntos base equivale a un ahorro aproximado de <span className="tnum">$350</span>–<span className="tnum">$400</span> pesos mensuales en un crédito promedio de <span className="tnum">$1.5</span> millones. No es una fortuna, pero es la segunda reducción consecutiva: quien firmó su hipoteca variable en noviembre del año pasado ya ha visto caer su costo financiero <span className="tnum">50</span> puntos base en total.
          </p>

          {/* ¿Cómo te afecta? — variante light */}
          <aside
            className="my-8 rounded-r-xl px-5 py-5"
            style={{ background: "rgba(81,112,255,0.05)", borderLeft: "2px solid #5170ff" }}
          >
            <p
              className="font-sans font-bold uppercase mb-3"
              style={{ fontSize: "9px", letterSpacing: "0.26em", color: "#3A57E8" }}
            >
              ¿Cómo te afecta?
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "Tu crédito hipotecario variable baja ~$380/mes en un préstamo de $1.5 millones.",
                "Los CETES de 28 días rendirán alrededor de 9.0% en la subasta del jueves.",
                "El tipo de cambio puede ceder a 16.90–17.10 si continúa la entrada de capitales.",
                "Las plataformas de deuda corporativa (Nu, Flink, Cetesdirecto) ya actualizan sus proyecciones.",
              ].map((imp, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span
                    className="flex-shrink-0 rounded-full"
                    style={{ width: "5px", height: "5px", background: "#5170ff", marginTop: "0.35em" }}
                  />
                  <span
                    className="font-sans leading-snug tnum"
                    style={{ fontSize: "13.5px", color: "#1f1e1d" }}
                  >
                    {imp}
                  </span>
                </li>
              ))}
            </ul>
          </aside>

          <p style={prosa}>
            Para los ahorradores en{" "}
            <a href="https://cetesdirecto.com" className="link-body" target="_blank" rel="noopener noreferrer">CETES Directo</a>,{" "}
            la noticia es la opuesta. Los Certificados de la Tesorería de <span className="tnum">28</span> días rondaban el <span className="tnum">9.18</span>% en la subasta del lunes y presumiblemente cederán hacia el <span className="tnum">8.90</span>–<span className="tnum">9.00</span>% tras el movimiento de Banxico. El rendimiento real sigue siendo positivo —con inflación al <span className="tnum">3.77</span>%, el CETE de <span className="tnum">28</span> días aún ofrece un real de <span className="tnum">+5.1</span>%— pero la ventana de tasas extraordinariamente altas se va cerrando de forma gradual e irreversible.
          </p>

          {/* H2 */}
          <h2 style={h2Style}>La apuesta de largo plazo</h2>

          <p style={prosa}>
            Lo que Banxico está haciendo no es solo bajar el precio del dinero. Está administrando una transición: de un régimen de tasas de emergencia —impuestas por la inflación post-pandemia y el ciclo agresivo de la Reserva Federal— a un régimen de tasas «normales» para una economía emergente con fundamentos sólidos. La clave es el diferencial con Estados Unidos: la Fed mantiene su tasa en el rango <span className="tnum">5.25</span>–<span className="tnum">5.50</span>% y las expectativas de recorte para 2026 se han moderado significativamente.
          </p>

          <p style={prosa}>
            Si Banxico baja <span className="tnum">25</span> puntos base cuatro veces más —escenario base de varios analistas— la tasa llegaría al <span className="tnum">7.75</span>% a fin de año, preservando un diferencial de más de <span className="tnum">200</span> puntos base que sigue siendo atractivo para el <em>carry trade</em>. El peso, paradójicamente, podría fortalecerse más. Los flujos de carry —inversores que toman deuda en monedas de baja tasa y la invierten en alta— permanecen activos mientras el diferencial sea sustancial.
          </p>

          {/* H2 */}
          <h2 style={h2Style}>La variable que nadie controla</h2>

          <p style={prosa}>
            El único riesgo que escapa al modelo de Banxico es externo: la política comercial de Washington. Si el gobierno estadounidense endurece aranceles sobre manufacturas mexicanas —escenario al que los mercados asignan un <span className="tnum">31</span>% de probabilidad según{" "}
            <a href="https://polymarket.com" className="link-body" target="_blank" rel="noopener noreferrer">Polymarket</a>—
            {" "}el peso podría revertir su apreciación con rapidez, presionando precios importados y obligando a Banxico a pausar su ciclo de bajas. ¿Le ha ocurrido antes? Sí —en 2019, cuando los anuncios arancelarios del entonces presidente Trump empujaron al peso del <span className="tnum">19.00</span> al <span className="tnum">20.00</span> en dos semanas.
          </p>

          <p style={prosa}>
            No es el escenario base, pero es el que mantiene despierto al Comité de Política Monetaria. Por ahora, la narrativa es ordenada: inflación que cede, tasas que bajan, peso que aguanta. El reto para los meses que vienen será no desafinar —y eso, en política monetaria, es más arte que ciencia.
          </p>

          {/* ── Cierre ───────────────────────────────────────────────────── */}
          <div style={{ marginTop: "3rem" }}>
            <div style={{ height: "0.5px", background: "#DEDBD4", marginBottom: "3rem" }} />

            {/* Sello colofón con entrada */}
            <div className="flex flex-col items-center gap-3 mb-12">
              <SelloMundinero size={56} rotate="entry" />
              <p
                className="font-sans font-medium uppercase"
                style={{ fontSize: "9px", letterSpacing: "0.24em", color: "#5F5E5A" }}
              >
                Mundinero · 2026
              </p>
            </div>

            {/* Newsletter minimal — sin gritos */}
            <NewsletterArticulo />
          </div>
        </div>
      </main>

      {/* ── Sigue leyendo ────────────────────────────────────────────────── */}
      <SigueLeyendo notas={relacionados} />

    </div>
  );
}
