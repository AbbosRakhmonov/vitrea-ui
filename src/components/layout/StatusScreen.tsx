import * as React from 'react';
import { cn } from '../../lib';

const TONE = {
  accent: 'bg-[var(--accent-soft)] text-[var(--accent)]',
  red: 'bg-[var(--red-soft)] text-[var(--red)]',
  orange: 'bg-[var(--orange-soft)] text-[var(--orange)]',
} as const;

export type StatusScreenProps = {
  /** A large status numeral above the card's content - "404", "403". */
  code?: string;
  /** The glyph in the tinted circle. */
  icon?: React.ReactNode;
  /** The circle's hue: accent for "not here", red for errors and denials. */
  tone?: keyof typeof TONE;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** The way out - a home link, a reload button. */
  actions?: React.ReactNode;
  /** Small print under a hairline at the foot of the card. */
  hint?: React.ReactNode;
  className?: string;
};

/**
 * A full-screen status page - not found, forbidden, a crash. The canvas with
 * its ambient light and one glass card, all on the theme tokens, so it follows
 * light and dark like every other screen. The product's three versions were
 * hand-painted slate and indigo gradients on a white card in either theme.
 */
export const StatusScreen = ({
  code,
  icon,
  tone = 'accent',
  title,
  description,
  actions,
  hint,
  className,
}: StatusScreenProps) => (
  <div
    className={cn(
      'lq-canvas flex min-h-screen items-center justify-center p-4 text-[var(--label)]',
      className
    )}
  >
    <main className="lq-glass lq-glass--content w-full max-w-lg px-8 py-10 text-center sm:px-12">
      {code && (
        <p
          aria-hidden
          className="mb-4 font-[family-name:var(--font-rounded)] text-7xl leading-none font-bold tracking-tight text-[var(--label-3)] tabular-nums"
        >
          {code}
        </p>
      )}
      {icon && (
        <div
          className={cn(
            'mx-auto mb-4 flex size-14 items-center justify-center rounded-full [&>svg]:size-7',
            TONE[tone]
          )}
        >
          {icon}
        </div>
      )}
      <h1 className="text-[22px] leading-tight font-semibold tracking-tight">
        {title}
      </h1>
      {description && (
        <div className="mt-2 space-y-1 text-[15px] leading-relaxed text-[var(--label-2)]">
          {description}
        </div>
      )}
      {actions && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {actions}
        </div>
      )}
      {hint && (
        <p className="mt-8 border-t border-[var(--separator)] pt-5 text-xs leading-relaxed text-[var(--label-2)]">
          {hint}
        </p>
      )}
    </main>
  </div>
);
