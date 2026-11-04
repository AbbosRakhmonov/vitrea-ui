import { attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { describe, expect, it, vi } from 'vitest';
import {
  dropColumnHandler,
  dropHandler,
  handleCardDrop,
} from './dnd/dropManager';
import type { BoardData, BoardItem, DropParams } from './types';

type Content = { label: string; priority: number };
const node = (
  id: string,
  parentId: string | null,
  children: string[] = []
): BoardItem<Content> => ({
  id,
  title: id,
  parentId,
  children,
  totalChildrenCount: children.length,
  content: { label: id, priority: 1 },
  type: 'task',
});
const fixture = (): BoardData<Content> => ({
  root: node('root', null, ['left', 'right', 'other']),
  left: {
    ...node('left', 'root', ['a', 'b', 'c']),
    totalChildrenCount: 8,
    totalItems: 7,
    totalItemsCount: 6,
  },
  right: {
    ...node('right', 'root', ['d', 'e']),
    totalChildrenCount: 5,
    totalItems: 4,
    totalItemsCount: 3,
  },
  other: node('other', 'root'),
  a: node('a', 'left'),
  b: node('b', 'left'),
  c: node('c', 'left'),
  d: node('d', 'right'),
  e: node('e', 'right'),
});
function freeze<T extends object>(value: T): T {
  Object.values(value).forEach((child) => {
    if (child && typeof child === 'object') freeze(child);
  });
  return Object.freeze(value);
}
const move = {
  cardId: 'a',
  fromColumnId: 'left',
  toColumnId: 'right',
  taskAbove: 'd',
  taskBelow: 'e',
};

describe('immutable board updates', () => {
  it('moves a typed card, updates all supplied counts and parentId, and shares untouched nodes', () => {
    const board = freeze(fixture());
    const next: BoardData<Content> = dropHandler(move, board);
    expect(next).not.toBe(board);
    expect(next.left).toMatchObject({
      children: ['b', 'c'],
      totalChildrenCount: 7,
      totalItems: 6,
      totalItemsCount: 5,
    });
    expect(next.right).toMatchObject({
      children: ['d', 'a', 'e'],
      totalChildrenCount: 6,
      totalItems: 5,
      totalItemsCount: 4,
    });
    expect(next.a).toMatchObject({
      parentId: 'right',
      content: { label: 'a', priority: 1 },
    });
    expect(next.a).not.toBe(board.a);
    expect(next.root).toBe(board.root);
    expect(next.other).toBe(board.other);
    expect(next.b).toBe(board.b);
    expect(board.left.children).toEqual(['a', 'b', 'c']);
    expect(board.a.parentId).toBe('left');
  });

  it('keeps absent optional counters absent', () => {
    const board = fixture();
    delete board.left.totalItems;
    delete board.left.totalItemsCount;
    delete board.right.totalItems;
    delete board.right.totalItemsCount;
    const next = dropHandler(move, freeze(board));
    for (const id of ['left', 'right']) {
      expect(next[id]).not.toHaveProperty('totalItems');
      expect(next[id]).not.toHaveProperty('totalItemsCount');
    }
  });

  it('reorders within a column without changing any counts', () => {
    const board = freeze(fixture());
    const next = dropHandler(
      { ...move, toColumnId: 'left', taskAbove: 'b', taskBelow: 'c' },
      board
    );
    expect(next.left).toMatchObject({
      children: ['b', 'a', 'c'],
      totalChildrenCount: 8,
      totalItems: 7,
      totalItemsCount: 6,
    });
    expect(next.a.parentId).toBe('left');
    expect(next.right).toBe(board.right);
  });

  it('treats dropping the last card after itself as a no-op', () => {
    const board = freeze(fixture());
    const next = dropHandler(
      {
        ...move,
        cardId: 'c',
        toColumnId: 'left',
        taskAbove: 'c',
        taskBelow: null,
      },
      board
    );
    expect(next).toEqual(board);
  });

  it('reorders columns without mutating the root or unrelated nodes', () => {
    const board = freeze(fixture());
    const next: BoardData<Content> = dropColumnHandler(
      { columnId: 'left', position: 2 },
      board
    );
    expect(next.root.children).toEqual(['right', 'other', 'left']);
    expect(next.root).not.toBe(board.root);
    expect(board.root.children).toEqual(['left', 'right', 'other']);
    expect(next.left).toBe(board.left);
    expect(next.a).toBe(board.a);
  });
});

// Use the library's real edge metadata rather than mocking the drop algorithm.
function cardTarget(columnId: string, itemId: string, edge: 'top' | 'bottom') {
  const element = document.createElement('div');
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue(
    new DOMRect(0, 0, 100, 100)
  );
  return attachClosestEdge(
    { type: 'card', 'card-drop-target': true, columnId, itemId },
    {
      element,
      allowedEdges: ['top', 'bottom'],
      input: {
        clientX: 50,
        pageX: 50,
        pageY: edge === 'top' ? 1 : 99,
        clientY: edge === 'top' ? 1 : 99,
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
        button: 0,
        buttons: 1,
      },
    }
  );
}
function resolve(
  target?: Record<string, unknown>,
  source = { type: 'card', columnId: 'left', itemId: 'a' }
) {
  const board = freeze(fixture());
  const onCardMove = vi.fn();
  const onColumnMove = vi.fn();
  const args: DropParams<Content> = {
    source: { id: 'a', data: source },
    location: { current: { dropTargets: target ? [{ data: target }] : [] } },
    columns: board.root.children.map((id) => board[id]),
    dataSource: board,
    onCardMove,
    onColumnMove,
  };
  handleCardDrop(args);
  return { onCardMove, onColumnMove };
}

describe('handleCardDrop destinations', () => {
  it.each([
    ['top', 'd', null, 'd', 0],
    ['bottom', 'd', 'd', 'e', 1],
    ['bottom', 'e', 'e', null, 2],
  ] as const)(
    'resolves %s of %s across columns',
    (edge, target, taskAbove, taskBelow, position) => {
      const { onCardMove, onColumnMove } = resolve(
        cardTarget('right', target, edge)
      );
      expect(onCardMove).toHaveBeenCalledExactlyOnceWith({
        ...move,
        taskAbove,
        taskBelow,
        position,
      });
      expect(onColumnMove).not.toHaveBeenCalled();
    }
  );

  it('resolves same-column neighbors after removing the dragged card', () => {
    expect(
      resolve(cardTarget('left', 'b', 'bottom')).onCardMove
    ).toHaveBeenCalledExactlyOnceWith({
      ...move,
      toColumnId: 'left',
      taskAbove: 'b',
      taskBelow: 'c',
      position: 1,
    });
  });

  it('appends to a column and handles an empty destination', () => {
    expect(
      resolve({ type: 'column', columnId: 'right' }).onCardMove
    ).toHaveBeenCalledExactlyOnceWith({
      ...move,
      taskAbove: 'e',
      taskBelow: null,
      position: 2,
    });
    expect(
      resolve({ type: 'column', columnId: 'other' }).onCardMove
    ).toHaveBeenCalledExactlyOnceWith({
      ...move,
      toColumnId: 'other',
      taskAbove: null,
      taskBelow: null,
      position: 0,
    });
  });

  it.each([
    undefined,
    { type: 'unsupported' },
    { type: 'column', columnId: 'missing' },
    { type: 'column', columnId: 'a' },
    {
      type: 'card',
      'card-drop-target': true,
      columnId: 'right',
      itemId: 'missing',
    },
    {
      type: 'card',
      'card-drop-target': true,
      columnId: 'missing',
      itemId: 'd',
    },
  ])('does not invoke callbacks for invalid target %j', (target) => {
    const callbacks = resolve(target);
    expect(callbacks.onCardMove).not.toHaveBeenCalled();
    expect(callbacks.onColumnMove).not.toHaveBeenCalled();
  });

  it('ignores a missing source card and a tail self-drop', () => {
    for (const itemId of ['missing', 'c']) {
      const callbacks = resolve(
        { type: 'column', columnId: 'left' },
        { type: 'card', columnId: 'left', itemId }
      );
      expect(callbacks.onCardMove).not.toHaveBeenCalled();
      expect(callbacks.onColumnMove).not.toHaveBeenCalled();
    }
  });
});

describe('typed domain update callbacks', () => {
  it('preserves typed content and supplies updated graph fields to custom callbacks', () => {
    const board = freeze(fixture());
    const updateCard = vi.fn(
      (
        column: BoardItem<Content>,
        card: BoardItem<Content>
      ): BoardItem<Content> => ({
        ...card,
        content: {
          label: `${card.content!.label}:${column.content!.label}`,
          priority: card.content!.priority + 1,
        },
      })
    );
    const updateDestination = vi.fn(
      (column: BoardItem<Content>): BoardItem<Content> => ({
        ...column,
        content: { ...column.content!, label: 'destination updated' },
      })
    );
    const updateSource = vi.fn(
      (column: BoardItem<Content>): BoardItem<Content> => ({
        ...column,
        content: {
          ...column.content!,
          priority: column.content!.priority + 10,
        },
      })
    );
    const next: BoardData<Content> = dropHandler(
      move,
      board,
      updateCard,
      updateDestination,
      updateSource
    );
    expect(updateCard).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        id: 'right',
        children: ['d', 'a', 'e'],
        totalChildrenCount: 6,
      }),
      expect.objectContaining({ id: 'a', parentId: 'right' })
    );
    expect(updateSource).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        children: ['b', 'c'],
        totalChildrenCount: 7,
        totalItems: 6,
        totalItemsCount: 5,
      })
    );
    expect(updateDestination).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        children: ['d', 'a', 'e'],
        totalChildrenCount: 6,
        totalItems: 5,
        totalItemsCount: 4,
      })
    );
    expect(next.a.content).toEqual({ label: 'a:right', priority: 2 });
    expect(next.a.parentId).toBe('right');
    expect(next.left.content).toEqual({ label: 'left', priority: 11 });
    expect(next.right.content).toEqual({
      label: 'destination updated',
      priority: 1,
    });
    expect(board.a.content).toEqual({ label: 'a', priority: 1 });
    expect(next.other).toBe(board.other);
  });

  it('retains the moved card when the custom item callback returns void', () => {
    const board = freeze(fixture());
    const updateCard = vi.fn(
      (_column: BoardItem<Content>, card: BoardItem<Content>): void => {
        expect(card.content?.priority).toBe(1);
      }
    );
    const next: BoardData<Content> = dropHandler(move, board, updateCard);
    expect(updateCard).toHaveBeenCalledTimes(1);
    expect(next.a).toEqual({ ...board.a, parentId: 'right' });
  });
});

function columnTarget(columnId: string, edge: 'left' | 'right') {
  const element = document.createElement('div');
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue(
    new DOMRect(0, 0, 100, 100)
  );
  const x = edge === 'left' ? 1 : 99;
  return attachClosestEdge(
    { type: 'column', columnId },
    {
      element,
      allowedEdges: ['left', 'right'],
      input: {
        clientX: x,
        clientY: 50,
        pageX: x,
        pageY: 50,
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
        button: 0,
        buttons: 1,
      },
    }
  );
}
function resolveColumn(
  sourceId: string,
  targetId: string,
  edge: 'left' | 'right',
  gates: Pick<
    DropParams<Content>,
    'freezeFirstColumn' | 'freezeLastColumn' | 'isColumnDraggable'
  > = {}
) {
  const board = freeze(fixture());
  const onCardMove = vi.fn();
  const onColumnMove = vi.fn();
  handleCardDrop({
    source: { id: sourceId, data: { type: 'column', columnId: sourceId } },
    location: {
      current: { dropTargets: [{ data: columnTarget(targetId, edge) }] },
    },
    columns: board.root.children.map((id) => board[id]),
    dataSource: board,
    onCardMove,
    onColumnMove,
    ...gates,
  });
  expect(onCardMove).not.toHaveBeenCalled();
  return onColumnMove;
}

describe('column reorder edges and freeze gates', () => {
  it.each([
    ['left', 'other', 'left', 0, 1],
    ['left', 'other', 'right', 0, 2],
    ['other', 'left', 'left', 2, 0],
    ['other', 'left', 'right', 2, 1],
  ] as const)(
    'moves %s to the %s column %s edge using a final index',
    (source, target, edge, fromIndex, toIndex) => {
      expect(
        resolveColumn(source, target, edge)
      ).toHaveBeenCalledExactlyOnceWith({
        columnId: source,
        fromIndex,
        toIndex,
      });
    }
  );

  it.each([
    ['left', 'right', 'left'],
    ['right', 'left', 'right'],
    ['right', 'right', 'left'],
    ['missing', 'left', 'left'],
    ['left', 'missing', 'right'],
  ] as const)(
    'ignores unchanged or invalid reorder %s onto %s %s',
    (source, target, edge) => {
      expect(resolveColumn(source, target, edge)).not.toHaveBeenCalled();
    }
  );

  it.each([
    ['left', 'other', 'right', { freezeFirstColumn: true }],
    ['other', 'left', 'left', { freezeFirstColumn: true }],
    ['other', 'left', 'left', { freezeLastColumn: true }],
    ['left', 'other', 'right', { freezeLastColumn: true }],
  ] as const)(
    'prevents moving or displacing a frozen endpoint: %s onto %s %s',
    (source, target, edge, gates) => {
      expect(resolveColumn(source, target, edge, gates)).not.toHaveBeenCalled();
    }
  );

  it('allows reorders that preserve the frozen endpoint', () => {
    expect(
      resolveColumn('right', 'other', 'right', { freezeFirstColumn: true })
    ).toHaveBeenCalledExactlyOnceWith({
      columnId: 'right',
      fromIndex: 1,
      toIndex: 2,
    });
    expect(
      resolveColumn('right', 'left', 'left', { freezeLastColumn: true })
    ).toHaveBeenCalledExactlyOnceWith({
      columnId: 'right',
      fromIndex: 1,
      toIndex: 0,
    });
  });

  it('honors the custom source column drag gate', () => {
    const gate = vi.fn(
      (column: BoardItem<Content>) => column.content?.label !== 'left'
    );
    expect(
      resolveColumn('left', 'other', 'right', { isColumnDraggable: gate })
    ).not.toHaveBeenCalled();
    expect(gate).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        id: 'left',
        content: { label: 'left', priority: 1 },
      })
    );
  });
});
