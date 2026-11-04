import type { CSSProperties, ReactNode } from 'react';

/**
 * Defines the structure of a table column.
 *
 * @template TData - The type of data in the table row.
 */
export type ColumnType<TData> = {
  [K in keyof TData]: {
    /** Unique key for the column. */
    key: string;
    /** The key in the data object that this column maps to. */
    dataIndex: K;
    /** The header name of the column. */
    name?: ReactNode;
    /** Custom styles for the column. */
    styles?: CSSProperties;
    /** Array of permissions or roles that have access to this column. */
    access?: string[];
    /** Whether the column is hidden by default. */
    hidden?: boolean;
    /** Whether the column is sortable. */
    sortable?: boolean;
    /** The type of the column, either data or action. */
    type?: 'data' | 'action';
    /** Custom render function for the cell content. */
    render?: (value: TData[K], record: TData) => ReactNode;
    /** Custom render function for export data. */
    renderExport?: (value: TData[K], record: TData) => string;
  };
}[keyof TData];
