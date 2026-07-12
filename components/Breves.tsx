"use client";

import { Fragment } from "react";

const breves = [
  "SHCP mantiene estimado de crecimiento en 2.1% pese a revisiones del FMI",
  "IPC BMV cierra en 60,420 puntos; cuarto récord histórico consecutivo",
  "Banco del Bienestar amplía cobertura a 400 nuevos municipios antes de agosto",
];

export default function Breves() {
  return (
    <div
      className="bg-tinta px-6 md:px-14 lg:px-20 py-3.5"
      style={{
        borderTop:    "1px solid var(--color-hairline-dark)",
        borderBottom: "1px solid var(--color-hairline-dark)",
      }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center gap-y-1.5">
        {/* Etiqueta */}
        <span
          className="font-sans font-bold uppercase flex-shrink-0 mr-4"
          style={{ fontSize: "9px", letterSpacing: "0.26em", color: "var(--color-muted-dark)" }}
        >
          Breves
        </span>

        {/* Titulares separados por punto medio */}
        {breves.map((b, i) => (
          <Fragment key={b}>
            <a
              href="#"
              className="font-sans transition-colors"
              style={{ fontSize: "12.5px", color: "var(--color-soft-dark)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-crema)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-soft-dark)")}
            >
              {b}
            </a>
            {i < breves.length - 1 && (
              <span
                className="font-sans select-none mx-3 flex-shrink-0"
                style={{ color: "var(--color-hairline-dark)", fontSize: "16px", lineHeight: 1 }}
                aria-hidden
              >
                ·
              </span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
