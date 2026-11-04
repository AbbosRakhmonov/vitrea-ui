import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

/**
 * Props for the useFilter hook.
 */
export interface UseFilterProps {
  /** Initial filter parameters. */
  params?: Record<string, unknown>;
}

/**
 * useFilter syncs URL parameters or object params with a react-hook-form instance.
 * Useful for initializing filter forms with data from URL or state.
 *
 * @param params - Key-value pairs to set as form values.
 * @returns {Object} Filter state object
 * @returns {Record<string, unknown> | undefined} params - The passed parameters
 * @returns {UseFormReturn} form - React Hook Form instance with params set as values
 * @example
 * ```tsx
 * // Initialize filter with URL params
 * const { form } = useFilter({ params: { status: 'active', tags: ['featured'] } });
 *
 * // Access form values
 * const status = form.watch('status');
 * ```
 */
export const useFilter = ({ params }: UseFilterProps) => {
  const form = useForm({ mode: 'onChange' });

  useEffect(() => {
    Object.entries(params || {}).forEach(([key, value]) => {
      if (/[[\]]$/g.test(key) && !(value instanceof Array)) {
        form.setValue(key, [value]);
      } else {
        form.setValue(key, value);
      }
    });
  }, [params, form]);

  return {
    params,
    form,
  };
};
