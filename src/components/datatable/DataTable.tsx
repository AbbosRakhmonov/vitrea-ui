import { RiArrowDownSLine, RiLayoutColumnLine } from '@remixicon/react';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { RefreshCw } from 'lucide-react';
import { type ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useColumns } from '../../hooks';
import { cn } from '../../lib';
import type { ColumnType } from '../../types';
import { Button } from '../../ui/button';
import {
  type DropdownContainerProps,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown';
import { type ActionInterface, Actions, type ActionsProps } from '../actions';
import {
  ExportData,
  type ExportDataInterface,
  type ExportDataProps,
} from '../export';
import {
  type FilterInterface,
  FilterWrapper,
  type FilterWrapperProps,
  Search,
  type SearchProps,
} from '../filters';
import { AppliedFilters } from '../filters/AppliedFilters';
import { Loader } from '../loader';
import { MyLimitSelect, MyPagination } from '../pagination';
import type { MyPaginationProps } from '../pagination/MyPagination.tsx';
import { MyTable, type MyTableProps } from './MyTable';

/**
 * Minimal pagination wrapper contract used by `DataTable`.
 *
 * Notes
 * - Only `page`, `limit`, and `totalPages` are required. Other fields are optional and
 *   may be provided by your API for convenience.
 * - The actual rows array can be stored in any key, controlled via `dataKey` prop
 *   (defaults to `"docs"`).
 */
export interface PaginationInterface<TData> {
  /** Array of rows for the current page. Used when `dataKey` is set to `"docs"`. */
  docs?: TData[];
  /** Zero-based index of the first item on the current page (if provided by API). */
  offset?: number;
  /** Page size (items per page). */
  limit: number;
  /** Total number of pages available. */
  totalPages: number;
  /** Total number of items across all pages (if available). */
  total?: number;
  /** Current page number (1-based). */
  page: number;
  /** Convenience counter for the first item index on the page (if provided). */
  pagingCounter?: number;
  /** Whether a previous page exists. */
  hasPrevPage?: boolean;
  /** Whether a next page exists. */
  hasNextPage?: boolean;
  /** Previous page number, if available. */
  prevPage?: number;
  /** Next page number, if available. */
  nextPage?: number;
}

/**
 * Props for the DataTable component.
 *
 * @template TData - Row data type.
 * @template TPaginationData - Pagination wrapper type.
 */
export interface DataTableProps<
  TData,
  TPaginationData extends PaginationInterface<TData>,
> extends Omit<MyTableProps<TData>, 'rows'> {
  /** Pagination data source. */
  dataSource?: TPaginationData;
  /** Callback for parameter changes (pagination, sorting, filtering). */
  onParamChange?: (param: Record<string, unknown>) => void;
  /** Whether to enable pagination. */
  hasPagination?: true;
  /** Options for the export data dropdown. */
  exportOptions?: ExportDataInterface[];
  /** Whether to enable search functionality. */
  hasSearch?: true;
  /** Whether the table data is loading. */
  loading?: boolean;
  /** Array of filters to display. */
  filters?: FilterInterface[];
  /** Array of actions to display. */
  actions?: ActionInterface[];
  /** Callback for filter changes. */
  handleFilterChange?: (filters: Record<string, unknown>) => void;
  /** Unique key for the table, used for column persistence. */
  tableKey: string;
  /** The key in dataSource where the data array is located. Defaults to "docs". */
  dataKey?: keyof TPaginationData;
  /** Whether to show the columns visibility dropdown. */
  hasColumnsVisibilityDropdown?: true;
  /** Whether to show the columns visibility dropdown. */
  showAppliedFilters?: boolean;
  /** Callback when columns are updated (e.g., visibility toggled). */
  onColumnsUpdate?: (columns: ColumnType<TData>[]) => void;
  /** Whether the export action is loading. */
  exportLoading?: boolean;
  /** Props for the Actions component. */
  actionProps?: Partial<ActionsProps>;
  /** Props for the FilterWrapper component. */
  filterWrapperProps?: Partial<FilterWrapperProps>;
  /** Props for the ExportData component. */
  exportOptionsProps?: Partial<ExportDataProps>;
  searchProps?: Partial<SearchProps>;
  paginationProps?: Partial<MyPaginationProps>;
  /** Props for the columns visibility dropdown. */
  columnsVisibilityProps?: DropdownContainerProps & {
    title?: ReactNode;
    resetText?: ReactNode;
  };
}

/**
 * DataTable is a composable, high-level table that brings together search, filters,
 * column visibility management, header actions, exporting, and pagination.
 * It renders `MyTable` for rows and, when enabled, shows header controls and a footer with pagination.
 *
 * Generic Types
 * - `TData` — Row data shape (type of each item in the rows array).
 * - `TPaginationData` — Pagination wrapper type containing rows and pagination meta; defaults to
 *   `PaginationInterface<TData>`.
 *
 * Key Behaviors
 * - Emits `onParamChange` when search text, filters, page, limit, or sort order change.
 * - Persists column visibility per `tableKey` via `useColumns` and informs parent with `onColumnsUpdate`.
 * - Renders header controls only when the related feature is enabled/has content.
 *
 * Accessibility
 * - Header controls and dropdowns reuse shared primitives that include keyboard and ARIA support.
 *
 * Internationalization
 * - Text such as "Export", "Customize columns", and "Reset columns" are resolved via `react-i18next`.
 *
 * Usage Examples
 * 1) Minimal paginated table (uses default `dataKey = "docs"`)
 * ```tsx
 * type User = { id: string; name: string };
 * const data = { docs: [{ id: '1', name: 'Ada' }], page: 1, limit: 10, totalPages: 1 };
 *
 * <DataTable<User>
 *   tableKey="users-table"
 *   columns={[{ key: 'name', name: 'Name' }]}
 *   rowKey="id"
 *   dataSource={data}
 *   hasPagination
 * />
 * ```
 *
 * 2) Custom `dataKey` and column visibility persistence
 * ```tsx
 * type Row = { id: number; title: string };
 * const payload = { items: [{ id: 1, title: 'Hello' }], page: 1, limit: 20, totalPages: 1 };
 *
 * <DataTable<Row>
 *   tableKey="articles"
 *   columns={[{ key: 'title', name: 'Title' }]}
 *   rowKey="id"
 *   dataSource={payload}
 *   dataKey="items"
 *   hasColumnsVisibilityDropdown
 * />
 * ```
 *
 * 3) Responding to user interactions via `onParamChange`
 * ```tsx
 * const [params, setParams] = useState({ page: 1, limit: 10 });
 *
 * <DataTable
 *   tableKey="logs"
 *   columns={[{ key: 'message', name: 'Message' }]}
 *   rowKey="id"
 *   params={params}
 *   onParamChange={setParams}
 *   hasSearch
 *   hasPagination
 * />
 * ```
 *
 * Notes and Best Practices
 * - Ensure `rowKey` points to a stable unique field in `TData` to avoid key collisions.
 * - When arrays like `exportOptions`, `filters`, or `actions` are empty, their sections are not rendered.
 * - Sorting emits `{ sortField, sortOrder }` through `onParamChange` when the user toggles a column sort.
 *
 * @template TData - Row data type.
 * @template TPaginationData - Pagination wrapper type.
 * @param dataSource - Paginated data source object.
 * @param columns - Column definitions.
 * @param rowKey - Property name used as a unique row key.
 * @param hasSearch - Whether to display the search input.
 * @param exportOptions - Export menu options.
 * @param hasPagination - Whether to render the pagination footer.
 * @param onParamChange - Emits parameter changes for pagination/sorting/search/filters.
 * @param dataKey - Key within `dataSource` that contains the row array.
 * @param loading - Whether the table data is loading.
 * @param tableKey - Unique key for persisting column visibility state.
 * @param filters - Filter configurations to render.
 * @param actions - Header actions.
 * @param handleFilterChange - Callback executed when filter values change.
 * @param params - Current list parameters.
 * @param exportLoading - Whether the export action is loading.
 * @param onColumnsUpdate - Notifies parent whenever columns state changes.
 * @param hasColumnsVisibilityDropdown - Whether to show columns customize dropdown.
 * @param showAppliedFilters - Whether to show applied filters.
 * @param onSelectedItemsChange - Callback when selected rows change.
 * @param actionProps - Props for the Actions component.
 * @param filterWrapperProps - Props for the FilterWrapper component.
 * @param exportOptionsProps - Props for the ExportData component.
 * @param columnsVisibilityProps - Props for columns visibility dropdown.
 * @param paginationProps - Props for the MyPagination component.
 * @param searchProps - Props for the Search component.
 * @param className - Additional CSS classes.
 * @param props - Additional props passed to MyTable.
 * @returns {JSX.Element} React element that renders a complete data table experience.
 */
export const DataTable = <
  TData,
  TPaginationData extends
    PaginationInterface<TData> = PaginationInterface<TData>,
>({
  dataSource,
  columns,
  rowKey,
  hasSearch,
  exportOptions,
  hasPagination,
  onParamChange,
  dataKey = 'docs',
  loading,
  tableKey,
  filters,
  actions,
  handleFilterChange,
  params,
  exportLoading = false,
  onColumnsUpdate,
  hasColumnsVisibilityDropdown,
  showAppliedFilters = false,
  actionProps,
  filterWrapperProps,
  exportOptionsProps,
  columnsVisibilityProps,
  paginationProps,
  searchProps,
  className,
  ...props
}: DataTableProps<TData, TPaginationData>) => {
  const { t } = useTranslation();
  const { formattedColumns, handleColumnsChange, resetColumns } =
    useColumns<TData>({ key: tableKey, columns });

  useEffect(() => {
    onColumnsUpdate?.(formattedColumns);
  }, [formattedColumns, onColumnsUpdate]);

  return (
    <div
      className={cn(
        'lq-card relative flex grow flex-col overflow-auto',
        className
      )}
    >
      <div className={'flex shrink-0 flex-col gap-4 p-4'}>
        {(hasSearch ||
          (hasColumnsVisibilityDropdown && tableKey) ||
          !isEmpty(exportOptions) ||
          !isEmpty(filters)) && (
          <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <div className={'grow'}>
              {hasSearch && (
                <Search
                  {...searchProps}
                  inputProps={{
                    ...searchProps?.inputProps,
                    className: cn(
                      'h-8 grow',
                      searchProps?.inputProps?.className
                    ),
                  }}
                  className={cn(
                    'max-w-full lg:max-w-80! [&_button]:-top-1',
                    searchProps?.className
                  )}
                  defaultValue={get(params, 'search', '') as string}
                  onSearchChange={(search) =>
                    onParamChange?.({ ...params, search, page: 1 })
                  }
                />
              )}
            </div>
            <div className={'flex items-center justify-end gap-3'}>
              {exportOptions && (
                <ExportData
                  {...exportOptionsProps}
                  options={exportOptions}
                  loading={exportLoading}
                />
              )}
              {hasColumnsVisibilityDropdown && tableKey && (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger
                    asChild
                    className={'grow'}
                    {...columnsVisibilityProps?.triggerProps}
                  >
                    <Button
                      variant="secondary"
                      size={'sm'}
                      className={'ml-auto rounded-lg px-3'}
                    >
                      {columnsVisibilityProps?.title || (
                        <>
                          <RiLayoutColumnLine />{' '}
                          <span className={'hidden md:inline!'}>
                            {t('Customize columns')}
                          </span>
                          <RiArrowDownSLine />
                        </>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    {...columnsVisibilityProps?.contentProps}
                  >
                    <DropdownMenuItem
                      data-testid={'reset-columns-button'}
                      onSelect={(e) => e.preventDefault()}
                      className="capitalize"
                      onClick={resetColumns}
                    >
                      <RefreshCw />{' '}
                      {columnsVisibilityProps?.resetText || t('Reset columns')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {formattedColumns.map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.key}
                          data-testid={column.key}
                          onSelect={(e) => e.preventDefault()}
                          className="capitalize"
                          checked={!column.hidden}
                          onCheckedChange={(value) =>
                            handleColumnsChange(column, !value)
                          }
                        >
                          {column.name}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {actions && <Actions {...actionProps} actions={actions} />}
              {filters && (
                <FilterWrapper
                  {...filterWrapperProps}
                  filters={filters}
                  params={params}
                  onChange={handleFilterChange}
                  onFilter={(filter) => {
                    onParamChange?.({ ...filter, page: 1 });
                    handleFilterChange?.(filter);
                  }}
                />
              )}
            </div>
          </div>
        )}
        {showAppliedFilters && !isEmpty(filters) && (
          <AppliedFilters
            filters={filters}
            params={params}
            onFilter={(filter) => {
              onParamChange?.({ ...filter, page: 1 });
              handleFilterChange?.(filter);
            }}
          />
        )}
      </div>

      <div
        className={cn(
          'flex grow flex-col overflow-auto border-y border-[var(--separator)]'
        )}
      >
        {!loading ? (
          <MyTable<TData>
            {...props}
            params={{
              page: dataSource?.page || 1,
              limit: dataSource?.limit,
              ...params,
            }}
            rows={get(dataSource, dataKey, []) as TData[]}
            rowKey={rowKey}
            columns={formattedColumns}
            onSortOrderChange={({ sortField, sortOrder }) => {
              onParamChange?.({ ...params, sortField, sortOrder });
            }}
          />
        ) : (
          <Loader />
        )}
      </div>
      {hasPagination && (
        <div className="flex shrink-0 flex-wrap items-center justify-center gap-3 p-4 lg:justify-between">
          <div className="text-sm">
            <MyLimitSelect
              onLimitChange={(limit) =>
                onParamChange?.({ ...params, limit, page: 1 })
              }
              defaultValue={dataSource?.limit}
            />
          </div>
          <div className="text-muted-foreground text-sm">
            {t('{{selectedCount}} of {{total}} row(s) selected', {
              selectedCount: props.selectedItems?.length ?? 0,
              total: dataSource?.total || 0,
            })}
          </div>
          <div>
            <MyPagination
              {...paginationProps}
              onPageChange={(page) => onParamChange?.({ ...params, page })}
              currentPage={dataSource?.page}
              totalPages={dataSource?.totalPages}
            />
          </div>
        </div>
      )}
    </div>
  );
};
