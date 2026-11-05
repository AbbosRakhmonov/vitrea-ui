// Adapted from react-kanban-kit (Apache-2.0), Copyright 2024 Hazem braiek.
// Modified for Vitrea UI; see THIRD_PARTY_NOTICES.md.
import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Live drag state of a single card.
 * - `idle` — resting.
 * - `is-dragging` — this card is the one being dragged.
 * - `is-dragging-and-left-self` — being dragged and the pointer has left it.
 * - `is-over` — another card is hovering this one; carries the dragged rect and
 *   the closest edge so the drop shadow can render above or below.
 * - `preview` — the floating native drag preview is mounted into `container`.
 */
export type CardDndState =
  | { type: 'idle' }
  | { type: 'is-dragging' }
  | { type: 'is-dragging-and-left-self' }
  | { type: 'is-over'; dragging: DOMRect; closestEdge: Edge }
  | { type: 'preview'; container: HTMLElement; dragging: DOMRect };

/**
 * Live drag state of a single column.
 */
export type ColumnDndState =
  | { type: 'idle' }
  | { type: 'preview'; container: HTMLElement; dragging: DOMRect }
  | { type: 'is-dragging' }
  | { type: 'is-card-over'; isOverChildCard: boolean; dragging: DOMRect }
  | { type: 'is-column-over' };

/**
 * Payload passed to the `onCardDndStateChange` / `onColumnDndStateChange`
 * observers whenever a card or column drag state transitions.
 */
export interface DndState<T = unknown> {
  state: CardDndState | ColumnDndState;
  column?: BoardItem<T>;
  card?: BoardItem<T>;
}

/**
 * Normalised scroll event emitted by both the virtualised and plain lists so
 * consumers can implement infinite scroll without caring which renderer is on.
 */
export interface ScrollEvent {
  target: {
    scrollTop: number;
    scrollHeight: number;
    clientHeight: number;
  };
}

/**
 * Props handed to a card renderer registered in {@link ConfigMap}.
 */
export type CardRenderProps<T = unknown> = {
  /** The card item being rendered. */
  data: BoardItem<T>;
  /** The column the card lives in. */
  column: BoardItem<T>;
  /** Index of the card within its column. */
  index: number;
  /** Whether this card is currently draggable. */
  isDraggable: boolean;
};

/**
 * Maps a card `type` to the renderer (and drag behaviour) used for it. A board
 * can mix card types — each item picks its renderer via `BoardItem.type`.
 */
export type ConfigMap<T = unknown> = {
  [type: string]: {
    render: (props: CardRenderProps<T>) => ReactNode;
    isDraggable?: boolean;
  };
};

/**
 * A single node in the board graph. The same shape models the root, columns and
 * cards; what a node is depends on where it sits in the tree.
 */
export interface BoardItem<T = unknown> {
  id: string;
  title: string;
  parentId: string | null;
  children: string[];
  content?: T;
  type?: keyof ConfigMap<T>;
  totalItems?: number;
  /** Total number of children rendered in the column (incl. not-yet-loaded). */
  totalChildrenCount: number;
  /** Total number of real content items in the column (excludes skeletons). */
  totalItemsCount?: number;
  isDraggable?: boolean;
}

/**
 * Normalised board data: a flat map keyed by id with a required `root` entry
 * whose `children` are the column ids. O(1) lookups keep large boards cheap.
 */
export interface BoardData<T = unknown> {
  root: BoardItem<T>;
  [key: string]: BoardItem<T>;
}

/** Payload emitted by {@link BoardProps.onColumnMove}. */
export interface ColumnMovePayload {
  columnId: string;
  fromIndex: number;
  toIndex: number;
}

/** Payload emitted by {@link BoardProps.onCardMove}. */
export interface CardMovePayload {
  cardId: string;
  fromColumnId: string;
  toColumnId: string;
  taskAbove: string | null;
  taskBelow: string | null;
  position: number;
}

/**
 * Public props for the {@link Kanban} board.
 */
export interface BoardProps<T = unknown> {
  /** Normalised board graph (root → columns → cards). */
  dataSource: BoardData<T>;
  /** Renderers keyed by card `type`. */
  configMap: ConfigMap<T>;
  /** Disables all dragging while still rendering the board. */
  viewOnly?: boolean;
  /** Allow columns to be reordered by dragging their header. Default `true`. */
  allowColumnDrag?: boolean;
  /** Pin the first column so it cannot be moved or displaced. */
  freezeFirstColumn?: boolean;
  /** Pin the last column so it cannot be moved or displaced. */
  freezeLastColumn?: boolean;
  /** Called when a column scrolls near its not-yet-loaded tail. */
  loadMore?: (columnId: string) => void;

  renderSkeletonCard?: (args: {
    index: number;
    column: BoardItem<T>;
  }) => ReactNode;
  renderColumnHeader?: (column: BoardItem<T>) => ReactNode;
  renderCardDragIndicator?: (
    card: BoardItem<T> | null,
    info: { height: number }
  ) => ReactNode;
  renderCardDragPreview?: (
    card: BoardItem<T>,
    info: CardPreviewInfo<T>
  ) => ReactNode;
  renderColumnDragIndicator?: (
    column: BoardItem<T>,
    info: { state: ColumnDndState }
  ) => ReactNode;
  renderColumnDragPreview?: (
    column: BoardItem<T>,
    info: { state: ColumnDndState }
  ) => ReactNode;

  renderListFooter?: (column: BoardItem<T>) => ReactNode;
  allowListFooter?: (column: BoardItem<T>) => boolean;

  renderColumnFooter?: (column: BoardItem<T>) => ReactNode;

  renderColumnAdder?: () => ReactNode;
  allowColumnAdder?: boolean;

  /**
   * Additive: placeholder shown inside a column that has no cards. Rendered only
   * when provided and the column is empty, so existing boards are unaffected.
   */
  renderEmptyColumn?: (column: BoardItem<T>) => ReactNode;
  /**
   * Additive: per-column drag gate, evaluated on top of `allowColumnDrag`,
   * `viewOnly` and the freeze flags. Returning `false` prevents starting a drag
   * from that column. Use the freeze flags to reserve first/last positions.
   */
  isColumnDraggable?: (column: BoardItem<T>) => boolean;

  renderColumnWrapper?: (
    column: BoardItem<T>,
    opts: {
      children: ReactNode;
      className?: string;
      style?: CSSProperties;
      ref?: React.Ref<HTMLDivElement>;
    }
  ) => ReactNode;
  columnWrapperStyle?: (column: BoardItem<T>) => CSSProperties;
  columnHeaderStyle?: (column: BoardItem<T>) => CSSProperties;
  columnListContentStyle?: (column: BoardItem<T>) => CSSProperties;
  columnListContentClassName?: (column: BoardItem<T>) => string;
  columnWrapperClassName?: (column: BoardItem<T>) => string;
  columnHeaderClassName?: (column: BoardItem<T>) => string;
  columnClassName?: (column: BoardItem<T>) => string;
  columnStyle?: (column: BoardItem<T>) => CSSProperties;
  rootStyle?: CSSProperties;
  rootClassName?: string;
  cardWrapperStyle?: (
    card: BoardItem<T>,
    column: BoardItem<T>
  ) => CSSProperties;
  cardWrapperClassName?: string;
  virtualization?: boolean;
  cardsGap?: number;
  onScroll?: (e: ScrollEvent, column: BoardItem<T>) => void;
  onColumnMove?: (payload: ColumnMovePayload) => void;
  onCardMove?: (payload: CardMovePayload) => void;
  onColumnClick?: (
    e: React.MouseEvent<HTMLDivElement>,
    column: BoardItem<T>
  ) => void;
  onCardClick?: (
    e: React.MouseEvent<HTMLDivElement>,
    card: BoardItem<T>
  ) => void;
  onCardDndStateChange?: (info: DndState<T>) => void;
  onColumnDndStateChange?: (info: DndState<T>) => void;
}

/** Extra info handed to a custom card drag-preview renderer. */
export interface CardPreviewInfo<T = unknown> {
  state: CardDndState;
  data: BoardItem<T>;
  column: BoardItem<T>;
  index: number;
  isDraggable: boolean;
}

/**
 * Arguments to the low-level drop resolver. Exposed mainly for tests and
 * advanced integrations; most consumers only use the `onCardMove` /
 * `onColumnMove` callbacks it drives.
 */
export interface DropParams<T = unknown> {
  source: {
    id: string;
    data: Record<string, unknown>;
  };
  location: {
    current: {
      dropTargets: Array<{ data: Record<string, unknown> }>;
    };
  };
  columns: BoardItem<T>[];
  dataSource: BoardData<T>;
  onCardMove?: BoardProps<T>['onCardMove'];
  onColumnMove?: BoardProps<T>['onColumnMove'];
  freezeFirstColumn?: boolean;
  freezeLastColumn?: boolean;
  isColumnDraggable?: (column: BoardItem<T>) => boolean;
}

/**
 * The subset of {@link BoardProps} shared through context to descendants that
 * need global board configuration without prop-drilling.
 */
export interface KanbanSharedProps<T = unknown> {
  instanceId: symbol;
  viewOnly: boolean;
  virtualization: boolean;
  cardsGap: number;
  allowColumnAdder: boolean;
  allowListFooter?: (column: BoardItem<T>) => boolean;
  allowColumnDrag: boolean;
  freezeFirstColumn: boolean;
  freezeLastColumn: boolean;
  isColumnDraggable?: (column: BoardItem<T>) => boolean;
}
