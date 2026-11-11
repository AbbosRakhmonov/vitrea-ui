import get from 'lodash.get';
import { Calendar1 } from 'lucide-react';
import type { ReactNode } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { cn, dayjs } from '../../lib';
import {
  Calendar,
  type CalendarProps,
  DATE,
  TimePicker,
} from '../../ui/calendar';
import {
  FormControl,
  FormDescription,
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
      /**
       * Format of the field VALUE. When set, the field holds (and receives)
       * a string in this dayjs format - e.g. `"DD-MM-YYYY"` for a value the
       * API takes as text. Without it the value is a `Date`.
       */
      valueFormat?: string;
      /**
       * Days that cannot be picked (a react-day-picker matcher: a date, a
       * range, `{ before }` / `{ after }`, a function, or an array of those).
       * `disabled` is taken by the field itself, hence the separate name.
       */
      disabledDates?: CalendarProps['disabled'];
      /** Hint shown under the field. */
      helperText?: ReactNode;
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
 * It needs both `control` and `name`; without them it renders nothing.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the date picker.
 * @param required - Whether the field is required.
 * @param rules - The `react-hook-form` validation rules.
 * @param format - The date format for display.
 * @param valueFormat - Format of the field value; when set the value is a string, otherwise a Date.
 * @param disabledDates - Days that cannot be picked (react-day-picker matcher).
 * @param helperText - Hint shown under the field.
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
  valueFormat,
  disabledDates,
  helperText,
  floatingError,
  placeholder,
  disabled,
  register,
  className,
  showTime,
  inputProps,
  ...props
}: MyDatePickerProps<TFieldValues>) => {
  const { t } = useTranslation();

  /** The field value as dayjs: a string is read with `valueFormat`. */
  const parse = (value: unknown) =>
    valueFormat && typeof value === 'string'
      ? dayjs(value, valueFormat)
      : dayjs(value as Date | string);

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
                      placeholder={placeholder || t('Pick a date')}
                      value={
                        field.value && parse(field.value).isValid()
                          ? parse(field.value).format(format)
                          : ''
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
                    format={valueFormat}
                    disabled={disabledDates}
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                  {showTime && (
                    <div className={'px-4 pb-3'}>
                      <TimePicker
                        value={parse(field.value).format('HH:mm')}
                        onChange={(time) => {
                          const [hour, minute] = time.split(':');
                          const next = parse(field.value)
                            .set('hour', Number(hour))
                            .set('minute', Number(minute));
                          field.onChange(
                            valueFormat
                              ? next.format(valueFormat)
                              : next.toDate()
                          );
                        }}
                      />
                    </div>
                  )}
                </PopoverContent>
              )}
            </Popover>
            {helperText && (
              <FormDescription className="lq-footnote mt-1 text-[var(--label-2)]">
                {helperText}
              </FormDescription>
            )}
          </FormItem>
        )}
      />
    )) ||
    null
  );
};
