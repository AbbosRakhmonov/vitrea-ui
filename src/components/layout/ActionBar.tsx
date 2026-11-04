import * as React from 'react';
import { cn } from '../../lib';

export type ActionBarProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * The actions of a detail page (approve, edit, delete...), pinned to the
 * bottom of the scroll area as a floating glass capsule. The page reads in
 * full above it and the actions stay in reach. Buttons inside take the
 * tinted capsule look automatically (a secondary button on glass); give the
 * one main action the primary variant.
 */
export const ActionBar = ({ children, className }: ActionBarProps) => (
  <div className="pointer-events-none sticky bottom-3 z-10 mt-3 flex justify-end">
    <div
      role="toolbar"
      className={cn(
        'lq-glass lq-glass--menu pointer-events-auto flex flex-wrap items-center justify-end gap-1.5 rounded-full p-1.5',
        className
      )}
    >
      {children}
    </div>
  </div>
);
