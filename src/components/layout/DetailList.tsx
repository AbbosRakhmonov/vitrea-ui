import { memo, type ReactNode } from 'react';
import { cn } from '../../lib';

export type DetailItem = {
  label: ReactNode;
  value?: ReactNode;
  icon?: ReactNode;
  /** Identifiers (tokens, IDs) read better in a monospaced face. */
  mono?: boolean;
};

export type DetailListProps = {
  title?: ReactNode;
  items: DetailItem[];
  className?: string;
};

const isBlank = (value: ReactNode) =>
  value === undefined ||
  value === null ||
  value === '' ||
  (typeof value === 'string' && value.trim() === '');

/**
 * A titled group of label / value rows - the inset grouped list of a settings
 * screen. Each row names what it shows: the detail sheets had bare icons with
 * an empty line beside them when a field was missing, and "Кенглик: Узунлик:"
 * with nothing after either label. A missing value is a quiet dash.
 *
 * The rows sit on a tile, which inside a glass sheet is a translucent fill.
 */
const DetailListBase = ({ title, items, className }: DetailListProps) => (
  <section className={cn('flex flex-col gap-2', className)}>
    {title && <h3 className="lq-footnote lq-label-2 px-1">{title}</h3>}
    {/* The rows draw their own bottom hairline; the tile clips the last
     * row's so the group ends on its own edge. */}
    <div className="lq-tile overflow-hidden px-3">
      <dl className="-mb-px grid grid-cols-1 gap-x-6 md:grid-cols-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex min-w-0 items-center gap-2.5 border-b border-[var(--separator)] py-2.5"
          >
            {item.icon && (
              <span className="flex shrink-0 text-[var(--label-2)] [&>svg]:size-4">
                {item.icon}
              </span>
            )}
            <dt className="lq-footnote lq-label-2 shrink-0">{item.label}</dt>
            <dd
              className={cn(
                'ml-auto min-w-0 truncate text-right text-[13px] font-medium text-[var(--label)]',
                item.mono && 'font-mono text-[12px]'
              )}
              title={typeof item.value === 'string' ? item.value : undefined}
            >
              {isBlank(item.value) ? (
                <span className="font-normal text-[var(--label-3)]">—</span>
              ) : (
                item.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export const DetailList = memo(DetailListBase);
