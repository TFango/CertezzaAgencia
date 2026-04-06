# Certezza — Agencia Web & Marketing Digital

Sitio web corporativo de [Certezza](https://www.certezza.com.ar), agencia de desarrollo web y marketing digital basada en Mar del Plata, Argentina.

🔗 **[Ver sitio en vivo](https://www.certezza.com.ar)**

> Repositorio público con fines de portfolio. El código fuente está disponible para revisión técnica.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript |
| Estilos | CSS Modules |
| Animaciones | Framer Motion |
| Analytics | Google Analytics 4 |
| SEO | Google Search Console + sitemap + robots.txt |
| Deploy | Vercel |
| Dominio | NIC.ar |

---

## Features

- **Animaciones** — transiciones y microinteracciones con Framer Motion en componentes clave (Services, PackCard, Marquee)
- **SEO optimizado** — sitemap automático, robots.txt, metadatos por ruta, integración con Google Search Console
- **Google Analytics 4** — tracking de eventos y comportamiento de usuarios
- **Formulario de contacto hardened** — rate limiting, sanitización XSS y honeypot anti-spam
- **Responsive completo** — breakpoints en 767px, 1023px, 1279px y 1536px
- **Performance** — imágenes optimizadas con `next/image`, fuentes con `next/font`

---

## Estructura del proyecto

```
certezza/
├── app/                  # App Router — rutas y layouts
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/
│       └── contact/      # API route del formulario
├── components/           # Componentes reutilizables
│   ├── Navbar/
│   ├── Hero/
│   ├── Services/
│   ├── PackCard/
│   ├── Marquee/
│   └── Footer/
├── styles/               # CSS Modules globales y por componente
├── public/               # Assets estáticos
└── lib/                  # Utilidades y helpers
```

---

## Autor

**Emanuel Bustos** — Co-fundador & Developer en Certezza

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/facundo-emanuel-jimenez-bustos-49207136b)
[![GitHub](https://img.shields.io/badge/GitHub-TFango-181717?style=flat&logo=github&logoColor=white)](https://github.com/TFango)
