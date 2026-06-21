"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BrandSeal from "./BrandSeal";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section className="min-h-[88vh] flex flex-col justify-center px-6 md:px-14 lg:px-20 pt-16 pb-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-0 items-start">

          {/* ── Bloque editorial izquierdo ── */}
          <div className="max-w-[820px]">

            {/* Eyebrow con tick azuldk */}
            <motion.div
              custom={0} variants={fade} initial="hidden" animate="show"
              className="flex items-center gap-4 mb-10 md:mb-14"
            >
              <span className="h-px w-10 flex-shrink-0 bg-azuldk" />
              <p className="font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-muted-dark">
                Mundinero · Por Monexus
              </p>
            </motion.div>

            {/* Headline display */}
            <motion.h1
              custom={1} variants={fade} initial="hidden" animate="show"
              className="h-serif font-bold text-crema"
              style={{
                fontSize: "clamp(64px, 9.5vw, 128px)",
                lineHeight: 0.92,
                letterSpacing: "-0.025em",
              }}
            >
              El futuro del<br />
              dinero habla.
            </motion.h1>

            {/* Separador hairline */}
            <motion.div
              custom={2} variants={fade} initial="hidden" animate="show"
              className="border-t border-hairline-dark my-8 md:my-10"
            />

            {/* Tagline italic en azuldk */}
            <motion.h2
              custom={3} variants={fade} initial="hidden" animate="show"
              className="h-serif italic font-semibold text-azuldk"
              style={{
                fontSize: "clamp(36px, 5vw, 68px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
              }}
            >
              Nosotros lo<br />
              traducimos.
            </motion.h2>

            {/* Descripción + CTAs */}
            <motion.div
              custom={4} variants={fade} initial="hidden" animate="show"
              className="mt-10 md:mt-14"
            >
              <p className="font-sans text-muted-dark text-[15px] leading-[1.65] max-w-[440px] mb-8">
                Análisis financiero editorial para México y el mundo.
                Tasas, dólares, cripto, mercados y la economía que mueve tu día a día.
              </p>

              <div className="flex items-center gap-8">
                <Link
                  href="#noticias"
                  className="font-sans text-crema text-sm font-medium hover:text-azuldk transition-colors tracking-wide"
                >
                  Leer ahora →
                </Link>
                <Link
                  href="#newsletter"
                  className="font-sans text-muted-dark text-sm font-medium hover:text-crema transition-colors underline underline-offset-4 decoration-hairline-dark hover:decoration-crema/40"
                >
                  Suscribirse gratis
                </Link>
              </div>
            </motion.div>
          </div>

          {/* ── Sello editorial derecho ── */}
          <motion.div
            custom={2} variants={fade} initial="hidden" animate="show"
            className="hidden lg:flex items-start justify-end pt-2 pl-12 flex-shrink-0"
          >
            <BrandSeal size={210} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
