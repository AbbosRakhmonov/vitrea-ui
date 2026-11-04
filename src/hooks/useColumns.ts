import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { useCallback, useEffect, useMemo } from 'react';
import { useColumnsStore } from '../stores';
import type { ColumnType } from '../types';

/**
 * Props for the useColumns hook.
 * @template TData - The type of data associated with the columns.
 */
export interface UseColumnsProps<TData> {
  /** Unique key to identify the table for persisting column state. */
  key: string;
  /** Array of column definitions. */
  columns: ColumnType<TData>[];
}

/**
 * useColumns manages visibility of table columns using a persisted store.
 * Returns formatted columns and helpers to toggle/reset visibility.
 *
 * @template TData - Row data type.
 * @param key - Unique key for storing visibility per table.
 * @param columns - Original column definitions.
 * @returns {Object} Column management object
 * @returns {ColumnType<TData>[]} formattedColumns - Filtered columns with visibility applied from store
 * @returns {(column: ColumnType<TData>, value: boolean) => void} handleColumnsChange - Function to toggle column visibility
 * @returns {() => void} resetColumns - Function to reset all columns to their default visibility
 */
export const useColumns = <TData>({
  key,
  columns = [],
}: UseColumnsProps<TData>) => {
  const { storedColumns, setColumns } = useColumnsStore();

  useEffect(() => {
    if (isEmpty(get(storedColumns, key)) && !isEmpty(columns)) {
      const columnsObj = {};
      columns.forEach((column) => {
        Object.assign(columnsObj, { [column.key]: !!column.hidden });
      });
      setColumns({
        ...storedColumns,
        [key]: columnsObj,
      });
    }
  }, [key, columns, storedColumns, setColumns]);

  const formattedColumns = useMemo(() => {
    const columnsObj = get(storedColumns, key, {});

    return columns
      .filter((column) => column.type !== 'action')
      .map((column) => {
        const { hidden, ...rest } = column;
        return {
          ...rest,
          hidden: get(columnsObj, column.key, !!hidden),
        };
      });
  }, [key, storedColumns, columns]);

  const handleColumnsChange = useCallback(
    (column: ColumnType<TData>, value: boolean) => {
      const columnsObj = get(storedColumns, key, {});
      Object.assign(columnsObj, { [column.key]: value });

      setColumns({
        ...storedColumns,
        [key]: columnsObj,
      });
    },
    [key, setColumns, storedColumns]
  );

  const resetColumns = useCallback(() => {
    const columnsObj: Record<string, boolean> = {};
    columns.forEach((column) => {
      Object.assign(columnsObj, { [column.key]: !!column.hidden });
    });

    setColumns({
      ...storedColumns,
      [key]: columnsObj,
    });
  }, [key, setColumns, storedColumns, columns]);

  return {
    formattedColumns,
    handleColumnsChange,
    resetColumns,
  };
};
