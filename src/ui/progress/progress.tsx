import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';
import { cn } from '../../lib';

const TONE = {
  accent: 'bg-[var(--accent)]',
  green: 'bg-[var(--green)]',
  orange: 'bg-[var(--orange)]',
  red: 'bg-[var(--red)]',
} as const;

/**
 * Progress component - Displays an indicator showing the completion progress of a task.
 * Built on Radix UI Progress primitive. A slim capsule on the fill track; the
 * tone names what the bar measures (a success rate is green), never a status
 * on its own - the value is always printed beside it.
 * @returns {JSX.Element} The rendered Progress component.
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {number} [props.value] - The progress value (0-100).
 * @param {'accent'|'green'|'orange'|'red'} [props.tone] - Indicator colour.
 * @param {React.ReactNode} [props.children] - Optional content overlaid on the progress bar.
 */
function Progress({
  className,
  value,
  tone = 'accent',
  children,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  tone?: keyof typeof TONE;
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'relative h-1.5 w-full overflow-hidden rounded-full bg-[var(--fill-3)]',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          'h-full w-full flex-1 rounded-full transition-all duration-[var(--duration-base)] ease-[var(--ease-liquid)]',
          TONE[tone]
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
      {children != null && (
        <div className="absolute inset-y-0 left-1 flex items-center text-[10px] leading-none font-semibold text-[var(--on-accent)]">
          {children}
        </div>
      )}
    </ProgressPrimitive.Root>
  );
}

export { Progress };
