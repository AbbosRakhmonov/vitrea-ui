import type { HTMLAttributes } from 'react';
import { cn } from '../../lib';

/**
 * Props for the Spin component.
 */
export type SpinProps = HTMLAttributes<HTMLOrSVGElement>;

/**
 * Spin renders a simple SVG spinner. You can override className to change size/color.
 *
 * @param props - Optional HTML/SVG attributes applied to the svg element.
 * @returns {JSX.Element} An SVG spinner element.
 */
const Spin = (props?: SpinProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
      className={cn('mr-1 size-5 animate-spin text-white', props?.className)}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export default Spin;
