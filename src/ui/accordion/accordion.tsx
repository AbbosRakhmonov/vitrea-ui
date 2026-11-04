import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib';

/**
 * Accordion root component built on top of Radix UI's Accordion.Root.
 *
 * This component simply forwards all props to Radix and adds a `data-slot="accordion"`
 * attribute so it can be targeted by design systems or tests. Use it to wrap
 * one or more AccordionItem children.
 *
 * Accessibility:
 * - Behaves according to the underlying Radix primitive, which follows WAI-ARIA practices.
 *
 * @example
 * ```tsx
 * <Accordion type="single" collapsible defaultValue="item-1">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Title</AccordionTrigger>
 *     <AccordionContent>Body</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 *
 * @param props - All props supported by `@radix-ui/react-accordion` Root component.
 * @returns The Accordion root element.
 */
function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

/**
 * A single accordion item container. Wraps a Trigger and Content pair.
 *
 * Adds a bottom border by default (removed on the last item) and forwards all
 * props to Radix's Accordion.Item. Includes `data-slot="accordion-item"` for styling hooks.
 *
 * @param className - Optional class names merged with defaults.
 * @param props - All other props supported by Radix Accordion.Item (e.g., `value`).
 * @returns The Accordion item element.
 */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-b last:border-b-0', className)}
      {...props}
    />
  );
}

/**
 * The clickable control that toggles an accordion item's open/closed state.
 *
 * Renders inside a Radix Accordion.Header and forwards props to Accordion.Trigger.
 * Applies utility classes for focus styles and rotates the chevron icon when open.
 * Includes `data-slot="accordion-trigger"` for styling hooks.
 *
 * Accessibility:
 * - Receives correct ARIA attributes from Radix (e.g., aria-expanded, aria-controls).
 * - Fully keyboard accessible.
 *
 * @param className - Optional class names merged with defaults.
 * @param children - The trigger content (usually a title/label).
 * @param props - Other Radix trigger props.
 * @returns A button-like element that controls the item.
 */
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/**
 * The collapsible region that reveals an accordion item's content.
 *
 * Forwards props to Radix Accordion.Content and adds enter/exit animations via
 * data-state classes. Content is wrapped with padding container. Includes
 * `data-slot="accordion-content"` for styling hooks.
 *
 * @param className - Optional class names merged with inner content wrapper.
 * @param children - The content to display when the item is open.
 * @param props - Other Radix content props.
 * @returns The region that expands/collapses with animation.
 */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
