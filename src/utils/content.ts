export function paginate<T>(items: T[], page: number, perPage: number) {
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), pages);
  const start = (current - 1) * perPage;
  const end = start + perPage;
  return {
    items: items.slice(start, end),
    total,
    perPage,
    page: current,
    pages,
    hasPrev: current > 1,
    hasNext: current < pages,
  };
}

export function sortPostsByDate<T extends { data?: { pubDate?: Date } }>(posts: T[]): T[] {
  return [...posts].sort((a, b) => {
    const da = a?.data?.pubDate?.valueOf?.() ?? 0;
    const db = b?.data?.pubDate?.valueOf?.() ?? 0;
    return db - da;
  });
}

export function hero(src?: string, fallback: string = '/blog-placeholder-1.jpg'): string {
  return src || fallback;
}


