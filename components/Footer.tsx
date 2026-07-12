import Link from "next/link";
import SelloMundinero from "./SelloMundinero";

const sections = [
  {
    title: "Contenido",
    links: ["Noticias", "Análisis", "Radar", "Pulso MX", "Columna"],
  },
  {
    title: "Empresa",
    links: ["Acerca de Mundinero", "Monexus", "Equipo", "Ética editorial"],
  },
  {
    title: "Legal",
    links: ["Aviso de privacidad", "Términos de uso", "Cookies"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-hairline-dark px-6 md:px-14 lg:px-20 pt-16 pb-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <SelloMundinero size={96} rotate="continuous" />
            <div>
              <p
                className="font-sans font-bold uppercase text-crema mb-1"
                style={{ fontSize: "12px", letterSpacing: "0.18em" }}
              >
                MUNDINERO
              </p>
              <p className="font-sans text-muted-dark text-xs leading-relaxed max-w-[180px] mb-2">
                El futuro del dinero habla.
                <br />
                Nosotros lo traducimos.
              </p>
              <p
                className="font-sans text-[10px] font-medium tracking-wide"
                style={{ color: "rgba(139,136,127,0.55)" }}
              >
                Por Monexus® · IMPI
              </p>
            </div>
          </div>

          {/* Link columns */}
          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-muted-dark mb-4">
                {s.title}
              </h4>
              <ul className="space-y-2.5">
                {s.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="font-sans text-soft-dark hover:text-crema text-sm transition-colors"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-hairline-dark pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-muted-dark text-xs">
            © 2026 Mundinero · Monexus · Todos los derechos reservados
          </p>
          <p className="font-sans text-xs" style={{ color: "rgba(139,136,127,0.55)" }}>
            La información publicada no constituye asesoría de inversión.
          </p>
        </div>

      </div>
    </footer>
  );
}
