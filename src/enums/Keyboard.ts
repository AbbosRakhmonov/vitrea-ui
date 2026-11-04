/**
 * Keyboard keys used by the kit.
 *
 * A const object rather than `enum`: this project sets `erasableSyntaxOnly`,
 * which bans the non-erasable `enum` form. Both usages still work —
 * `Keyboard.ENTER` as a value and `Keyboard` as a type.
 */
export const Keyboard = {
  /** The Enter/Return key */
  ENTER: 'Enter',
} as const;

export type Keyboard = (typeof Keyboard)[keyof typeof Keyboard];
