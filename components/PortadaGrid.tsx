"use client";

import { Fragment } from "react";
import GraficaBanxico from "./GraficaBanxico";

const notaPrincipal = {
  kicker: "Política Monetaria",
  titular: "Banxico recorta tasa a 8.75% por segunda vez en el año; el peso gana terreno frente al dólar",
  bajada:
    "La Junta de Gobierno votó por unanimidad un recorte de 25 puntos base, llevando la tasa objetivo al nivel más bajo desde enero de 2023. El movimiento refrenda la postura desinflacionaria gradual y proyecta espacio para dos ajustes adicionales antes de diciembre.",
  impactos: [
    "Tu crédito hipotecario variable baja ~$380/mes en un préstamo de $1.5 millones.",
    "Los CETES de 28 días rendirán alrededor de 9.0% en la subasta del jueves.",
    "El tipo de cambio puede ceder a 16.90–17.10 si continúa la entrada de capitales.",
  ],
  lectura: "5 min",
  actualizado: "hace 18 min",
};

const calculadoras = [
  { label: "Salario neto desde bruto",  href: "#calculadoras" },
  { label: "Rendimiento en CETES",      href: "#calculadoras" },
  { label: "Simulador de hipoteca MXN", href: "#calculadoras" },
];

const columnaTeaser = {
  cita: "El peso que nos une es también el hilo con que nos atan.",
  titulo: "Remesas, tipo de cambio y el contrato social silencioso",
};

export default function PortadaGrid() {
  return (
    <section id="noticias" className="bg-tinta px-6 md:px-14 lg:px-20 pt-10 pb-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-10 lg:gap-0 items-start">

          {/* ── Nota principal ───────────────────────────── */}
          <article className="lg:pr-14 lg:border-r lg:border-hairline-dark">
            <p
              className="font-sans font-bold uppercase mb-3"
              style={{ fontSize: "10px", letterSpacing: "0.22em", color: "var(--color-azul)" }}
            >
              {notaPrincipal.kicker}
            </p>

            <h2
              className="h-serif font-bold"
              style={{
                color: "var(--color-crema)",
                fontSize: "clamp(26px, 3.5vw, 42px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              {notaPrincipal.titular}
            </h2>

            <p
              className="font-sans mt-4"
              style={{ fontSize: "15px", color: "var(--color-soft-dark)", lineHeight: 1.72 }}
            >
              {notaPrincipal.bajada}
            </p>

            {/* ¿Cómo te afecta? */}
            <div
              className="mt-6 rounded-r-lg px-5 py-4"
              style={{ background: "rgba(81,112,255,0.09)", borderLeft: "2px solid var(--color-azul)" }}
            >
              <p
                className="font-sans font-bold uppercase mb-3"
                style={{ fontSize: "9px", letterSpacing: "0.24em", color: "var(--color-azul)" }}
              >
                ¿Cómo te afecta?
              </p>
              <ul className="flex flex-col gap-2">
                {notaPrincipal.impactos.map((imp, i) => (
                  <li key={i} className="flex gap-2.5 items-start">
                    <span
                      className="font-sans font-bold flex-shrink-0"
                      style={{ color: "var(--color-azuldk)", marginTop: "1px" }}
                    >·</span>
                    <span
                      className="font-sans leading-snug"
                      style={{ fontSize: "13px", color: "var(--color-soft-dark)" }}
                    >
                      {imp}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metadata */}
            <div
              className="flex flex-wrap items-center gap-3 mt-5 pt-4"
              style={{ borderTop: "1px solid var(--color-hairline-dark)" }}
            >
              {[
                `${notaPrincipal.lectura} de lectura`,
                `Actualizado ${notaPrincipal.actualizado}`,
                "Asistido por IA, editado por humanos",
              ].map((txt, i) => (
                <Fragment key={txt}>
                  {i > 0 && (
                    <span
                      className="flex-shrink-0"
                      style={{ width: "1px", height: "10px", background: "var(--color-hairline-dark)" }}
                    />
                  )}
                  <span
                    className="font-sans font-medium"
                    style={{ fontSize: "10px", letterSpacing: "0.06em", color: "var(--color-muted-dark)" }}
                  >
                    {txt}
                  </span>
                </Fragment>
              ))}
            </div>
          </article>

          {/* ── Rail derecho ──────────────────────────────── */}
          <aside className="flex flex-col gap-7 lg:pl-12">

            {/* El mercado predice — datos en vivo de Polymarket */}
            <GraficaBanxico />

            <div className="h-px bg-hairline-dark" />

            {/* Calculadoras */}
            <div>
              <p
                className="font-sans font-bold uppercase mb-3"
                style={{ fontSize: "9px", letterSpacing: "0.22em", color: "var(--color-muted-dark)" }}
              >
                Calculadoras
              </p>
              <ul className="flex flex-col gap-2.5">
                {calculadoras.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      className="font-sans font-medium transition-colors"
                      style={{ fontSize: "13px", color: "var(--color-azuldk)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-azul)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-azuldk)")}
                    >
                      → {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-px bg-hairline-dark" />

            {/* La Columna teaser */}
            <div>
              <p
                className="font-sans font-bold uppercase mb-3"
                style={{ fontSize: "9px", letterSpacing: "0.22em", color: "var(--color-muted-dark)" }}
              >
                La Columna
              </p>
              <p
                className="h-serif italic leading-snug mb-2"
                style={{ fontSize: "18px", color: "var(--color-soft-dark)" }}
              >
                "{columnaTeaser.cita}"
              </p>
              <p
                className="font-sans"
                style={{ fontSize: "11px", color: "var(--color-muted-dark)" }}
              >
                {columnaTeaser.titulo}
              </p>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}
