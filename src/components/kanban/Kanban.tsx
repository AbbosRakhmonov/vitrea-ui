// Adapted from react-kanban-kit (Apache-2.0), Copyright 2024 Hazem braiek.
// Modified for Vitrea UI; see THIRD_PARTY_NOTICES.md.
import {
  autoScrollForElements,
  autoScrollWindowForElements,
} from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../../lib';
import { KanbanContext } from './context';
import { handleCardDrop } from './dnd/dropManager';
import './kanban.css';
import Column from './parts/Column';
import ColumnAdder from './parts/ColumnAdder';
import type { BoardProps } from './types';
import {
  getColumnChildren,
  getColumnsFromDataSource,
  mergeRefs,
  withPrefix,
} from './utils';

/**
 * A data-driven, drag-and-drop Kanban board. Render cards per `type` via
 * `configMap`, feed a normalised `dataSource`, and react to moves through
 * `onCardMove` / `onColumnMove`. Columns virtualise their card lists by
 * default and auto-scroll during a drag.
 */
function KanbanInner<T>(props: BoardProps<T>, ref: React.Ref<HTMLDivElement>) {
  // The internal tree renders against a type-erased board; the public generic
  // `T` only shapes the consumer-facing render/callback types. Erase it once
  // here so the parts don't each need a cast.
  const board = props as BoardProps;
  const {
    dataSource,
    rootStyle,
    rootClassName,
    onColumnMove,
    onCardMove,
    freezeFirstColumn = false,
    freezeLastColumn = false,
    renderColumnAdder,
    viewOnly = false,
    virtualization = true,
    cardsGap = 8,
    allowColumnAdder = true,
    allowListFooter,
    allowColumnDrag = true,
    isColumnDraggable,
    ...columnProps
  } = board;

  const internalRef = useRef<HTMLDivElement>(null);
  const [instanceId] = useState(() => Symbol('kanban'));
  const columns = useMemo(
    () => getColumnsFromDataSource(dataSource),
    [dataSource]
  );
  const columnItems = useMemo(
    () => columns.map((column) => getColumnChildren(column, dataSource)),
    [columns, dataSource]
  );
  const rootRef = useMemo(() => mergeRefs(ref, internalRef), [ref]);

  const sharedProps = useMemo(
    () => ({
      instanceId,
      viewOnly,
      virtualization,
      cardsGap,
      allowColumnAdder,
      allowListFooter,
      allowColumnDrag,
      freezeFirstColumn,
      freezeLastColumn,
      isColumnDraggable,
    }),
    [
      instanceId,
      viewOnly,
      virtualization,
      cardsGap,
      allowColumnAdder,
      allowListFooter,
      allowColumnDrag,
      freezeFirstColumn,
      freezeLastColumn,
      isColumnDraggable,
    ]
  );

  useEffect(() => {
    const element = internalRef.current;
    if (!element) return;
    return combine(
      monitorForElements({
        canMonitor: ({ source }) =>
          !viewOnly && source.data.instanceId === instanceId,
        onDrop(args) {
          handleCardDrop({
            source: { id: '', data: args.source.data },
            location: {
              current: { dropTargets: args.location.current.dropTargets },
            },
            columns,
            dataSource,
            onCardMove,
            onColumnMove,
            freezeFirstColumn,
            freezeLastColumn,
            isColumnDraggable,
          });
        },
      }),
      autoScrollForElements({
        element,
        canScroll: ({ source }) =>
          !viewOnly && source.data.instanceId === instanceId,
        getConfiguration: () => ({ maxScrollSpeed: 'standard' }),
      }),
      autoScrollWindowForElements({
        canScroll: ({ source }) =>
          !viewOnly && source.data.instanceId === instanceId,
      })
    );
  }, [
    columns,
    dataSource,
    onCardMove,
    onColumnMove,
    freezeFirstColumn,
    freezeLastColumn,
    instanceId,
    viewOnly,
    isColumnDraggable,
  ]);

  return (
    <KanbanContext.Provider value={sharedProps}>
      <div
        ref={rootRef}
        className={cn(withPrefix('board'), rootClassName)}
        style={rootStyle}
      >
        {columns.map((column, index) => (
          <Column
            key={column.id}
            index={index}
            data={column}
            items={columnItems[index]}
            totalColumns={columns.length}
            {...columnProps}
          />
        ))}
        <ColumnAdder renderColumnAdder={renderColumnAdder} />
      </div>
    </KanbanContext.Provider>
  );
}

/**
 * The Kanban board, generic over the card `content` payload `T`.
 */
export const Kanban = forwardRef(KanbanInner) as <T>(
  props: BoardProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

export default Kanban;
