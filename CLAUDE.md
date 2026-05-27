# Mundinero — Design Brief

## Identidad
- Producto: Medio financiero editorial de México y el mundo
- Por: Monexus (marca registrada IMPI)
- Tagline: "El futuro del dinero habla. Nosotros traducimos."
- URL: mundinero.com

## Paleta de color
- Tinta (bg dark): #1f1e1d
- Crema (bg light): #F7F6F3
- Azul light: #5170ff
- Azul dark: #6B87FF
- Verde light (positivo): #0B6B38
- Verde dark (positivo): #34D87F
- Rojo light (negativo): #A62820
- Rojo dark (negativo): #FF6B6B

## Reglas de color
- Verde y rojo SOLO para señales financieras binarias
- Sobre badge de color brillante en dark: texto siempre #1f1e1d
- Modo por defecto del sitio: dark (fondo tinta)

## Tipografía
- Serif (titulares/columna): Newsreader — Google Fonts (variable: --font-serif)
- Sans (UI/cuerpo/etiquetas): IBM Plex Sans — Google Fonts (variable: --font-sans)
- Mono (ticker/cifras/datos): IBM Plex Mono — Google Fonts (variable: --font-mono)
- Logo: Canela Text (solo marca, no replicar en código)
- Estilo: editorial flat, sin gradientes decorativos

## Stack
- Framework: Next.js 14 App Router
- Estilos: Tailwind CSS con tokens de Mundinero
- Animaciones: Framer Motion
- CMS: Ghost (headless API)
- Deploy: Vercel (main → mundinero.com)

## Ramas
- main: producción → mundinero.com (solo coming soon por ahora)
- preview: sitio completo en construcción → URL de preview Vercel
