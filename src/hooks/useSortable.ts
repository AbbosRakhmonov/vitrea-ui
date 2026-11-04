import { useCallback, useEffect, useState } from 'react';
import { SortOrder } from '../enums';

export interface UseSortableProps<TData> {
  /** Current field being sorted by */
  sortField?: keyof TData;
  /** Current sort order (ASC or DESC) */
  sortOrder?: SortOrder;
  /** Callback triggered when sort state changes */
  onSortOrderChange?: (
    newSortOrder: Omit<UseSortableProps<TData>, 'onSortOrderChange'>
  ) => void;
}

/**
 * useSortable manages sort field and order for tables and lists.
 * Cycles through ASC -> DESC -> none for a given field and emits changes.
 *
 * @template TData - Row data type.
 * @param sortField - Current sorted field.
 * @param sortOrder - Current sort order.
 * @param onSortOrderChange - Callback with new sort state.
 * @returns {Object} Sort management object
 * @returns {Object} sortObject - Current sort state with sortField and sortOrder
 * @returns {(field: keyof TData) => void} handleSort - Function to trigger sort on a field
 */
export const useSortable = <TData>({
  sortField,
  sortOrder,
  onSortOrderChange,
}: UseSortableProps<TData>) => {
  const [sortObject, setSortObject] = useState<{
    sortField?: keyof TData;
    sortOrder?: SortOrder;
  }>();

  useEffect(() => {
    if (sortField) {
      setSortObject((prevState) =>
        prevState?.sortField === sortOrder && prevState?.sortOrder === sortOrder
          ? prevState
          : {
              sortField,
              sortOrder: sortOrder || undefined,
            }
      );
    }
  }, [sortField, sortOrder]);

  const handleSort = useCallback(
    (field: keyof TData) => {
      setSortObject((prev) => {
        const isSameField = prev?.sortField === field;
        const newSortOrder = isSameField
          ? prev?.sortOrder === SortOrder.ASC
            ? SortOrder.DESC
            : undefined
          : SortOrder.ASC;

        const newSortObject = {
          sortField: newSortOrder ? field : undefined,
          sortOrder: newSortOrder,
        };

        if (onSortOrderChange) {
          onSortOrderChange(newSortObject);
        }
        return newSortObject;
      });
    },
    [onSortOrderChange]
  );

  return {
    sortObject,
    handleSort,
  };
};
