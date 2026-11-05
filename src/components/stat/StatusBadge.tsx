import * as React from 'react';
import { cn } from '../../lib';

export type StatusTone = 'neutral' | 'green' | 'red' | 'orange' | 'accent';

export type StatusBadgeProps = {
  tone?: StatusTone;
  /** The status word. Not optional — see the note below. */
  children: React.ReactNode;
  /** A leading dot. On by default for the coloured tones. */
  dot?: boolean;
  className?: string;
};

const TONE_CLASS: Record<StatusTone, string> = {
  neutral: '',
  green: 'lq-badge--green',
  red: 'lq-badge--red',
  orange: 'lq-badge--orange',
  accent: 'lq-badge--accent',
};

/**
 * A status pill.
 *
 * `children` is required rather than optional because the spec is explicit:
 * status always travels with its word. Green and red differ only in hue, so a
 * bare coloured dot says nothing to a red-green colourblind reader — and
 * between online and offline that difference is the whole point.
 */
export const StatusBadge = React.memo(function StatusBadge({
  tone = 'neutral',
  children,
  dot,
  className,
}: StatusBadgeProps) {
  const showDot = dot ?? tone !== 'neutral';
  return (
    <span className={cn('lq-badge', TONE_CLASS[tone], className)}>
      {showDot && <span className="lq-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
});
