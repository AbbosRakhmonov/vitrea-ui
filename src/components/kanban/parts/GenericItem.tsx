// Adapted from react-kanban-kit (Apache-2.0), Copyright 2024 Hazem braiek.
// Modified for Liquid UI; see THIRD_PARTY_NOTICES.md.
import { memo, type CSSProperties, type ReactNode } from 'react';
import { cn } from '../../../lib';
import type { BoardItem, BoardProps, ConfigMap, DndState } from '../types';
import { withPrefix } from '../utils';
import Card, { CardShadow } from './Card';
import CardSkeleton from './CardSkeleton';
import DefaultCard from './DefaultCard';

const resolveDraggable = (data: BoardItem, typeDraggable: boolean) =>
  data?.isDraggable !== undefined ? data.isDraggable : typeDraggable;

export interface GenericItemOptions {
  data?: BoardItem;
  column: BoardItem;
  configMap: ConfigMap;
  /** The row is past the loaded items and should render as a skeleton. */
  isSkeleton: boolean;
  /** The row is the drop placeholder for a card hovering the empty tail. */
  isShadow: boolean;
  /** The row is the column's list footer. */
  isListFooter: boolean;
  renderListFooter?: (column: BoardItem) => ReactNode;
  cardWrapperStyle?: (card: BoardItem, column: BoardItem) => CSSProperties;
  cardWrapperClassName?: string;
  cardsGap?: number;
  renderSkeletonCard?: BoardProps['renderSkeletonCard'];
  onCardDndStateChange?: (info: DndState) => void;
  onCardClick?: (e: React.MouseEvent<HTMLDivElement>, card: BoardItem) => void;
  cardOverHeight?: number;
  renderCardDragIndicator?: (
    card: BoardItem | null,
    info: { height: number }
  ) => ReactNode;
  renderCardDragPreview?: BoardProps['renderCardDragPreview'];
}

interface GenericItemProps extends GenericItemOptions {
  index: number;
}

/**
 * One virtualised row. Resolves to a card, a skeleton, the drop-shadow
 * placeholder, or the list footer depending on where the index falls.
 */
const GenericItem = memo(({ index, ...options }: GenericItemProps) => {
  const {
    data,
    column,
    configMap,
    isSkeleton,
    isShadow,
    isListFooter,
    cardWrapperStyle,
    cardWrapperClassName,
    cardsGap = 8,
    cardOverHeight = 90,
    renderSkeletonCard,
    renderListFooter,
    onCardClick,
    onCardDndStateChange,
    renderCardDragIndicator,
    renderCardDragPreview,
  } = options;

  const { render = DefaultCard, isDraggable = true } =
    (data?.type ? configMap?.[data.type] : undefined) ?? {};

  const renderContent = () => {
    if (isListFooter)
      return (
        <div className={withPrefix('generic-item-list-footer')}>
          {renderListFooter?.(column)}
        </div>
      );
    if (isShadow)
      return (
        <CardShadow
          height={cardOverHeight}
          customIndicator={renderCardDragIndicator?.(data ?? null, {
            height: cardOverHeight,
          })}
        />
      );
    if (isSkeleton || !data)
      return (
        <div
          className={withPrefix('generic-item-skeleton')}
          data-index={index}
          data-rkk-column={column?.id}
        >
          {renderSkeletonCard?.({ index, column }) ?? (
            <CardSkeleton animationType="wave" />
          )}
        </div>
      );

    return (
      <Card
        render={render}
        isDraggable={resolveDraggable(data, isDraggable)}
        data={data}
        column={column}
        index={index}
        onClick={onCardClick}
        cardsGap={cardsGap}
        onCardDndStateChange={onCardDndStateChange}
        renderCardDragIndicator={renderCardDragIndicator}
        renderCardDragPreview={renderCardDragPreview}
      />
    );
  };

  return (
    <div
      className={cn(withPrefix('generic-item-wrapper'), cardWrapperClassName)}
      style={data ? cardWrapperStyle?.(data, column) : undefined}
    >
      {renderContent()}
    </div>
  );
});
GenericItem.displayName = 'GenericItem';

export default GenericItem;
