import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib';
import { dayjs } from '../../lib/day';
import { Button } from '../button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Calendar } from './calendar';

/**
 * DatePicker - Simple date picker composed from Button, Popover, and Calendar.
 * Maintains its own local date state and displays formatted value.
 * @returns {JSX.Element} The rendered DatePicker component.
 * @component
 */
export function DatePicker() {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date | string | undefined>(new Date());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'tertiary'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            dayjs(date).format('DD-MM-YYYY')
          ) : (
            <span>{t('Pick a date')}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(value) => setDate(value)}
        />
      </PopoverContent>
    </Popover>
  );
}
