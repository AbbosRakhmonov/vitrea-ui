import { type TOptionsBase } from 'i18next';
// @ts-expect-error module exists
import type { $Dictionary } from 'i18next/typescript/helpers';

/**
 * Type definition for arguments passed to the i18next translation function.
 * Represents a tuple containing translation key(s) and optional configuration.
 *
 * @see {@link https://www.i18next.com/translation-function/essentials}
 *
 * Tuple structure:
 * - [0] key: Translation key string or array of fallback keys
 * - [1] options: Optional i18next options including interpolation values, default value, etc.
 */
export type TranslationArgsType = [
  key: string | string[],
  options?: TOptionsBase & $Dictionary,
];
