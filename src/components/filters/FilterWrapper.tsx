import get from 'lodash.get';
import { ChevronDown, ListFilterIcon, ListFilterPlusIcon } from 'lucide-react';
import { memo, type ReactNode, useCallback, useEffect, useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useFilter } from '../../hooks';
import { Button, type ButtonProps } from '../../ui/button';
import { Form, type Option } from '../../ui/form';
import {
  Popover,
  type PopoverContainerProps,
  PopoverContent,
  PopoverTrigger,
} from '../../ui/popover';
import { MyInput, MySelect } from '../form';

/**
 * Interface representing a filter configuration.
 */
export interface FilterInterface {
  /** Label for the filter field. */
  label?: ReactNode;
  /** Placeholder text for the input/select. */
  placeholder?: string;
  /** Default value for the filter. */
  value?: string | string[];
  /** Name of the filter field (used as key). */
  name: string;
  /** Whether the filter supports multiple values (for select inputs). */
  isMulti?: boolean;
  /** Whether the filter supports searchable inputs (for select inputs). */
  isSearchable?: boolean;
  /** Options for select inputs. */
  options?: Option[];
  access?: string[];
}

/**
 * Props for the FilterWrapper component.
 */
export interface FilterWrapperProps
  extends Omit<ButtonProps, 'title'>,
    PopoverContainerProps {
  /** Array of filter definitions to render. */
  filters: FilterInterface[];
  /** Current active parameters/filters. */
  params?: Record<string, unknown>;
  /** Callback fired when filters are applied. */
  onFilter?: (filters: Record<string, unknown>) => void;
  /** Callback fired when the filter popover is closed/cancelled. */
  onCancel?: () => void;
  /** Callback fired when filter form values change. */
  onChange?: (filters: FieldValues) => void;
  /** Title for the filter button. */
  title?: ReactNode;
  /** Text for the reset button. */
  resetText?: ReactNode;
  /** Text for the apply button. */
  applyText?: ReactNode;
}

/**
 * FilterWrapper shows a popover with a dynamic list of field filters and emits selected filter values.
 *
 * @param props.filters - Array of filter definitions to render.
 * @param props.params - Current params used to detect active filters.
 * @param props.onFilter - Callback fired when user applies filters.
 * @param props.onCancel - Callback fired on cancel.
 * @param props.onChange - Callback fired whenever filter form values change.
 * @returns {JSX.Element} A filter button that opens a popover with filter controls
 */
export const FilterWrapper = memo(function FilterWrapper({
  filters,
  params,
  onFilter,
  onChange,
  onCancel,
  triggerProps,
  contentProps,
  title,
  resetText,
  applyText,
  ...btnProps
}: FilterWrapperProps) {
  const { t } = useTranslation();
  const [isFiltered, setIsFiltered] = useState(false);
  const [open, setOpen] = useState(false);
  const { form } = useFilter({ params });

  const { watch, handleSubmit, control, reset } = form;

  useEffect(() => {
    let hasFilter = false;
    filters.map((filter) => {
      const value = get(params, `${filter.name}`);
      if (Array.isArray(value) ? value.length > 0 : Boolean(value)) {
        hasFilter = true;
      }

      setIsFiltered(hasFilter);
    });
  }, [filters, params]);

  const values = watch();

  useEffect(() => {
    onChange?.(values);
  }, [values, onChange]);

  const handleFilter = useCallback(
    (data = {}) => {
      onFilter?.(data);
      setOpen(false);
    },
    [onFilter]
  );

  const handleReset = useCallback(() => {
    reset();
    if (onFilter) {
      onFilter({
        ...Object.fromEntries(
          filters.map((filter) => [filter.name, undefined])
        ),
      });
    }
    setOpen(false);
  }, [onFilter, reset, filters]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger {...triggerProps} className={'grow'}>
        <Button
          asChild
          size={'sm'}
          variant="secondary"
          className={'ml-auto w-full px-3'}
          {...btnProps}
        >
          <div className={'flex items-center'}>
            {isFiltered ? (
              <ListFilterPlusIcon className={'size-5'} />
            ) : (
              <ListFilterIcon className={'size-5'} />
            )}{' '}
            <span className={'hidden md:inline!'}>{title || t('Filter')}</span>
            <ChevronDown />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent side={'bottom'} align={'end'} {...contentProps}>
        <Form {...form}>
          <form onSubmit={handleSubmit(handleFilter)} className={'space-y-4'}>
            <div className={'h-full shrink space-y-6 p-1'}>
              {filters.map((filter) =>
                filter.options ? (
                  <MySelect
                    key={filter.name}
                    control={control}
                    name={filter.name}
                    isSearchable={Boolean(filter.isSearchable)}
                    placeholder={filter.placeholder}
                    isMulti={filter.isMulti}
                    options={filter.options}
                    label={filter.label}
                  />
                ) : (
                  <MyInput
                    key={filter.name}
                    control={control}
                    placeholder={filter.placeholder}
                    name={filter.name}
                    label={filter.label}
                  />
                )
              )}
            </div>
            <div className={'flex shrink-0 justify-end gap-2'}>
              <Button
                variant={'secondary'}
                type="reset"
                size={'sm'}
                onClick={handleReset}
              >
                {resetText || t('Reset')}
              </Button>
              <Button type="submit" size={'sm'}>
                {applyText || t('Apply')}
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
});
