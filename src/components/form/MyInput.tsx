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
  Input,
  type InputProps,
} from '../../ui/form';

/**
 * Props for the MyInput component.
 * @template TFieldValues - The type of the form values.
 */
export type MyInputProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> & InputProps;

/**
 * MyInput is a form-aware input field that integrates with react-hook-form.
 * Works in both controlled (with control/name) and uncontrolled modes.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the input.
 * @param required - Whether the field is required.
 * @param className - Custom CSS class name.
 * @param rules - The `react-hook-form` validation rules.
 * @param floatingError - Whether to show the error message in a floating container.
 * @param props - Input and form item props.
 * @returns {JSX.Element | null} An input field with form integration and validation, or null if name/control are missing
 */
export const MyInput = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  required,
  className,
  rules,
  floatingError,
  ...props
}: MyInputProps<TFieldValues>) => {
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
                <Input
                  variant={
                    get(formState.errors, `${name}.message`)
                      ? 'failure'
                      : 'default'
                  }
                  {...props}
                  {...field}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (props.type === 'number') {
                      field.onChange(value ? Number(value) : undefined);
                    } else {
                      field.onChange(value);
                    }
                  }}
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
