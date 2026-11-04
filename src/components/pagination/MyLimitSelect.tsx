import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type Option,
} from '../../ui/form';

/** Default number of items per page (50) */
export const DEFAULT_LIMIT = 50;

/** Default number of items per page for card/grid layouts (12) */
export const DEFAULT_ITEMS_LIMIT = 12;

/** Default pagination limit options */
// eslint-disable-next-line react-refresh/only-export-components
export const DEFAULT_OPTIONS: Option[] = [
  {
    value: 10,
    label: '10',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 100,
    label: '100',
  },
];

/**
 * Props for the MyLimitSelect component.
 */
export interface MyLimitSelectProps {
  /** Default limit value. */
  defaultValue?: number;
  /** Select options to show. */
  options?: Option[];
  /** Callback when a new limit is selected. */
  onLimitChange: (limit: string) => void;
}

/**
 * MyLimitSelect lets the user change the number of rows per page.
 *
 * @param defaultValue - Default limit value.
 * @param options - Select options to show.
 * @param onLimitChange - Callback when a new limit is selected.
 */
export const MyLimitSelect = ({
  defaultValue = DEFAULT_LIMIT,
  options = DEFAULT_OPTIONS,
  onLimitChange,
}: MyLimitSelectProps) => {
  const { t } = useTranslation();

  return (
    <div className={'flex items-center gap-3'}>
      <span className={'font-semibold'}>{t('Rows per page')}:</span>
      <Select onValueChange={onLimitChange} value={`${defaultValue}`}>
        <SelectTrigger className="h-8.5 w-17">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option.value} value={`${option.value}`}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
