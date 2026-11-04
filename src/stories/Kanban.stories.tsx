import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
  Kanban,
  dropColumnHandler,
  dropHandler,
  type BoardData,
  type BoardItem,
  type BoardProps,
} from '../components/kanban';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/form';
import { Skeleton } from '../ui/skeleton';

type Task = { assignee: string; priority: 'High' | 'Normal'; dates: string };
type Props = BoardProps<Task>;

function makeBoard(count = 6, loading = false): BoardData<Task> {
  const columns = ['backlog', 'progress', 'review', 'done'];
  const data: BoardData<Task> = {
    root: {
      id: 'root',
      title: 'Sprint',
      parentId: null,
      children: columns,
      totalChildrenCount: columns.length,
    },
  };
  const titles = [
    'Design task overview',
    'Build search filters',
    'Review permissions',
    'Polish glass surfaces',
    'Test task creation',
    'Ship sprint summary',
  ];
  columns.forEach((id, index) => {
    data[id] = {
      id,
      title: ['Backlog', 'In progress', 'Review', 'Done'][index],
      parentId: 'root',
      children: [],
      totalChildrenCount: 0,
      totalItemsCount: 0,
    };
  });
  for (let index = 0; index < count; index++) {
    // Review deliberately starts empty, ready for a cross-column drop.
    const parentId = columns[[0, 0, 1, 1, 3, 3][index % 6]];
    const id = `task-${index + 1}`;
    data[id] = {
      id,
      title:
        count > 6
          ? `Ticket ${index + 1}: ${titles[index % 6]}`
          : titles[index % 6],
      parentId,
      children: [],
      totalChildrenCount: 0,
      type: 'task',
      content: {
        assignee: ['Aziza Karimova', 'Sam Lee', 'Alex Morgan'][index % 3],
        priority: index % 3 === 0 ? 'High' : 'Normal',
        dates: '03 Nov – 06 Nov',
      },
    };
    data[parentId].children.push(id);
    data[parentId].totalChildrenCount++;
    data[parentId].totalItemsCount!++;
  }
  if (loading)
    columns.forEach((id) => {
      data[id].totalChildrenCount += 3;
    });
  return data;
}

function TaskCard({
  data,
  material = 'glass',
}: {
  data: BoardItem<Task>;
  material?: 'glass' | 'solid';
}) {
  return (
    <Card material={material}>
      <CardHeader>
        <h3 className="text-body-md-medium">{data.title}</h3>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant={data.content?.priority === 'High' ? 'orange' : 'gray'}
          >
            {data.content?.priority}
          </Badge>
          <span className="text-secondary text-xs">
            #{data.id.replace('task-', '')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarFallback>
              {data.content?.assignee
                .split(' ')
                .map((name) => name[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs">{data.content?.assignee}</span>
        </div>
        <p className="text-secondary text-xs">{data.content?.dates}</p>
      </CardContent>
    </Card>
  );
}

const configMap: Props['configMap'] = {
  task: { render: ({ data }) => <TaskCard data={data} />, isDraggable: true },
};

function EditableBoard(args: Props) {
  const [data, setData] = useState(() => args.dataSource);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [message, setMessage] = useState('Ready to organize your sprint');
  const selected = selectedId ? data[selectedId] : undefined;
  const addTask = (column: BoardItem<Task>) => {
    setData((previous) => {
      const id = `task-${crypto.randomUUID()}`;
      const target = previous[column.id];
      return {
        ...previous,
        [id]: {
          id,
          title: 'New ticket',
          parentId: column.id,
          children: [],
          totalChildrenCount: 0,
          type: 'task',
          content: {
            assignee: 'Aziza Karimova',
            priority: 'Normal',
            dates: '03 Nov – 06 Nov',
          },
        },
        [column.id]: {
          ...target,
          children: [...target.children, id],
          totalChildrenCount: target.totalChildrenCount + 1,
          totalItemsCount:
            (target.totalItemsCount ?? target.children.length) + 1,
        },
      };
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-secondary text-sm">
          Drag cards or column headers. Click a task to view and edit.
        </p>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => {
            setData(args.dataSource);
            setMessage('Board reset');
          }}
        >
          Reset board
        </Button>
      </div>
      <Kanban<Task>
        rootClassName="[--kanban-column-width:21rem]"
        rootStyle={{ height: 540 }}
        renderColumnHeader={(column) => (
          <div className="flex items-center justify-between gap-2">
            <Badge variant={column.id === 'done' ? 'green' : 'gray'}>
              {column.title}
            </Badge>
            <Badge variant="gray-outlined">
              {column.totalItemsCount ?? column.totalChildrenCount}
            </Badge>
          </div>
        )}
        renderEmptyColumn={(column) => (
          <p className="text-secondary p-4 text-center text-sm">
            Drop a task in {column.title}
          </p>
        )}
        renderColumnFooter={
          args.viewOnly
            ? undefined
            : (column) => (
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => addTask(column)}
                >
                  Add ticket to {column.title}
                </Button>
              )
        }
        renderColumnAdder={
          args.viewOnly
            ? undefined
            : () => (
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() =>
                    setData((previous) => {
                      const id = `column-${crypto.randomUUID()}`;
                      const children = [...previous.root.children];
                      children.splice(
                        args.freezeLastColumn
                          ? children.length - 1
                          : children.length,
                        0,
                        id
                      );
                      return {
                        ...previous,
                        root: {
                          ...previous.root,
                          children,
                          totalChildrenCount: children.length,
                        },
                        [id]: {
                          id,
                          title: 'New column',
                          parentId: 'root',
                          children: [],
                          totalChildrenCount: 0,
                          totalItemsCount: 0,
                        },
                      };
                    })
                  }
                >
                  Add column
                </Button>
              )
        }
        {...args}
        dataSource={data}
        onCardMove={(move) => {
          setData((previous) => dropHandler(move, previous));
          setMessage(`Moved ${move.cardId} to ${move.toColumnId}`);
          args.onCardMove?.(move);
        }}
        onColumnMove={(move) => {
          setData((previous) =>
            dropColumnHandler(
              { columnId: move.columnId, position: move.toIndex },
              previous
            )
          );
          setMessage(`Moved ${move.columnId} to position ${move.toIndex + 1}`);
          args.onColumnMove?.(move);
        }}
        onCardClick={(event, card) => {
          event.stopPropagation();
          setSelectedId(card.id);
          setDraft(card.title);
          args.onCardClick?.(event, card);
        }}
      />
      <p role="status" className="text-secondary text-xs">
        {message}
      </p>
      <Dialog
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
      >
        <DialogContent>
          <DialogTitle>{selected?.title ?? 'Task details'}</DialogTitle>
          <DialogDescription>
            {selected?.content?.assignee} · {selected?.content?.dates}
          </DialogDescription>
          {args.viewOnly ? (
            <p>{selected?.content?.priority} priority</p>
          ) : (
            <form
              className="space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                if (!selected || !draft.trim()) return;
                setData((previous) => ({
                  ...previous,
                  [selected.id]: {
                    ...previous[selected.id],
                    title: draft.trim(),
                  },
                }));
                setSelectedId(null);
              }}
            >
              <label className="block space-y-2">
                Task title
                <Input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                />
              </label>
              <div className="flex gap-2">
                <Button type="submit" disabled={!draft.trim()}>
                  Save task
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    if (!selected?.parentId) return;
                    const { id, parentId } = selected;
                    setData((previous) => {
                      const next = { ...previous };
                      delete next[id];
                      const column = previous[parentId];
                      next[parentId] = {
                        ...column,
                        children: column.children.filter(
                          (child) => child !== id
                        ),
                        totalChildrenCount: column.totalChildrenCount - 1,
                        totalItemsCount:
                          (column.totalItemsCount ?? column.children.length) -
                          1,
                      };
                      return next;
                    });
                    setSelectedId(null);
                  }}
                >
                  Delete task
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const meta = {
  title: 'Components/Kanban',
  component: Kanban<Task>,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Controlled task board with app-style cards. Moves persist in local state using dropHandler and dropColumnHandler. Review starts empty; drag a task into it. Reset restores the fixture. The final Done column stays pinned when freezeLastColumn is enabled; its cards can still move.',
      },
    },
  },
  args: {
    dataSource: makeBoard(),
    configMap,
    freezeLastColumn: true,
    virtualization: true,
  },
  render: (args) => (
    <EditableBoard key={`${args.virtualization}-${args.viewOnly}`} {...args} />
  ),
} satisfies Meta<Props>;
export default meta;
type Story = StoryObj<typeof meta>;

// virtua hides its measuring container, then restores visibility on each row.
// jest-dom's recursive toBeVisible rejects that ancestor even when the browser
// paints the row. Check effective visibility and real layout instead.
function expectVirtualRowVisible(element: HTMLElement) {
  expect(element).toBeInTheDocument();
  expect(getComputedStyle(element).visibility).toBe('visible');
  expect(element.getBoundingClientRect().height).toBeGreaterThan(0);
}

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('Design task overview'));
    const dialog = within(
      await within(canvasElement.ownerDocument.body).findByRole('dialog')
    );
    await userEvent.clear(dialog.getByRole('textbox', { name: 'Task title' }));
    await userEvent.type(
      dialog.getByRole('textbox', { name: 'Task title' }),
      'Updated task overview'
    );
    await userEvent.click(dialog.getByRole('button', { name: 'Save task' }));
    await waitFor(() =>
      expect(
        canvasElement.ownerDocument.querySelector('[role="dialog"]')
      ).toBeNull()
    );
    await waitFor(() =>
      expectVirtualRowVisible(canvas.getByText('Updated task overview'))
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Add ticket to Review' })
    );
    await waitFor(() =>
      expectVirtualRowVisible(canvas.getByText('New ticket'))
    );
    await expect(
      canvas.queryByText('Drop a task in Review')
    ).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Reset board' }));
    await waitFor(() =>
      expectVirtualRowVisible(canvas.getByText('Design task overview'))
    );
  },
};

export const PlainList: Story = {
  args: { virtualization: false, freezeLastColumn: false },
  parameters: {
    docs: {
      description: {
        story:
          'The same controlled interactions with every row mounted and all column headers movable.',
      },
    },
  },
};

export const ManyCards: Story = {
  args: { dataSource: makeBoard(600), allowColumnAdder: false },
  parameters: {
    docs: {
      description: {
        story:
          '600 variable-height task cards. Scroll within each column to explore virtualization, then drag to reorder or move between columns.',
      },
    },
  },
};

export const ViewOnly: Story = {
  args: { viewOnly: true, allowColumnAdder: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.queryByRole('button', { name: 'Add column' })
    ).not.toBeInTheDocument();
    await userEvent.click(canvas.getByText('Design task overview'));
    const dialog = within(
      await within(canvasElement.ownerDocument.body).findByRole('dialog')
    );
    await waitFor(() =>
      expect(dialog.getByText('High priority')).toBeVisible()
    );
    await expect(
      dialog.queryByRole('button', { name: 'Save task' })
    ).not.toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(
        canvasElement.ownerDocument.querySelector('[role="dialog"]')
      ).toBeNull()
    );
  },
};

export const LoadingSkeletons: Story = {
  args: {
    dataSource: makeBoard(3, true),
    viewOnly: true,
    allowColumnAdder: false,
    virtualization: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'totalChildrenCount includes unloaded rows; totalItemsCount counts real tasks. Skeletons fill the missing rows without fake task records.',
      },
    },
  },
  render: (args) => (
    <Kanban<Task>
      {...args}
      rootStyle={{ height: 540 }}
      renderSkeletonCard={({ index, column }) => (
        <Card
          material="solid"
          aria-label={`Loading ${column.title} task ${index + 1}`}
        >
          <CardContent className="space-y-3 p-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-full" />
          </CardContent>
        </Card>
      )}
    />
  ),
};

export const CustomSlots: Story = {
  args: {
    virtualization: false,
    configMap: {
      ...configMap,
      note: {
        isDraggable: false,
        render: ({ data }) => (
          <Card material="solid">
            <CardContent className="p-4">
              <Badge variant="purple">Pinned note</Badge>
              <p className="mt-2 text-sm">{data.title}</p>
            </CardContent>
          </Card>
        ),
      },
    },
    dataSource: (() => {
      const data = makeBoard();
      data['task-1'] = {
        ...data['task-1'],
        type: 'note',
        title: 'Release checklist (not draggable)',
      };
      return data;
    })(),
    renderColumnWrapper: (column, { children, ...wrapper }) => (
      <section {...wrapper} aria-label={`${column.title} column`}>
        {children}
      </section>
    ),
    renderColumnHeader: (column) => (
      <div className="flex justify-between">
        <Badge variant="blue">{column.title}</Badge>
        <span>{column.totalChildrenCount} tasks</span>
      </div>
    ),
    renderEmptyColumn: () => (
      <p className="p-4 text-center text-sm">
        Ready for review. Drop your first task here.
      </p>
    ),
    renderListFooter: (column) => (
      <p className="text-secondary py-3 text-center text-xs">
        End of {column.title}
      </p>
    ),
    allowListFooter: (column) => column.totalChildrenCount > 0,
    renderCardDragPreview: (card) => (
      <Card material="solid" className="w-64 p-4">
        <Badge variant="blue">Moving task</Badge>
        <p>{card.title}</p>
      </Card>
    ),
    renderCardDragIndicator: (_, { height }) => (
      <div
        className="rounded-lg border-2 border-dashed"
        style={{
          height,
          borderColor: 'var(--label)',
          background: 'var(--fill-3)',
        }}
      />
    ),
    renderColumnDragPreview: (column) => (
      <Card material="solid" className="p-4">
        Moving {column.title}
      </Card>
    ),
    renderColumnDragIndicator: () => (
      <div className="absolute inset-0 rounded-lg border-2 border-dashed" />
    ),
  },
  // Preserve the mixed renderers supplied by this story.
  render: (args) => <EditableBoard {...args} />,
};

export const IsolatedBoards: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Both instances deliberately reuse task and column IDs. Dragging, editing, adding, and resetting affect only their own board. Cross-board drops are ignored.',
      },
    },
  },
  render: (args) => (
    <div className="space-y-8">
      <section aria-label="Product board">
        <h2 className="mb-3 text-lg font-semibold">Product</h2>
        <EditableBoard {...args} />
      </section>
      <section aria-label="Operations board">
        <h2 className="mb-3 text-lg font-semibold">Operations</h2>
        <EditableBoard {...args} />
      </section>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const product = within(
      canvas.getByRole('region', { name: 'Product board' })
    );
    const operations = within(
      canvas.getByRole('region', { name: 'Operations board' })
    );
    await userEvent.click(
      product.getByRole('button', { name: 'Add ticket to Review' })
    );
    await waitFor(() =>
      expectVirtualRowVisible(product.getByText('New ticket'))
    );
    await expect(operations.queryByText('New ticket')).not.toBeInTheDocument();
    await expect(operations.getByText('Drop a task in Review')).toBeVisible();
  },
};
