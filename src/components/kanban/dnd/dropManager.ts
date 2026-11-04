// Adapted from react-kanban-kit (Apache-2.0), Copyright 2024 Hazem braiek.
// Modified for Liquid UI; see THIRD_PARTY_NOTICES.md.
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import type {
  BoardData,
  BoardItem,
  CardMovePayload,
  DropParams,
} from '../types';

/** Resolve native drop metadata into the existing consumer move payloads. */
export function handleCardDrop<T>({
  source,
  location,
  columns,
  dataSource,
  onCardMove,
  onColumnMove,
  freezeFirstColumn = false,
  freezeLastColumn = false,
  isColumnDraggable,
}: DropParams<T>): void {
  const target = location.current.dropTargets[0]?.data;
  if (!target) return;
  const edge = extractClosestEdge(target);

  if (source.data.type === 'column' && target.type === 'column') {
    const fromIndex = columns.findIndex(
      (column) => column.id === source.data.columnId
    );
    const targetIndex = columns.findIndex(
      (column) => column.id === target.columnId
    );
    if (fromIndex < 0 || targetIndex < 0 || fromIndex === targetIndex) return;
    const insertionIndex = targetIndex + (edge === 'right' ? 1 : 0);
    // Drag metadata describes the original list; callbacks use the final index.
    const toIndex = edge
      ? insertionIndex - (fromIndex < insertionIndex ? 1 : 0)
      : targetIndex;
    if (fromIndex === toIndex) return;
    if (freezeFirstColumn && (fromIndex === 0 || toIndex === 0)) return;
    if (
      freezeLastColumn &&
      (fromIndex === columns.length - 1 || toIndex === columns.length - 1)
    )
      return;
    if (isColumnDraggable && !isColumnDraggable(columns[fromIndex])) return;
    onColumnMove?.({ columnId: columns[fromIndex].id, fromIndex, toIndex });
    return;
  }

  if (source.data.type !== 'card' || !onCardMove) return;
  const cardId = source.data.itemId;
  const fromColumnId = source.data.columnId;
  const toColumnId = target.columnId;
  if (
    typeof cardId !== 'string' ||
    typeof fromColumnId !== 'string' ||
    typeof toColumnId !== 'string'
  )
    return;
  const from = dataSource[fromColumnId];
  const to = dataSource[toColumnId];
  if (!from || !to || !dataSource[cardId] || !from.children.includes(cardId))
    return;
  if (
    !dataSource.root.children.includes(fromColumnId) ||
    !dataSource.root.children.includes(toColumnId)
  )
    return;

  const destination = to.children.filter(
    (id) => id !== cardId && dataSource[id]
  );
  let position = destination.length;
  if (target['card-drop-target']) {
    if (target.itemId === cardId) return;
    const targetIndex = destination.findIndex((id) => id === target.itemId);
    if (targetIndex < 0) return;
    position = targetIndex + (edge === 'bottom' ? 1 : 0);
  } else if (target.type !== 'column') return;

  if (fromColumnId === toColumnId && from.children.indexOf(cardId) === position)
    return;
  onCardMove({
    cardId,
    fromColumnId,
    toColumnId,
    taskAbove: destination[position - 1] ?? null,
    taskBelow: destination[position] ?? null,
    position,
  });
}

/** Immutably reorder root children using a final, zero-based index. */
export function dropColumnHandler<T>(
  drop: { columnId: string; position: number },
  dataSource: BoardData<T>
): BoardData<T> {
  const currentIndex = dataSource.root.children.indexOf(drop.columnId);
  if (currentIndex < 0 || !Number.isFinite(drop.position)) return dataSource;
  const position = Math.max(
    0,
    Math.min(dataSource.root.children.length - 1, Math.trunc(drop.position))
  );
  if (currentIndex === position) return dataSource;
  const children = [...dataSource.root.children];
  children.splice(currentIndex, 1);
  children.splice(position, 0, drop.columnId);
  return { ...dataSource, root: { ...dataSource.root, children } };
}

function updateCount<T>(
  column: BoardItem<T>,
  children: string[],
  delta: number
): BoardItem<T> {
  return {
    ...column,
    children,
    totalChildrenCount: Math.max(
      children.length,
      column.totalChildrenCount + delta
    ),
    ...(column.totalItems !== undefined && {
      totalItems: Math.max(0, column.totalItems + delta),
    }),
    ...(column.totalItemsCount !== undefined && {
      totalItemsCount: Math.max(0, column.totalItemsCount + delta),
    }),
  };
}

/** Apply a move without mutating the input. Graph fields and counts are kept in
 * sync; optional callbacks customise domain content in the same update. */
export function dropHandler<T>(
  drop: Omit<CardMovePayload, 'position'> & { position?: number },
  dataSource: BoardData<T>,
  updateDroppedItem?: (
    targetColumn: BoardItem<T>,
    droppedItem: BoardItem<T>
  ) => BoardItem<T> | void,
  updateDestinationColumn?: (targetColumn: BoardItem<T>) => BoardItem<T>,
  updateSourceColumn?: (sourceColumn: BoardItem<T>) => BoardItem<T>
): BoardData<T> {
  const { cardId, fromColumnId, toColumnId, taskAbove, taskBelow } = drop;
  if (taskAbove === cardId || taskBelow === cardId) return dataSource;
  const from = dataSource[fromColumnId];
  const to = dataSource[toColumnId];
  const card = dataSource[cardId];
  if (!from || !to || !card || !from.children.includes(cardId))
    return dataSource;
  if (
    !dataSource.root.children.includes(fromColumnId) ||
    !dataSource.root.children.includes(toColumnId)
  )
    return dataSource;

  const children = to.children.filter((id) => id !== cardId);
  const aboveIndex = taskAbove === null ? -1 : children.indexOf(taskAbove);
  const belowIndex = taskBelow === null ? -1 : children.indexOf(taskBelow);
  const position =
    aboveIndex >= 0
      ? aboveIndex + 1
      : belowIndex >= 0
        ? belowIndex
        : Math.max(0, Math.min(children.length, drop.position ?? 0));
  children.splice(position, 0, cardId);
  const sameColumn = fromColumnId === toColumnId;
  if (
    sameColumn &&
    from.children.every((id, index) => id === children[index]) &&
    !updateDroppedItem &&
    !updateSourceColumn &&
    !updateDestinationColumn
  )
    return dataSource;

  const next = { ...dataSource };
  if (!sameColumn) {
    const updated = updateCount(
      from,
      from.children.filter((id) => id !== cardId),
      -1
    );
    next[fromColumnId] = updateSourceColumn?.(updated) ?? updated;
  }
  let target = updateCount(to, children, sameColumn ? 0 : 1);
  if (sameColumn && updateSourceColumn) target = updateSourceColumn(target);
  const moved = sameColumn ? card : { ...card, parentId: toColumnId };
  next[cardId] = updateDroppedItem?.(target, moved) ?? moved;
  next[toColumnId] = updateDestinationColumn?.(target) ?? target;
  return next;
}
