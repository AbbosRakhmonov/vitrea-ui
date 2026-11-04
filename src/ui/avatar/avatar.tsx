import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib';

/**
 * Avatar size variants configuration using class-variance-authority.
 * Defines different avatar sizes with corresponding Tailwind CSS classes.
 */
export const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        /** Small avatar - 32x32px */
        sm: 'size-8',
        /** Default avatar - 40x40px */
        default: 'size-10',
        /** Medium avatar - 52x52px */
        md: 'size-13',
        /** Large avatar - 64x64px */
        lg: 'size-16',
        /** Extra large avatar - 80x80px */
        xl: 'size-20',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

/**
 * Props interface for the Avatar component.
 * Extends Radix UI Avatar Root props with size variant support.
 */
export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

/**
 * Avatar component - A circular container for displaying user profile images or initials.
 *
 * Built on top of Radix UI's Avatar primitive with additional size variants.
 * Supports image display with automatic fallback to placeholder content.
 *
 * @example
 * ```tsx
 * // Basic usage with image and fallback
 * <Avatar size="lg">
 *   <AvatarImage src="/path/to/image.jpg" alt="User name" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 *
 * // Small avatar with custom styling
 * <Avatar size="sm" className="border-2 border-blue-500">
 *   <AvatarImage src="/avatar.jpg" alt="Profile" />
 *   <AvatarFallback className="bg-blue-100">U</AvatarFallback>
 * </Avatar>
 * ```
 *
 * @param size - The size variant of the avatar (sm, default, md, lg, xl)
 * @param className - Additional CSS classes to apply
 * @param children - Child components (typically AvatarImage and AvatarFallback)
 */
export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size }), className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

/**
 * AvatarImage component - Displays the actual avatar image.
 *
 * Automatically handles image loading and will fall back to AvatarFallback
 * if the image fails to load or is not provided.
 *
 * @example
 * ```tsx
 * <AvatarImage
 *   src="https://example.com/avatar.jpg"
 *   alt="John Doe's profile picture"
 *   className="object-cover"
 * />
 * ```
 *
 * @param src - The image source URL
 * @param alt - Alternative text for accessibility
 * @param className - Additional CSS classes to apply
 */
export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square size-full', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

/**
 * AvatarFallback component - Displays fallback content when image is unavailable.
 *
 * Typically contains user initials, an icon, or other placeholder content.
 * Only renders when the AvatarImage fails to load or is not provided.
 *
 * @example
 * ```tsx
 * // Text fallback with user initials
 * <AvatarFallback className="bg-blue-500 text-white">
 *   JD
 * </AvatarFallback>
 *
 * // Icon fallback
 * <AvatarFallback>
 *   <UserIcon className="h-4 w-4" />
 * </AvatarFallback>
 * ```
 *
 * @param className - Additional CSS classes to apply
 * @param children - Fallback content (text, icons, etc.)
 */
export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      // bg-muted resolved to an undefined token, so initials floated with no disc.
      'flex size-full items-center justify-center rounded-full bg-[var(--fill-3)] text-[var(--label)]',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
