export function absoluteUrl(input: string | URL): string {
  try {
    const base = (globalThis as any).Astro?.site ?? import.meta.env.SITE;
    if (!base) return String(input);
    return new URL(input, base).toString();
  } catch {
    return String(input);
  }
}

export function buildCanonical(pathname: string): string {
  try {
    const base = (globalThis as any).Astro?.site ?? import.meta.env.SITE;
    if (!base) return pathname;
    const url = new URL(pathname, base);
    return url.toString();
  } catch {
    return pathname;
  }
}

export function ogImageUrl(path: string): string {
  return absoluteUrl(path);
}


