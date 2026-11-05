// Adapted from react-kanban-kit (Apache-2.0), Copyright 2024 Hazem braiek.
// Modified for Vitrea UI; see THIRD_PARTY_NOTICES.md.
import {
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
  type ElementDropTargetEventBasePayload,
  type ElementDropTargetGetFeedbackArgs,
  type ElementEventPayloadMap,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useKanbanContext } from '../context';
import type { BoardItem, CardDndState, DndState } from '../types';

const idle: CardDndState = { type: 'idle' };

/**
 * Wires a single card up to pragmatic-drag-and-drop as both a draggable and a
 * drop target, and tracks its live {@link CardDndState}. Returns the two refs
 * the card must attach (outer drop target, inner draggable) and the state.
 */
export const useCardDnd = (
  data: BoardItem,
  column: BoardItem,
  index: number,
  isDraggable: boolean,
  onCardDndStateChange?: (info: DndState) => void
) => {
  const { viewOnly, instanceId } = useKanbanContext();
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CardDndState>(idle);

  const getInitialData = useCallback(
    () => ({
      type: 'card',
      instanceId,
      itemId: data.id,
      columnId: column.id,
      index,
      isDraggable,
      parentId: data.parentId,
      rect: innerRef.current?.getBoundingClientRect() ?? null,
    }),
    [data.id, data.parentId, column.id, index, isDraggable, instanceId]
  );

  const getDropTargetData = useCallback(
    ({ input, element }: ElementDropTargetGetFeedbackArgs) =>
      attachClosestEdge(
        {
          type: 'card',
          'card-drop-target': true,
          itemId: data.id,
          columnId: column.id,
          index,
          isDraggable,
          parentId: data.parentId,
        },
        {
          input,
          element,
          allowedEdges: ['top', 'bottom'],
        }
      ),
    [data.id, data.parentId, column.id, index, isDraggable]
  );

  const canDrop = useCallback(
    ({ source }: ElementDropTargetGetFeedbackArgs) => {
      return (
        !viewOnly &&
        source.data.instanceId === instanceId &&
        source.data.type === 'card' &&
        Boolean(source.data.isDraggable)
      );
    },
    [viewOnly, instanceId]
  );

  const handleGenerateDragPreview = useCallback(
    ({
      nativeSetDragImage,
      location,
    }: ElementEventPayloadMap['onGenerateDragPreview']) => {
      setCustomNativeDragPreview({
        nativeSetDragImage,
        getOffset: preserveOffsetOnSource({
          element: innerRef.current!,
          input: location.current.input,
        }),
        render({ container }) {
          setState({
            type: 'preview',
            container,
            dragging: innerRef.current!.getBoundingClientRect(),
          });
        },
      });
    },
    []
  );

  const handleDragStart = useCallback(
    () => setState({ type: 'is-dragging' }),
    []
  );
  const handleDrop = useCallback(() => setState(idle), []);

  const handleOver = useCallback(
    ({ source, self }: ElementDropTargetEventBasePayload) => {
      if (source.data.type !== 'card') return;
      if (source.data.itemId === data.id) return;
      const closestEdge = extractClosestEdge(self.data);
      if (!closestEdge) return;
      const dragging = source.data.rect as DOMRect;
      setState((previous) =>
        previous.type === 'is-over' &&
        previous.closestEdge === closestEdge &&
        previous.dragging === dragging
          ? previous
          : { type: 'is-over', dragging, closestEdge }
      );
    },
    [data.id]
  );

  const handleDragLeave = useCallback(
    ({ source }: ElementDropTargetEventBasePayload) => {
      if (source.data.type !== 'card') return;
      if (source.data.itemId === data.id) {
        setState({ type: 'is-dragging-and-left-self' });
        return;
      }
      setState(idle);
    },
    [data.id]
  );

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    return combine(
      draggable({
        element: inner,
        getInitialData,
        onGenerateDragPreview: handleGenerateDragPreview,
        onDragStart: handleDragStart,
        onDrop: handleDrop,
        canDrag: () => isDraggable && !viewOnly,
      }),
      dropTargetForElements({
        element: outer,
        canDrop,
        getIsSticky: () => true,
        getData: getDropTargetData,
        onDragEnter: handleOver,
        onDrag: handleOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
      })
    );
  }, [
    getInitialData,
    getDropTargetData,
    handleGenerateDragPreview,
    handleDragStart,
    handleDrop,
    handleOver,
    handleDragLeave,
    canDrop,
    isDraggable,
    viewOnly,
  ]);

  useEffect(() => {
    onCardDndStateChange?.({ state, card: data, column });
  }, [state, onCardDndStateChange, data, column]);

  return { outerRef, innerRef, state };
};
