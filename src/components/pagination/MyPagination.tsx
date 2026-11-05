import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type HTMLAttributes, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib';
import {
  type Option,
  Select,
  SelectTrigger,
  SelectValue,
  VirtualizedSelectContent,
} from '../../ui/form';

/**
 * Props for the MyPagination component.
 */
export interface MyPaginationProps extends HTMLAttributes<HTMLDivElement> {
  /** The current 1-based page index. Defaults to 1. */
  currentPage?: number;
  /** Total number of pages. Defaults to 0. */
  totalPages?: number;
  /** Callback invoked with the new 1-based page number. */
  onPageChange: (page: number) => void;
  /** Shows the "Go to page" select before the pager. Defaults to true. */
  showPageSelect?: boolean;
}

/** Page numbers to show around the current one, with "..." for the gaps. */
const getPaginationItems = (currentPage: number, totalPages: number) => {
  const pages: (string | number)[] = [];
  const visibleRange = 1;

  pages.push(1);
  if (currentPage - visibleRange > 2) pages.push('...');
  for (
    let i = Math.max(2, currentPage - visibleRange);
    i <= Math.min(totalPages - 1, currentPage + visibleRange);
    i++
  ) {
    pages.push(i);
  }
  if (currentPage + visibleRange < totalPages - 1) pages.push('...');
  if (totalPages > 1) pages.push(totalPages);

  return pages;
};

// One inset track, like a segmented control: the current page is the raised
// thumb. Pages are real buttons, reachable with the keyboard; the arrows dim
// at either end instead of the whole pager fading.
const ARROW_CLASS =
  'lq-segmented__item flex size-8 items-center justify-center p-0 text-[var(--label)] hover:bg-[var(--fill-3)] disabled:cursor-default disabled:text-[var(--label-3)] disabled:hover:bg-transparent';
const PAGE_CLASS =
  'lq-segmented__item h-8 min-w-8 px-2 tabular-nums hover:bg-[var(--fill-3)] data-[selected=true]:hover:bg-[var(--bg-raised)]';

/**
 * Renders a segmented pager (previous, page numbers, next) and, optionally,
 * a "Go to page" selector.
 *
 * Notes
 * - `currentPage` is 1-based. Defaults to 1 when not provided.
 * - `totalPages` is the total number of pages. Defaults to 0 (no pages).
 * - `onPageChange` is called with the 1-based page number whenever the user
 *   picks another page; it is not called for the page already shown.
 * - The component uses i18n for its labels via `react-i18next`.
 *
 * @param className
 * @param props - Component props
 * @param props.currentPage - The current 1-based page index. Defaults to 1.
 * @param props.totalPages - Total number of pages. Defaults to 0.
 * @param props.onPageChange - Callback invoked with the new 1-based page number.
 * @param props.showPageSelect - Shows the "Go to page" select. Defaults to true.
 * @returns A pagination UI element.
 * @example
 * ```tsx
 * <MyPagination
 *   currentPage={3}
 *   totalPages={10}
 *   onPageChange={(p) => console.log('go to', p)}
 * />
 * ```
 */
export const MyPagination = ({
  currentPage = 1,
  totalPages = 0,
  onPageChange,
  showPageSelect = true,
  className,
  ...props
}: MyPaginationProps) => {
  const { t } = useTranslation();

  const pageOptions = useMemo(() => {
    const options: Option[] = [];
    for (let i = 0; i < totalPages; i++) {
      options.push({ value: `${i + 1}`, label: `${i + 1}` });
    }
    return options;
  }, [totalPages]);

  const go = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <div
      {...props}
      className={cn(
        'flex flex-col items-center justify-end gap-3 lg:flex-row',
        className
      )}
    >
      {showPageSelect && (
        <div className="flex items-center gap-3">
          <span className="lq-footnote lq-label-2">{t('Go to page')}</span>
          <Select
            onValueChange={(page) => go(parseInt(page))}
            value={`${currentPage}`}
          >
            {/* A tinted capsule beside the pager, not a bordered box. */}
            <SelectTrigger className="h-8 w-auto gap-1.5 rounded-full border-0 bg-[var(--fill-3)] px-3 tabular-nums hover:bg-[var(--fill-2)]">
              <SelectValue />
            </SelectTrigger>
            <VirtualizedSelectContent options={pageOptions} />
          </Select>
        </div>
      )}
      <nav aria-label="pagination" className="flex justify-end">
        <div className="lq-segmented lq-segmented--inset items-center gap-0.5">
          <button
            type="button"
            aria-label={t('Go to previous page')}
            className={ARROW_CLASS}
            disabled={currentPage <= 1}
            onClick={() => go(currentPage - 1)}
          >
            <ChevronLeft className="size-4" />
          </button>
          {getPaginationItems(currentPage, totalPages).map((page, index) =>
            typeof page === 'number' ? (
              <button
                key={index}
                type="button"
                aria-current={page === currentPage ? 'page' : undefined}
                data-selected={page === currentPage}
                className={PAGE_CLASS}
                onClick={() => go(page)}
              >
                {page}
              </button>
            ) : (
              <span
                key={index}
                aria-hidden
                className="flex h-8 min-w-6 items-center justify-center text-[var(--label-3)]"
              >
                …
              </span>
            )
          )}
          <button
            type="button"
            aria-label={t('Go to next page')}
            className={ARROW_CLASS}
            disabled={currentPage >= totalPages}
            onClick={() => go(currentPage + 1)}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </nav>
    </div>
  );
};
