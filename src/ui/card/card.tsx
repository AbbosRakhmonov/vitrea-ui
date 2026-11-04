import * as React from 'react';
import { cn } from '../../lib';

/**
 * CardProps - Native div attributes for the Card container.
 * @property {string} [className] - Additional CSS classes to apply to the card.
 * @property {React.ReactNode} [children] - The content of the card.
 */
export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** 'glass' gives the card the KPI tile's Liquid Glass material. */
  material?: 'solid' | 'glass';
};

/**
 * Card - A surface component to group related content.
 * @returns {JSX.Element} The rendered Card component.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, material = 'solid', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        material === 'glass' ? 'lq-glass lq-glass--content' : 'lq-card',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

/**
 * CardHeader - Top section typically containing the title and actions.
 * @returns {JSX.Element} The rendered CardHeader component.
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-3', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

/**
 * CardTitle - Title area inside the header.
 * @returns {JSX.Element} The rendered CardTitle component.
 */
const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-body-md-medium flex items-center justify-between gap-2 [&>div>svg]:size-5 [&>svg]:size-5',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

/**
 * CardDescription - Secondary text under the title.
 * @returns {JSX.Element} The rendered CardDescription component.
 */
const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('text-body-sm-regular text-secondary', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

/**
 * CardContent - Main content area of the card.
 * @returns {JSX.Element} The rendered CardContent component.
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-body-sm-regular p-3 pt-0', className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

/**
 * CardFooter - Bottom area for actions or summary.
 * @returns {JSX.Element} The rendered CardFooter component.
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-body-sm-regular flex items-center p-3 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
