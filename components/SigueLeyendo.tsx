"use client";

interface Nota {
  cat:     string;
  titular: string;
  tiempo:  string;
}

interface SigueLeyendoProps {
  notas: Nota[];
}

export default function SigueLeyendo({ notas }: SigueLeyendoProps) {
  return (
    <section
      className="px-6 md:px-14 lg:px-20 py-14"
      style={{ background: "#ECEAE5", borderTop: "0.5px solid #DEDBD4" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <p
          className="font-sans font-bold uppercase mb-8"
          style={{ fontSize: "10px", letterSpacing: "0.26em", color: "#5F5E5A" }}
        >
          Sigue leyendo
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {notas.map((r) => (
            <a
              key={r.titular}
              href="#"
              className="block rounded-xl p-5"
              style={{
                background:     "#F7F6F3",
                border:         "0.5px solid #DEDBD4",
                textDecoration: "none",
                transition:     "border-color 150ms ease-out",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#B8B4AC")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#DEDBD4")}
            >
              <p
                className="font-sans font-bold uppercase mb-2"
                style={{ fontSize: "9px", letterSpacing: "0.22em", color: "#3A57E8" }}
              >
                {r.cat}
              </p>
              <h3
                className="h-serif font-semibold leading-snug mb-3"
                style={{ fontSize: "16px", color: "#1f1e1d" }}
              >
                {r.titular}
              </h3>
              <p
                className="font-sans tnum"
                style={{ fontSize: "10px", color: "#B8B4AC" }}
              >
                {r.tiempo}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
