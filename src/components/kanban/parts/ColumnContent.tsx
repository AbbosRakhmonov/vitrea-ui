// Adapted from react-kanban-kit (Apache-2.0), Copyright 2024 Hazem braiek.
// Modified for Vitrea UI; see THIRD_PARTY_NOTICES.md.
import {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';
import { VList } from 'virtua';
import { cn } from '../../../lib';
import { useKanbanContext } from '../context';
import type {
  BoardItem,
  BoardProps,
  ConfigMap,
  DndState,
  ScrollEvent,
} from '../types';
import {
  handleScroll,
  isSkeletonVisible,
  mergeRefs,
  withPrefix,
} from '../utils';
import GenericItem, { type GenericItemOptions } from './GenericItem';

/** Options shared by every row, minus the per-row booleans GenericItem computes. */
type RowOptions = Omit<
  GenericItemOptions,
  'data' | 'isSkeleton' | 'isShadow' | 'isListFooter'
>;

interface ListProps extends RowOptions {
  items: BoardItem[];
  cardOverShadowCount: number;
  onScroll?: (e: React.UIEvent<HTMLDivElement> | number) => void;
}

const renderRow = (
  index: number,
  count: number,
  {
    items,
    column,
    configMap,
    cardOverShadowCount,
    renderListFooter,
    ...rest
  }: ListProps
): ReactElement => {
  const isListFooter = Boolean(renderListFooter) && index === count - 1;
  const isShadow =
    Boolean(cardOverShadowCount) &&
    index === count - (renderListFooter ? 2 : 1);
  const data = items[index];
  const key = isListFooter
    ? 'footer'
    : isShadow
      ? 'shadow'
      : data
        ? `card:${data.id}`
        : `skeleton:${index}`;
  return (
    <GenericItem
      key={key}
      index={index}
      data={data}
      column={column}
      configMap={configMap}
      renderListFooter={renderListFooter}
      isSkeleton={!data}
      isShadow={isShadow}
      isListFooter={isListFooter}
      {...rest}
    />
  );
};

const rowCount = (
  column: BoardItem,
  cardOverShadowCount: number,
  renderListFooter?: (column: BoardItem) => ReactNode
) =>
  column.totalChildrenCount + cardOverShadowCount + (renderListFooter ? 1 : 0);

const VirtualizedList = (props: ListProps) => {
  const count = rowCount(
    props.column,
    props.cardOverShadowCount,
    props.renderListFooter
  );
  return (
    <VList
      count={count}
      onScroll={props.onScroll}
      className={withPrefix('column-content-list')}
    >
      {(index: number) => renderRow(index, count, props)}
    </VList>
  );
};

const NormalList = (props: ListProps) => {
  const count = rowCount(
    props.column,
    props.cardOverShadowCount,
    props.renderListFooter
  );
  return (
    <div
      className={withPrefix('column-content-list')}
      onScroll={props.onScroll as React.UIEventHandler<HTMLDivElement>}
    >
      {Array.from({ length: count }, (_, index) =>
        renderRow(index, count, props)
      )}
    </div>
  );
};

interface ColumnContentProps {
  items: BoardItem[];
  column: BoardItem;
  configMap: ConfigMap;
  columnListContentStyle?: (column: BoardItem) => CSSProperties;
  columnListContentClassName?: string;
  cardWrapperStyle?: (card: BoardItem, column: BoardItem) => CSSProperties;
  cardWrapperClassName?: string;
  renderSkeletonCard?: BoardProps['renderSkeletonCard'];
  onScroll?: (e: ScrollEvent, column: BoardItem) => void;
  onCardClick?: (e: React.MouseEvent<HTMLDivElement>, card: BoardItem) => void;
  loadMore?: (columnId: string) => void;
  cardOverShadowCount: number;
  cardOverHeight?: number;
  onCardDndStateChange?: (info: DndState) => void;
  renderCardDragIndicator?: (
    card: BoardItem | null,
    info: { height: number }
  ) => ReactNode;
  renderCardDragPreview?: BoardProps['renderCardDragPreview'];
  renderListFooter?: (column: BoardItem) => ReactNode;
  renderEmptyColumn?: (column: BoardItem) => ReactNode;
}

/**
 * The scrollable card list of a column. Chooses the virtualised or plain
 * renderer from context, drives infinite-scroll `loadMore`, and shows the
 * optional empty-column placeholder when the column has no cards.
 */
const ColumnContent = forwardRef<HTMLDivElement, ColumnContentProps>(
  (props, ref) => {
    const {
      items,
      column,
      configMap,
      columnListContentStyle,
      columnListContentClassName,
      cardWrapperStyle,
      cardWrapperClassName,
      renderSkeletonCard,
      onCardClick,
      loadMore,
      cardOverShadowCount,
      cardOverHeight,
      onCardDndStateChange,
      renderCardDragIndicator,
      renderCardDragPreview,
      renderListFooter,
      renderEmptyColumn,
      onScroll: notifyScroll,
    } = props;
    const { virtualization, cardsGap, allowListFooter } = useKanbanContext();

    const contentRef = useRef<HTMLDivElement>(null);
    const combinedRef = useMemo(() => mergeRefs(ref, contentRef), [ref]);
    const onScroll = useCallback(
      (e: React.UIEvent<HTMLDivElement> | number) => {
        const scroller =
          typeof e === 'number'
            ? contentRef.current?.querySelector<HTMLElement>(
                `.${withPrefix('column-content-list')}`
              )
            : e.currentTarget;
        if (!scroller) return;
        if (loadMore && isSkeletonVisible(scroller)) loadMore(column.id);
        if (notifyScroll)
          handleScroll(e, virtualization, notifyScroll, column, scroller);
      },
      [loadMore, notifyScroll, virtualization, column]
    );

    const footer =
      allowListFooter === undefined || allowListFooter(column)
        ? renderListFooter
        : undefined;

    const listProps: ListProps = {
      items,
      column,
      configMap,
      cardWrapperStyle,
      cardWrapperClassName,
      cardsGap,
      renderSkeletonCard,
      onCardClick,
      cardOverShadowCount,
      onCardDndStateChange,
      renderCardDragIndicator,
      renderCardDragPreview,
      cardOverHeight,
      renderListFooter: footer,
      onScroll,
    };

    const isEmpty = column.totalChildrenCount === 0 && !cardOverShadowCount;
    const List = virtualization ? VirtualizedList : NormalList;

    return (
      <div
        ref={combinedRef}
        className={cn(withPrefix('column-content'), columnListContentClassName)}
        style={columnListContentStyle?.(column)}
      >
        <List {...listProps} />
        {isEmpty && renderEmptyColumn && (
          <div className={withPrefix('column-empty')}>
            {renderEmptyColumn(column)}
          </div>
        )}
      </div>
    );
  }
);
ColumnContent.displayName = 'ColumnContent';

export default ColumnContent;
