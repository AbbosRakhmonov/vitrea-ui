import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '../../lib';

/**
 * Button variants generated using class-variance-authority (CVA).
 * Used to define different styles and sizes for the `Button` component.
 *
 * @property {'default' | 'destructive' | 'secondary' | 'tertiary' | 'ghost' | 'tinted'} variant - Controls visual appearance.
 * @property {'lg' | 'default' | 'sm' | 'xs' | 'icon'} size - Controls the height, padding, and font size of the button.
 */
export const buttonVariants = cva(
  cn(
    'inline-flex border border-border-alpha-strong items-center justify-center gap-2 whitespace-nowrap font-medium',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    'transition-colors disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
    'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-item-primary-focus'
  ),
  {
    variants: {
      variant: {
        default:
          'bg-item-primary hover:bg-item-primary-hover active:bg-item-primary-active !text-white',
        destructive:
          'bg-item-destructive hover:bg-item-destructive-hover active:bg-item-destructive-active focus-visible:ring-2 focus-visible:ring-item-destructive-focus !text-white',
        secondary:
          'bg-item-secondary hover:bg-item-secondary-hover active:bg-item-secondary-active',
        tertiary:
          'bg-item-tertiary hover:bg-item-tertiary-hover active:bg-item-tertiary-active border-0',
        ghost:
          'bg-item-ghost hover:bg-item-ghost-hover active:bg-item-ghost-active border-0',
        // A control inside glass: a translucent fill, never a second glass.
        tinted: 'lq-btn--tinted border-0 text-[var(--label)]',
      },
      size: {
        lg: 'h-12 px-4 text-body-sm-medium [&>svg]:size-5 rounded-5',
        default: 'h-10 px-3 text-body-sm-medium [&>svg]:size-5  rounded-4',
        sm: 'h-8 px-2.5 text-body-xs-medium [&>svg]:size-4 rounded-3',
        xs: 'h-7 px-2 text-body-xs-medium [&>svg]:size-4 rounded-2',
        icon: 'h-10 w-10 text-body-xs-medium [&>svg]:size-4 rounded-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/**
 * Props for the Button component.
 * Extends the native HTML button attributes and supports CVA variant props.
 *
 * @property {boolean} [asChild=false] - If true, renders as a child component (useful for Radix Slot integration).
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Button is a customizable and accessible component used for user actions.
 * It supports multiple visual variants and sizes, and can be rendered as a different element using `asChild`.
 *
 * @component
 * @param {ButtonProps} props - Button props to control appearance and behavior.
 * @param {string} [props.className] - Additional Tailwind CSS classes.
 * @param {'default' | 'destructive' | 'secondary' | 'tertiary' | 'ghost'} [props.variant] - Style variant.
 * @param {'lg' | 'default' | 'sm' | 'xs' | 'icon'} [props.size] - Button size.
 * @param {boolean} [props.asChild=false] - Whether to use `Slot` instead of `button` element.
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref for DOM access.
 * @returns {JSX.Element} Rendered button element.
 *
 * @example
 * ```tsx
 * <Button variant="destructive" size="sm">Delete</Button>
 * <Button asChild><a href="/next-step">Continue</a></Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
