interface BrandSealProps {
  size?: number;
}

export default function BrandSeal({ size = 180 }: BrandSealProps) {
  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Anillo exterior — gira CW lento */}
      <img
        src="/mun-4.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain"
        style={{ opacity: 0.8, animation: "spin-cw 38s linear infinite" }}
      />
      {/* Anillo interior — gira CCW */}
      <img
        src="/mun-3.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain"
        style={{ opacity: 0.68, animation: "spin-ccw 22s linear infinite" }}
      />
      {/* Isotipo central — estático */}
      <img
        src="/mun-2.png"
        alt="Mundinero"
        className="absolute inset-0 w-full h-full object-contain"
      />
    </div>
  );
}
