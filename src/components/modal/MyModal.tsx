import type { DialogProps } from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib';
import {
  Dialog,
  DialogClose,
  type DialogContainerProps,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';

export type MyModalSize =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'full';

export type MyModalProps = DialogProps &
  DialogContainerProps & {
    /** The modal's title. */
    title?: ReactNode;
    /** @deprecated Use `title`. */
    header?: ReactNode;
    /** A line under the title. Without one the dialog still gets an
     * accessible (hidden) description. */
    description?: ReactNode;
    /** A glyph in a tinted circle before the title. */
    icon?: ReactNode;
    /** Controls in the header, between the title and the close button. */
    headerActions?: ReactNode;
    trigger?: ReactNode;
    children?: ReactNode;
    /** Actions in the footer, laid out right-aligned on a hairline. */
    footer?: ReactNode;
    size?: MyModalSize;
    /** Classes for the panel. */
    className?: string;
    /** Classes for the scrolling body. */
    bodyClassName?: string;
    /** Hide the close button (a modal that must be answered). */
    hideClose?: boolean;
  };

const SIZES: Record<MyModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-[95vw]',
};

/**
 * MyModal - The one modal layout: a header (optional icon, title,
 * description, close), a body that scrolls on its own and an optional footer
 * on a hairline. Every part sits on the same 24px inset, so dialogs of any
 * size read as one family with the Sheet.
 */
export const MyModal = ({
  title,
  header,
  description,
  icon,
  headerActions,
  footer,
  trigger,
  children,
  size = 'lg',
  className,
  bodyClassName,
  hideClose,
  triggerProps,
  contentProps,
  closeProps,
  ...props
}: MyModalProps) => {
  const { t } = useTranslation();
  const heading = title ?? header;
  return (
    <Dialog {...props}>
      {trigger && (
        <DialogTrigger asChild {...triggerProps}>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent
        // Radix focuses the first focusable element - the close button - and a
        // modal opened with the mouse showed a ring on it. Start in the first
        // field instead, or on the panel, which keeps keyboard users inside.
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          const panel = e.currentTarget as HTMLElement;
          const field = panel.querySelector<HTMLElement>(
            'input:not([type=hidden]):not([disabled]), textarea:not([disabled])'
          );
          (field ?? panel).focus({ preventScroll: true });
        }}
        {...contentProps}
        className={cn(
          'flex max-h-[min(88vh,56rem)] w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0',
          SIZES[size],
          className,
          contentProps?.className
        )}
      >
        <div className="flex shrink-0 items-start gap-3 px-6 pt-5 pb-4">
          {icon && (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)] [&>svg]:size-[18px]">
              {icon}
            </span>
          )}
          <DialogHeader className="min-w-0 flex-1 justify-center self-center">
            <DialogTitle className="truncate">{heading}</DialogTitle>
            <DialogDescription className={cn(!description && 'sr-only')}>
              {description ?? heading}
            </DialogDescription>
          </DialogHeader>
          {headerActions && (
            <div className="flex shrink-0 items-center gap-2 self-center">
              {headerActions}
            </div>
          )}
          {!hideClose && (
            <DialogClose
              {...closeProps}
              className={cn(
                'lq-btn lq-btn--tinted size-8 shrink-0 p-0',
                closeProps?.className
              )}
            >
              <X className="size-4" />
              <span className="sr-only">{t('Close')}</span>
            </DialogClose>
          )}
        </div>
        <div
          className={cn(
            'scrollbar-thin flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-6 pb-6',
            bodyClassName
          )}
        >
          {children}
        </div>
        {footer && (
          // No breakpoint variants: an app's own utilities load after the kit's in
          // the same layer, and its plain `flex-col` would beat `sm:flex-row`.
          <div className="flex shrink-0 flex-row flex-wrap items-center justify-end gap-2 border-t border-[var(--separator)] px-6 py-4">
            {footer}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
