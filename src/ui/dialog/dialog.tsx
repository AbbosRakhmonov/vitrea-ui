import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib';
import type { ElementDataType } from '../../types';

/**
 * Dialog primitives for building modal dialogs.
 * Use Dialog as the root, DialogTrigger to open, and DialogContent for the modal body.
 */
const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

/**
 * Full-screen overlay that appears behind the dialog content.
 * @returns {JSX.Element} The rendered DialogOverlay component.
 */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      // Liquid Glass: `lq-scrim` dims and lightly blurs the backdrop. The
      // flat bg-black/80 wash it replaces read as a web modal, not a macOS one.
      'lq-scrim data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export type DialogContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  /**
   * If true, a close button will be rendered inside the dialog content.
   */
  hasCloseButton?: true;
};

/**
 * The main dialog content container positioned in the viewport center.
 * @returns {JSX.Element} The rendered DialogContent component.
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, hasCloseButton, ...props }, ref) => {
  const { t } = useTranslation();
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          // Liquid Glass: thick material — the heaviest surface, matching how
          // macOS treats a modal sheet. Supplies its own hairline and
          // elevation, so `border` and `shadow-lg` are gone.
          // outline-none: with nothing focusable inside, Radix focuses the
          // panel itself, and the browser drew its black focus ring around it.
          'lq-glass lq-glass--modal rounded-6 sm:rounded-7 fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 p-6 duration-200 outline-none',
          className
        )}
        {...props}
      >
        {children}
        {hasCloseButton && (
          <DialogPrimitive.Close className="lq-btn lq-btn--tinted absolute top-4 right-4 size-8 p-0 disabled:pointer-events-none">
            <X className="size-4" />
            <span className="sr-only">{t('Close')}</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

/**
 * Container for dialog header content (title, actions).
 * @returns {JSX.Element} The rendered DialogHeader component.
 */
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      // One header for every modal: left-aligned, as a macOS sheet reads.
      'flex flex-col gap-1 text-left',
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

/**
 * Container for dialog footer actions.
 * @returns {JSX.Element} The rendered DialogFooter component.
 */
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-row flex-wrap items-center justify-end gap-2',
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

/**
 * DialogTitle - The accessible dialog title.
 * @returns {JSX.Element} The rendered DialogTitle component.
 */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      // The same title as a sheet's: one headline size for every modal.
      'lq-headline text-[var(--label)]',
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/**
 * DialogDescription - Additional descriptive text for the dialog.
 * @returns {JSX.Element} The rendered DialogDescription component.
 */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('lq-footnote lq-label-2', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

/**
 * Props aggregation for components that wrap Dialog primitives.
 * Useful for high-level components needing to forward props to specific Dialog parts.
 */
/**
 * Props aggregation for components that wrap Dialog primitives.
 * Useful for high-level components needing to forward props to specific Dialog parts.
 * @property {React.ComponentPropsWithoutRef<typeof DialogTrigger> & ElementDataType} [triggerProps] - Props for the DialogTrigger component.
 * @property {React.ComponentPropsWithoutRef<typeof DialogContent> & ElementDataType} [contentProps] - Props for the DialogContent component.
 * @property {React.ComponentPropsWithoutRef<typeof DialogClose> & ElementDataType} [closeProps] - Props for the DialogClose component.
 */
interface DialogContainerProps {
  triggerProps?: React.ComponentPropsWithoutRef<typeof DialogTrigger> &
    ElementDataType;
  contentProps?: React.ComponentPropsWithoutRef<typeof DialogContent> &
    ElementDataType;
  closeProps?: React.ComponentPropsWithoutRef<typeof DialogClose> &
    ElementDataType;
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  type DialogContainerProps,
};
