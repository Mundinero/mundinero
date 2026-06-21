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

/* Nav wrapper: py-2.5 (10px*2) + h-12 (48px) = 68px en document flow */
const NAV_H = "68px";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#5170ff",
        minHeight: "100vh",
        marginTop: `-${NAV_H}`,
        paddingTop: NAV_H,
      }}
    >
      {/* ── Mobile: sello arriba, texto abajo ── */}
      <div className="lg:hidden flex flex-col">
        <div className="flex justify-center items-center pt-8 pb-2">
          <div style={{ width: "min(80vw, 360px)", height: "min(80vw, 360px)" }}>
            <BrandSeal size="100%" />
          </div>
        </div>

        <div className="px-6 pt-4 pb-16">
          <TextBlock />
        </div>
      </div>

      {/* ── Desktop: grid 50/50 ── */}
      <div className="hidden lg:grid grid-cols-2" style={{ minHeight: "100vh" }}>

        {/* Columna izquierda — sello */}
        <div className="flex items-center justify-center">
          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
          >
            <div style={{ width: "min(44vw, 85vh)", height: "min(44vw, 85vh)" }}>
              <BrandSeal size="100%" />
            </div>
          </motion.div>
        </div>

        {/* Columna derecha — texto */}
        <div className="flex items-center px-12 xl:px-16 py-16">
          <TextBlock />
        </div>
      </div>
    </section>
  );
}

function TextBlock() {
  return (
    <div className="max-w-[520px]">
      {/* Eyebrow */}
      <motion.div
        custom={1}
        variants={fade}
        initial="hidden"
        animate="show"
        className="flex items-center gap-4 mb-10"
      >
        <span className="h-px w-10 flex-shrink-0" style={{ background: "rgba(247,246,243,0.45)" }} />
        <p
          className="font-sans text-[11px] font-medium uppercase"
          style={{ color: "rgba(247,246,243,0.65)", letterSpacing: "0.22em" }}
        >
          Mundinero · Por Monexus
        </p>
      </motion.div>

      {/* Headline */}
      <motion.h1
        custom={2}
        variants={fade}
        initial="hidden"
        animate="show"
        className="h-serif font-bold"
        style={{
          color: "#F7F6F3",
          fontSize: "clamp(52px, 6.5vw, 100px)",
          lineHeight: 0.92,
          letterSpacing: "-0.025em",
        }}
      >
        El futuro del<br />
        dinero habla.
      </motion.h1>

      {/* Hairline */}
      <motion.div
        custom={3}
        variants={fade}
        initial="hidden"
        animate="show"
        className="my-8 md:my-10"
        style={{ borderTop: "1px solid rgba(247,246,243,0.18)" }}
      />

      {/* Descripción */}
      <motion.p
        custom={4}
        variants={fade}
        initial="hidden"
        animate="show"
        className="font-sans leading-[1.65]"
        style={{
          color: "rgba(247,246,243,0.70)",
          fontSize: "15px",
          maxWidth: "400px",
          marginBottom: "2rem",
        }}
      >
        Análisis financiero editorial para México y el mundo.
        Tasas, dólares, cripto, mercados y la economía que mueve tu día a día.
      </motion.p>

      {/* CTAs */}
      <motion.div
        custom={5}
        variants={fade}
        initial="hidden"
        animate="show"
        className="flex items-center gap-8"
      >
        <Link
          href="#noticias"
          className="font-sans text-sm font-medium transition-opacity hover:opacity-75"
          style={{ color: "#F7F6F3" }}
        >
          Leer ahora →
        </Link>
        <Link
          href="#newsletter"
          className="font-sans text-sm font-medium transition-opacity hover:opacity-75 underline underline-offset-4"
          style={{ color: "rgba(247,246,243,0.55)", textDecorationColor: "rgba(247,246,243,0.25)" }}
        >
          Suscribirse gratis
        </Link>
      </motion.div>
    </div>
  );
}
