"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.14,
      duration: 0.75,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(81,112,255,0.09),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Eyebrow */}
        <motion.p
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="text-crema/45 text-xs font-semibold tracking-[0.28em] uppercase mb-7"
        >
          Mundinero · Por Monexus
        </motion.p>

        {/* Main headline */}
        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="font-serif font-bold text-[clamp(48px,8.5vw,88px)] leading-[1.04] text-crema"
        >
          El futuro del dinero habla.
        </motion.h1>

        {/* Italic tagline */}
        <motion.h2
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="font-serif italic font-semibold text-[clamp(38px,6.5vw,72px)] leading-[1.1] text-azuldk mt-1"
        >
          Nosotros lo traducimos.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-7 text-crema/45 text-base md:text-[17px] font-sans font-medium max-w-lg mx-auto leading-relaxed"
        >
          Análisis financiero editorial para México y el mundo. Tasas, dólares,
          cripto, mercados y la economía que mueve tu día a día.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#noticias"
            className="bg-azul hover:bg-azul/85 text-crema font-semibold px-8 py-3 rounded text-sm tracking-wide transition-colors"
          >
            Leer ahora
          </Link>
          <Link
            href="#newsletter"
            className="border border-crema/20 hover:border-crema/50 text-crema/65 hover:text-crema font-semibold px-8 py-3 rounded text-sm tracking-wide transition-colors"
          >
            Suscribirse gratis →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
