export function parseNumber(
  value: unknown,
  fallback: number,
) {
  const parsed = Number(value);

  return Number.isNaN(parsed)
    ? fallback
    : parsed;
}