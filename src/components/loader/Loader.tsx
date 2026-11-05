import type { HTMLAttributes } from 'react';
import { cn } from '../../lib';
import Spin from './Spin';

/**
 * Props for the Loader component.
 */
export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Spinner size: sm 16px, md 24px (default), lg 32px. */
  size?: 'sm' | 'md' | 'lg';
  /** Optional caption under the spinner. */
  text?: string;
}

const SIZE_CLASS: Record<NonNullable<LoaderProps['size']>, string> = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
};

/**
 * Loader shows a centered spinning indicator inside a container, with an
 * optional caption.
 *
 * @param size - Spinner size. Defaults to "md".
 * @param text - Optional caption under the spinner.
 * @param className - Additional CSS classes for the container.
 * @param props - Additional div HTML attributes.
 * @returns {JSX.Element} A loader component with a spinning indicator.
 */
const Loader = ({ size = 'md', text, className, ...props }: LoaderProps) => {
  return (
    <div
      {...props}
      className={cn(
        'text-item-primary mx-auto flex w-full items-center justify-center p-4',
        className
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <Spin className={cn('text-item-primary', SIZE_CLASS[size])} />
        {text && (
          <span className="text-body-sm-regular text-secondary">{text}</span>
        )}
      </div>
    </div>
  );
};

export default Loader;
