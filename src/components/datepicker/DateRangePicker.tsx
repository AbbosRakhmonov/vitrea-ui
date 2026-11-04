import { Calendar1, XIcon } from 'lucide-react';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { cn, dayjs } from '../../lib';
import { Button } from '../../ui/button';
import { Calendar, type CalendarProps, DATE } from '../../ui/calendar';
import { Input, type InputProps } from '../../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';

/**
 * Type definition for a date range preset configuration.
 */
export type PresetType = {
  from: Date;
  to: Date;
  /** Label for the preset (e.g., "Last 7 days"). */
  label: ReactNode;
  isActive?: boolean;
};

/**
 * Props for the DateRangePicker component.
 */
export type DateRangePickerProps = Omit<
  CalendarProps,
  'mode' | 'disabled' | 'selected'
> & {
  /** The date format string (e.g., 'YYYY-MM-DD'). */
  format?: string;
  /** Placeholder text when no date is selected. */
  placeholder?: string;
  /** The currently selected date range. */
  selected?: DateRange;
  /** Timezone for date calculations. */
  timezone?: string;
  /** Error message to display (modifies styling). */
  error?: string;
  /** Callback function when a date range is selected. */
  onRangeSelected?: (value?: DateRange) => void;
  inputProps?: InputProps;
  disabled?: boolean;
  defaultPresets?: PresetType[];
};

/**
 * DateRangePicker displays a two-month range picker with helpful presets.
 *
 * @param props.format - Display date format.
 * @param props.selected - Currently selected date range.
 * @param props.timezone - Time zone for date calculations.
 * @param props.onRangeSelected - Callback when a full range is selected.
 * @param props.placeholder - Placeholder when no date selected.
 * @param props.error - Optional error message that adjusts styling.
 * @param props.inputProps - Props passed to the underlying Input component.
 * @param props.disabled - Whether the date range picker is disabled.
 * @param props.defaultPresets - dafault presets list for the picker.
 * @returns A date range picker component.
 */
export const DateRangePicker = ({
  className,
  format = DATE,
  selected,
  timezone,
  onRangeSelected = () => {},
  placeholder,
  defaultPresets,
  disabled,
  error,
  inputProps,
  ...props
}: DateRangePickerProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();

  useEffect(() => {
    setDate(selected);
  }, [selected]);

  const presets: PresetType[] = useMemo(() => {
    const today = dayjs().endOf('day');
    return (
      defaultPresets ?? [
        {
          from: today.startOf('week').toDate(),
          to: today.endOf('week').toDate(),
          label: t('This week'),
        },
        {
          from: today.startOf('month').toDate(),
          to: today.endOf('month').toDate(),
          label: t('This month'),
        },
        {
          from: today.startOf('year').toDate(),
          to: today.endOf('year').toDate(),
          label: t('This year'),
        },
        {
          from: today.subtract(7, 'day').startOf('day').toDate(),
          to: today.toDate(),
          label: t('Last 7 days'),
        },
        {
          from: today.subtract(30, 'day').startOf('day').toDate(),
          to: today.toDate(),
          label: t('Last 30 days'),
        },
        {
          from: today.subtract(3, 'month').startOf('day').toDate(),
          to: today.toDate(),
          label: t('Last 3 months'),
        },
        {
          from: today.subtract(6, 'month').startOf('day').toDate(),
          to: today.toDate(),
          label: t('Last 6 months'),
        },
        {
          from: today.subtract(12, 'month').startOf('day').toDate(),
          to: today.toDate(),
          label: t('Last 12 months'),
        },
      ]
    ).map((item) => ({
      ...item,
      // By day: a preset ends at the end of today while the selection
      // carries whatever time it was made at, so comparing instants never
      // matched and no preset ever showed as the active one.
      isActive:
        !!selected?.from &&
        !!selected?.to &&
        dayjs(selected.from).isSame(item.from, 'day') &&
        dayjs(selected.to).isSame(item.to, 'day'),
    }));
  }, [t, selected, defaultPresets]);

  const handleRangeSelect = (range: DateRange) => {
    setDate(range);
    if (range?.from && range?.to) {
      onRangeSelected(range);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={'m-0!'} disabled={disabled}>
        <div className={'relative'}>
          <Input
            variant={error ? 'failure' : 'default'}
            {...inputProps}
            readOnly
            value={
              date?.from
                ? date.to
                  ? `${dayjs(date.from).format(format)}-${dayjs(date.to).format(format)}`
                  : dayjs(date.from).format(format)
                : ''
            }
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              // The icons below sit on top of the field, so the text has to
              // stop before them. Clearing both is 56px; with only the
              // calendar showing, 32px. className stays last so a caller can
              // still override it.
              date ? 'pe-14' : 'pe-8',
              className
            )}
          />
          {date && (
            <XIcon
              onClick={() => {
                setDate(undefined);
                onRangeSelected?.(undefined);
              }}
              className={cn(
                'text-secondary absolute top-1/2 right-8 size-4 -translate-y-1/2 cursor-pointer',
                disabled && 'pointer-events-none opacity-50'
              )}
            />
          )}
          <Calendar1
            className={cn(
              'text-secondary absolute top-1/2 right-2 size-5 -translate-y-1/2',
              disabled && 'pointer-events-none opacity-50'
            )}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto p-0" align="end" side={'bottom'}>
        <div
          className={
            'border-border-alpha-light flex flex-col space-y-1 border-e p-2'
          }
        >
          {presets.map((preset, index) => (
            <Button
              size={'xs'}
              key={index}
              variant={preset.isActive ? 'default' : 'ghost'}
              className={'justify-start'}
              onClick={() => handleRangeSelect(preset)}
            >
              {preset.label}
            </Button>
          ))}
        </div>
        <Calendar
          {...props}
          className={'border-border-alpha-light border-e'}
          mode="single"
          endMonth={date?.to}
          selected={date?.from}
          selectedToDate={date?.to}
          selectedFromDate={date?.from}
          timeZone={timezone}
          disabled={
            date?.to
              ? {
                  after: date.to,
                }
              : undefined
          }
          onSelect={(from) => {
            setDate({ ...date, from: from as Date | undefined });
          }}
        />
        <Calendar
          {...props}
          mode="single"
          startMonth={date?.from}
          selected={date?.to}
          timeZone={timezone}
          disabled={
            date?.from
              ? {
                  before: date.from,
                }
              : undefined
          }
          selectedToDate={date?.to}
          selectedFromDate={date?.from}
          onSelect={(to) => {
            if (date) {
              handleRangeSelect({ ...date, to: to as Date | undefined });
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
