import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

import { RiCheckLine, RiSubtractLine } from '@remixicon/react';
import { cn } from '../../lib';

/**
 * Props for the Checkbox component. Extends Radix Checkbox Root props.
 * @property {boolean | 'indeterminate'} [checked] - The checked state of the checkbox.
 * @property {boolean} [disabled] - If true, the checkbox will be disabled.
 */
export type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>;

/**
 * Checkbox - An accessible checkbox with indeterminate state support.
 * @returns {JSX.Element} The rendered Checkbox component.
 * @component
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer size-4 shrink-0 cursor-pointer rounded-[5px] border border-[var(--control-stroke)] transition-colors disabled:cursor-not-allowed disabled:opacity-50',
      'focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-1 focus-visible:outline-none',
      // Checked and mixed share the accent fill with white ink, in both themes
      // (accent-fill holds 4.7:1 under white). The product had a second,
      // app-local checkbox on a different blue; this is the only one now.
      'data-[state=checked]:border-transparent data-[state=checked]:bg-[var(--accent-fill)]',
      'data-[state=indeterminate]:border-transparent data-[state=indeterminate]:bg-[var(--accent-fill)]',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex size-full items-center justify-center text-[var(--on-accent)]">
      {props.checked === 'indeterminate' ? (
        <RiSubtractLine className="size-3.5" />
      ) : (
        <RiCheckLine className="size-3.5" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
