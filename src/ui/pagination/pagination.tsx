import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib';
import { type ButtonProps, buttonVariants } from '../button';

/**
 * Pagination - Navigation component for paginated content.
 * @returns {JSX.Element} The rendered Pagination component.
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional classes for the pagination component.
 */
const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

/**
 * PaginationContent - Wrapper list for pagination items.
 * @returns {JSX.Element} The rendered PaginationContent component.
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional classes for the pagination content component.
 */
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

/**
 * PaginationItem - List item wrapper.
 * @returns {JSX.Element} The rendered PaginationItem component.
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional classes for the pagination item component.
 */
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

/**
 * Props for PaginationLink.
 * @property {boolean} [isActive] - Marks the current page.
 * @property {'lg'|'default'|'sm'|'xs'|'icon'} [size] - Button size forwarded to Button variants.
 */
type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

/**
 * PaginationLink - A styled anchor used as a pagination control.
 * @returns {JSX.Element} The rendered PaginationLink component.
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional classes for the pagination link component.
 * @param {boolean} [props.isActive] - Marks the current page.
 * @param {string} [props.size] - The size of the pagination link.
 */
const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'tertiary' : 'ghost',
        size,
      }),
      'cursor-pointer',
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

/**
 * PaginationPrevious - Button to navigate to previous page.
 * @returns {JSX.Element} The rendered PaginationPrevious component.
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional classes for the pagination previous component.
 */
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const { t } = useTranslation();
  return (
    <PaginationLink
      aria-label={t('Go to previous page')}
      size="default"
      className={cn('gap-1 px-2.5', className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
    </PaginationLink>
  );
};
PaginationPrevious.displayName = 'PaginationPrevious';

/**
 * PaginationNext - Button to navigate to next page.
 * @returns {JSX.Element} The rendered PaginationNext component.
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional classes for the pagination next component.
 */
const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const { t } = useTranslation();
  return (
    <PaginationLink
      aria-label={t('Go to next page')}
      size="default"
      className={cn('gap-1 px-2.5', className)}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
};
PaginationNext.displayName = 'PaginationNext';

/**
 * PaginationEllipsis - Non-interactive indicator for collapsed pages.
 * @returns {JSX.Element} The rendered PaginationEllipsis component.
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional classes for the pagination ellipsis component.
 */
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => {
  const { t } = useTranslation();
  return (
    <span
      aria-hidden
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">{t('More pages')}</span>
    </span>
  );
};
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  type PaginationLinkProps,
};
