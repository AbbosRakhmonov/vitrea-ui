import type { CheckedState } from '@radix-ui/react-checkbox';
import { useCallback, useState } from 'react';

/**
 * Props for the useDataTable hook.
 * @template TData - The type of the data items.
 */
export interface UseDataTableProps<TData> {
  /** Array of data rows. */
  rows?: TData[];
  /** Array of initially selected row keys. */
  defaultSelectedRows?: TData[keyof TData][];
}

/**
 * useDataTable manages row selection state for data tables.
 * Provides helpers to select all on current page, select one, and query selection.
 *
 * @template TData - Row data type.
 * @param rows - Current rows rendered on the page.
 * @param defaultSelectedRows - Pre-selected row keys.
 * @returns {Object} Row selection state and handlers
 * @returns {TData[keyof TData][] | undefined} selectedRows - Array of selected row keys
 * @returns {(key: TData[keyof TData]) => boolean} isRowSelected - Check if a specific row is selected
 * @returns {(rowKey: keyof TData) => CheckedState} isAllRowsSelected - Check selection state of all rows on current page
 * @returns {(rowKey: keyof TData, checked: boolean) => void} handleSelectAllRows - Toggle selection of all rows on current page
 * @returns {(key: TData[keyof TData], checked: boolean) => void} handleSelectRow - Toggle selection of a specific row
 */
export const useDataTable = <TData>({
  rows = [],
  defaultSelectedRows,
}: UseDataTableProps<TData>) => {
  const [selectedRows, setSelectedRows] = useState<
    TData[keyof TData][] | undefined
  >(defaultSelectedRows);

  const handleSelectAllRows = useCallback(
    (rowKey: keyof TData, checked: boolean) => {
      setSelectedRows((oldSelectedRows) => {
        const currentPageRowKeys = rows.map((item) => item[rowKey]) || [];
        const otherPagesSelected =
          oldSelectedRows?.filter((key) => !currentPageRowKeys.includes(key)) ||
          [];

        if (checked) {
          return [...otherPagesSelected, ...currentPageRowKeys];
        } else {
          return otherPagesSelected;
        }
      });
    },
    [rows]
  );

  const handleSelectRow = useCallback(
    (key: TData[keyof TData], checked: boolean) => {
      setSelectedRows((oldSelectedRows) => {
        const oldRows = oldSelectedRows || [];
        if (checked) {
          return [...oldRows, key];
        } else {
          return oldRows.filter((rowKey) => rowKey !== key);
        }
      });
    },
    []
  );

  const isRowSelected = useCallback(
    (key: TData[keyof TData]) => {
      return !!selectedRows?.includes(key);
    },
    [selectedRows]
  );

  const isAllRowsSelected = useCallback(
    (rowKey: keyof TData): CheckedState => {
      const currentPageRowKeys = rows.map((item) => item[rowKey]) || [];
      let selectedRowsCountInPage = 0;
      for (const key of currentPageRowKeys) {
        if (selectedRows?.includes(key)) {
          selectedRowsCountInPage++;
        }
      }
      return currentPageRowKeys.length === selectedRowsCountInPage
        ? true
        : selectedRowsCountInPage
          ? 'indeterminate'
          : false;
    },
    [selectedRows, rows]
  );

  return {
    selectedRows,
    isRowSelected,
    isAllRowsSelected,
    handleSelectAllRows,
    handleSelectRow,
  };
};
