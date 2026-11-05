import { memo, type ReactNode } from 'react';
import { cn } from '../../lib';

export type SectionProps = {
  /** A footnote-sized heading above the group. */
  title?: ReactNode;
  /** A glyph before the title. */
  icon?: ReactNode;
  /** A line under the title. */
  description?: ReactNode;
  /** Controls at the right end of the heading row. */
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Classes for the grouped tile. */
  contentClassName?: string;
  /** Lay the content out without the grouped tile (lists that draw their
   * own rows, a single wide control). */
  plain?: boolean;
};

/**
 * Section - One block of a form or a detail view: a quiet heading and the
 * content grouped on an inset tile, the way System Settings groups its
 * controls. Sections stack 20px apart in a Sheet body or a MyModal.
 */
const SectionBase = ({
  title,
  icon,
  description,
  actions,
  children,
  className,
  contentClassName,
  plain,
}: SectionProps) => (
  <section className={cn('flex flex-col gap-2', className)}>
    {(title || actions) && (
      <header className="flex min-h-6 items-center gap-2 px-1">
        {icon && (
          <span className="flex shrink-0 text-[var(--label-2)] [&>svg]:size-4">
            {icon}
          </span>
        )}
        <div className="min-w-0 flex-1">
          {title && (
            <h3 className="lq-footnote font-semibold text-[var(--label-2)]">
              {title}
            </h3>
          )}
          {description && (
            <p className="lq-caption-1 lq-label-2">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 items-center gap-1.5">{actions}</div>
        )}
      </header>
    )}
    <div
      className={cn(
        'flex flex-col gap-4',
        !plain && 'lq-tile p-4',
        contentClassName
      )}
    >
      {children}
    </div>
  </section>
);

export const Section = memo(SectionBase);
