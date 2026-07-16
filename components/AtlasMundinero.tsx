"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useTheme } from "./ThemeProvider";

// Coordenadas [lat, lng] — corredores financieros clave del Atlas
const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [19.43,  -99.13],  size: 0.058 }, // CDMX — ancla principal
  { location: [40.71,  -74.01],  size: 0.046 }, // Nueva York
  { location: [40.41,   -3.70],  size: 0.042 }, // Madrid
  { location: [4.71,   -74.07],  size: 0.040 }, // Bogotá
  { location: [-34.60, -58.38],  size: 0.040 }, // Buenos Aires
  { location: [35.68,  139.69],  size: 0.040 }, // Tokio
];

function GlobeCanvas({ theme }: { theme: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isLight = theme === "light";
    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let phi = 1.85; // Atlántico al centro: América izq., Europa der.
    let globe: ReturnType<typeof createGlobe> | undefined;

    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio, 2),
        width:         600,
        height:        600,
        phi,
        theta:         0.22,
        dark:          isLight ? 0 : 1,
        diffuse:       0.42,
        mapSamples:    16000,
        mapBrightness: isLight ? 1.0 : 1.7,
        // En dark: baseColor = tinta → el océano se funde con el fondo
        // En light: baseColor = crema → ídem
        baseColor:  isLight
          ? [0.969, 0.965, 0.953]   // crema #F7F6F3
          : [0.122, 0.118, 0.114],  // tinta #1f1e1d
        markerColor: [0.42, 0.529, 1.0],   // #6B87FF
        glowColor:   isLight
          ? [0.78, 0.83, 1.0]   // halo azul muy suave sobre claro
          : [0.22, 0.30, 0.72], // halo azul muy suave sobre oscuro
        markers: MARKERS,
        onRender: (state) => {
          if (!prefersReducedMotion) {
            phi += 0.0014; // rotación lentísima
            state.phi = phi;
          }
        },
      });
    } catch {
      // WebGL no disponible — el canvas queda oculto
    }

    return () => globe?.destroy();
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 300, height: 300, background: "transparent" }}
      aria-hidden="true"
    />
  );
}

export default function AtlasMundinero() {
  const { theme } = useTheme();

  return (
    <section
      aria-label="Atlas Mundinero"
      style={{
        borderTop:    "0.5px solid var(--color-hairline-dark)",
        borderBottom: "0.5px solid var(--color-hairline-dark)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 lg:px-20 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] md:gap-14 items-center">

          {/* Globo WebGL — oculto en móvil (<768px) */}
          <div className="hidden md:flex justify-center items-center">
            <GlobeCanvas theme={theme} />
          </div>

          {/* Contenido textual */}
          <div className="flex flex-col gap-3">

            {/* Kicker */}
            <p
              className="font-sans font-semibold uppercase"
              style={{ fontSize: "9.5px", letterSpacing: "0.26em", color: "var(--color-azuldk)" }}
            >
              Atlas Mundinero
            </p>

            {/* Titular */}
            <h3
              className="h-serif font-bold leading-tight"
              style={{
                fontSize:      "clamp(22px, 2.4vw, 28px)",
                color:         "var(--color-crema)",
                letterSpacing: "-0.01em",
              }}
            >
              El dinero del mundo, en un globo
            </h3>

            {/* Dato vivo — TODO: conectar al índice dinámico de remesas */}
            <div
              className="mt-1"
              style={{ borderLeft: "2px solid var(--color-azul)", paddingLeft: "12px" }}
            >
              <p
                className="font-sans tnum"
                style={{ fontSize: "13px", lineHeight: 1.75, color: "var(--color-soft-dark)" }}
              >
                <span style={{ color: "var(--color-crema)", fontWeight: 600 }}>
                  México–EE.UU.
                </span>
                {" "}· el corredor de remesas más grande del mundo ·{" "}
                enviar $400:{" "}
                <span style={{ color: "var(--color-negativo)", fontWeight: 600 }}>
                  4.2% costo tradicional
                </span>
                {" "}vs{" "}
                <span style={{ color: "var(--color-positivo)", fontWeight: 600 }}>
                  0.8% en stablecoin
                </span>
              </p>
            </div>

            {/* CTA */}
            <a
              href="#"
              className="font-sans font-medium link-azul"
              style={{ fontSize: "13px", color: "var(--color-azuldk)", marginTop: "4px", width: "fit-content" }}
            >
              Explorar el Atlas →
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
