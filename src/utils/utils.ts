/**
 * Simple structural equality check using JSON serialization.
 * @param a First object to compare.
 * @param b Second object to compare.
 * @returns True if objects are structurally equal.
 */
export function isEqual(a: unknown, b: unknown) {
  return JSON.stringify(a) === JSON.stringify(b);
}
