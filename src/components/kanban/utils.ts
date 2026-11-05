// Adapted from react-kanban-kit (Apache-2.0), Copyright 2024 Hazem braiek.
// Modified for Vitrea UI; see THIRD_PARTY_NOTICES.md.
import type { Ref, RefCallback } from 'react';
import type { BoardData, BoardItem, ScrollEvent } from './types';

/**
 * Class-name prefix for the board's structural markup. Kept as `rkk-` so the
 * styling contract consumers already override against stays stable.
 */
export const prefix = 'rkk';

/** Prefixes one class name, or joins a prefixed list. */
export const withPrefix = (
  value: string | string[],
  separator = ' '
): string =>
  Array.isArray(value)
    ? value.map((item) => `${prefix}-${item}`).join(separator)
    : `${prefix}-${value}`;

/** Resolves the ordered column items from a normalised board graph. */
export const getColumnsFromDataSource = <T>(
  dataSource: BoardData<T>
): BoardItem<T>[] => {
  if (!dataSource?.root) return [];
  return (dataSource.root.children ?? []).flatMap((id) =>
    dataSource[id] ? [dataSource[id]] : []
  );
};

/** Resolves a column's ordered child items from the board graph. */
export const getColumnChildren = <T>(
  column: BoardItem<T>,
  dataSource: BoardData<T>
): BoardItem<T>[] => {
  if (!column) return [];
  return (column.children ?? []).flatMap((id) =>
    dataSource[id] ? [dataSource[id]] : []
  );
};

/** Compose object refs, legacy callback refs, and React 19 callback cleanups. */
export const mergeRefs = <T>(
  refA?: Ref<T> | null,
  refB?: Ref<T> | null
): RefCallback<T> => {
  let detach: (() => void) | undefined;
  return (value) => {
    detach?.();
    if (value === null) return;
    const cleanups = [refA, refB].map((ref) => {
      if (typeof ref === 'function') {
        const cleanup = ref(value);
        return typeof cleanup === 'function'
          ? cleanup
          : () => {
              ref(null);
            };
      }
      if (ref) {
        ref.current = value;
        return () => {
          ref.current = null;
        };
      }
      return undefined;
    });
    let attached = true;
    const cleanup = () => {
      if (!attached) return;
      attached = false;
      if (detach === cleanup) detach = undefined;
      cleanups.forEach((cleanup) => cleanup?.());
    };
    detach = cleanup;
    return cleanup;
  };
};

/**
 * Returns true when any skeleton card of a column is inside the viewport,
 * signalling that the column's not-yet-loaded tail should be fetched.
 */
export const isSkeletonVisible = (
  container: HTMLElement,
  limit = 20
): boolean => {
  const skeletons = container.querySelectorAll(
    `.${withPrefix('generic-item-skeleton')}`
  );
  if (!skeletons.length) return false;

  const bounds = container.getBoundingClientRect();
  for (let index = 0; index < Math.min(skeletons.length, limit); index++) {
    const { top, bottom } = skeletons[index].getBoundingClientRect();
    if (
      top < Math.min(bounds.bottom, window.innerHeight) &&
      bottom > Math.max(bounds.top, 0)
    )
      return true;
  }
  return false;
};

/**
 * Normalises the scroll offset from either the virtualised list (which reports
 * a numeric offset) or the plain list (a native scroll event) into a single
 * {@link ScrollEvent} shape before handing it to the consumer.
 */
export const handleScroll = <T>(
  e: React.UIEvent<HTMLDivElement> | number,
  virtualization: boolean,
  onScroll: (e: ScrollEvent, column: BoardItem<T>) => void,
  column: BoardItem<T>,
  scrollContainer: HTMLElement
): void => {
  const { scrollHeight, clientHeight } = scrollContainer;
  const scrollTop = virtualization
    ? typeof e === 'number'
      ? e
      : 0
    : (e as React.UIEvent<HTMLDivElement>).currentTarget.scrollTop;

  onScroll({ target: { scrollTop, scrollHeight, clientHeight } }, column);
};
