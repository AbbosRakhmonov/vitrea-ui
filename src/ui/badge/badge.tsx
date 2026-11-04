import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib';

/**
 * Badge variants generated using class-variance-authority (CVA).
 * Controls the appearance of the Badge component through various props:
 *
 * @property {'default' | 'status' | 'indicator' | 'icon'} type - Determines the role and style behavior.
 * @property {'default' | 'gray' | 'blue' | 'cyan' | 'green' | 'lime' | 'orange' | 'red' | 'purple' | 'indigo' |
 *   'default-outlined' | 'gray-outlined' | 'blue-outlined' | 'cyan-outlined' | 'green-outlined' | 'lime-outlined' |
 *   'orange-outlined' | 'red-outlined' | 'purple-outlined' | 'indigo-outlined'} variant - The color scheme and outlined style.
 * @property {'sm' | 'lg'} size - The size of the badge.
 * @property {'default' | 'full'} rounded - The border-radius of the badge.
 */
export const badgeVariants = cva(
  'inline-flex flex-nowrap whitespace-nowrap justify-center items-center border px-2.5 text-body-2xs-medium dark:border [&>svg]:size-3.5 gap-1',
  {
    variants: {
      type: {
        default: '!text-white before:hidden ',
        status:
          '!text-primary !border-border-alpha-subtle !bg-transparent before:hidden ',
        indicator:
          '!text-white before:content-[""] before:inline-block before:size-2 before:rounded-xs',
        icon: '!text-white [&>svg]:!text-white p-0.5 before:hidden ',
      },
      variant: {
        default: 'bg-neutral-950 dark:bg-neutral-0 before:bg-white',
        gray: 'bg-gray-500 [&>svg]:text-gray-700 before:bg-gray-700',
        blue: 'bg-blue-500 [&>svg]:text-blue-700 before:bg-blue-700',
        cyan: 'bg-cyan-500 [&>svg]:text-cyan-700 before:bg-cyan-700',
        // White on systemGreen is 2:1; the fill/ink pair holds 5:1+ in both themes.
        green:
          'bg-[var(--green-fill)] !text-[var(--on-green)] [&>svg]:!text-[var(--on-green)] before:bg-[var(--on-green)]',
        lime: 'bg-lime-500 [&>svg]:text-lime-700 before:bg-lime-700',
        // Orange carries dark ink, as Apple's does - white on it is 2.2:1.
        orange:
          'bg-orange-500 !text-[rgb(0_0_0/85%)] [&>svg]:!text-[rgb(0_0_0/85%)] before:bg-[rgb(0_0_0/85%)]',
        red: 'bg-red-500 [&>svg]:text-red-700 before:bg-red-700',
        purple: 'bg-purple-500 [&>svg]:text-purple-700 before:bg-purple-700',
        indigo: 'bg-indigo-500 [&>svg]:text-indigo-700 before:bg-indigo-700',
        'default-outlined':
          '!bg-item-primary-secondary !text-primary border-border-alpha-subtle [&>svg]:!text-primary  before:bg-primary',
        'gray-outlined':
          '!bg-neutral-alpha-5 !text-secondary [&>svg]:!text-gray-700 before:bg-gray-700',
        'blue-outlined':
          '!bg-blue-100 !text-blue-700 border-blue-200 [&>svg]:!text-blue-700 before:bg-blue-700',
        'cyan-outlined':
          '!bg-cyan-100 !text-cyan-700 border-cyan-200 [&>svg]:!text-cyan-700 before:bg-cyan-700',
        'green-outlined':
          '!bg-green-100 !text-green-700 border-green-200 [&>svg]:!text-green-700 before:bg-green-700',
        'lime-outlined':
          '!bg-lime-100 !text-lime-700 border-lime-200 [&>svg]:!text-lime-700 before:bg-lime-700',
        'orange-outlined':
          '!bg-orange-100 !text-orange-700 border-orange-200 [&>svg]:!text-orange-700 before:bg-orange-700',
        'red-outlined':
          '!bg-red-100 !text-red-700 border-red-200 [&>svg]:!text-red-700 before:bg-red-700',
        'purple-outlined':
          '!bg-purple-100 !text-purple-700 border-purple-200 [&>svg]:!text-purple-700 before:bg-purple-700',
        'indigo-outlined':
          '!bg-indigo-100 !text-indigo-700 border-indigo-200 [&>svg]:!text-indigo-700 before:bg-indigo-700',
      },
      size: {
        sm: 'h-5 min-w-5',
        lg: 'h-6 min-w-6',
      },
      rounded: {
        default: 'rounded-md',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      rounded: 'default',
      size: 'sm',
      type: 'default',
    },
  }
);

/**
 * Props for the Badge component.
 * Extends native HTML div props and adds styling variants.
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge is a UI component used to display status indicators, labels, or counters.
 *
 * @component
 * @param {BadgeProps} props - Props for customizing the badge.
 * @param {string} [props.className] - Additional Tailwind CSS classes.
 * @param {'default' | 'status' | 'indicator' | 'icon'} [props.type] - Type of badge.
 * @param {'default' | 'gray' | 'blue' | 'cyan' | 'green' | 'lime' | 'orange' | 'red' | 'purple' | 'indigo' |
 *   'default-outlined' | 'gray-outlined' | 'blue-outlined' | 'cyan-outlined' | 'green-outlined' | 'lime-outlined' |
 *   'orange-outlined' | 'red-outlined' | 'purple-outlined' | 'indigo-outlined'} [props.variant] - Color scheme of badge.
 * @param {'sm' | 'lg'} [props.size] - Size of the badge.
 * @param {'default' | 'full'} [props.rounded] - Border radius style.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - All other native div props.
 * @returns {JSX.Element} Rendered badge component.
 */
export function Badge({
  className,
  variant,
  rounded,
  type,
  size,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ type, variant, rounded, size }), className)}
      {...props}
    />
  );
}

Badge.displayName = 'Badge';
