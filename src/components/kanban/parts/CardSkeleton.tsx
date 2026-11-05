// Adapted from react-kanban-kit (Apache-2.0), Copyright 2024 Hazem braiek.
// Modified for Vitrea UI; see THIRD_PARTY_NOTICES.md.
import type { CSSProperties } from 'react';
import { cn } from '../../../lib';
import { withPrefix } from '../utils';

export type SkeletonAnimationType = 'shimmer' | 'pulse' | 'wave';

interface CardSkeletonProps {
  className?: string;
  style?: CSSProperties;
  animationType?: SkeletonAnimationType;
}

/** Placeholder card shown for not-yet-loaded items during infinite scroll. */
const CardSkeleton = ({
  className,
  style,
  animationType = 'shimmer',
}: CardSkeletonProps) => (
  <div
    className={cn(
      withPrefix('skeleton'),
      animationType === 'pulse' && withPrefix('skeleton-pulse'),
      animationType === 'wave' && withPrefix('skeleton-wave'),
      className
    )}
    style={style}
  >
    <div className={withPrefix('skeleton-content')}>
      <div className={withPrefix('skeleton-title')} />
      <div className={withPrefix('skeleton-description')}>
        <div className={withPrefix('skeleton-line')} />
        <div
          className={cn(
            withPrefix('skeleton-line'),
            withPrefix('skeleton-line-short')
          )}
        />
      </div>
    </div>
  </div>
);

export default CardSkeleton;
