'use client';

import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib';

/**
 * Sheet - Drawer-style dialog built on Radix Dialog primitives.
 *
 * @param {React.ComponentProps<typeof SheetPrimitive.Root>} props - Props for the component.
 */
function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

/**
 * SheetTrigger - Element that opens the Sheet when interacted with.
 *
 * @param {React.ComponentProps<typeof SheetPrimitive.Trigger>} props - Props for the component.
 */
function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

/**
 * SheetClose - Element that closes the Sheet.
 *
 * @param {React.ComponentProps<typeof SheetPrimitive.Close>} props - Props for the component.
 */
function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

/**
 * SheetPortal - Renders sheet content in a React Portal.
 *
 * @param {React.ComponentProps<typeof SheetPrimitive.Portal>} props - Props for the component.
 */
function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

/**
 * SheetOverlay - Full-screen overlay behind the Sheet content.
 *
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional classes for the sheet overlay.
 */
function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        'lq-scrim data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50',
        className
      )}
      {...props}
    />
  );
}

/**
 * SheetContent - The sliding panel content. Configurable side.
 *
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional classes for the sheet content.
 * @param {React.ReactNode} [props.children] - The content to be rendered inside the sheet.
 * @param {'top' | 'right' | 'bottom' | 'left'} [props.side='right'] - The side of the screen where the sheet will appear.
 */
function SheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** The corner close button. Off when the content draws its own (a header
   * with a title and a close, as every app sheet has). */
  showCloseButton?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          // Liquid Glass: thick material. This also gives SheetContent a
          // background for the first time — upstream declared none, so the
          // panel was transparent over its own overlay.
          //
          // Radius is set per side because a sheet is flush against the
          // viewport edge it slides from: only the inward-facing corners
          // round. The material's own default radius is declared inside
          // :where(), so these utilities override it. lq-sheet--<side> rounds
          // only the inward-facing corners (liquid-material.css).
          'lq-glass lq-sheet data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
          side === 'right' &&
            'lq-sheet--right data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 sm:max-w-sm',
          side === 'left' &&
            'lq-sheet--left data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 sm:max-w-sm',
          side === 'top' &&
            'lq-sheet--top data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto',
          side === 'bottom' &&
            'lq-sheet--bottom data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto',
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close className="lq-btn lq-btn--tinted absolute top-5 right-5 size-8 p-0 disabled:pointer-events-none">
            <XIcon className="size-4" />
            <span className="sr-only">{t('Close')}</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

/**
 * SheetHeader - Header area inside the Sheet.
 *
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional classes for the sheet header.
 */
function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex flex-col gap-1.5 p-6', className)}
      {...props}
    />
  );
}

/**
 * SheetFooter - Footer area inside the Sheet.
 *
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional classes for the sheet footer.
 */
function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      // One footer for every form: a hairline above the actions.
      className={cn(
        'mt-auto flex flex-col gap-2 border-t border-[var(--separator)] p-4',
        className
      )}
      {...props}
    />
  );
}

/**
 * SheetTitle - Accessible title for the Sheet.
 *
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional classes for the sheet title.
 */
function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-body-md-medium text-[var(--label)]', className)}
      {...props}
    />
  );
}

/**
 * SheetDescription - Additional descriptive text for the Sheet.
 *
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional classes for the sheet description.
 */
function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-sm text-[var(--label-2)]', className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
