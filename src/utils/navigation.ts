export function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export type LinkAttrs = { target?: string; rel?: string };

export function linkAttrs(href: string): LinkAttrs {
  return isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}

export function isActive(pathname: string, href: string): boolean {
  if (!href) return false;
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

export function classNames(
  ...args: Array<string | Record<string, boolean> | undefined | null>
): string {
  const tokens: string[] = [];
  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === 'string') {
      if (arg.trim()) tokens.push(arg.trim());
      continue;
    }
    for (const [key, value] of Object.entries(arg)) {
      if (value) tokens.push(key);
    }
  }
  return tokens.join(' ');
}


