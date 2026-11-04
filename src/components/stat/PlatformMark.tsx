import * as React from 'react';
import { cn } from '../../lib';

export const PLATFORM_KEYS = [
  'youtube',
  'facebook',
  'instagram',
  'threads',
  'telegram',
  'x',
  'tiktok',
] as const;

export type PlatformKey = (typeof PLATFORM_KEYS)[number];

export type PlatformMarkProps = {
  platform: PlatformKey;
  /** The platform's name. Required in practice — see the note below. */
  children?: React.ReactNode;
  size?: 'sm' | 'md';
  /** A brand logo, when one is available; the dot is the fallback. */
  icon?: React.ReactNode;
  className?: string;
};

/**
 * A platform's identity in a legend, a card header or a chart key.
 *
 * The dot and the name travel together on purpose. The platform palette is a
 * set of brand colours rather than a palette chosen for separation, and it
 * fails two checks: platform-x reads as grey, and instagram against facebook
 * separates by only ΔE 5.9 under protanopia. Naming the platform is what makes
 * the colour safe to use, so this component does not offer a dot-only mode.
 */
export const PlatformMark = React.memo(function PlatformMark({
  platform,
  children,
  size = 'md',
  icon,
  className,
}: PlatformMarkProps) {
  return (
    <span
      className={cn(
        'lq-mark',
        `lq-platform-${platform}`,
        size === 'sm' && 'lq-mark--sm',
        size === 'sm' ? 'lq-footnote' : 'lq-subheadline',
        className
      )}
    >
      {icon ?? <span className="lq-mark__dot" aria-hidden="true" />}
      {children}
    </span>
  );
});
