import * as React from 'react';
import { cn } from '../../lib';
import { useCountUp } from './useCountUp';

export type MeterProps = {
  name: React.ReactNode;
  value: number;
  maxValue: number;
  /**
   * Accepted for call-site compatibility and deliberately not painted. The
   * spec is explicit that meters and buttons are never tinted with a platform
   * colour: a meter reads as magnitude, and colour there would read as
   * identity — the same hue would then mean two different things on one screen.
   */
  color?: string;
  animate?: boolean;
  /** Staggers the fill when a list of meters appears together. */
  index?: number;
  /**
   * The sum the row is a share of. When given, the share is shown beside the
   * value, so "12" also reads as "a third of everything on this platform".
   */
  total?: number;
  /** 'lg' for a card whose whole job is the ranking: a heavier bar and type. */
  size?: 'md' | 'lg';
  className?: string;
};

/** A labelled magnitude row: name on the left, value on the right, bar beneath. */
export const Meter = React.memo(function Meter({
  name,
  value,
  maxValue,
  animate = true,
  index = 0,
  total,
  size = 'md',
  className,
}: MeterProps) {
  const lg = size === 'lg';
  const share = total && total > 0 ? Math.round((value / total) * 100) : null;
  const pct = maxValue > 0 ? Math.min(100, (value / maxValue) * 100) : 0;
  const [width, setWidth] = React.useState(animate ? 0 : pct);
  const counted = useCountUp(value, animate ? 600 : 0);

  React.useEffect(() => {
    if (!animate) {
      setWidth(pct);
      return;
    }
    const timer = setTimeout(() => setWidth(pct), index * 120);
    return () => clearTimeout(timer);
  }, [animate, pct, index]);

  return (
    <div className={cn(lg ? 'mb-3.5' : 'mb-2', className)}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        {/* Action names arrive translated and lower-case; the first letter is
         * raised so they read as labels, like every other label on the card. */}
        <span
          className={cn(
            lg ? 'lq-body' : 'lq-subheadline',
            'lq-label truncate first-letter:uppercase'
          )}
        >
          {name}
        </span>
        <span className="flex shrink-0 items-baseline gap-1.5">
          {share !== null && (
            <span className="lq-caption-1 lq-label-2" data-numeric>
              {share}%
            </span>
          )}
          <span
            className={cn(lg ? 'lq-numeral-m' : 'lq-numeral-s', 'lq-label')}
            data-numeric
          >
            {counted}
          </span>
        </span>
      </div>
      <div
        className={cn('lq-meter', lg && 'h-2.5')}
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={maxValue}
      >
        <div className="lq-meter__bar" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
});
