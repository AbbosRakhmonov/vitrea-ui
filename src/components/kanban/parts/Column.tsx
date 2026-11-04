// Adapted from react-kanban-kit (Apache-2.0), Copyright 2024 Hazem braiek.
// Modified for Liquid UI; see THIRD_PARTY_NOTICES.md.
import { memo, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../../lib';
import { useKanbanContext } from '../context';
import { useColumnDnd } from '../dnd/useColumnDnd';
import type { BoardItem, BoardProps } from '../types';
import { withPrefix } from '../utils';
import ColumnContent from './ColumnContent';
import ColumnHeader from './ColumnHeader';

type ColumnOwnProps = Pick<
  BoardProps,
  | 'configMap'
  | 'loadMore'
  | 'onColumnClick'
  | 'onCardClick'
  | 'renderColumnHeader'
  | 'renderColumnFooter'
  | 'renderSkeletonCard'
  | 'renderColumnWrapper'
  | 'columnWrapperStyle'
  | 'columnHeaderStyle'
  | 'columnStyle'
  | 'columnClassName'
  | 'columnWrapperClassName'
  | 'columnHeaderClassName'
  | 'columnListContentStyle'
  | 'columnListContentClassName'
  | 'onCardDndStateChange'
  | 'onColumnDndStateChange'
  | 'renderCardDragIndicator'
  | 'renderColumnDragIndicator'
  | 'renderCardDragPreview'
  | 'renderColumnDragPreview'
  | 'renderListFooter'
  | 'renderEmptyColumn'
  | 'cardWrapperStyle'
  | 'cardWrapperClassName'
  | 'onScroll'
>;

interface ColumnProps extends ColumnOwnProps {
  index: number;
  data: BoardItem;
  items: BoardItem[];
  totalColumns: number;
}

const Column = memo(
  (props: ColumnProps) => {
    const {
      index,
      data,
      totalColumns,
      items,
      configMap,
      loadMore,
      onColumnClick,
      onCardClick,
      renderColumnHeader,
      renderColumnFooter,
      renderSkeletonCard,
      renderColumnWrapper,
      columnWrapperStyle,
      columnHeaderStyle,
      columnStyle,
      columnClassName,
      columnWrapperClassName,
      columnHeaderClassName,
      columnListContentStyle,
      columnListContentClassName,
      onCardDndStateChange,
      onColumnDndStateChange,
      renderCardDragIndicator,
      renderColumnDragIndicator,
      renderCardDragPreview,
      renderColumnDragPreview,
      renderListFooter,
      renderEmptyColumn,
      cardWrapperStyle,
      cardWrapperClassName,
      onScroll,
    } = props;

    const { virtualization } = useKanbanContext();
    const {
      headerRef,
      outerFullHeightRef,
      innerRef,
      state,
      cardOverShadowCount,
    } = useColumnDnd(
      data,
      index,
      totalColumns,
      onColumnDndStateChange,
      Boolean(renderColumnDragPreview),
      virtualization
    );

    const isDragging = state.type === 'is-dragging';
    const cardOverHeight =
      state.type === 'is-card-over' ? state.dragging.height : undefined;

    const outerClassName = cn(
      withPrefix('column-outer'),
      columnWrapperClassName?.(data),
      isDragging && withPrefix('column-dragging')
    );
    const innerClassName = cn(
      withPrefix('column'),
      columnClassName?.(data),
      isDragging && withPrefix('column-dragging')
    );

    const body = (
      <div
        className={innerClassName}
        ref={innerRef}
        style={columnStyle?.(data)}
      >
        <div className={withPrefix('column-wrapper')}>
          <ColumnHeader
            ref={headerRef}
            data={data}
            renderColumnHeader={renderColumnHeader}
            columnHeaderStyle={columnHeaderStyle}
            columnHeaderClassName={columnHeaderClassName?.(data)}
          />
          {state.type === 'is-column-over' && renderColumnDragIndicator && (
            <div className={withPrefix('column-drag-indicator')}>
              {renderColumnDragIndicator(data, { state })}
            </div>
          )}
          <ColumnContent
            items={items}
            column={data}
            configMap={configMap}
            loadMore={loadMore}
            onScroll={onScroll}
            onCardClick={onCardClick}
            onCardDndStateChange={onCardDndStateChange}
            renderSkeletonCard={renderSkeletonCard}
            renderCardDragIndicator={renderCardDragIndicator}
            renderCardDragPreview={renderCardDragPreview}
            renderListFooter={renderListFooter}
            renderEmptyColumn={renderEmptyColumn}
            cardWrapperStyle={cardWrapperStyle}
            cardWrapperClassName={cardWrapperClassName}
            columnListContentStyle={columnListContentStyle}
            columnListContentClassName={columnListContentClassName?.(data)}
            cardOverShadowCount={cardOverShadowCount}
            cardOverHeight={cardOverHeight}
          />
          {renderColumnFooter?.(data)}
        </div>
      </div>
    );

    const wrapper: ReactNode = renderColumnWrapper ? (
      renderColumnWrapper(data, {
        children: body,
        className: outerClassName,
        style: columnWrapperStyle?.(data),
        ref: outerFullHeightRef,
      })
    ) : (
      <div
        className={outerClassName}
        ref={outerFullHeightRef}
        style={columnWrapperStyle?.(data)}
      >
        {body}
      </div>
    );

    return (
      <>
        <div
          className={withPrefix('column-host')}
          data-rkk-column={data.id}
          onClick={(e) => onColumnClick?.(e, data)}
        >
          {wrapper}
        </div>
        {state.type === 'preview' &&
          createPortal(
            renderColumnDragPreview?.(data, { state }),
            state.container
          )}
      </>
    );
  },
  (previous, next) => {
    const { items: previousItems, ...previousProps } = previous;
    const { items: nextItems, ...nextProps } = next;
    return (
      previousItems.length === nextItems.length &&
      previousItems.every((item, index) => item === nextItems[index]) &&
      Object.keys(previousProps).length === Object.keys(nextProps).length &&
      (Object.keys(previousProps) as Array<keyof typeof previousProps>).every(
        (key) => Object.is(previousProps[key], nextProps[key])
      )
    );
  }
);
Column.displayName = 'Column';

export default Column;
