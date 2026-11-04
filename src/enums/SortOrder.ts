/**
 * Sort direction. Const object rather than `enum` — see Keyboard.ts.
 */
export const SortOrder = {
  /** Ascending sort order (A-Z, 0-9, oldest to newest) */
  ASC: 'ASC',
  /** Descending sort order (Z-A, 9-0, newest to oldest) */
  DESC: 'DESC',
} as const;

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
