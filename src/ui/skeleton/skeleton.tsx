import { cn } from '../../lib';

/**
 * Skeleton - Placeholder element to indicate loading content.
 * @returns {JSX.Element} The rendered Skeleton component.
 * @param {string} [className] - Additional classes for the skeleton component.
 * @param {React.HTMLAttributes<HTMLDivElement>} [props] - Additional HTML attributes for the skeleton component.
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-muted animate-pulse rounded-md', className)}
      {...props}
    />
  );
}
