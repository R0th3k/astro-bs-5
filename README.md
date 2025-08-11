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

## Helpers disponibles (`src/utils/`)

### Rutas y URLs
- `url(path: string)`: compone rutas respetando `BASE_URL` (útil si despliegas bajo subcarpeta).
  - Ejemplo: `url('/blog')` → `/blog` en dev, `/subcarpeta/blog` en prod.
- `asset(path: string)`: atajo para assets dentro de `public/assets/` usando `url()`.
  - Ejemplo: `asset('images/logo.svg')` → `/assets/images/logo.svg` (o con base si aplica).
- `absoluteUrl(pathOrUrl: string | URL)`: genera URL absoluta usando `Astro.site` (ideal para OG/RSS).
  - Ejemplo: `absoluteUrl('/blog/post')` → `https://tu-dominio.com/blog/post`.

### Navegación
- `isExternal(href: string)`: detecta si un enlace es externo (`http/https`).
- `linkAttrs(href: string)`: agrega attrs seguros a enlaces externos: `{ target: '_blank', rel: 'noopener noreferrer' }`.
- `isActive(pathname: string, href: string)`: determina si una ruta está activa (para resaltar en la navbar).
- `classNames(...args)`: combina clases condicionales de forma limpia.

Uso ejemplo en `.astro`:
```astro
---
import { url, isActive, linkAttrs, classNames, asset } from '@/utils';
const pathname = Astro.url.pathname;
---
<a href={url('/blog')} {...linkAttrs('/blog')}
   class={classNames('nav-link', { active: isActive(pathname, '/blog') })}>
  Blog
</a>
<img src={asset('images/logo.svg')} alt="Logo" />
```

### Formato
- `formatDate(date, locale?, options?)`: formatea fechas.
  - Ejemplo: `formatDate('2024-06-01')` → `1 jun 2024` (según locale).
- `formatCurrency(value, currency?, locale?)`: formatea moneda.
  - Ejemplo: `formatCurrency(199, 'MXN')` → `$199.00`.
- `formatNumber(value, locale?, options?)`: formatea números generales.
- `slugify(str)`: convierte a slug URL-safe (quita acentos/espacios).
- `truncate(str, max?, suffix?)`: recorta textos para cards/listas.
- `readingTime(text, wpm?)`: estima minutos de lectura (default 200 wpm).

### Contenido
- `paginate(items, page, perPage)`: devuelve items paginados y metadatos (total, pages, hasPrev/Next).
- `sortPostsByDate(posts)`: ordena posts por fecha descendente.
- `hero(src?, fallback?)`: retorna `src` o un placeholder.

### Meta/SEO
- `buildCanonical(pathname)`: compone URL canónica con `Astro.site`.
- `ogImageUrl(path)`: versión absoluta para imágenes OG/Twitter.

### Entorno
- `env(key, fallback?)`: lectura segura de `import.meta.env` (útil para `PUBLIC_*`).

### Snippets rápidos
```ts
import { formatCurrency, truncate, readingTime, slugify } from '@/utils';

formatCurrency(199, 'MXN'); // "$199.00"
truncate('Texto largo...', 50);
readingTime('texto con muchas palabras...');
slugify('Título con acentos y espacios');
```

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
