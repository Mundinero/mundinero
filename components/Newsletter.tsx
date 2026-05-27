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
    <section id="newsletter" className="py-20 px-4 bg-azul">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-tinta/55 text-[11px] font-bold tracking-[0.28em] uppercase">
          Newsletter
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-tinta mt-2 mb-3 leading-tight">
          El futuro del dinero en tu inbox
        </h2>
        <p className="text-tinta/60 text-sm md:text-base font-medium mb-8 leading-relaxed">
          Análisis semanal, alertas de mercado y la columna editorial de
          Mundinero. Gratis. Sin spam. Solo señal.
        </p>

        {sent ? (
          <div className="bg-tinta/12 rounded-lg px-6 py-5">
            <p className="text-tinta font-bold text-lg">✓ ¡Listo! Revisa tu correo.</p>
            <p className="text-tinta/60 text-sm mt-1">
              Pronto recibirás la primera edición de Mundinero.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              className="flex-1 bg-tinta/15 border border-tinta/25 rounded px-4 py-3 text-tinta placeholder:text-tinta/40 focus:outline-none focus:border-tinta/60 transition-colors text-sm"
            />
            <button
              type="submit"
              className="bg-tinta hover:bg-tinta/85 text-crema font-bold px-6 py-3 rounded text-sm tracking-wide transition-colors flex-shrink-0"
            >
              Suscribirse
            </button>
          </form>
        )}

        <p className="text-tinta/40 text-xs mt-4">
          Sin spam. Cancela cuando quieras.
        </p>
      </div>
    </section>
  );
}
