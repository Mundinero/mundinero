"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BrandSeal from "./BrandSeal";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">

      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center gap-8">

        {/* Sello giratorio */}
        <motion.div
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
        >
          <BrandSeal size={160} />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="text-muted-dark text-[11px] font-semibold tracking-[0.28em] uppercase font-sans -mt-2"
        >
          Mundinero · Por Monexus
        </motion.p>

        {/* Headline */}
        <motion.h1
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="h-serif font-bold text-[clamp(44px,8vw,84px)] leading-[1.04] text-crema -mt-2"
        >
          El futuro del dinero habla.
        </motion.h1>

        {/* Tagline */}
        <motion.h2
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="h-serif italic font-semibold text-[clamp(34px,6vw,68px)] leading-[1.1] text-azuldk -mt-4"
        >
          Nosotros lo traducimos.
        </motion.h2>

        {/* Descripción */}
        <motion.p
          custom={4}
          variants={fade}
          initial="hidden"
          animate="show"
          className="text-muted-dark text-base md:text-[17px] font-sans font-medium max-w-md mx-auto leading-relaxed -mt-2"
        >
          Análisis financiero editorial para México y el mundo. Tasas, dólares,
          cripto, mercados y la economía que mueve tu día a día.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={5}
          variants={fade}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="#noticias"
            className="bg-azul hover:bg-azul-hover-lt text-crema font-semibold px-8 py-3 text-sm tracking-wide transition-colors font-sans"
          >
            Leer ahora
          </Link>
          <Link
            href="#newsletter"
            className="border border-hairline-dark hover:border-soft-dark text-muted-dark hover:text-crema font-semibold px-8 py-3 text-sm tracking-wide transition-colors font-sans"
          >
            Suscribirse gratis →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
