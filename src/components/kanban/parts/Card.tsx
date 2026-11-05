// Adapted from react-kanban-kit (Apache-2.0), Copyright 2024 Hazem braiek.
// Modified for Vitrea UI; see THIRD_PARTY_NOTICES.md.
import { memo, useMemo, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useCardDnd } from '../dnd/useCardDnd';
import type {
  BoardItem,
  BoardProps,
  CardDndState,
  CardRenderProps,
  DndState,
} from '../types';
import { withPrefix } from '../utils';

/**
 * The drop placeholder shown where a dragged card will land. Falls back to a
 * plain shaded box when no custom indicator is supplied.
 */
export const CardShadow = memo(
  ({
    height,
    customIndicator,
  }: {
    height: number;
    customIndicator?: ReactNode;
  }) => (
    <div className={withPrefix('card-shadow-container')}>
      {customIndicator ?? (
        <div
          className={withPrefix('card-shadow')}
          style={{ height: `${Math.max(0, height - 2)}px` }}
        />
      )}
    </div>
  )
);
CardShadow.displayName = 'CardShadow';

type CardRenderer = (props: CardRenderProps) => ReactNode;

interface CardDisplayProps {
  outerRef?: React.Ref<HTMLDivElement>;
  innerRef?: React.Ref<HTMLDivElement>;
  state: CardDndState;
  data: BoardItem;
  column: BoardItem;
  index: number;
  isDraggable: boolean;
  render: CardRenderer;
  onClick?: (e: React.MouseEvent<HTMLDivElement>, card: BoardItem) => void;
  cardsGap?: number;
  renderCardDragIndicator?: (
    card: BoardItem | null,
    info: { height: number }
  ) => ReactNode;
}

const CardDisplay = ({
  outerRef,
  innerRef,
  state,
  data,
  column,
  index,
  isDraggable,
  cardsGap,
  render,
  onClick,
  renderCardDragIndicator,
}: CardDisplayProps) => {
  const content = useMemo(
    () => render({ data, column, index, isDraggable }),
    [render, data, column, index, isDraggable]
  );
  const innerStyle: CSSProperties =
    state.type === 'is-dragging'
      ? { opacity: 0.6 }
      : state.type === 'preview'
        ? {
            width: state.dragging.width,
            height: state.dragging.height,
            transform: 'rotate(4deg)',
          }
        : {};

  const showTopShadow = state.type === 'is-over' && state.closestEdge === 'top';
  const showBottomShadow =
    state.type === 'is-over' && state.closestEdge === 'bottom';
  const shadowHeight = state.type === 'is-over' ? state.dragging.height : 0;
  const customIndicator = renderCardDragIndicator?.(
    state.type === 'is-dragging' ? data : null,
    { height: shadowHeight }
  );

  return (
    <div
      ref={outerRef}
      className={withPrefix('card-outer')}
      onClick={(e) => onClick?.(e, data)}
      style={{
        display:
          state.type === 'is-dragging-and-left-self' ? 'none' : undefined,
        marginBottom: cardsGap,
      }}
      data-test-id={data.id}
      data-rkk-column={column.id}
      data-rkk-index={index}
    >
      {showTopShadow && (
        <CardShadow height={shadowHeight} customIndicator={customIndicator} />
      )}
      <div
        ref={innerRef}
        className={withPrefix('card-inner')}
        style={{
          ...innerStyle,
          marginBottom: showBottomShadow ? cardsGap : 0,
          marginTop: showTopShadow ? cardsGap : 0,
        }}
      >
        {content}
      </div>
      {showBottomShadow && (
        <CardShadow height={shadowHeight} customIndicator={customIndicator} />
      )}
    </div>
  );
};

interface CardProps {
  render: CardRenderer;
  data: BoardItem;
  column: BoardItem;
  index: number;
  isDraggable: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>, card: BoardItem) => void;
  cardsGap?: number;
  onCardDndStateChange?: (info: DndState) => void;
  renderCardDragIndicator?: (
    card: BoardItem | null,
    info: { height: number }
  ) => ReactNode;
  renderCardDragPreview?: BoardProps['renderCardDragPreview'];
}

const Card = memo(
  ({
    render,
    data,
    column,
    index,
    isDraggable,
    cardsGap,
    onClick,
    onCardDndStateChange,
    renderCardDragIndicator,
    renderCardDragPreview,
  }: CardProps) => {
    const { outerRef, innerRef, state } = useCardDnd(
      data,
      column,
      index,
      isDraggable,
      onCardDndStateChange
    );

    return (
      <>
        <CardDisplay
          outerRef={outerRef}
          innerRef={innerRef}
          state={state}
          data={data}
          column={column}
          index={index}
          isDraggable={isDraggable}
          render={render}
          onClick={onClick}
          cardsGap={cardsGap}
          renderCardDragIndicator={renderCardDragIndicator}
        />

        {state.type === 'preview'
          ? createPortal(
              renderCardDragPreview?.(data, {
                state,
                data,
                column,
                index,
                isDraggable,
              }) ?? (
                <CardDisplay
                  state={state}
                  data={data}
                  column={column}
                  index={index}
                  isDraggable={isDraggable}
                  render={render}
                />
              ),
              state.container
            )
          : null}
      </>
    );
  }
);
Card.displayName = 'KanbanCard';

export default Card;
