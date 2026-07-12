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

## Imágenes
- PROHIBIDO el uso de fotografía de stock de cualquier tipo
- Lenguaje visual: gráficas propias de datos + fotos en duotono tinta/azul únicamente cuando sean editorialmente esenciales
- Preferencia absoluta por visualizaciones de datos nativas sobre imágenes decorativas

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
- Framework: Next.js 16 App Router
- Estilos: Tailwind CSS v4 con tokens de Mundinero
- Animaciones: Framer Motion
- CMS: Ghost (headless API)
- Deploy: Vercel (main → mundinero.com)

## Ramas
- main: producción → mundinero.com (solo coming soon por ahora)
- preview: sitio completo en construcción → URL de preview Vercel

## Estado del proyecto — 28 mayo 2026

### Rama main (mundinero.com — coming soon)
- index.html: página coming soon con countdown al 8 jun 2026
- Ticker flotante estilo liquid glass pill con datos reales:
  - Binance API: BTC, ETH, XRP, SOL
  - fawazahmed0: USD/MXN, EUR/MXN
  - Yahoo Finance: IPC BMV (^MXX), S&P 500 (^GSPC), NASDAQ (^IXIC)
  - Estáticos: BANXICO 6.50%, CETES 6.54%, INFLACIÓN 4.45%,
    REAL YIELD +2.09%, SAL.MÍN $278.80, UMA $113.14,
    ORO $3020, WTI $71.4, MAGNA $24.50, PREMIUM $26.00
  - GitHub Actions workflow: actualización automática
    8am y 3:30pm CST (falta agregar BANXICO_TOKEN e INEGI_TOKEN)
- Wallpapers rotantes cada 5s desde carpeta /Wallpapers/
- Crédito de foto: nombre del archivo como texto
- Elemento circular giratorio con 3 PNGs (mun 2,3,4.png)
- vercel.json: sirve index.html como estático

### Rama preview (URL de preview Vercel)
- Next.js 14 + TypeScript + Tailwind + Framer Motion
- Componentes construidos: Ticker, Nav, Hero, RadarMundinero,
  PulsoMX (con calculadora de remesas), ArticulosGrid,
  LaColumna, Eventos, Newsletter, Footer
- Tipografía: Newsreader (serif) + IBM Plex Sans + IBM Plex Mono
- Design system configurado en tailwind.config.ts

### Pendientes inmediatos
- Agregar BANXICO_TOKEN e INEGI_TOKEN en GitHub Secrets
- Integrar Beehiiv al formulario del coming soon
- Conectar mundinero.com a rama preview el 8 de junio

### Archivos de assets en raíz
- Mudinerolso.svg, Mundinero.svg: logos
- mun 2.png, mun 3.png, mun 4.png: elementos del sello giratorio
- mundinerolso.png, mundineronav.jpg/png: variantes del logo
- Wallpapers/: 4 imágenes con nombres como crédito
