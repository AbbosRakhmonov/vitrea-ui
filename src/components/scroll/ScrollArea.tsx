import type { ComponentProps } from 'react';
import { cn } from '../../lib';

/**
 * ScrollArea is a simple styled scrollable container div.
 *
 * @param props - Native div props.
 * @param className - className extends default scrollbar styles.
 * @returns {JSX.Element} A scrollable container component.
 */
export const ScrollArea = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      {...props}
      className={cn(
        'scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-auto',
        className
      )}
    />
  );
};
