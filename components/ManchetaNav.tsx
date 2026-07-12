"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Noticias",     href: "#noticias"     },
  { label: "Radar",        href: "#radar"        },
  { label: "Pulso MX",     href: "#pulso-mx"     },
  { label: "Columna",      href: "#columna"      },
  { label: "Calculadoras", href: "#calculadoras" },
  { label: "Eventos",      href: "#eventos"      },
];

function getMXDate(): string {
  const s = new Intl.DateTimeFormat("es-MX", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    timeZone: "America/Mexico_City",
  }).format(new Date());
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function ManchetaNav() {
  const [scrolled, setScrolled] = useState(false);
  const manchetaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = manchetaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-44px 0px 0px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ── Mancheta ────────────────────────────────────────────── */}
      <header ref={manchetaRef} className="bg-tinta pt-7 pb-0 fade-rise">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 lg:px-20">

          {/* Ornamento lateral + tagline */}
          <div className="flex items-center gap-5 mb-5">
            <span className="flex-1 h-px bg-hairline-dark" />
            <span
              className="font-sans font-medium uppercase whitespace-nowrap"
              style={{ fontSize: "9px", letterSpacing: "0.26em", color: "var(--color-muted-dark)" }}
            >
              El futuro del dinero habla. Nosotros traducimos.
            </span>
            <span className="flex-1 h-px bg-hairline-dark" />
          </div>

          {/* Wordmark principal */}
          <h1
            className="h-serif font-bold text-center leading-none"
            style={{
              color: "var(--color-crema)",
              fontSize: "clamp(72px, 13vw, 152px)",
              letterSpacing: "-0.03em",
            }}
          >
            Mundinero
          </h1>

          {/* Folio: fecha en timezone Mexico City · descripción · por */}
          <p
            className="font-sans text-center mt-3 mb-5 tnum"
            style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-muted-dark)" }}
            suppressHydrationWarning
          >
            {getMXDate()}
            &nbsp;·&nbsp;Medio financiero editorial de México y el mundo&nbsp;·&nbsp;Por Monexus®
          </p>

          {/* Filete doble */}
          <div style={{ height: "2px", background: "rgba(247,246,243,0.78)" }} />
          <div style={{ height: "3px" }} />
          <div className="h-px bg-hairline-dark" />
        </div>
      </header>

      {/* ── Barra de secciones ───────────────────────────────────── */}
      {/* sticky top-9 para pegarse bajo el ticker (h-9 = 36px)      */}
      {/* Separación mediante hairline muy tenue — fondo tinta continuo */}
      <nav
        className="sticky top-9 z-40 bg-tinta fade-rise"
        style={{ borderBottom: "0.5px solid rgba(247,246,243,0.18)", animationDelay: "60ms" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 lg:px-20">
          <div className="flex items-center h-11 gap-6">

            {/* M simplificada — visible al hacer scroll */}
            {/* background-size 84px sobre contenedor 30px = zoom ×2.8 */}
            <div
              className="flex items-center flex-shrink-0 overflow-hidden transition-all duration-200"
              style={{
                width:        scrolled ? "42px" : "0px",
                opacity:      scrolled ? 1 : 0,
                paddingRight: scrolled ? "12px" : "0px",
                borderRight:  scrolled ? "1px solid var(--color-hairline-dark)" : "none",
              }}
            >
              <Link href="/" aria-label="Mundinero">
                <div
                  style={{
                    width:              "30px",
                    height:             "30px",
                    backgroundImage:    "url('/mun-2.png')",
                    backgroundSize:     "84px 84px",
                    backgroundPosition: "center",
                    backgroundRepeat:   "no-repeat",
                  }}
                />
              </Link>
            </div>

            {/* Links de sección */}
            <div className="flex items-center gap-5 flex-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="font-sans font-medium whitespace-nowrap transition-colors"
                  style={{ fontSize: "12px", color: "var(--color-muted-dark)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-crema)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted-dark)")}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Suscribirse — discreto, solo desktop */}
            <Link
              href="#newsletter"
              className="hidden md:inline-flex flex-shrink-0 font-sans font-medium transition-colors"
              style={{ fontSize: "12px", color: "var(--color-muted-dark)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-crema)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted-dark)")}
            >
              Suscribirse <span style={{ color: "var(--color-azul)", marginLeft: "4px" }}>→</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
