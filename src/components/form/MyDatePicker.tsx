import get from 'lodash.get';
import { Calendar1 } from 'lucide-react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { cn, dayjs } from '../../lib';
import {
  Calendar,
  type CalendarProps,
  DATE,
  TimePicker,
} from '../../ui/calendar';
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
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';

/**
 * Props for the MyDatePicker component.
 * @template TFieldValues - The type of the form values.
 */
export type MyDatePickerProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    Omit<CalendarProps, 'mode' | 'disabled' | 'required'> & {
      /** Date format string for display. */
      format?: string;
      /** Props passed to the underlying Input component. */
      inputProps?: Omit<InputProps, 'onSelect'>;
      /** Placeholder text when no date is selected. */
      placeholder?: string;
      /** Whether the date picker is disabled. */
      disabled?: boolean;
      /** When true, shows a TimePicker below the calendar for time selection. */
      showTime?: true;

      required?: true;
    };

/**
 * MyDatePicker shows a calendar popover to pick a single date, integrated with react-hook-form.
 * Can also be used standalone when no control/name are provided.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the date picker.
 * @param required - Whether the field is required.
 * @param rules - The `react-hook-form` validation rules.
 * @param format - The date format for display.
 * @param placeholder - The placeholder text when no date selected.
 * @param floatingError - Whether to show the error message in a floating container.
 * @param register - The `react-hook-form` register function.
 * @param disabled - Whether the date picker is disabled.
 * @param className - Additional CSS classes.
 * @param showTime - When true, shows a TimePicker below the calendar for time selection.
 * @param inputProps - Props passed to the underlying Input component.
 * @param props - Calendar, button and form item props.
 * @returns {JSX.Element | null} A date picker component integrated with react-hook-form, or null if name/control are missing.
 */
export const MyDatePicker = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  required,
  rules,
  format = DATE,
  floatingError,
  placeholder,
  disabled,
  register,
  className,
  showTime,
  inputProps,
  ...props
}: MyDatePickerProps<TFieldValues>) => {
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
            <Popover>
              <PopoverTrigger asChild>
                <div className={'relative'}>
                  <FormControl>
                    <Input
                      {...inputProps}
                      variant={
                        get(formState.errors, `${name}.message`)
                          ? 'failure'
                          : 'default'
                      }
                      disabled={disabled}
                      {...field}
                      readOnly
                      placeholder={placeholder || 'Pick a date'}
                      value={
                        field.value
                          ? dayjs(field.value).format(format)
                          : undefined
                      }
                      className={cn('m-0 pe-8 text-start', className)}
                    />
                  </FormControl>
                  <Calendar1
                    className={cn(
                      'text-secondary absolute top-1/2 right-2 size-5 -translate-y-1/2',
                      disabled && 'pointer-events-none opacity-50'
                    )}
                  />
                  <FormMessage
                    className={cn(floatingError && 'absolute -bottom-5')}
                  />
                </div>
              </PopoverTrigger>
              {!disabled && (
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    {...props}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                  {showTime && (
                    <div className={'px-4 pb-3'}>
                      <TimePicker
                        value={dayjs(field.value as Date).format('HH:mm')}
                        onChange={(time) => {
                          const [hour, minute] = time.split(':');
                          field.onChange(
                            dayjs(field.value)
                              .set('hour', Number(hour))
                              .set('minute', Number(minute))
                              .toDate()
                          );
                        }}
                      />
                    </div>
                  )}
                </PopoverContent>
              )}
            </Popover>
          </FormItem>
        )}
      />
    )) ||
    null
  );
};
