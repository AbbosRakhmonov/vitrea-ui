import get from 'lodash.get';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '../../lib';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type FormItemProps,
  type Option,
} from '../../ui/form';

/**
 * Props for the MyShadcnSelect component.
 * @template TFieldValues - The type of the form values.
 */
export type MyShadcnSelectProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> & {
    /** Array of options to display in the select dropdown. */
    options?: Option[];
    /** Placeholder text when no option is selected. */
    placeholder?: string;
    /** Additional CSS classes. */
    className?: string;
    /** Whether the select is disabled. */
    disabled?: boolean;
    /** Callback fired when the selected value changes. */
    onChange?: (value: string | number) => void;
    /** Whether the field is required. */
    required?: boolean;
  };

/**
 * MyShadcnSelect is a native Shadcn select component integrated with react-hook-form.
 * Renders a dropdown select with customizable options and validation support.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the select.
 * @param required - Whether the field is required.
 * @param className - Additional CSS classes.
 * @param rules - The `react-hook-form` validation rules.
 * @param options - Array of options to display in the select dropdown.
 * @param placeholder - Placeholder text when no option is selected.
 * @param disabled - Whether the select is disabled.
 * @param onChange - Callback fired when the selected value changes.
 * @returns {JSX.Element | false} A select component integrated with react-hook-form, or false if name/control are missing
 */
export const MyShadcnSelect = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  required,
  className,
  rules,
  options = [],
  placeholder = 'Select an option',
  disabled,
  onChange,
}: MyShadcnSelectProps<TFieldValues>) => {
  return (
    name &&
    control && (
      <FormField<TFieldValues, FieldPath<TFieldValues>>
        control={control}
        name={name}
        rules={rules}
        render={({ field, formState }) => {
          const hasError = !!get(formState.errors, `${name}`);

          const handleChange = (value: string) => {
            const val = Number(value) ? Number(value) : value;
            if (val && field.value !== val) {
              field.onChange(val);
              onChange?.(val);
            }
          };

          return (
            <FormItem>
              {label && (
                <FormLabel>
                  {label}{' '}
                  {required && (
                    <span className="text-[var(--red-text)]">*</span>
                  )}
                </FormLabel>
              )}
              <div>
                <FormControl>
                  <Select
                    value={`${field.value || ''}`}
                    onValueChange={handleChange}
                    disabled={disabled}
                  >
                    <SelectTrigger
                      ref={field.ref}
                      variant={hasError ? 'failure' : 'default'}
                      className={cn(className)}
                    >
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>

                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem
                          key={String(option.value)}
                          value={String(option.value)}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          );
        }}
      />
    )
  );
};
