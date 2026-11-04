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
} from '../../ui/form';
import { DateRangePicker, type DateRangePickerProps } from '../datepicker';

/**
 * Props for the MyDateRangePicker component.
 * @template TFieldValues - The type of the form values.
 */
export type MyDateRangePickerProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    Omit<DateRangePickerProps, 'required'> & {
      required?: true;
    };

/**
 * MyDateRangePicker renders a date range selector integrated with react-hook-form.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the date range picker.
 * @param required - Whether the field is required.
 * @param rules - The `react-hook-form` validation rules.
 * @param format - The date format for display.
 * @param placeholder - The placeholder text when no date is selected.
 * @param props - DateRangePicker props and form item props.
 * @returns {JSX.Element | null} A date range picker integrated with react-hook-form, or null if name/control are missing
 */
export const MyDateRangePicker = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  required,
  rules,
  placeholder,
  floatingError,
  ...props
}: MyDateRangePickerProps<TFieldValues>) => {
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
                {label} {required && <span className={'text-red-600'}>*</span>}
              </FormLabel>
            )}
            <div>
              <FormControl>
                <DateRangePicker
                  {...props}
                  error={`${get(formState.errors, name, '')}`}
                  selected={field.value}
                  onRangeSelected={field.onChange}
                  placeholder={placeholder}
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
