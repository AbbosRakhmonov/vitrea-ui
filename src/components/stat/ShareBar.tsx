import * as React from 'react';
import { cn } from '../../lib';
import { groupThousands } from './format';

export type ShareSegment = {
  key: string;
  label: React.ReactNode;
  value: number;
  /** A CSS colour, normally a --viz-* token. */
  color: string;
};

export type ShareBarProps = {
  segments: ShareSegment[];
  /** Shown instead of the bar when every segment is zero. */
  emptyLabel?: React.ReactNode;
  /** false renders the legend alone - for use beside a chart that already
   * draws the proportions, such as a donut. */
  bar?: boolean;
  className?: string;
};

/**
 * Part-to-whole for a handful of parts: one bar split into segments, with a
 * legend that carries the numbers.
 *
 * Used where the product had a two- or three-slice donut. A donut asks the eye
 * to compare arc angles; a single bar compares lengths along one axis, which
 * is read faster and more accurately, and the figures sit beside it instead of
 * in a ring centre. Segments are separated by a 2px gap so neighbours never
 * merge, and every segment is named in the legend - identity is never carried
 * by colour alone.
 */
export const ShareBar = React.memo(function ShareBar({
  segments,
  emptyLabel,
  bar = true,
  className,
}: ShareBarProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const pct = (v: number) => (total > 0 ? Math.round((v / total) * 100) : 0);

  if (total === 0 && emptyLabel !== undefined) {
    return (
      <p
        className={cn('lq-subheadline lq-label-2 py-6 text-center', className)}
      >
        {emptyLabel}
      </p>
    );
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {bar && (
        <div className="flex h-3 w-full gap-0.5" role="img" aria-hidden="true">
          {segments
            .filter((s) => s.value > 0)
            .map((s, i, shown) => (
              <div
                key={s.key}
                title={`${typeof s.label === 'string' ? s.label : s.key}: ${groupThousands(s.value)} (${pct(s.value)}%)`}
                className={cn(
                  'h-full min-w-1',
                  i === 0 && 'rounded-s-full',
                  i === shown.length - 1 && 'rounded-e-full'
                )}
                style={{
                  flexGrow: s.value,
                  flexBasis: 0,
                  backgroundColor: s.color,
                }}
              />
            ))}
        </div>
      )}

      <ul className="flex flex-col gap-2.5">
        {segments.map((s) => (
          <li key={s.key} className="flex items-center gap-2.5">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: s.color }}
              aria-hidden="true"
            />
            <span className="lq-subheadline lq-label grow truncate first-letter:uppercase">
              {s.label}
            </span>
            <span className="lq-caption-1 lq-label-2" data-numeric>
              {pct(s.value)}%
            </span>
            <span
              className="lq-numeral-s lq-label min-w-[3ch] text-end"
              data-numeric
            >
              {groupThousands(s.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
});
