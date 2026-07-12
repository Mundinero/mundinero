"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Noticias",     href: "#noticias"     },
  { label: "Radar",        href: "#radar"        },
  { label: "Pulso MX",     href: "#pulso-mx"     },
  { label: "Columna",      href: "#columna"      },
  { label: "Calculadoras", href: "#calculadoras" },
  { label: "Eventos",      href: "#eventos"      },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    /* pointer-events-none en el envoltorio para no bloquear el hero
       en el espacio transparente alrededor de la pastilla */
    <div className="sticky top-9 z-40 px-4 md:px-8 py-2.5 pointer-events-none">
      <nav
        className="pointer-events-auto max-w-[960px] mx-auto rounded-2xl px-5 md:px-8 h-12 flex items-center justify-between"
        style={{
          background: "#F7F6F3",
          boxShadow: "0 4px 28px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.08)",
        }}
      >
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-1.5 flex-shrink-0">
          <span
            className="font-serif text-2xl font-bold leading-none"
            style={{ color: "#5170ff" }}
          >
            ₥
          </span>
          <span
            className="font-sans text-[12px] font-bold uppercase"
            style={{ color: "#1f1e1d", letterSpacing: "0.18em" }}
          >
            MUNDINERO
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="font-sans text-[13px] font-medium transition-colors"
              style={{ color: "#5F5E5A" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1f1e1d")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#5F5E5A")}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA ghost */}
        <Link
          href="#newsletter"
          className="hidden md:inline-flex items-center gap-1 font-sans text-[13px] font-medium transition-opacity hover:opacity-70"
          style={{ color: "#1f1e1d" }}
        >
          Suscribirse <span style={{ color: "#5170ff" }}>→</span>
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1"
          style={{ color: "#1f1e1d" }}
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
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="pointer-events-auto max-w-[960px] mx-auto mt-2 rounded-2xl px-6 py-4 flex flex-col gap-1"
          style={{
            background: "#F7F6F3",
            boxShadow: "0 4px 28px rgba(0,0,0,0.18)",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 font-sans text-sm font-medium border-b"
              style={{ color: "#5F5E5A", borderColor: "#DEDBD4" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#newsletter"
            onClick={() => setOpen(false)}
            className="mt-3 font-sans text-sm font-medium"
            style={{ color: "#1f1e1d" }}
          >
            Suscribirse →
          </Link>
        </div>
      )}
    </div>
  );
}
