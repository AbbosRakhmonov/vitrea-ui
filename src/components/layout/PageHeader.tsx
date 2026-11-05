import { ChevronLeft } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib';

export type PageHeaderProps = {
  /** The page's name. */
  title: React.ReactNode;
  /**
   * Shown on a sub-page: a back button before the title. A sub-page reached
   * from a list (a record's history, an archive) otherwise has no way
   * back but the browser's.
   */
  onBack?: () => void;
  /** Accessible name of the back button. */
  backLabel?: string;
  /** Controls at the end of the row - a date range, a primary action. */
  actions?: React.ReactNode;
  className?: string;
};

/**
 * The title row of a page: an optional back button, the title, and the
 * page's own controls at the far end, all on one line.
 */
export const PageHeader = ({
  title,
  onBack,
  backLabel = 'Back',
  actions,
  className,
}: PageHeaderProps) => (
  <div
    className={cn(
      'flex flex-wrap items-center justify-between gap-3',
      className
    )}
  >
    <div className="flex min-w-0 items-center gap-2">
      {onBack && (
        <button
          type="button"
          aria-label={backLabel}
          className="lq-btn lq-btn--tinted size-8 shrink-0 p-0"
          onClick={onBack}
        >
          <ChevronLeft className="size-5" />
        </button>
      )}
      <h1 className="text-headline-2xs-medium truncate">{title}</h1>
    </div>
    {actions && <div className="flex items-center gap-2">{actions}</div>}
  </div>
);
