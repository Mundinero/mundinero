import Link from "next/link";

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
    <footer className="border-t border-crema/10 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-serif text-2xl font-bold text-azuldk">₥</span>
              <span className="font-serif text-base font-bold tracking-[0.14em] text-crema uppercase">
                MUNDINERO
              </span>
            </div>
            <p className="text-crema/40 text-xs leading-relaxed max-w-[180px]">
              El futuro del dinero habla.
              <br />
              Nosotros lo traducimos.
            </p>
            <p className="text-crema/25 text-[10px] mt-3 tracking-wide">
              Por Monexus® · IMPI
            </p>
          </div>

          {/* Link columns */}
          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="text-crema/45 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                {s.title}
              </h4>
              <ul className="space-y-2">
                {s.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-crema/55 hover:text-crema text-sm transition-colors"
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
        <div className="border-t border-crema/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-crema/30 text-xs">
            © 2026 Mundinero · Monexus · Todos los derechos reservados
          </p>
          <p className="text-crema/25 text-[10px] text-center">
            La información publicada no constituye asesoría de inversión.
          </p>
        </div>
      </div>
    </footer>
  );
}
