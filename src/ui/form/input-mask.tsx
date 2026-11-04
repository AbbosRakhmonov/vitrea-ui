import { forwardRef } from 'react';
import { IMaskInput, type IMaskInputProps } from 'react-imask';
import { cn } from '../../lib';
import { type InputProps, inputVariants } from './input';

/**
 * Props for the MaskInput component.
 * Extends react-imask IMaskInputProps and shares visual variants with Input.
 *
 * @property {'default'|'failure'|'success'} [variant='default'] - Visual state styling.
 */
export type MaskInputProps = IMaskInputProps<HTMLInputElement> &
  InputProps & {};

/**
 * MaskInput - Text input with masking support powered by react-imask.
 *
 * Useful for enforcing formats like phone numbers, dates, etc. Styling mirrors the Input component
 * and supports the same variant prop.
 *
 * @component
 * @param {MaskInputProps} props - Props forwarded to IMaskInput.
 */
const MaskInput = forwardRef<HTMLInputElement, MaskInputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <IMaskInput
        className={cn(inputVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
MaskInput.displayName = 'MaskInput';

export { MaskInput };
