import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import * as React from 'react';
import { type CSSProperties, useRef } from 'react';
import { FixedSizeList, FixedSizeList as List } from 'react-window';
import { cn } from '../../lib';
import type { Option } from './react-select';

/**
 * Select primitives built on Radix Select for accessible dropdowns.
 * @example
 * ```tsx
 * <Select>
 *   <SelectTrigger className="w-[180px]">
 *     <SelectValue placeholder="Select a fruit" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectGroup>
 *       <SelectLabel>Fruits</SelectLabel>
 *       <SelectItem value="apple">Apple</SelectItem>
 *       <SelectItem value="banana">Banana</SelectItem>
 *       <SelectItem value="blueberry">Blueberry</SelectItem>
 *       <SelectItem value="grapes">Grapes</SelectItem>
 *       <SelectItem value="pineapple">Pineapple</SelectItem>
 *     </SelectGroup>
 *   </SelectContent>
 * </Select>
 * ```
 */
const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

/**
 * Props for SelectTrigger component.
 */
export type SelectTriggerProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> & {
  variant?: 'default' | 'failure';
};

/**
 * SelectTrigger - The trigger button for the Select.
 * @returns {JSX.Element} The rendered SelectTrigger component.
 * @example
 * ```tsx
 * <SelectTrigger className="w-[180px]">
 *   <SelectValue placeholder="Select a fruit" />
 * </SelectTrigger>
 * ```
 */
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, variant = 'default', ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'border-border-alpha-strong focus:ring-primary data-placeholder:[&>span]:text-body-sm-regular! flex h-10 w-full items-center justify-between rounded-lg border px-3 py-2 focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      'focus:ring-offset-bg data-placeholder:[&>span]:text-secondary/70 focus:ring-item-primary focus:ring-2 focus:ring-offset-2',
      variant === 'failure' &&
        'focus:ring-destructive border-destructive text-destructive! data-placeholder:[&>span]:text-destructive',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/**
 * SelectScrollUpButton - Scrolls the Select viewport up.
 * @returns {JSX.Element} The rendered SelectScrollUpButton component.
 */
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronUp className="size-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

/**
 * SelectScrollDownButton - Scrolls the Select viewport down.
 * @returns {JSX.Element} The rendered SelectScrollDownButton component.
 */
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

/**
 * SelectContent - Popup container for Select options.
 * @returns {JSX.Element} The rendered SelectContent component.
 */
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

/**
 * SelectLabel - Label for a group of Select items.
 * @returns {JSX.Element} The rendered SelectLabel component.
 */
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pr-2 pl-8 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

/**
 * SelectItem - A single option row within the Select.
 * @returns {JSX.Element} The rendered SelectItem component.
 */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

/**
 * SelectSeparator - Visual separator within the list of Select options.
 * @returns {JSX.Element} The rendered SelectSeparator component.
 */
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('bg-muted -mx-1 my-1 h-px', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export type VirtualizedSelectContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
  'children'
> & {
  itemHeight?: number;
  maxHeight?: number;
  options: Option[];
};

/**
 * VirtualizedSelectContent - A virtualized popup container for Select options, optimized for large lists.
 * Uses `react-window` for efficient rendering.
 * @augments {React.ForwardRefExoticComponent<Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>, 'children'> & {itemHeight?: number;maxHeight?: number;options: Option[];} & React.RefAttributes<HTMLDivElement>>}
 * @param {object} props - The props for the VirtualizedSelectContent component.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {Option[]} props.options - The array of options to display in the select.
 * @param {'popper' | 'item-aligned'} [props.position='popper'] - The positioning strategy for the content.
 * @param {number} [props.itemHeight=35] - The height of each item in the virtualized list.
 * @param {number} [props.maxHeight=300] - The maximum height of the virtualized list.
 * @returns {JSX.Element} The rendered VirtualizedSelectContent component.
 */
const VirtualizedSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  VirtualizedSelectContentProps
>(
  (
    {
      className,
      options,
      position = 'popper',
      itemHeight = 35,
      maxHeight = 300,
      ...props
    },
    ref
  ) => {
    const listRef = useRef<FixedSizeList>(null);
    // const [selectedValue, setSelectedValue] = useState(null);
    //
    // useEffect(() => {
    //   // Scroll to selected item when content opens
    //   if (selectedValue && listRef.current && options) {
    //     const index = options.findIndex((opt) => opt.value === selectedValue);
    //     if (index !== -1) {
    //       listRef.current?.scrollToItem(index, 'center');
    //     }
    //   }
    // }, [selectedValue, options]);

    const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
      const option = options[index];
      return (
        <div style={style}>
          <SelectItem value={`${option.value}`}>{option.label}</SelectItem>
        </div>
      );
    };

    return (
      <SelectContent ref={ref} {...props}>
        <List
          ref={listRef}
          height={Math.min(maxHeight, options.length * itemHeight)}
          itemCount={options.length}
          itemSize={itemHeight}
          width="100%"
        >
          {Row}
        </List>
      </SelectContent>
    );
  }
);

VirtualizedSelectContent.displayName = 'VirtualizedSelectContent';

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  VirtualizedSelectContent,
};
