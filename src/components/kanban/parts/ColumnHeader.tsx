// Adapted from react-kanban-kit (Apache-2.0), Copyright 2024 Hazem braiek.
// Modified for Liquid UI; see THIRD_PARTY_NOTICES.md.
import { forwardRef, type CSSProperties, type ReactNode } from 'react';
import { cn } from '../../../lib';
import type { BoardItem } from '../types';
import { withPrefix } from '../utils';

interface ColumnHeaderProps {
  renderColumnHeader?: (column: BoardItem) => ReactNode;
  columnHeaderStyle?: (column: BoardItem) => CSSProperties;
  columnHeaderClassName?: string;
  data: BoardItem;
}

/**
 * Column header and its drag handle. When `renderColumnHeader` is supplied the
 * custom node is rendered (still ref-wired as the drag handle); otherwise the
 * default title + count header is used.
 */
const ColumnHeader = forwardRef<HTMLDivElement, ColumnHeaderProps>(
  (
    { renderColumnHeader, columnHeaderStyle, columnHeaderClassName, data },
    ref
  ) => {
    if (renderColumnHeader)
      return (
        <div
          ref={ref}
          className={cn(
            withPrefix('column-header-slot'),
            columnHeaderClassName
          )}
          style={columnHeaderStyle?.(data)}
        >
          {renderColumnHeader(data)}
        </div>
      );

    return (
      <header
        ref={ref}
        className={cn(withPrefix('column-header'), columnHeaderClassName)}
        style={columnHeaderStyle?.(data)}
      >
        <div className={withPrefix('column-header-left')}>{data?.title}</div>
        <div className={withPrefix('column-header-right')}>
          {data.totalItemsCount ?? data.totalChildrenCount ?? 0}
        </div>
      </header>
    );
  }
);
ColumnHeader.displayName = 'ColumnHeader';

export default ColumnHeader;
