import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Kanban } from './Kanban';
import { dropHandler } from './dnd/dropManager';
import type { BoardData, BoardItem, CardRenderProps, ConfigMap } from './types';
import { isSkeletonVisible } from './utils';

// jsdom does not apply the board CSS needed by autoscroll's overflow checks.
// Keep the actual draggable/drop-target registrations and drag gates intact.
vi.mock('@atlaskit/pragmatic-drag-and-drop-auto-scroll/element', () => ({
  autoScrollForElements: vi.fn(() => () => {}),
  autoScrollWindowForElements: vi.fn(() => () => {}),
}));

type Content = { label: string };
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
  type: 'task',
  content: { label: id },
});
function fixture(): BoardData<Content> {
  return {
    root: node('root', null, ['left', 'right']),
    left: node('left', 'root', ['a', 'b']),
    right: node('right', 'root', ['c']),
    a: node('a', 'left'),
    b: node('b', 'left'),
    c: node('c', 'right'),
  };
}
function renderer() {
  const card = vi.fn(({ data, isDraggable }: CardRenderProps<Content>) => (
    <span data-testid={`card-${data.id}`} data-can-drag={String(isDraggable)}>
      {data.content?.label}
    </span>
  ));
  const configMap: ConfigMap<Content> = {
    task: { render: card, isDraggable: true },
  };
  return { card, configMap };
}
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('Kanban plain list regressions', () => {
  it('retains local card state when cards reorder', () => {
    function StatefulCard({ data }: CardRenderProps<Content>) {
      const [value, setValue] = useState(data.title);
      return (
        <input
          aria-label={`draft-${data.id}`}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      );
    }
    const configMap: ConfigMap<Content> = {
      task: { render: (props) => <StatefulCard {...props} /> },
    };
    const dataSource = fixture();
    const view = render(
      <Kanban
        dataSource={dataSource}
        configMap={configMap}
        virtualization={false}
      />
    );
    fireEvent.change(screen.getByRole('textbox', { name: 'draft-a' }), {
      target: { value: 'unsaved draft' },
    });
    const reordered = dropHandler(
      {
        cardId: 'a',
        fromColumnId: 'left',
        toColumnId: 'left',
        taskAbove: 'b',
        taskBelow: null,
      },
      dataSource
    );
    view.rerender(
      <Kanban
        dataSource={reordered}
        configMap={configMap}
        virtualization={false}
      />
    );
    expect(screen.getByRole('textbox', { name: 'draft-a' })).toHaveValue(
      'unsaved draft'
    );
    expect(screen.getByRole('textbox', { name: 'draft-b' })).toHaveValue('b');
  });

  it('runs React 19 callback-ref cleanup on ref replacement and unmount only', () => {
    const dataSource = fixture();
    const { configMap } = renderer();
    const firstCleanup = vi.fn();
    const secondCleanup = vi.fn();
    const firstRef = vi.fn((_node: HTMLDivElement | null) => firstCleanup);
    const secondRef = vi.fn((_node: HTMLDivElement | null) => secondCleanup);
    const props = { dataSource, configMap, virtualization: false };
    const view = render(<Kanban {...props} ref={firstRef} />);
    view.rerender(<Kanban {...props} ref={firstRef} rootClassName="updated" />);
    expect(firstCleanup).not.toHaveBeenCalled();
    view.rerender(<Kanban {...props} ref={secondRef} />);
    expect(firstCleanup).toHaveBeenCalledTimes(1);
    view.unmount();
    expect(secondCleanup).toHaveBeenCalledTimes(1);
    expect(firstCleanup).toHaveBeenCalledTimes(1);
  });

  it('clears forwarded object refs and detaches legacy callback refs', () => {
    const { configMap } = renderer();
    const props = { dataSource: fixture(), configMap, virtualization: false };
    const objectRef = createRef<HTMLDivElement>();
    const legacyRef = vi.fn((_node: HTMLDivElement | null) => {});
    const view = render(<Kanban {...props} ref={objectRef} />);
    expect(objectRef.current).toHaveClass('rkk-board');
    view.rerender(<Kanban {...props} ref={legacyRef} />);
    expect(objectRef.current).toBeNull();
    view.unmount();
    expect(legacyRef).toHaveBeenLastCalledWith(null);
  });
  it('does not rerender cards on a stable board rerender', () => {
    const dataSource = fixture();
    const { card, configMap } = renderer();
    const props = { dataSource, configMap, virtualization: false };
    const view = render(<Kanban {...props} />);
    expect(card).toHaveBeenCalledTimes(3);
    card.mockClear();
    view.rerender(<Kanban {...props} />);
    expect(card).not.toHaveBeenCalled();
  });

  it('updates one card without rerendering cards or headers in an unrelated column', () => {
    const dataSource = fixture();
    const { card, configMap } = renderer();
    const header = vi.fn((column: BoardItem<Content>) => (
      <span>{column.title}</span>
    ));
    const props = {
      configMap,
      virtualization: false,
      renderColumnHeader: header,
    };
    const view = render(<Kanban {...props} dataSource={dataSource} />);
    card.mockClear();
    header.mockClear();
    view.rerender(
      <Kanban
        {...props}
        dataSource={{
          ...dataSource,
          a: { ...dataSource.a, content: { label: 'edited' } },
        }}
      />
    );
    expect(screen.getByTestId('card-a').textContent).toBe('edited');
    expect(card.mock.calls.map(([{ data }]) => data.id)).toEqual(['a']);
    expect(header.mock.calls.some(([column]) => column.id === 'right')).toBe(
      false
    );
  });

  it('gates list footers per column and responds to gate changes', () => {
    const dataSource = fixture();
    const { configMap } = renderer();
    const footer = vi.fn((column: BoardItem<Content>) => (
      <span>footer-{column.id}</span>
    ));
    const props = {
      dataSource,
      configMap,
      virtualization: false,
      renderListFooter: footer,
    };
    const view = render(
      <Kanban {...props} allowListFooter={(column) => column.id === 'left'} />
    );
    expect(screen.queryByText('footer-left')).not.toBeNull();
    expect(screen.queryByText('footer-right')).toBeNull();
    expect(footer.mock.calls.every(([column]) => column.id === 'left')).toBe(
      true
    );
    view.rerender(<Kanban {...props} allowListFooter={() => false} />);
    expect(screen.queryByText('footer-left')).toBeNull();
    view.rerender(<Kanban {...props} />);
    expect(screen.queryByText('footer-left')).not.toBeNull();
    expect(screen.queryByText('footer-right')).not.toBeNull();
  });

  it('prevents native card and column drags in viewOnly mode', () => {
    const { configMap } = renderer();
    const onCardMove = vi.fn();
    const onColumnMove = vi.fn();
    const { container } = render(
      <Kanban
        dataSource={fixture()}
        configMap={configMap}
        virtualization={false}
        viewOnly
        onCardMove={onCardMove}
        onColumnMove={onColumnMove}
      />
    );
    const targets = container.querySelectorAll<HTMLElement>(
      '.rkk-card-inner, .rkk-column-header'
    );
    expect(targets.length).toBeGreaterThan(3);
    for (const target of targets) {
      // Real pragmatic DnD cancels dragstart synchronously when canDrag is false.
      const event = new MouseEvent('dragstart', {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(event, 'dataTransfer', { value: { types: [] } });
      fireEvent(target, event);
      expect(event.defaultPrevented).toBe(true);
    }
    expect(onCardMove).not.toHaveBeenCalled();
    expect(onColumnMove).not.toHaveBeenCalled();
  });

  it('reports each scrolling column own dimensions', () => {
    const dataSource = fixture();
    const { configMap } = renderer();
    const onScroll = vi.fn();
    const { container } = render(
      <Kanban
        dataSource={dataSource}
        configMap={configMap}
        virtualization={false}
        onScroll={onScroll}
      />
    );
    const lists = container.querySelectorAll<HTMLElement>(
      '.rkk-column-content-list'
    );
    expect(lists).toHaveLength(2);
    const dimensions = [
      { scrollTop: 31, scrollHeight: 900, clientHeight: 240 },
      { scrollTop: 72, scrollHeight: 1500, clientHeight: 360 },
    ];
    lists.forEach((list, index) => {
      Object.entries(dimensions[index]).forEach(([key, value]) =>
        Object.defineProperty(list, key, { configurable: true, value })
      );
      fireEvent.scroll(list);
    });
    expect(onScroll.mock.calls).toEqual([
      [{ target: dimensions[0] }, dataSource.left],
      [{ target: dimensions[1] }, dataSource.right],
    ]);
  });
});

describe('skeleton visibility respects column clipping', () => {
  it.each([
    [50, 90, false],
    [90, 110, true],
    [150, 180, true],
    [190, 220, true],
    [210, 240, false],
  ])('skeleton from %i to %i is visible: %s', (top, bottom, visible) => {
    const list = document.createElement('div');
    const skeleton = document.createElement('div');
    skeleton.className = 'rkk-generic-item-skeleton';
    list.append(skeleton);
    vi.spyOn(list, 'getBoundingClientRect').mockReturnValue(
      new DOMRect(0, 100, 200, 100)
    );
    vi.spyOn(skeleton, 'getBoundingClientRect').mockReturnValue(
      new DOMRect(0, top, 200, bottom - top)
    );
    expect(isSkeletonVisible(list)).toBe(visible);
  });
});
