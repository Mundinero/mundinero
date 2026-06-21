interface BrandSealProps {
  size?: number | string;
}

export default function BrandSeal({ size = 180 }: BrandSealProps) {
  const dim = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: dim, height: dim }}
      aria-hidden="true"
    >
      <img
        src="/mun-4.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain"
        style={{ animation: "spin-cw 38s linear infinite" }}
      />
      <img
        src="/mun-3.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain"
        style={{ animation: "spin-ccw 22s linear infinite" }}
      />
      <img
        src="/mun-2.png"
        alt="Mundinero"
        className="absolute inset-0 w-full h-full object-contain"
      />
    </div>
  );
}
