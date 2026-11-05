import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import {
  type ButtonHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  DayButton,
  DayPicker,
  type PropsBase,
  type PropsSingle,
  Weekday,
} from 'react-day-picker';
import { twMerge } from 'tailwind-merge';
import { Button, buttonVariants } from '../button';

import { useTranslation } from 'react-i18next';
import { cn } from '../../lib';
import { dayjs } from '../../lib/day';

// Supported language codes mapped to BCP 47 tags the browser's locale
// data understands.
const INTL_LOCALE: Record<string, string> = {
  cyr: 'uz-Cyrl',
  uz: 'uz-Latn',
  ru: 'ru',
  en: 'en',
};

/**
 * A month or weekday name in the interface language. Taken from Intl rather
 * than translation keys: the calendar passed "Oct" and "Su" to t(), no such
 * keys existed, and the names stayed English in every language.
 */
const calendarName = (
  date: Date,
  language: string,
  options: Intl.DateTimeFormatOptions
) => {
  const name = new Intl.DateTimeFormat(
    INTL_LOCALE[language] ?? language,
    options
  ).format(date);
  return name.charAt(0).toLocaleUpperCase() + name.slice(1);
};

/**
 * Default date format string used by the Calendar component with dayjs.
 */
export const DATE = 'DD.MM.YYYY';

/**
 * Props for the Calendar component.
 * Extends react-day-picker base props in single selection mode with convenience props.
 *
 * Notes:
 * - When `format` is provided, the component accepts a `selected` value as a string in that format and emits a string to `onSelect`.
 * - Without `format`, `selected` and `onSelect` use Date values.
 * - `selectedFromDate` and `selectedToDate` are used only for visual range highlighting (they do not change selection mode).
 *
 * @property {Date} [selectedFromDate] - Start of the visually highlighted range (inclusive).
 * @property {Date} [selectedToDate] - End of the visually highlighted range (inclusive).
 * @property {Date|string} [selected] - Currently selected date. If a string, parsed/validated with `format`.
 * @property {(date: Date|string|null|undefined) => void} [onSelect] - Invoked on date selection; string when `format` is set.
 * @property {string} [format] - dayjs format string used to parse and format values.
 */
export type CalendarProps = Omit<
  PropsBase & PropsSingle,
  'selected' | 'onSelect'
> & {
  selectedFromDate?: Date;
  selectedToDate?: Date;
  selected?: Date | string;
  onSelect?: (date: CalendarProps['selected']) => void;
  format?: string;
};

/**
 * Props for the internal MonthCaption control used by Calendar.
 * @internal
 */
export interface MonthCaptionProps {
  calendarMonth: { date: Date };
  setMonth: (date: Date) => void;
}

/**
 * MonthCaption renders month and year controls allowing quick month/year selection.
 * Used internally by Calendar.
 */
const MonthCaption = ({ calendarMonth, setMonth }: MonthCaptionProps) => {
  const { t, i18n } = useTranslation();
  const currentDate = dayjs(calendarMonth.date);
  const [isMonthSelect, setIsMonthSelect] = useState(false);
  const [isYearSelect, setIsYearSelect] = useState(false);
  const [yearItemsLimit] = useState(20);
  const [yearPosition, setYearPosition] = useState(0);
  const handleMonthChange = useCallback(
    (month: string) => {
      setIsMonthSelect(false);
      setMonth(dayjs(currentDate).month(parseInt(month)).toDate());
    },
    [currentDate, setMonth]
  );

  const handleYearChange = useCallback(
    (year: string) => {
      setIsYearSelect(false);
      setMonth(dayjs(currentDate).year(parseInt(year)).toDate());
    },
    [currentDate, setMonth]
  );

  return (
    <div className={'z-10 mx-auto flex justify-center gap-1'}>
      <Button
        size={'xs'}
        variant="tinted"
        className={'max-h-6 max-w-[60px]'}
        onClick={() => setIsMonthSelect(true)}
      >
        {calendarName(currentDate.toDate(), i18n.language, { month: 'short' })}
      </Button>
      {isMonthSelect && (
        <div
          className={cn(
            'absolute -inset-1 z-20 flex flex-col gap-2 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] p-2',
            'items-center'
          )}
        >
          <div className={'flex items-center justify-between gap-2'}>
            <span className="text-[13px] font-semibold">{t('Month')}</span>
          </div>
          <div className={'grid grid-cols-3 gap-2'}>
            {Array.from({ length: 12 }, (_, i) => (
              <Button
                onClick={() => handleMonthChange(i.toString())}
                key={i}
                size={'sm'}
                variant="tinted"
                className={cn(
                  i === currentDate.month() && '!bg-[var(--accent)] !text-white'
                )}
              >
                {calendarName(dayjs().month(i).toDate(), i18n.language, {
                  month: 'long',
                })}
              </Button>
            ))}
          </div>
        </div>
      )}
      <Button
        size={'xs'}
        variant="tinted"
        className={'max-h-6 max-w-[60px]'}
        onClick={() => setIsYearSelect(true)}
      >
        {currentDate.format('YYYY')}
      </Button>
      {isYearSelect && (
        <div
          className={
            'absolute -inset-1 z-20 flex flex-col gap-2 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] p-2'
          }
        >
          <div className={'flex items-center justify-between gap-2'}>
            <Button
              size={'xs'}
              variant="tinted"
              aria-label="Previous years"
              className="size-7 p-0"
              onClick={() => setYearPosition(yearPosition - 1)}
            >
              <RiArrowLeftSLine />
            </Button>
            <span className="text-[13px] font-semibold">{t('Year')}</span>
            <Button
              size={'xs'}
              variant="tinted"
              aria-label="Next years"
              className="size-7 p-0"
              onClick={() => setYearPosition(yearPosition + 1)}
            >
              <RiArrowRightSLine />
            </Button>
          </div>
          <div className={'grid w-full grid-cols-4 gap-2'}>
            {Array.from({ length: yearItemsLimit }, (_, i) => {
              const year =
                Math.floor(currentDate.year() / yearItemsLimit) *
                  yearItemsLimit +
                yearPosition * yearItemsLimit +
                i;
              return (
                <Button
                  onClick={() => handleYearChange(year.toString())}
                  key={i}
                  size={'xs'}
                  variant="tinted"
                  className={cn(
                    year === currentDate.year() &&
                      '!bg-[var(--accent)] !text-white'
                  )}
                >
                  {dayjs().year(year).format('YYYY')}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Calendar component built on react-day-picker with datagaze styles and helpers.
 *
 * Features:
 * - Single date selection mode (internally sets mode="single").
 * - Optional formatted string I/O via `format` (uses dayjs).
 * - Visual highlighting of a range via `selectedFromDate` and `selectedToDate`.
 * - Custom month/year caption with quick selection.
 *
 * Accessibility:
 * - Inherits keyboard navigation and ARIA from react-day-picker.
 *
 * Styling:
 * - Tailwind classes merged via `twMerge` and `cn`.
 * - You may override parts via the `className` and `classNames` props.
 *
 * @example
 * // Date values
 * <Calendar selected={new Date()} onSelect={(d) => console.log(d)} />
 *
 * @example
 * // String values with format
 * <Calendar
 *   format={DATE}
 *   selected={dayjs().format(DATE)}
 *   onSelect={(value) => console.log('selected', value)}
 * />
 *
 * @example
 * // Visual range highlight
 * <Calendar selectedFromDate={new Date(2025,0,1)} selectedToDate={new Date(2025,0,15)} />
 *
 * @param className
 * @param classNames
 * @param showOutsideDays
 * @param selectedToDate
 * @param selectedFromDate
 * @param format
 * @param {CalendarProps} props - Calendar props.
 * @returns {JSX.Element}
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  selectedToDate,
  selectedFromDate,
  format,
  ...props
}: CalendarProps) {
  const { t, i18n } = useTranslation();
  const [month, setMonth] = useState<Date>(dayjs().startOf('month').toDate());

  // Memoized weekday component
  const MemoizedWeekday = useCallback(
    (props: Parameters<typeof Weekday>[0]) => (
      <Weekday
        {...props}
        // Weekday names are a quiet header, not the loudest text in the
        // grid: in the black weight the three-letter names ran together.
        className={'text-[11px] font-medium text-[var(--label-2)]'}
      >
        {props.children}
      </Weekday>
    ),
    [t]
  );

  const MemoizedMonthCaption = useCallback(
    (captionProps: { calendarMonth: { date: Date } }) => (
      <MonthCaption
        calendarMonth={captionProps.calendarMonth}
        setMonth={setMonth}
      />
    ),
    [] // Fixed dependency array
  );

  // Memoized DayButton component
  const MemoizedDayButton = useCallback(
    (dayButtonProps: Parameters<typeof DayButton>[0]) => {
      const { day, modifiers, ...rest } = dayButtonProps;
      return (
        <DayButton
          day={day}
          modifiers={modifiers}
          {...rest}
          className={twMerge(
            'size-7 cursor-pointer rounded-sm',
            (modifiers.today ||
              (selectedFromDate &&
                selectedFromDate <= day.date &&
                selectedToDate &&
                selectedToDate >= day.date)) &&
              'bg-item-tertiary text-item-primary',
            modifiers.selected &&
              'bg-item-primary dark:text-primary text-white',
            // Days from the neighbouring months are context, not choices.
            modifiers.outside && 'text-[var(--label-3)]',
            modifiers.disabled && 'pointer-events-none opacity-50'
          )}
        />
      );
    },
    [selectedFromDate, selectedToDate]
  );

  // Memoized navigation handlers
  const handlePrevMonth = useCallback(
    () => setMonth((prev) => dayjs(prev).subtract(1, 'M').toDate()),
    []
  );

  const handleNextMonth = useCallback(
    () => setMonth((prev) => dayjs(prev).add(1, 'M').toDate()),
    []
  );

  // Memoized navigation buttons
  const MemoizedPrevButton = useCallback(
    ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
      <Button
        variant={'ghost'}
        className={cn('size-6', className)}
        {...props}
        onClick={handlePrevMonth}
      >
        <RiArrowLeftSLine />
      </Button>
    ),
    [handlePrevMonth]
  );

  const MemoizedNextButton = useCallback(
    ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
      <Button
        variant={'ghost'}
        className={cn('size-6', className)}
        {...props}
        onClick={handleNextMonth}
      >
        <RiArrowRightSLine />
      </Button>
    ),
    [handleNextMonth]
  );

  const memoizedComponents = useMemo(
    () => ({
      Weekday: MemoizedWeekday,
      DayButton: MemoizedDayButton,
      MonthCaption: MemoizedMonthCaption,
      NextMonthButton: MemoizedNextButton,
      PreviousMonthButton: MemoizedPrevButton,
    }),
    [
      MemoizedWeekday,
      MemoizedDayButton,
      MemoizedMonthCaption,
      MemoizedNextButton,
      MemoizedPrevButton,
    ]
  );

  useEffect(() => {
    const selected = props.selected;
    if (selected) {
      if (!format) {
        setMonth(dayjs(selected).startOf('month').toDate());
      } else {
        setMonth(dayjs(selected, format).startOf('month').toDate());
      }
    } else {
      setMonth(dayjs().startOf('month').toDate());
    }
  }, [props.selected, format]);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      formatters={{
        formatWeekdayName: (date) =>
          calendarName(date, i18n.language, { weekday: 'short' }),
      }}
      className={cn('pointer-events-auto relative p-3', className)}
      classNames={{
        years_dropdown: 'flex',
        months: 'flex relative gap-2',
        month: 'flex flex-col gap-4 text-center',
        caption: 'flex justify-center pt-1 relative items-center w-full',
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center gap-1 w-full absolute justify-between border-b pb-2',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-x-1',
        head_row: 'flex',
        head_cell:
          'text-neutral-500 rounded-md w-8 font-normal text-[0.8rem] dark:text-neutral-400 ',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-neutral-100 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected])]:bg-neutral-800'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'table-cell size-8 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_start:
          'day-range-start aria-selected:bg-neutral-900 aria-selected:text-neutral-50 dark:aria-selected:bg-neutral-50 dark:aria-selected:text-neutral-900',
        day_range_end:
          'day-range-end aria-selected:bg-neutral-900 aria-selected:text-neutral-50 dark:aria-selected:bg-neutral-50 dark:aria-selected:text-neutral-900',
        day_selected:
          'bg-neutral-900 text-neutral-50 hover:bg-neutral-900 hover:text-neutral-50 focus:bg-neutral-900 focus:text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 dark:focus:bg-neutral-50 dark:focus:text-neutral-900',
        day_today:
          'bg-neutral-100 text-red-900 dark:bg-neutral-800 dark:text-neutral-50',
        day_outside:
          'day-outside text-neutral-500 aria-selected:text-neutral-500 dark:text-neutral-400 dark:aria-selected:text-neutral-400',
        day_disabled: 'text-neutral-500 opacity-50 dark:text-neutral-400',
        day_range_middle:
          'aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={memoizedComponents}
      // The week starts on Monday (ISO 8601, and uz, ru and en-GB usage); a
      // caller can still override it.
      weekStartsOn={1}
      {...props}
      mode={'single'}
      onSelect={(value) => {
        if (value && props.onSelect) {
          if (format) {
            props.onSelect(dayjs(value).format(format));
          } else {
            props.onSelect(value);
          }
        }
      }}
      selected={dayjs(props.selected, format).toDate()}
      month={month}
    />
  );
}

/**
 * Exported Calendar component.
 */
export { Calendar };
