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
  MaskInput,
  type MaskInputProps,
} from '../../ui/form';

/**
 * Props for the MyMaskInput component.
 * @template TFieldValues - The type of the form values.
 */
export type MyMaskInputProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    MaskInputProps & {
      /** Whether the field is required. */
      required?: boolean;
    };

/**
 * MyMaskInput is an input component with masking support and optional react-hook-form integration.
 * Works in both controlled (with control/name) and uncontrolled modes. By default it uses a space as
 * thousands separator, underscores as placeholder characters, lazy formatting disabled, and returns
 * unmasked value on change.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the mask input.
 * @param rules - The `react-hook-form` validation rules.
 * @param required - Whether the field is required.
 * @param floatingError - Whether to show the error message in a floating container.
 * @param props - MaskInput and form item props.
 * @returns {JSX.Element | null} A masked input with label, helper text, and validation message, or null if name/control are missing
 */
export const MyMaskInput = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  rules,
  required,
  floatingError,
  ...props
}: MyMaskInputProps<TFieldValues>) => {
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
                <MaskInput
                  thousandsSeparator={' '}
                  lazy={false}
                  placeholderChar="_"
                  unmask
                  {...field}
                  {...props}
                  variant={
                    get(formState.errors, `${name}.message`)
                      ? 'failure'
                      : 'default'
                  }
                  onAccept={(value) => field.onChange(value)}
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
