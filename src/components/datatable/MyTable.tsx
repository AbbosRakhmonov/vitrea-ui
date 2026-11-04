import get from 'lodash.get';
import {
  ArrowDownWideNarrow,
  ArrowUpDown,
  ArrowUpWideNarrow,
} from 'lucide-react';
import { type ComponentProps, useEffect } from 'react';
import { SortOrder } from '../../enums';
import { useDataTable, useSortable, type UseSortableProps } from '../../hooks';
import { cn } from '../../lib';
import type { ColumnType } from '../../types';
import { Checkbox } from '../../ui/form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Empty } from '../empty';
import { DEFAULT_LIMIT } from '../pagination/MyLimitSelect';

/**
 * Props for the MyTable component.
 * @template TData - The type of data in the table.
 */
export interface MyTableProps<TData> extends ComponentProps<'table'> {
  /** Array of data rows to display. */
  rows?: TData[];
  /** Column definitions. */
  columns: ColumnType<TData>[];
  /** Callback when a row is clicked. */
  onRowClick?: (row: TData) => void;
  /** Whether to show row numbers. */
  hasNumbers?: boolean;
  /** Whether to show selection checkboxes. */
  hasCheckbox?: boolean;
  /** Unique key for each row. */
  rowKey: keyof TData;
  /** Current table parameters (page, limit, sort). */
  params?: Record<string, unknown>;
  /** Total number of items (optional, often used with pagination context). */
  total?: number;
  /** Array of currently selected item keys. */
  selectedItems?: TData[keyof TData][];
  /** Callback when selected items change. */
  onSelectedItemsChange?: (selectedItems?: TData[keyof TData][]) => void;
  /** Callback when sort order changes. */
  onSortOrderChange?: (
    params: Omit<UseSortableProps<TData>, 'onSortOrderChange'>
  ) => void;
  /** Whether the header should stick to the top. */
  isStickyHeader?: true;
}

/**
 * MyTable renders a generic data table with optional numbering, selection checkboxes,
 * sortable columns and sticky header. It is a presentational component and delegates
 * sorting/selection state via hooks and callbacks.
 *
 * @template TData - The row data type.
 * @param rows - Array of data rows.
 * @param columns - Column definitions.
 * @param onRowClick - Callback when a row is clicked.
 * @param rowKey - Unique key for each row.
 * @param params - Current table parameters.
 * @param hasNumbers - Whether to show row numbers.
 * @param hasCheckbox - Whether to show selection checkboxes.
 * @param selectedItems - Array of currently selected item keys.
 * @param onSelectedItemsChange - Callback when selected items change.
 * @param onSortOrderChange - Callback when sort order changes.
 * @param isStickyHeader - Whether the header should stick to the top.
 * @param className - Additional CSS classes.
 * @param props - Component props.
 * @returns {JSX.Element} React element containing the table.
 */
export const MyTable = <TData,>({
  rows = [],
  columns,
  onRowClick,
  rowKey,
  params = {
    page: 1,
    limit: DEFAULT_LIMIT,
  },
  hasNumbers = false,
  hasCheckbox = false,
  selectedItems,
  onSelectedItemsChange,
  onSortOrderChange,
  isStickyHeader,
  className,
  ...props
}: MyTableProps<TData>) => {
  const { sortObject, handleSort } = useSortable<TData>({
    sortField: params?.sortField as keyof TData | undefined,
    sortOrder: params?.sortOrder as SortOrder | undefined,
    onSortOrderChange,
  });
  const {
    selectedRows,
    isRowSelected,
    isAllRowsSelected,
    handleSelectAllRows,
    handleSelectRow,
  } = useDataTable<TData>({ rows, defaultSelectedRows: selectedItems });

  useEffect(() => {
    onSelectedItemsChange?.(selectedRows);
  }, [selectedRows, onSelectedItemsChange]);

  return (
    <Table {...props}>
      <TableHeader
        className={cn('bg-bg', isStickyHeader && 'sticky top-0 z-1')}
      >
        <TableRow>
          {hasCheckbox && (
            <TableHead className={'w-12 p-3'}>
              <Checkbox
                className={'mt-1'}
                checked={isAllRowsSelected(rowKey)}
                onCheckedChange={(value) =>
                  handleSelectAllRows(rowKey, !!value)
                }
                aria-label="Select all"
              />
            </TableHead>
          )}
          {hasNumbers && <TableHead className={'w-12 p-2'}>#</TableHead>}
          {columns
            .filter((column) => !column.hidden)
            .map((column) => (
              <TableHead
                key={column.key}
                style={column.styles}
                className={cn('p-2', column.sortable && 'cursor-pointer')}
                onClick={() => column.sortable && handleSort(column.dataIndex)}
              >
                <div className={'flex items-center gap-2'}>
                  {column.name}{' '}
                  {column.sortable &&
                    (sortObject?.sortField === column.key ? (
                      <>
                        {sortObject?.sortOrder === SortOrder.DESC && (
                          <ArrowDownWideNarrow size={15} />
                        )}
                        {sortObject?.sortOrder === SortOrder.ASC && (
                          <ArrowUpWideNarrow size={15} />
                        )}
                      </>
                    ) : (
                      <ArrowUpDown size={15} />
                    ))}
                </div>
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody className={'[&>tr:nth-child(even)]:bg-bg-secondary'}>
        {rows.length ? (
          rows.map((row, index) => (
            <TableRow
              key={`${row[rowKey]}`}
              onClick={() => onRowClick?.(row)}
              className={cn(onRowClick && 'cursor-pointer')}
              data-state={isRowSelected(row[rowKey]) && 'selected'}
            >
              {hasCheckbox && (
                <TableCell
                  className={'w-12 p-3'}
                  onClick={(evt) => evt.stopPropagation()}
                >
                  <Checkbox
                    className={'mt-1'}
                    checked={isRowSelected(row[rowKey])}
                    onCheckedChange={(value) =>
                      handleSelectRow(row[rowKey], !!value)
                    }
                    aria-label="Select row"
                  />
                </TableCell>
              )}
              {hasNumbers && (
                <TableCell className={'w-12 p-2'}>
                  {((params.page as number) - 1) *
                    ((params.limit || DEFAULT_LIMIT) as number) +
                    index +
                    1}
                </TableCell>
              )}
              {columns
                .filter((column) => !column.hidden)
                .map((column) => (
                  <TableCell
                    className={'text-body-xs-medium max-w-xs p-2'}
                    style={column.styles}
                    key={`${index}-${column.key}`}
                  >
                    {column.render
                      ? column.render(get(row, column.dataIndex), row)
                      : get(row, column.dataIndex, '')}
                  </TableCell>
                ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={
                hasNumbers
                  ? hasCheckbox
                    ? columns.length + 2
                    : columns.length + 1
                  : columns.length
              }
            >
              <Empty />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
