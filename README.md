# Proyecto Astro + Bootstrap 5 + SCSS

Sitio estático en Astro con blog (MD/MDX), Bootstrap 5 desde SCSS, sitemap y RSS listos para producción.

## Requisitos
- Node 18+ (recomendado 20+)
- npm 9+

## Instalación
```bash
npm install
```

## Desarrollo
```bash
npm run dev
```
Servidor local: `http://localhost:4321`

## Build de producción
```bash
npm run build
npm run preview
```
El build se genera en `dist/`.

## Estructura
```
public/           # Estáticos (imágenes, favicon, robots.txt)
src/
  components/    # Componentes .astro (Navbar, Footer, BaseHead)
  content/       # Blog en Markdown/MDX + schemas
  layouts/       # Layouts: Main y BlogPost
  pages/         # Rutas del sitio
  scss/          # Estilos (Bootstrap desde SCSS + parciales)
```

## Configuración clave
- `astro.config.mjs` define `site` para URLs absolutas (sitemap, RSS, OG).
- `src/components/BaseHead.astro` añade metadatos SEO, canonical y OG.
- `public/robots.txt` publica el sitemap: `Sitemap: https://hektor.mx/sitemap-index.xml`.

### Rutas con base (subcarpetas)
Si vas a desplegar el sitio bajo una subcarpeta (por ejemplo, `https://dominio.com/misitio/`), usa el helper `url(path)` para generar rutas y URLs de assets compatibles con dev y prod.

- Helper: `src/utils/url.ts`
```ts
export function url(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalized}`;
}
```

- Enlaces y assets en `.astro`:
```astro
---
import { url } from '@/utils/url';
---
<a href={url('/blog')}>Blog</a>
<img src={url('/assets/images/logo.svg')} alt="Logo" />
```

- En listados dinámicos:
```astro
<a href={url(`/blog/${post.id}/`)}>Leer más</a>
```

Nota:
- Para metadatos (canonical, OG/Twitter) usa `Astro.site` para generar URLs absolutas.
- Si despliegas SIEMPRE en subcarpeta fija (p.ej. GitHub Pages), también puedes fijar `base` en `astro.config.mjs` (ej. `base: '/mi-repo/'`). `withBase()` usará ese valor automáticamente.

## Estilos (Bootstrap desde SCSS)
- Bootstrap se compila desde `src/scss/index.scss` (no se usa CDN).
- Puedes personalizar variables en `src/scss/_variables.scss`.

Nota: verás advertencias de deprecación de Sass por `@import` y funciones globales; son propias de Bootstrap 5.x. No afectan el build. Para eliminarlas en el futuro, migra a `@use` cuando actualices a una versión de Bootstrap compatible.

## Contenido del blog
- Los posts viven en `src/content/blog/` (`.md` o `.mdx`).
- El esquema está en `src/content.config.ts`.
- Lista de posts: `/blog`. Página de post: `/blog/[slug]`.

Frontmatter mínimo por post:
```yaml
title: "Título del post"
description: "Descripción corta"
pubDate: "2024-06-01"
heroImage: "/blog-placeholder-1.jpg" # opcional
```

## Buenas prácticas aplicadas
- Unificación de estilos globales 
- URLs absolutas en Open Graph/Twitter usando `Astro.site`.
- Navbar con rutas absolutas desde raíz y `aria-current`.
- Fechas localizadas a `es-MX`.

## Scripts útiles
- `npm run dev`: servidor de desarrollo
- `npm run build`: compilar producción
- `npm run preview`: previsualizar producción

## Despliegue
Sube el contenido de `dist/` a tu hosting estático (Netlify, Vercel, GitHub Pages, etc.). Asegura que el dominio en producción coincida con `site` en `astro.config.mjs`.
