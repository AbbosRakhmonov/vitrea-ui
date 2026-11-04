import { type HTMLAttributes, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib';
import {
  type Option,
  Select,
  SelectTrigger,
  SelectValue,
  VirtualizedSelectContent,
} from '../../ui/form';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../ui/pagination';

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
}

/**
 * Renders a pagination control with page links and a "Go to page" selector.
 *
 * Notes
 * - `currentPage` is 1-based. Defaults to 1 when not provided.
 * - `totalPages` is the total number of pages. Defaults to 0 (no pages).
 * - `onPageChange` is called with the 1-based page number whenever the user
 *   selects a page via the page links or the dropdown.
 * - The component uses i18n for the "Go to page" label via `react-i18next`.
 *
 * @param className
 * @param props - Component props
 * @param props.currentPage - The current 1-based page index. Defaults to 1.
 * @param props.totalPages - Total number of pages. Defaults to 0.
 * @param props.onPageChange - Callback invoked with the new 1-based page number.
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
  className,
  ...props
}: MyPaginationProps) => {
  const { t } = useTranslation();

  const getPaginationItems = useCallback(() => {
    const pages: (string | number)[] = [];
    const visibleRange = 1;

    pages.push(1);

    if (currentPage - visibleRange > 2) {
      pages.push('...');
    }

    for (
      let i = Math.max(2, currentPage - visibleRange);
      i <= Math.min(totalPages - 1, currentPage + visibleRange);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage + visibleRange < totalPages - 1) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  const pageOptions = useMemo(() => {
    const options: Option[] = [];
    for (let i = 0; i < totalPages; i++) {
      options.push({
        value: `${i + 1}`,
        label: `${i + 1}`,
      });
    }
    return options;
  }, [totalPages]);

  return (
    <div
      {...props}
      className={cn(
        'flex flex-col items-center justify-end gap-3 lg:flex-row',
        className
      )}
    >
      <div className={'flex items-center gap-3 text-sm'}>
        <div className={'min-w-20 font-semibold'}>{t('Go to page')}:</div>
        <Select
          onValueChange={(page) => onPageChange(parseInt(page))}
          value={`${currentPage}`}
        >
          <SelectTrigger className="h-8.5 w-16">
            <SelectValue />
          </SelectTrigger>
          <VirtualizedSelectContent options={pageOptions} />
        </Select>
      </div>
      <Pagination className={'justify-end'}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              isActive={currentPage > 1}
              size="sm"
              className={cn(currentPage > 1 ? 'disabled' : 'shadow')}
              onClick={() => {
                if (currentPage > 1) {
                  onPageChange(currentPage - 1);
                }
              }}
            />
          </PaginationItem>
          {getPaginationItems().map((page, index) => (
            <PaginationItem
              key={index}
              onClick={() => {
                if (typeof page === 'number') {
                  onPageChange(page);
                }
              }}
            >
              <PaginationLink
                size={'sm'}
                className={cn(
                  'w-9 px-0 text-center',
                  page === currentPage && 'shadow'
                )}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              size="sm"
              onClick={() => {
                if (currentPage < totalPages) {
                  onPageChange(currentPage + 1);
                }
              }}
              className={cn(currentPage < totalPages ? 'disabled' : 'shadow')}
              isActive={currentPage < totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
