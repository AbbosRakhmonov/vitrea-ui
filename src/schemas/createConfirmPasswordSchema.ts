import { z } from 'zod';
import type { TranslationArgsType } from '../types';

/**
 * Creates a Zod schema for validating the password confirmation form.
 *
 * @param t - Translation function to localize error messages.
 * @returns Zod schema object.
 */
export const createConfirmPasswordSchema = (
  t: (...args: TranslationArgsType) => string
) =>
  z.object({
    password: z
      .string()
      .nonempty(t('required', { field: t('Password'), ns: 'validation' })),
  });

/**
 * Type inference for the confirm password form data.
 */
export type ConfirmPasswordDto = z.infer<
  ReturnType<typeof createConfirmPasswordSchema>
>;
