import * as React from 'react';
import { cn } from '../../lib';

export type StatTileTone = 'neutral' | 'green' | 'red' | 'orange';

export type StatTile = {
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: StatTileTone;
  onClick?: () => void;
};

export type StatTilesProps = {
  tiles: StatTile[];
  /** Tiles per row. Two reads best inside a card at dashboard widths. */
  columns?: 2 | 3;
  className?: string;
};

const TONE_COLOR: Record<StatTileTone, string> = {
  neutral: 'var(--label-2)',
  green: 'var(--green-text)',
  red: 'var(--red-text)',
  orange: 'var(--orange-text)',
};

/**
 * A row of recessed tiles inside a card.
 *
 * `.lq-tile` is radius-md, which is the card's radius-lg minus its 16px of
 * padding — the spec's concentric rule, so an inner corner stays parallel to
 * the outer one instead of looking pinched.
 *
 * Tone colours the label, never the number: the word carries the status, and
 * a coloured value would read as a different measurement rather than a state.
 */
export const StatTiles = React.memo(function StatTiles({
  tiles,
  columns = 2,
  className,
}: StatTilesProps) {
  return (
    <div
      className={cn(
        'grid gap-2',
        columns === 3 ? 'grid-cols-3' : 'grid-cols-2',
        className
      )}
    >
      {tiles.map((t, i) => {
        const interactive = typeof t.onClick === 'function';
        // An odd tile out takes the whole last row instead of leaving an empty
        // cell beside it: with total / completed / failed that puts the two
        // outcomes side by side and the failure on its own line.
        const last = i === tiles.length - 1;
        const spans = last && tiles.length % columns !== 0;
        return (
          <div
            key={i}
            onClick={t.onClick}
            onKeyDown={
              interactive
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      t.onClick?.();
                    }
                  }
                : undefined
            }
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            className={cn(
              'lq-tile flex flex-col justify-between gap-1.5 px-3 py-2',
              spans && (columns === 3 ? 'col-span-3' : 'col-span-2'),
              interactive && 'lq-interactive cursor-pointer'
            )}
          >
            <span
              className="lq-caption-1 block"
              style={{ color: TONE_COLOR[t.tone ?? 'neutral'] }}
            >
              {t.label}
            </span>
            <span className="lq-numeral-m lq-label block" data-numeric>
              {t.value}
            </span>
          </div>
        );
      })}
    </div>
  );
});
