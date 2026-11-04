import {
  forwardRef,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';
import { cn } from '../../lib';

/**
 * Table - Semantic table container with default styling.
 * @returns {JSX.Element} The rendered Table component.
 */
const Table = forwardRef<
  HTMLTableElement,
  HTMLAttributes<HTMLTableElement> & {
    /** Wraps the table in its own scroll container (flex-1, both axes), so a
     * sticky header pins inside it. The app's tables all scrolled this way
     * through an app-local copy of this component. */
    scrollable?: boolean;
  }
>(({ className, scrollable, ...props }, ref) => {
  const table = (
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  );
  return scrollable ? (
    <div className="w-full flex-1 overflow-auto">{table}</div>
  ) : (
    table
  );
});
Table.displayName = 'Table';

/**
 * TableHeader - Wrapper for the thead element.
 * @returns {JSX.Element} The rendered TableHeader component.
 */
const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement> & {
    /** Pins the header row while the body scrolls under it. It paints no
     * surface of its own: a consumer gives the row --fill-head (a hair off
     * the rows) or fades the rows beneath it. */
    sticky?: boolean;
  }
>(({ className, sticky, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn('[&_tr]:border-b', sticky && 'sticky top-0 z-10', className)}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

/**
 * TableBody - Wrapper for the tbody element.
 * @returns {JSX.Element} The rendered TableBody component.
 */
const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

/**
 * TableFooter - Wrapper for the tfoot element.
 * @returns {JSX.Element} The rendered TableFooter component.
 */
const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
      className
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

/**
 * TableRow - Styled tr element.
 * @returns {JSX.Element} The rendered TableRow component.
 */
const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

/**
 * TableHead - Styled th element.
 * @returns {JSX.Element} The rendered TableHead component.
 */
const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-10 px-4 text-left align-middle font-medium text-[var(--label-2)] [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

/**
 * TableCell - Styled td element.
 * @returns {JSX.Element} The rendered TableCell component.
 */
const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

/**
 * TableCaption - Styled caption element.
 * @returns {JSX.Element} The rendered TableCaption component.
 */
const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('text-muted-foreground mt-4 text-sm', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
