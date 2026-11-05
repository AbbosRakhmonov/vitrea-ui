import * as React from 'react';

import type { VariantProps } from 'class-variance-authority';
import { cn } from '../../lib';
import { inputVariants } from './input';

/**
 * Props for the Textarea component.
 */
export type TextareaProps = React.ComponentProps<'textarea'> &
  VariantProps<typeof inputVariants>;

/**
 * Textarea - Multiline text input with Input variants styling.
 *
 * @component
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional classes for the textarea.
 * @param {string} [props.variant] - The variant of the textarea.
 * @returns {JSX.Element} The rendered Textarea component.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          inputVariants({ variant }),
          // Grows with its text up to 24rem, then scrolls - no resize grip in
          // the corner of the field.
          'field-sizing-content h-auto max-h-96 min-h-20 resize-none px-3 py-2',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
