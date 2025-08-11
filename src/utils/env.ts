export function env(key: string, fallback?: string): string | undefined {
  const value = (import.meta as any).env?.[key];
  return value ?? fallback;
}


