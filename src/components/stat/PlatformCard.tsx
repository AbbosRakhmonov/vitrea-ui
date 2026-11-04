import * as React from 'react';
import { cn } from '../../lib';
import { Meter } from './Meter';
import { PlatformMark, type PlatformKey } from './PlatformMark';
import { StatTiles, type StatTile } from './StatTiles';

export type PlatformCardStat = StatTile;

export type PlatformCardAction = {
  name: React.ReactNode;
  value: number;
};

export type PlatformCardProps = {
  platform: PlatformKey;
  title: React.ReactNode;
  /** A brand logo if one is supplied; otherwise the platform dot is used. */
  icon?: React.ReactNode;
  /** Shown top-right, with the people glyph the product already uses. */
  accounts?: number;
  accountsIcon?: React.ReactNode;
  /** The headline tiles — typically total, completed, failed. */
  stats?: PlatformCardStat[];
  /** The per-action breakdown, rendered as meters. */
  actions?: PlatformCardAction[];
  /** Footer link, e.g. "Батафсил кўриш". */
  footer?: React.ReactNode;
  /**
   * Shown instead of the meters when every action is zero. Five empty bars
   * say nothing a single line would not, and take a third of the card to say it.
   */
  emptyLabel?: React.ReactNode;
  /**
   * The platform's total across every action, when `actions` is only the
   * top few. Shares are taken of this, so they stay true when rows are hidden
   * behind "see more". Defaults to the sum of `actions`.
   */
  actionsTotal?: number;
  animate?: boolean;
  /** 'glass' gives the card the KPI tile's Liquid Glass material. */
  material?: 'solid' | 'glass';
  className?: string;
};

/**
 * One platform's activity.
 *
 * Content layer throughout: a solid card holding recessed tiles and meters.
 * Nothing here is glass — the card repeats across the dashboard, and every
 * glass surface costs a backdrop sample, so a row of them would be the exact
 * case the spec caps at five per screen.
 */
export const PlatformCard = React.memo(function PlatformCard({
  platform,
  title,
  icon,
  accounts,
  accountsIcon,
  stats = [],
  actions = [],
  footer,
  emptyLabel,
  actionsTotal,
  animate = true,
  material = 'solid',
  className,
}: PlatformCardProps) {
  // Meters share one scale so their bars are comparable to each other.
  const maxValue = React.useMemo(
    () => actions.reduce((max, a) => Math.max(max, a.value), 0),
    [actions]
  );
  const shown = React.useMemo(
    () => actions.reduce((sum, a) => sum + a.value, 0),
    [actions]
  );
  const total = actionsTotal ?? shown;
  const empty = actions.length > 0 && total === 0 && emptyLabel !== undefined;

  return (
    <div
      className={cn(
        material === 'glass' ? 'lq-glass lq-glass--content' : 'lq-card',
        'flex h-full flex-col p-4',
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <PlatformMark platform={platform} icon={icon} className="lq-title-3">
          {title}
        </PlatformMark>
        {accounts !== undefined && (
          <span className="lq-footnote lq-label-2 flex items-center gap-1">
            {accountsIcon}
            <span data-numeric>{accounts}</span>
          </span>
        )}
      </div>

      {stats.length > 0 && <StatTiles className="mb-3" tiles={stats} />}

      {empty ? (
        <p className="lq-subheadline lq-label-2 flex flex-1 items-center justify-center py-6 text-center">
          {emptyLabel}
        </p>
      ) : (
        actions.map((a, i) => (
          <Meter
            key={i}
            name={a.name}
            value={a.value}
            maxValue={maxValue}
            total={total}
            animate={animate}
            index={i}
          />
        ))
      )}

      {footer && (
        <div className="mt-auto pt-3">
          <hr className="lq-separator mb-3" />
          <div className="flex justify-end">{footer}</div>
        </div>
      )}
    </div>
  );
});
