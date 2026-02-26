# nuvIA — Landing Page

## Proyecto
Landing page estática para nuvIA, agencia de Agentic Marketing
especializada en clínicas médicas de alto valor.
Lista para deploy en Vercel.

## Stack
- HTML5 semántico
- CSS3 puro (variables CSS, Grid, Flexbox)
- JavaScript vanilla (sin frameworks)
- Vercel (hosting estático)

## Estructura de archivos
nuvia_project/
├── index.html
├── styles.css
├── script.js
├── vercel.json
└── assets/
    ├── nuvIA_logo_claro.png   → PNG transparente, "nuv" gris + "IA" turquesa
    ├── nuvIA_logo_oscuro.png  → PNG transparente, "nuv" blanco + "IA" turquesa
    └── nuvIA_favicon.png      → PNG transparente, isotipo nube turquesa

## Identidad Visual
Colores (variables CSS en :root):
--turquesa: #00C9C8
--morado: #7B2FBE
--lavanda: #B57BEE
--gris-carbon: #1A1D27
--gris-claro: #F4F5F7
--gris-medio: #8892A4
--blanco: #FFFFFF

Tipografías (Google Fonts):
- Syne 700/800        → headlines, títulos de sección
- DM Sans 400/500/700 → body, nav, botones, UI
- JetBrains Mono 400/700 → KPIs, métricas, datos

Iconos: Lucide (CDN) — inicializar con lucide.createIcons()

## Reglas de logo
- Fondo claro (nav, secciones blancas) → nuvIA_logo_claro.png
- Fondo oscuro (hero, CTA final, footer) → nuvIA_logo_oscuro.png
- Nunca modificar, reemplazar ni regenerar los archivos de assets

## Tono y copy
Usar: Agentic, Inbound, LTV, ROAS, CAC, pipeline, churn rate
Evitar: ChatGPT, bot, revolucionamos, solución mágica, innovador

## Convenciones de código
- Mobile-first siempre
- Breakpoints: 768px (tablet), 1024px (desktop)
- Comentario al inicio de cada sección en HTML y CSS
- Variables CSS para todo — nunca hardcodear colores ni fuentes
- IDs de sección: #hero, #pain-points, #como-funciona,
  #resultados, #servicios, #contacto
- Offset de 80px en scroll por navbar sticky

## Lo que NO hacer
- No usar Bootstrap ni librerías CSS externas
- No agregar animaciones complejas hasta que se indique
- No crear archivos de imagen — solo referenciar los existentes en /assets/
- No cambiar la paleta de colores sin confirmación
