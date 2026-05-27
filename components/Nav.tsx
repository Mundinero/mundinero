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
    <nav className="sticky top-0 z-50 bg-tinta/90 backdrop-blur-md border-b border-crema/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-3xl font-bold text-azuldk leading-none">₥</span>
          <span className="font-serif text-base font-bold tracking-[0.14em] text-crema uppercase">
            MUNDINERO
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-crema/60 hover:text-crema text-sm font-medium tracking-wide transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="#newsletter"
          className="hidden md:inline-flex items-center bg-azul hover:bg-azul/85 text-crema text-sm font-semibold px-4 py-2 rounded transition-colors"
        >
          Suscribirse
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-crema/70 hover:text-crema p-1"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-crema/10 bg-tinta px-4 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 text-crema/70 hover:text-crema text-sm font-medium"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#newsletter"
            onClick={() => setOpen(false)}
            className="mt-2 text-center bg-azul text-crema text-sm font-semibold px-4 py-2 rounded"
          >
            Suscribirse
          </Link>
        </div>
      )}
    </nav>
  );
}
