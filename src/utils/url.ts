export function url(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  if (!path) return base;
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  // Unir base y path cuidando las barras
  return `${base}${normalized}`;
}


