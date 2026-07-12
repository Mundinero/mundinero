"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ArticuloNavProps {
  titulo:  string;
  seccion: string;
}

export default function ArticuloNav({ titulo, seccion }: ArticuloNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="sticky top-0 z-40"
      style={{ background: "#F7F6F3", borderBottom: "0.5px solid #DEDBD4" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 lg:px-20">
        <div className="flex items-center h-12 gap-4">

          {/* Logo — M mark (zoom ×2.8 para recortar padding transparente)
              filter invert(0.88): blanco → ~#1f1e1d (tinta) sobre crema  */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="Portada Mundinero">
            <div
              style={{
                width:              "28px",
                height:             "28px",
                backgroundImage:    "url('/mun-2.png')",
                backgroundSize:     "78px 78px",
                backgroundPosition: "center",
                backgroundRepeat:   "no-repeat",
                filter:             "invert(0.88)",
                flexShrink:         0,
              }}
              aria-hidden="true"
            />
            <span
              className="hidden sm:block h-serif font-bold"
              style={{ fontSize: "19px", color: "#1f1e1d", letterSpacing: "-0.025em", lineHeight: 1 }}
            >
              Mundinero
            </span>
          </Link>

          {/* Separador */}
          <div
            className="flex-shrink-0 hidden md:block"
            style={{ width: "1px", height: "16px", background: "#DEDBD4" }}
          />

          {/* Sección */}
          <span
            className="hidden md:block font-sans font-semibold uppercase flex-shrink-0"
            style={{ fontSize: "9.5px", letterSpacing: "0.22em", color: "#3A57E8" }}
          >
            {seccion}
          </span>

          {/* Título del artículo — aparece al hacer scroll */}
          <div
            className="flex-1 min-w-0 overflow-hidden"
            style={{
              opacity:    scrolled ? 1 : 0,
              transform:  scrolled ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 200ms ease-out, transform 200ms ease-out",
            }}
          >
            <p
              className="font-sans truncate"
              style={{ fontSize: "12.5px", color: "#1f1e1d", fontWeight: 500 }}
            >
              {titulo}
            </p>
          </div>

          {/* Suscribirse */}
          <Link
            href="#newsletter-articulo"
            className="font-sans font-medium flex-shrink-0 link-azul"
            style={{ fontSize: "12px", color: "#3A57E8" }}
          >
            Suscribirse →
          </Link>
        </div>
      </div>
    </nav>
  );
}
