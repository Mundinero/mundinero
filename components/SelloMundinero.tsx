/**
 * SelloMundinero — sello circular giratório reutilizable.
 *
 * Props:
 *   size    — número (px) o string CSS ("100%", "8rem"). Default: 96
 *   rotate  — "continuous" | "entry" | "none"
 *             continuous: 25 s/vuelta, pausada si prefers-reduced-motion
 *             entry:      una vuelta ease-out de entrada (colofón)
 *             none:       estático
 *   className — clases extra para el contenedor
 *
 * Layers:
 *   mun-4.png — anillo exterior (tipografía "El futuro del dinero habla…")
 *   mun-3.png — anillo interior decorativo
 *   mun-2.png — M central, siempre estático
 *
 * Compatible con Server Components (sin "use client").
 * Listo para OG images y portadas de reportes.
 */

export type RotateMode = "continuous" | "entry" | "none";

interface SelloMundineroProps {
  size?:      number | string;
  rotate?:    RotateMode;
  className?: string;
}

export default function SelloMundinero({
  size      = 96,
  rotate    = "none",
  className = "",
}: SelloMundineroProps) {
  const dim = typeof size === "number" ? `${size}px` : size;

  const outerClass = rotate === "continuous" ? "sello-cw"
    : rotate === "entry" ? "sello-cw-entry"
    : "";

  const innerClass = rotate === "continuous" ? "sello-ccw"
    : rotate === "entry" ? "sello-ccw-entry"
    : "";

  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: dim, height: dim }}
      role="img"
      aria-label="Sello Mundinero"
    >
      {/* Anillo exterior — tipografía circular */}
      <img
        src="/mun-4.png"
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-contain ${outerClass}`}
      />
      {/* Anillo interior */}
      <img
        src="/mun-3.png"
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-contain ${innerClass}`}
      />
      {/* M central — siempre estática */}
      <img
        src="/mun-2.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain"
      />
    </div>
  );
}
