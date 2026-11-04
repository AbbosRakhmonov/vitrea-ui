/**
 * Supported theme modes. Const object rather than `enum` — see Keyboard.ts.
 */
export const ThemeMode = {
  /** Light theme with bright colors */
  LIGHT: 'light',
  /** Dark theme with dark colors */
  DARK: 'dark',
  /** Follow system/OS theme preference */
  SYSTEM: 'system',
} as const;

export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];
