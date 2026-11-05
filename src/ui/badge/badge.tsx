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
  // One badge: a tinted capsule on the theme tokens, no border. The solid
  // and "-outlined" variants of the old kit (Tailwind 100/500 fills, a 1px
  // rim, white ink) turned into saturated blocks in dark; both names now
  // resolve to the same soft tint, so every call site follows.
  'inline-flex flex-nowrap whitespace-nowrap justify-center items-center gap-1 rounded-full border-0 px-2 text-[12px] leading-none font-medium [&>svg]:size-3.5 [&>svg]:text-current',
  {
    variants: {
      type: {
        default: 'before:hidden',
        status: 'before:hidden',
        // A leading dot in the tone colour.
        indicator:
          'before:inline-block before:size-1.5 before:rounded-full before:bg-current before:content-[""]',
        icon: 'p-0.5 before:hidden',
      },
      variant: {
        default: '!bg-[var(--fill-3)] !text-[var(--label)]',
        'default-outlined': '!bg-[var(--fill-3)] !text-[var(--label)]',
        gray: '!bg-[var(--fill-3)] !text-[var(--label-2)]',
        'gray-outlined': '!bg-[var(--fill-3)] !text-[var(--label-2)]',
        blue: '!bg-[var(--accent-soft)] !text-[var(--accent)]',
        'blue-outlined': '!bg-[var(--accent-soft)] !text-[var(--accent)]',
        cyan: '!bg-[var(--teal-soft)] !text-[var(--teal-text)]',
        'cyan-outlined': '!bg-[var(--teal-soft)] !text-[var(--teal-text)]',
        green: '!bg-[var(--green-soft)] !text-[var(--green-text)]',
        'green-outlined': '!bg-[var(--green-soft)] !text-[var(--green-text)]',
        lime: '!bg-[var(--green-soft)] !text-[var(--green-text)]',
        'lime-outlined': '!bg-[var(--green-soft)] !text-[var(--green-text)]',
        orange: '!bg-[var(--orange-soft)] !text-[var(--orange-text)]',
        'orange-outlined':
          '!bg-[var(--orange-soft)] !text-[var(--orange-text)]',
        red: '!bg-[var(--red-soft)] !text-[var(--red-text)]',
        'red-outlined': '!bg-[var(--red-soft)] !text-[var(--red-text)]',
        purple: '!bg-[var(--purple-soft)] !text-[var(--purple-text)]',
        'purple-outlined':
          '!bg-[var(--purple-soft)] !text-[var(--purple-text)]',
        indigo: '!bg-[var(--indigo-soft)] !text-[var(--indigo-text)]',
        'indigo-outlined':
          '!bg-[var(--indigo-soft)] !text-[var(--indigo-text)]',
      },
      size: {
        sm: 'h-5 min-w-5',
        lg: 'h-6 min-w-6',
      },
      rounded: {
        // Kept for call-site compatibility; badges are capsules.
        default: 'rounded-full',
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
