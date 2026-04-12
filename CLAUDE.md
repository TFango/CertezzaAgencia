# CLAUDE.md — Certezza Web

Guía completa del proyecto para que Claude Code entienda cómo trabajar en este repositorio.

---

## 1. Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript 5 (strict) |
| Estilos | CSS Modules (sin Tailwind, sin styled-components) |
| Animaciones | Framer Motion 11 |
| Email | Resend API |
| Fuente | Inter (Google Fonts, pesos 100–900) |

**No se usa Tailwind. No se usan utilidades globales. Solo CSS Modules por componente.**

---

## 2. Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx          # Root layout: Header, Footer, WppButton, fuente Inter
│   ├── page.tsx            # Home page (importa y ordena todas las secciones)
│   ├── global.css          # Reset global + scroll behavior
│   ├── robots.ts
│   ├── sitemap.ts
│   └── api/contact/route.ts  # Endpoint de contacto con Resend
│   └── servicios/
│       ├── marketing/page.tsx
│       └── web/page.tsx
│
└── components/
    ├── appWrapper/         # Loading screen global
    ├── layout/
    │   ├── header/         # Navbar fijo + menú mobile con overlay
    │   └── footer/
    ├── sections/
    │   ├── home/           # hero, problemWeSolve, services, whyUs, howWeWork
    │   ├── marketing/      # hero, howWork, packs
    │   └── web/            # hero, howWork, packs
    └── ui/                 # Componentes reutilizables: Button, Card, Contact,
                            # AnimatedWord, LoadingScreen, ParticlesCanvas,
                            # Marquee, PackCard, WppButton
```

### Convenciones de archivos

- Carpeta con `index.tsx` + `ComponentName.module.css`
- Nombre de carpeta en camelCase: `howWeWork/`, `whyUs/`
- Imports con alias `@/components/...`

---

## 3. Sistema de diseño

### Paleta de colores

> Los colores están hardcodeados en cada `.module.css`. **No hay variables CSS globales.**

| Token (informal) | Valor | Uso |
|---|---|---|
| `bg-dark` | `#2b2b2b` | Fondo principal (hero, contact) |
| `bg-darker` | `#202020` | Secciones internas (services, whyUs) |
| `bg-card` | `#222222` | Cards, inputs |
| `bg-card-alt` | `#272727` | Cards alternativas |
| `border` | `#333333` | Bordes de cards y separadores |
| `text-primary` | `#e3e3d9` | Texto principal (off-white) |
| `text-secondary` | `#838383` | Texto secundario / descripciones |
| `text-tertiary` | `#555555` | Placeholders |
| `brand-beige` | `#c6b099` | Color de marca principal (botones, header) |
| `accent-purple` | `#cd9afa` | Marketing (botones, highlights) |
| `accent-blue` | `#449bff` | Web development (botones, highlights) |

### Tipografía

- **Fuente única:** Inter (Google Fonts)
- **Variable CSS:** `--font-inter` (definida en `layout.tsx`)
- **Pesos usados:** 300 (body), 400 (normal), 600 (semibold), 700 (bold), 800 (extrabold)
- **Tamaños:** se usan valores fijos por breakpoint + `clamp()` para títulos fluidos
- **Letter-spacing:** badges/etiquetas usan `0.12em`–`0.2em` con `text-transform: uppercase`

### Espaciado

- Unidad base: `0.5rem` (8px)
- Padding de secciones: `4rem 1.5rem` → `7rem 6rem` (mobile → desktop)
- Gap entre cards: `1rem`–`1.25rem`
- Max-width del contenedor: `1200px` (laptop) / `1400px`–`1500px` (desktop XL)

### Border radius

| Uso | Valor |
|---|---|
| Inputs / cards pequeñas | `12px` |
| Cards medianas | `16px`–`20px` |
| Cards grandes / secciones | `24px`–`32px` |
| Botones | `999px` (pill) |
| Badges/etiquetas | `999px` |

### Sombras

```css
/* Card hover */
box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);

/* Botón claro hover */
box-shadow: 0 8px 30px rgba(255, 255, 255, 0.15);

/* Botón de color hover */
box-shadow: 0 8px 24px rgba(color, 0.35);

/* Focus de input */
box-shadow: 0 0 0 3px rgba(198, 176, 153, 0.08);
```

---

## 4. Breakpoints (mobile-first)

```css
/* Mobile (default) */
/* Tablet */    @media (min-width: 767px)  { ... }
/* Laptop */    @media (min-width: 1023px) { ... }
/* Desktop XL*/ @media (min-width: 1279px) { ... }
/* Ultra-wide */ @media (min-width: 1536px) { ... }
```

Siempre empezar con estilos mobile y agregar overrides en media queries superiores.

---

## 5. Animaciones con Framer Motion

### Patrón estándar (scroll-triggered)

```tsx
const ref = useRef<HTMLDivElement>(null);
const isInView = useInView(ref, { once: true, margin: "-80px" });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 40 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
/>
```

### Patrones comunes

| Patrón | Valores |
|---|---|
| Entrada suave | `y: 20→0`, `opacity: 0→1`, `duration: 0.5`, `ease: "easeOut"` |
| Entrada pronunciada | `y: 40→0`, `duration: 0.55`, `ease: [0.25, 0.1, 0.25, 1]` |
| Stagger hijos | `delay={index * 0.1}` o `delay={index * 0.15}` |
| Fade simple | `opacity: 0→1`, `duration: 0.3` |
| Barra de progreso | `scaleY: 0→1`, `duration: 2.8`, `ease: "linear"` |

### Hooks usados

- `useInView(ref, { once: true, margin: "-80px" })` — trigger al entrar en viewport
- `useRef<HTMLElement>()` — referencia al elemento a animar
- `useState`, `useEffect` — lógica de ciclo de vida

---

## 6. Patrones de componentes

### Estructura típica de una sección

```tsx
"use client"; // solo si tiene interacción / animaciones

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./ComponentName.module.css";

const data = [ /* constante estática definida fuera del componente */ ];

function SubComponent({ prop }: { prop: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} /* ... */>
      {/* contenido */}
    </motion.div>
  );
}

export default function SectionName() {
  return (
    <section className={styles.sectionName}>
      <div className={styles.container}>
        {/* título, subtítulo, contenido */}
        {data.map((item, i) => (
          <SubComponent key={item.id} {...item} delay={i * 0.15} />
        ))}
      </div>
    </section>
  );
}
```

### Imágenes e íconos

- Se usan `<img src="/icons/name.svg" alt="" aria-hidden="true" />` (no `next/image`)
- SVGs en `/public/icons/`, logos en `/public/logos/`, imágenes en `/public/images/`

### Links

- Internos: `<Link href="/ruta">` de `next/link`
- Externos: `<a href="..." target="_blank" rel="noopener noreferrer">`

### "use client"

Agregar solo si el componente usa: hooks de React, event listeners, Framer Motion, estado.

---

## 7. Secciones del Home (orden en page.tsx)

1. **Hero** — Badge + título con palabra animada + CTA + partículas
2. **ProblemWeSolve** — Cards rotativas (desktop) / carousel draggable (mobile)
3. **Services** — 2 cards expandibles: Marketing (`#cd9afa`) y Web (`#449bff`)
4. **WhyUs** — 4 métricas con contadores animados al hacer scroll
5. **HowWeWork** — 4 etapas del proceso
6. **Contact** — Formulario con validación, honeypot anti-spam, Resend API

---

## 8. Seguridad y buenas prácticas

- **Formulario de contacto:** honeypot anti-bot, validación regex de email, escape HTML antes de enviar, rate limit 3 req/min por IP
- **Headers de seguridad:** configurados en `next.config.ts` (CSP, X-Frame-Options, etc.)
- **Cache de assets estáticos:** 1 año, inmutable (`/icons`, `/logos`, `/images`)
- **No usar** `eval`, `innerHTML` sin escape, ni concatenar strings en SQL/queries

---

## 9. Variables de entorno requeridas

```env
NEXT_PUBLIC_GA_ID=     # Google Analytics
RESEND_API_KEY=        # Servicio de email
```

---

## 10. Reglas de trabajo

- **No usar Tailwind.** Todo en CSS Modules.
- **No crear helpers o abstracciones innecesarias.** Si algo se usa una vez, va inline.
- **No agregar comentarios obvios.** Solo donde la lógica no es evidente.
- **No cambiar lo que no se pidió.** Bug fix = solo el bug. Feature = solo lo pedido.
- **Siempre leer el archivo antes de editarlo.**
- **Mobile-first siempre.** Primero mobile, luego overrides en media queries.
- **Mantener consistencia** con los colores, pesos y tamaños de fuente ya usados en el proyecto.
- **Animaciones con Framer Motion** siguiendo los patrones existentes (useInView + stagger).
- Al crear una nueva rama para explorar un diseño, usar el prefijo `feat/` (ej: `feat/how-we-work-redesign`).
