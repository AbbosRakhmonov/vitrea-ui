import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib';
import type { ElementDataType } from '../../types';

/**
 * Dropdown menu primitives for building contextual menus.
 */
const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/**
 * A submenu trigger item that shows a nested menu.
 * @returns {JSX.Element} The rendered DropdownMenuSubTrigger component.
 */
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-sm outline-none select-none focus:bg-[var(--fill-2)] data-[state=open]:bg-[var(--fill-2)] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

/**
 * Container for submenu content.
 * @returns {JSX.Element} The rendered DropdownMenuSubContent component.
 */
const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  // Portalled like the root menu. Radix does not portal a submenu on its own,
  // so it rendered inside its parent, whose overflow-hidden clipped it to a
  // sliver and whose backdrop-filter kept its own glass from blurring.
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        // Submenu: same material as its parent menu. Portalled to <body>, it is a
        // sibling of its parent in the DOM, not a nested surface.
        'lq-glass lq-glass--menu text-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-[var(--radius-md)] p-1',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

/**
 * Root dropdown menu content surface.
 * @returns {JSX.Element} The rendered DropdownMenuContent component.
 */
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        // Liquid Glass: thin material — macOS menus are the lightest chrome in
        // the system. Menu *items* stay unmaterialised on purpose: they repeat,
        // and each one would cost its own compositing layer.
        'lq-glass lq-glass--menu text-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-[var(--radius-md)] p-1',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

/**
 * A selectable menu item.
 * @returns {JSX.Element} The rendered DropdownMenuItem component.
 */
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-sm transition-colors outline-none select-none focus:bg-[var(--fill-2)] focus:text-[var(--label)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

/**
 * A checkbox-style menu item.
 * @returns {JSX.Element} The rendered DropdownMenuCheckboxItem component.
 */
const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default items-center rounded-[var(--radius-sm)] py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none focus:bg-[var(--fill-2)] focus:text-[var(--label)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

/**
 * A radio-style menu item.
 * @returns {JSX.Element} The rendered DropdownMenuRadioItem component.
 */
const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default items-center rounded-[var(--radius-sm)] py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none focus:bg-[var(--fill-2)] focus:text-[var(--label)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

/**
 * Section label within the menu.
 * @returns {JSX.Element} The rendered DropdownMenuLabel component.
 */
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

/**
 * Visual separator between groups of items.
 * @returns {JSX.Element} The rendered DropdownMenuSeparator component.
 */
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('bg-muted -mx-1 my-1 h-px', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

/**
 * Right-aligned keyboard shortcut hint renderer.
 * @returns {JSX.Element} The rendered DropdownMenuShortcut component.
 */
const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

/**
 * Props aggregation for components that wrap DropdownMenu primitives.
 * Useful for high-level components needing to forward props to specific Dropdown parts.
 */
/**
 * Props aggregation for components that wrap DropdownMenu primitives.
 * Useful for high-level components needing to forward props to specific Dropdown parts.
 * @property {React.ComponentPropsWithoutRef<typeof DropdownMenuTrigger> & ElementDataType} [triggerProps] - Props for the DropdownMenuTrigger component.
 * @property {React.ComponentPropsWithoutRef<typeof DropdownMenuContent> & ElementDataType} [contentProps] - Props for the DropdownMenuContent component.
 * @property {React.ComponentPropsWithoutRef<typeof DropdownMenuItem> & ElementDataType} [menuItemProps] - Props for the DropdownMenuItem component.
 * @property {React.ComponentPropsWithoutRef<typeof DropdownMenuSubTrigger> & ElementDataType} [subTriggerProps] - Props for the DropdownMenuSubTrigger component.
 * @property {React.ComponentPropsWithoutRef<typeof DropdownMenuSubContent> & ElementDataType} [subContentProps] - Props for the DropdownMenuSubContent component.
 */
interface DropdownContainerProps {
  triggerProps?: React.ComponentPropsWithoutRef<typeof DropdownMenuTrigger> &
    ElementDataType;
  contentProps?: React.ComponentPropsWithoutRef<typeof DropdownMenuContent> &
    ElementDataType;
  menuItemProps?: React.ComponentPropsWithoutRef<typeof DropdownMenuItem> &
    ElementDataType;
  subTriggerProps?: React.ComponentPropsWithoutRef<
    typeof DropdownMenuSubTrigger
  > &
    ElementDataType;
  subContentProps?: React.ComponentPropsWithoutRef<
    typeof DropdownMenuSubContent
  > &
    ElementDataType;
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  type DropdownContainerProps,
};
