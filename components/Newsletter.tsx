"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <section id="newsletter" className="px-6 md:px-14 lg:px-20 py-24 border-t border-hairline-dark">
      <div className="max-w-[1400px] mx-auto">

        {/* Card azul con fondo sólido */}
        <div
          className="rounded-2xl p-10 md:p-16"
          style={{ background: "#5170ff" }}
        >
          <div className="max-w-[560px]">
            <p
              className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase mb-4"
              style={{ color: "rgba(247,246,243,0.55)" }}
            >
              Newsletter
            </p>
            <h2
              className="h-serif font-bold leading-[1.0] mb-4"
              style={{
                color: "#F7F6F3",
                fontSize: "clamp(36px, 4.5vw, 64px)",
                letterSpacing: "-0.02em",
              }}
            >
              El futuro del dinero en tu inbox
            </h2>
            <p
              className="font-sans text-[15px] leading-[1.65] mb-8"
              style={{ color: "rgba(247,246,243,0.65)" }}
            >
              Análisis semanal, alertas de mercado y la columna editorial
              de Mundinero. Gratis. Sin spam. Solo señal.
            </p>

            {sent ? (
              <div
                className="rounded-xl px-6 py-5"
                style={{ background: "rgba(31,30,29,0.20)", border: "1px solid rgba(247,246,243,0.15)" }}
              >
                <p className="font-sans font-bold text-lg" style={{ color: "#F7F6F3" }}>
                  ✓ ¡Listo! Revisa tu correo.
                </p>
                <p className="font-sans text-sm mt-1" style={{ color: "rgba(247,246,243,0.60)" }}>
                  Pronto recibirás la primera edición de Mundinero.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                  className="flex-1 rounded-lg px-4 py-3 font-sans text-sm focus:outline-none transition-colors"
                  style={{
                    background: "rgba(31,30,29,0.20)",
                    border: "1px solid rgba(247,246,243,0.20)",
                    color: "#F7F6F3",
                  }}
                />
                <button
                  type="submit"
                  className="flex-shrink-0 rounded-lg px-6 py-3 font-sans font-bold text-sm transition-opacity hover:opacity-85"
                  style={{ background: "#1f1e1d", color: "#F7F6F3" }}
                >
                  Suscribirse
                </button>
              </form>
            )}

            <p className="font-sans text-xs mt-4" style={{ color: "rgba(247,246,243,0.35)" }}>
              Sin spam. Cancela cuando quieras.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
