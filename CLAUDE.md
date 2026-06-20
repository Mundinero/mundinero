# Mundinero — Design Brief v2

Sistema de identidad sellado y verificado (contrastes WCAG AA calculados).

---

## Identidad

- Producto: Medio financiero editorial de México y el mundo
- Por: Monexus (marca registrada IMPI)
- Tagline: "El futuro del dinero habla. Nosotros lo traducimos."
- URL: mundinero.com
- Lanzamiento: 2 de julio de 2026

## Tono

Inteligente pero accesible. Autoridad editorial tipo Economist/FT, en español,
con ancla en LatAm. La IA traduce y curra; la voz humana interpreta. Confianza
es el producto: fuentes citadas, timestamps, "no es asesoría fiscal/financiera".

---

## Tipografía — dos voces, roles separados

**SERIF EDITORIAL → Fraunces** (titulares, logo/mancheta, columna, reportes, pull quotes)

- Solo display. NUNCA en UI, botones o labels.
- Eje WONK = 0 (formas serias, no juguetonas). SOFT = 0 (terminales nítidas).
- Usar clase `.h-serif` en titulares grandes (aplica `font-variation-settings: 'opsz' 144, 'SOFT' 0, 'WONK' 0`).
- Fallback dev: Cormorant Garamond → Georgia → serif.
- Si se licencia Canela Text, entra primero y Fraunces pasa a fallback.
  NO usar cortes pirata: vienen sin acentos.

**SANS PRODUCTO/DATOS → Satoshi** (UI, navegación, cuerpo, números, ticker, calculadoras)

- Gratis (Fontshare, OFL). Unifica con el universo Monexus.
- Reemplaza IBM Plex Sans e IBM Plex Mono. Un solo sans para todo.
- Fallback: Inter → system-ui → sans-serif.

---

## Paleta

### Lógica de temperatura

Base cálida (papel crema / tinta café-negra) + único acento azul (frío).
El contraste de temperatura hace que el azul resalte sin saturarlo.
NO migrar a grises fríos: aplana el azul y queda como dashboard cripto genérico.

### Neutrales

| Token | Dark | Light |
|-------|------|-------|
| Fondo | `#1f1e1d` tinta | `#F7F6F3` crema |
| Superficie/card | `#2a2928` surface-dark | `#ECEAE5` surface-light |
| Borde/elevación | `#3a3833` hairline-dark | `#DEDBD4` hairline-light |
| Texto terciario | `#8b887f` muted-dark (4.7 AA) | `#5F5E5A` muted-light (6.0 AA) |
| Texto secundario | `#cfccc4` soft-dark (10.4) | `#B8B4AC` soft-light — SOLO bordes, nunca texto |
| Texto primario | `#F7F6F3` crema (15.4 AAA) | `#1f1e1d` tinta (15.4 AAA) |

### Azul (acento único)

| Variante | Valor | Uso |
|----------|-------|-----|
| azuldk | `#6B87FF` | link/acento/badge en dark (5.18 AA) |
| azul | `#5170FF` | fills/botones/mancheta en light (3.8 — solo grande) |
| azul-text | `#3A57E8` | links y texto chico en light (5.24 AA) |
| hover dark | `#8A9DFF` | — |
| hover light | `#2E47C9` | — |
| focus ring | `2px solid #6B87FF` / `#5170FF`, offset 2px | — |

**Regla:** badge azul sobre tinta → texto siempre `#1f1e1d`.

### Señales (SOLO deltas/ticker, nunca decorativas)

| | Dark | Light |
|-|------|-------|
| Verde + | `#34D87F` positivo (8.9 AAA) | `#0B6B38` verde-light (6.1 AA) |
| Rojo − | `#FF6B6B` negativo (6.0 AA) | `#A62820` rojo-light (6.6 AA) |

Badge verde/rojo: texto siempre `#1f1e1d` (tinta).

### Reglas absolutas de color

- Verde y rojo EXCLUSIVAMENTE para señales financieras binarias.
- `soft-light` (#B8B4AC) da 1.9 contra crema — solo bordes/divisores, nunca texto.
- Sin gradientes decorativos. Flat, tipográfico, mucho espacio en blanco.
- Jerarquía por grises + tamaño, no por color. ~90% neutro.
- Modo por defecto: dark (fondo tinta).

---

## Stack

- Framework: Next.js (App Router)
- Estilos: Tailwind CSS v4 con @theme en globals.css
- Animaciones: Framer Motion (entradas staggered, sutiles)
- CMS: Ghost (headless API)
- Deploy: Vercel

## Ramas

- `main`: producción → mundinero.com (coming soon con countdown). NO tocar hasta el 2 jul.
- `preview`: sitio completo en construcción → URL de preview Vercel.
- Todo se construye en preview; el 2 de julio preview → main.
