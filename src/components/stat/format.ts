/**
 * "1 250", per the spec's number rule.
 *
 * Written out rather than left to toLocaleString, which would make the
 * separator depend on whichever locale the browser is in — the spec asks for a
 * space in every language the product ships. The space is non-breaking so a
 * number never wraps across lines.
 */
export function groupThousands(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
