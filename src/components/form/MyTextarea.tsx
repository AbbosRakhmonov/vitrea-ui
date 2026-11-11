import get from 'lodash.get';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '../../lib';
import {
  FormControl,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  FormMessage,
  Textarea,
  type TextareaProps,
} from '../../ui/form';

/**
 * Props for the MyTextarea component.
 * @template TFieldValues - The type of the form values.
 */
export type MyTextareaProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> & TextareaProps;

/**
 * MyTextarea is a textarea component with optional react-hook-form integration.
 * Supports floating error message styling.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the textarea.
 * @param required - Whether the field is required.
 * @param rules - The `react-hook-form` validation rules.
 * @param className - Custom CSS class name.
 * @param floatingError - Whether to show the error message in a floating container.
 * @param props - Textarea and form item props.
 * @returns {JSX.Element | null} A textarea component integrated with react-hook-form, or null if name/control are missing
 */
export const MyTextarea = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  required,
  rules,
  className,
  floatingError,
  ...props
}: MyTextareaProps<TFieldValues>) => {
  return (
    (name && control && (
      <FormField<TFieldValues, FieldPath<TFieldValues>>
        control={control}
        name={name}
        rules={rules}
        render={({ field, formState }) => (
          <FormItem>
            {label && (
              <FormLabel className={'block'}>
                {label}{' '}
                {required && (
                  <span className={'text-[var(--red-text)]'}>*</span>
                )}
              </FormLabel>
            )}
            <div>
              <FormControl>
                <Textarea
                  variant={
                    get(formState.errors, `${name}.message`)
                      ? 'failure'
                      : 'default'
                  }
                  {...props}
                  {...field}
                  className={cn(className)}
                />
              </FormControl>
              <FormMessage
                className={cn(floatingError && 'absolute -bottom-5')}
              />
            </div>
          </FormItem>
        )}
      />
    )) ||
    null
  );
};
