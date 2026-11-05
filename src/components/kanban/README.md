# Kanban

```tsx
import { useCallback, useState } from 'react';
import {
  Kanban,
  dropHandler,
  dropColumnHandler,
  type BoardData,
  type BoardProps,
} from 'vitrea-ui/components/kanban';
import 'vitrea-ui/styles.css';

type Task = { assignee: string };
const configMap: BoardProps<Task>['configMap'] = {
  task: { render: ({ data }) => <article>{data.title}</article> },
};

export function Tasks({ initialData }: { initialData: BoardData<Task> }) {
  const [data, setData] = useState(initialData);
  const onCardMove = useCallback<NonNullable<BoardProps<Task>['onCardMove']>>(
    (move) => setData((previous) => dropHandler(move, previous)),
    []
  );
  const onColumnMove = useCallback<
    NonNullable<BoardProps<Task>['onColumnMove']>
  >(
    (move) =>
      setData((previous) =>
        dropColumnHandler(
          { columnId: move.columnId, position: move.toIndex },
          previous
        )
      ),
    []
  );
  return (
    <Kanban
      dataSource={data}
      configMap={configMap}
      onCardMove={onCardMove}
      onColumnMove={onColumnMove}
      rootStyle={{ height: 600 }}
      freezeLastColumn
    />
  );
}
```

Also exported from the package root. The board is controlled: callbacks report
moves, and the consumer supplies updated data. Move helpers preserve the generic
content type, update structural fields/counts immutably, and retain unrelated
node references. Optional helper callbacks can update domain content.

## Data

`dataSource.root.children` lists column IDs. Each column's `children` lists card
IDs. Every referenced node belongs in the flat map and IDs are unique within one
board. Columns have `parentId: 'root'`; cards have their column ID as `parentId`.
Set `totalChildrenCount` to the number of rows, including pending cards; rows
beyond the loaded children render skeletons. `type` selects a `configMap` entry;
unregistered types render a simple title card. Use immutable data updates and
stable renderers/callbacks so unchanged columns and cards can skip rendering.

## Customization

- Slots: column wrapper/header/footer, list footer, card renderer by type,
  skeleton, empty column, column adder, card/column drag preview and indicators.
- Permissions: `viewOnly`, `allowColumnDrag`, `isColumnDraggable`,
  `freezeFirstColumn`, `freezeLastColumn`, per-type/per-item `isDraggable`.
  View-only disables dragging; action permissions inside custom slots remain
  the consumer's responsibility.
- Layout: all existing `*Style` and `*ClassName` hooks, `cardsGap`, and
  `virtualization` (default `true`, dynamic card heights supported).
- Loading: `loadMore(columnId)` fires when scrolling exposes a pending row.
  Deduplicate in-flight requests in the consumer. `onScroll` reports dimensions
  of that column's scroller in either list mode.
- CSS properties on the root: `--kanban-column-width` (264px),
  `--kanban-column-gap` (8px), `--kanban-column-padding` (10px),
  `--kanban-column-radius` (10px), `--kanban-card-radius` (8px),
  `--kanban-column-background`, and `--kanban-drop-background`.
  For wider cards, adjust `--kanban-column-width` (e.g. `21rem`).

The `rkk-*` class names and `data-rkk-*` hooks are preserved for existing styles.
Each board isolates its drag sources and scroll measurements, even when separate
boards reuse the same IDs. Horizontal and vertical autoscroll remain enabled.
Drag interactions use the same native Pragmatic DnD approach as the original;
custom slots can supply alternative accessible move controls using the helpers.

## Migration

Replace `react-kanban-kit` imports with the kit's `components/kanban` subpath
(or root). The existing normalized data and `BoardProps<T>` renderer/move APIs
remain available. No change to the application is made as part of this kit-only
implementation; rebuild/re-vendor the kit before migrating a consumer.

See `src/stories/Kanban.stories.tsx` for interactive examples. See
`THIRD_PARTY_NOTICES.md` at the package root for upstream attribution.

## Verification

- `npm run typecheck` checks the full source and stories.
- `npm run test:kanban` runs move, ref cleanup, rendering and scroll regressions.
- `npm run test:kanban:browser` starts Storybook on port 6007 and runs native
  Chromium drag/drop, virtual scroll, permission, isolation and theme checks.
  Install the Playwright Chromium binary first (`npx playwright install chromium`).
- `npx vitest run --project=storybook` checks all stories in Chromium.
- `npm run build` emits ESM, CommonJS (`.cjs`), types and styles.
