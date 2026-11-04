import isEmpty from 'lodash.isempty';
import { XIcon } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib';
import { Button, ButtonGroup } from '../../ui/button';
import type { CardProps } from '../../ui/card';
import type { FilterInterface } from './FilterWrapper.tsx';

/**
 * Props for the AppliedFilters component.
 */
export interface AppliedFiltersProps extends CardProps {
  /** Array of filter definitions to render. */
  filters?: FilterInterface[];
  /** Current active parameters/filters. */
  params?: Record<string, unknown>;
  /** Callback fired when filters are applied. */
  onFilter?: (filters: Record<string, unknown>) => void;
}

/**
 * AppliedFilters displays active filter values as removable buttons/tags.
 *
 * @param props.filters - Array of filter definitions to map values to labels.
 * @param props.params - Current active filter parameters.
 * @param props.onFilter - Callback fired when a filter is removed.
 * @param props.className - Additional CSS classes.
 * @returns {JSX.Element | false} A list of active filter buttons or false if no filters are active
 */
export const AppliedFilters = memo(function FilterWrapper({
  filters,
  params,
  onFilter,
  className,
  ...props
}: AppliedFiltersProps) {
  const { t } = useTranslation();

  const filterObject = useMemo(
    () =>
      Object.fromEntries(
        filters?.map((filter) => [
          filter.name,
          Object.fromEntries(
            filter.options?.map(({ label, value }) => [value, label]) || []
          ),
        ]) || []
      ),
    [filters]
  );

  const paramsArr = useMemo(
    () =>
      Object.entries(params || {}).filter(
        ([key, value]) => !!filterObject?.[key] && !isEmpty(value)
      ),
    [filterObject, params]
  );

  return (
    !isEmpty(paramsArr) && (
      <div {...props} className={cn('flex flex-wrap gap-2', className)}>
        {paramsArr.map(([key, value]) =>
          Array.isArray(value) ? (
            <ButtonGroup key={key}>
              {value
                .filter((val) => filterObject?.[key]?.[val] && val)
                .map((val, index) => (
                  <Button
                    size={'sm'}
                    key={index}
                    onClick={() => {
                      onFilter?.({
                        ...params,
                        [key]: value.filter((v) => v !== val),
                      });
                    }}
                  >
                    {t(String(filterObject?.[key]?.[val] || ''))} <XIcon />
                  </Button>
                ))}
            </ButtonGroup>
          ) : (
            <Button
              size={'sm'}
              onClick={() => {
                const paramValues = { ...params };

                delete paramValues[key];
                onFilter?.(paramValues);
              }}
            >
              {t(String(filterObject?.[key]?.[value as string] || ''))}{' '}
              <XIcon />
            </Button>
          )
        )}
      </div>
    )
  );
});
