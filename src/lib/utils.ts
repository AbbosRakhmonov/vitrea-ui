import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names using `clsx` and `tailwind-merge`.
 * This allows for conditional class names and resolves conflicting Tailwind CSS classes.
 *
 * @param {...ClassValue[]} inputs - Class names or conditional class objects.
 * @returns {string} The merged class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
