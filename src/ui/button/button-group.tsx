import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib';
import { Separator } from '../separator';

/**
 * Variants for the ButtonGroup component.
 * Defines styles for horizontal and vertical orientations.
 */
const buttonGroupVariants = cva(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none',
        vertical:
          'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

/**
 * A container component that groups buttons together.
 * Supports horizontal (default) and vertical orientations.
 *
 * @param {object} props - The component props.
 * @param {string} [props.className] - Additional class names to apply.
 * @param {"horizontal" | "vertical"} [props.orientation] - The orientation of the button group.
 * @returns {JSX.Element} The rendered ButtonGroup component.
 */
function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

/**
 * A text component designed to be used within a ButtonGroup.
 * It provides consistent styling for text elements alongside buttons.
 *
 * @param {object} props - The component props.
 * @param {string} [props.className] - Additional class names to apply.
 * @param {boolean} [props.asChild=false] - Whether to render as a child element.
 * @returns {JSX.Element} The rendered ButtonGroupText component.
 */
function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={cn(
        "flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-100 px-4 text-sm font-medium shadow-xs dark:border-neutral-800 dark:bg-neutral-800 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

/**
 * A separator component for use within a ButtonGroup.
 * It provides a visual divider between items in the group.
 *
 * @param {object} props - The component props.
 * @param {string} [props.className] - Additional class names to apply.
 * @param {"horizontal" | "vertical"} [props.orientation="vertical"] - The orientation of the separator. Defaults to "vertical".
 * @returns {JSX.Element} The rendered ButtonGroupSeparator component.
 */
function ButtonGroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        'relative !m-0 self-stretch bg-neutral-200 data-[orientation=vertical]:h-auto dark:bg-neutral-800',
        className
      )}
      {...props}
    />
  );
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
};
