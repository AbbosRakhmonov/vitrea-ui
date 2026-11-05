import * as React from 'react';
import { cn } from '../../lib';
import { groupThousands } from './format';
import { useCountUp } from './useCountUp';

export type StatCardProps = {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  value?: string | number;
  onClick?: () => void;
  /**
   * The spec's rule: a KPI tile sitting directly on the canvas takes the glass
   * material, the way an iOS 26 widget does. Anywhere it sits on another
   * surface it must be solid, because glass is never stacked on glass.
   */
  material?: 'glass' | 'solid';
  /** Numeric values count up on change unless reduced motion is requested. */
  animate?: boolean;
  className?: string;
};

/**
 * A KPI tile: icon chip, label, and the number the screen is about.
 *
 * Props follow the common info-card shape (icon, title, value), so it can
 * replace one with an import change rather than an edit to every call site.
 */
export const StatCard = React.memo(function StatCard({
  icon,
  title,
  value,
  onClick,
  material = 'glass',
  animate = true,
  className,
}: StatCardProps) {
  const numeric = typeof value === 'number' ? value : null;
  const counted = useCountUp(
    numeric ?? 0,
    animate && numeric !== null ? 600 : 0
  );
  const interactive = typeof onClick === 'function';

  return (
    <div
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={cn(
        'lq-stat',
        material === 'glass' ? 'lq-glass' : 'lq-card',
        interactive && 'lq-interactive cursor-pointer',
        className
      )}
    >
      {(icon || title) && (
        <div className="flex items-center gap-2">
          {icon && (
            // Concentric: the tile is radius-lg with 16px of padding, so the
            // chip touching its corner is radius-sm.
            <span className="lq-stat__chip" aria-hidden="true">
              {icon}
            </span>
          )}
          {title && <span className="lq-footnote lq-label-2">{title}</span>}
        </div>
      )}
      {value !== undefined && (
        <span className="lq-numeral-l lq-label" data-numeric>
          {numeric !== null ? groupThousands(counted) : value}
        </span>
      )}
    </div>
  );
});
