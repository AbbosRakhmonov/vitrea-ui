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
  ReactSelect,
  type ReactSelectProps,
} from '../../ui/form';

/**
 * Props for the MySelect component.
 * @template TFieldValues - The type of the form values.
 */
export type MySelectProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    ReactSelectProps & {
      /** Optional callback for change events. */
      onChange?: (value: unknown) => void;
    };

/**
 * MySelect wraps a ReactSelect with react-hook-form support.
 * Can also be used standalone when no control/name are provided.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the select.
 * @param required - Whether the field is required.
 * @param className - Custom CSS class name.
 * @param rules - The `react-hook-form` validation rules.
 * @param options - The options to display in the select.
 * @param onChange - Optional callback for change events.
 * @param floatingError - Whether to show the error message in a floating container.
 * @param props - Select and form item props.
 * @returns {JSX.Element | null} A select component integrated with react-hook-form, or null if name/control are missing
 */
export const MySelect = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  required,
  className,
  rules,
  options = [],
  onChange,
  floatingError,
  ...props
}: MySelectProps<TFieldValues>) => {
  return (
    (name && control && (
      <FormField<TFieldValues, FieldPath<TFieldValues>>
        control={control}
        name={name}
        rules={rules}
        render={({ field, formState }) => {
          const handleChange = (value: unknown) => {
            field.onChange(value);
            if (onChange) {
              onChange(value);
            }
          };

          return (
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
                  <ReactSelect
                    className={cn(className)}
                    {...props}
                    {...field}
                    onChange={handleChange}
                    options={options}
                    error={!!get(formState.errors, `${name}`)}
                  />
                </FormControl>
                <FormMessage
                  className={cn(floatingError && 'absolute -bottom-5')}
                />
              </div>
            </FormItem>
          );
        }}
      />
    )) ||
    null
  );
};
