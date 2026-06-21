"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Noticias",  href: "#noticias"   },
  { label: "Radar",     href: "#radar"       },
  { label: "Pulso MX",  href: "#pulso-mx"    },
  { label: "Columna",   href: "#columna"     },
  { label: "Eventos",   href: "#eventos"     },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-tinta border-b border-hairline-dark">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 lg:px-20 h-14 flex items-center justify-between">

        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="font-serif text-2xl font-bold text-azuldk leading-none">₥</span>
          <span
            className="font-sans text-[13px] font-bold tracking-[0.18em] text-crema uppercase"
            style={{ letterSpacing: "0.18em" }}
          >
            MUNDINERO
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-muted-dark hover:text-crema text-[13px] font-medium tracking-wide transition-colors font-sans"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA — ghost, no fill */}
        <Link
          href="#newsletter"
          className="hidden md:inline-flex items-center text-muted-dark hover:text-crema text-[13px] font-medium tracking-wide transition-colors font-sans gap-1"
        >
          Suscribirse <span className="text-azuldk">→</span>
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-crema/70 hover:text-crema p-1"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-hairline-dark bg-tinta px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-muted-dark hover:text-crema text-sm font-medium font-sans border-b border-hairline-dark last:border-0"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#newsletter"
            onClick={() => setOpen(false)}
            className="mt-3 text-crema text-sm font-medium font-sans"
          >
            Suscribirse →
          </Link>
        </div>
      )}
    </nav>
  );
}
