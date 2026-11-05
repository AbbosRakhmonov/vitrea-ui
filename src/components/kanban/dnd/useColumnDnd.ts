// Adapted from react-kanban-kit (Apache-2.0), Copyright 2024 Hazem braiek.
// Modified for Vitrea UI; see THIRD_PARTY_NOTICES.md.
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import { attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
  type ElementDropTargetEventBasePayload,
  type ElementDropTargetGetFeedbackArgs,
  type ElementEventBasePayload,
  type ElementEventPayloadMap,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useKanbanContext } from '../context';
import type { BoardItem, ColumnDndState, DndState } from '../types';
import { withPrefix } from '../utils';

const idle: ColumnDndState = { type: 'idle' };

type DragData = Record<string, unknown>;
const isCardData = (data: DragData) => data.type === 'card';
const isColumnData = (data: DragData) => data.type === 'column';

/**
 * Wires a column up as both a draggable (via its header) and a drop target for
 * cards and other columns, auto-scrolling its card list during a card drag.
 * Tracks the live {@link ColumnDndState}.
 */
export const useColumnDnd = (
  data: BoardItem,
  index: number,
  totalColumns: number,
  onColumnDndStateChange?: (info: DndState) => void,
  customPreview = false,
  virtualization = true
) => {
  const {
    viewOnly,
    allowColumnDrag,
    freezeFirstColumn,
    freezeLastColumn,
    isColumnDraggable,
    instanceId,
  } = useKanbanContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const outerFullHeightRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ColumnDndState>(idle);

  const isFirstColumn = index === 0;
  const isLastColumn = index === totalColumns - 1;
  const isFrozen =
    (freezeFirstColumn && isFirstColumn) || (freezeLastColumn && isLastColumn);

  const cardOverShadowCount =
    state.type === 'is-card-over' && !state.isOverChildCard ? 1 : 0;

  const setIsCardOver = useCallback(
    ({
      data: cardData,
      location,
    }: {
      data: DragData;
      location: ElementEventBasePayload['location'];
    }) => {
      const innerMost = location.current.dropTargets[0];
      const dragging = cardData.rect as DOMRect;
      const isOverChildCard = Boolean(innerMost?.data['card-drop-target']);
      setState((previous) =>
        previous.type === 'is-card-over' &&
        previous.dragging === dragging &&
        previous.isOverChildCard === isOverChildCard
          ? previous
          : { type: 'is-card-over', dragging, isOverChildCard }
      );
    },
    []
  );

  const handleGenerateDragPreview = useCallback(
    ({
      location,
      nativeSetDragImage,
    }: ElementEventPayloadMap['onGenerateDragPreview']) => {
      setCustomNativeDragPreview({
        nativeSetDragImage,
        getOffset: preserveOffsetOnSource({
          element: headerRef.current!,
          input: location.current.input,
        }),
        render({ container }) {
          const rect = innerRef.current!.getBoundingClientRect();
          if (customPreview) {
            setState({ type: 'preview', container, dragging: rect });
            return;
          }
          const preview = innerRef.current!.cloneNode(true) as HTMLElement;
          preview.style.width = `${rect.width}px`;
          preview.style.height = `${rect.height}px`;
          preview.style.transform = 'rotate(4deg)';
          container.appendChild(preview);
        },
      });
    },
    [customPreview]
  );

  const handleDragStart = useCallback(
    () => setState({ type: 'is-dragging' }),
    []
  );
  const handleDrop = useCallback(() => setState(idle), []);

  const handleDragEnter = useCallback(
    ({ source, location }: ElementDropTargetEventBasePayload) => {
      if (isCardData(source.data)) {
        setIsCardOver({ data: source.data, location });
        return;
      }
      if (isColumnData(source.data) && source.data.columnId !== data.id) {
        setState({ type: 'is-column-over' });
      }
    },
    [data.id, setIsCardOver]
  );

  const handleDropTargetChange = useCallback(
    ({ source, location }: ElementDropTargetEventBasePayload) => {
      if (isCardData(source.data))
        setIsCardOver({ data: source.data, location });
    },
    [setIsCardOver]
  );

  const handleDragLeave = useCallback(
    ({ source }: ElementDropTargetEventBasePayload) => {
      if (isColumnData(source.data) && source.data.columnId === data.id) return;
      setState(idle);
    },
    [data.id]
  );

  const canDrop = useCallback(
    ({ source }: ElementDropTargetGetFeedbackArgs) => {
      if (viewOnly || source.data.instanceId !== instanceId) return false;
      if (isCardData(source.data)) return true;
      if (isColumnData(source.data)) return !isFrozen;
      return false;
    },
    [isFrozen, viewOnly, instanceId]
  );

  useEffect(() => {
    const outer = outerFullHeightRef.current;
    const inner = innerRef.current;
    const header = headerRef.current;
    if (!outer || !inner || !header) return;

    const scroller = outer.querySelector(
      `.${withPrefix('column-content-list')}`
    );
    const columnData = {
      type: 'column',
      instanceId,
      columnId: data.id,
      column: data,
      index,
    };

    const canDrag = () =>
      allowColumnDrag &&
      !viewOnly &&
      !isFrozen &&
      (isColumnDraggable ? isColumnDraggable(data) : true);

    const cleanups = [
      draggable({
        element: header,
        getInitialData: () => columnData,
        onGenerateDragPreview: handleGenerateDragPreview,
        onDragStart: handleDragStart,
        onDrop: handleDrop,
        canDrag,
      }),
      dropTargetForElements({
        element: outer,
        getData: ({ input, element }) =>
          attachClosestEdge(columnData, {
            input,
            element,
            allowedEdges: ['left', 'right'],
          }),
        canDrop,
        getIsSticky: () => true,
        onDragStart: ({ source, location }) => {
          if (isCardData(source.data))
            setIsCardOver({ data: source.data, location });
        },
        onDragEnter: handleDragEnter,
        onDropTargetChange: handleDropTargetChange,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
      }),
    ];

    if (scroller) {
      cleanups.push(
        autoScrollForElements({
          element: scroller,
          canScroll: ({ source }) =>
            !viewOnly &&
            source.data.instanceId === instanceId &&
            source.data.type === 'card',
          getConfiguration: () => ({ maxScrollSpeed: 'standard' }),
        })
      );
    }

    return combine(...cleanups);
  }, [
    data,
    instanceId,
    virtualization,
    index,
    viewOnly,
    allowColumnDrag,
    isFrozen,
    isColumnDraggable,
    handleGenerateDragPreview,
    handleDragStart,
    handleDrop,
    canDrop,
    setIsCardOver,
    handleDragEnter,
    handleDropTargetChange,
    handleDragLeave,
  ]);

  useEffect(() => {
    onColumnDndStateChange?.({ state, column: data });
  }, [state, onColumnDndStateChange, data]);

  return {
    headerRef,
    outerFullHeightRef,
    innerRef,
    state,
    cardOverShadowCount,
    isFrozen,
  };
};
