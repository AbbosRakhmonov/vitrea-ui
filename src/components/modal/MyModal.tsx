import type { DialogProps } from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';
import { cn } from '../../lib';
import {
  Dialog,
  type DialogContainerProps,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';

/**
 * Props for the MyModal component.
 * Extends Radix UI's DialogProps.
 *
 * @typedef {Object} MyModalProps
 * @property {ReactNode} [header] - The content to be displayed in the modal header.
 * @property {ReactNode} [trigger] - The element that triggers the modal when clicked.
 * @property {ReactNode} [children] - The main content of the modal.
 * @property {ReactNode} [footer] - The content to be displayed in the modal footer.
 * @property {string} [className] - Additional CSS classes for the modal content.
 * @property {'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full'} [size='lg'] - The maximum width size of the modal.
 * @property {DialogContainerProps['triggerProps']} [triggerProps] - Props passed to the DialogTrigger component.
 * @property {DialogContainerProps['contentProps']} [contentProps] - Props passed to the DialogContent component.
 */
export type MyModalProps = DialogProps &
  DialogContainerProps & {
    header?: ReactNode;
    trigger?: ReactNode;
    children?: ReactNode;
    footer?: ReactNode;
    className?: string;
    size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  };

/**
 * A reusable modal component that wraps the kit Dialog component.
 * It provides a structured layout with a header, scrollable content area, and optional footer.
 *
 * @component
 * @param {ReactNode} props.header - The content to be displayed in the modal header
 * @param {ReactNode} props.footer - The content to be displayed in the modal footer
 * @param {ReactNode} props.trigger - The element that triggers the modal when clicked
 * @param {ReactNode} props.children - The main content of the modal
 * @param {'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full'} props.size - The maximum width size of the modal (default: 'lg')
 * @param {string} props.className - Additional CSS classes for the modal content
 * @param {DialogContainerProps['triggerProps']} props.triggerProps - Props passed to the DialogTrigger component
 * @param {DialogContainerProps['contentProps']} props.contentProps - Props passed to the DialogContent component
 * @returns {JSX.Element} A modal dialog component
 *
 * @example
 * <MyModal
 *   header="User Settings"
 *   trigger={<button>Open Settings</button>}
 *   footer={<button onClick={save}>Save</button>}
 * >
 *   <p>Settings content goes here...</p>
 * </MyModal>
 */
export const MyModal = ({
  header,
  footer,
  trigger,
  children,
  size = 'lg',
  className,
  triggerProps,
  contentProps,
  ...props
}: MyModalProps) => {
  return (
    <Dialog {...props}>
      {trigger && (
        <DialogTrigger asChild {...triggerProps}>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent
        className={cn(
          `data-[state=open]:animate-contentShowTop top-4 bottom-auto max-h-[calc(100vh-2rem)] max-w-lg translate-y-0 overflow-y-auto`,
          size === 'xl' && 'max-w-xl',
          size === '2xl' && 'max-w-2xl',
          size === '3xl' && 'max-w-3xl',
          size === '4xl' && 'max-w-5xl',
          size === '5xl' && 'max-w-5xl',
          size === '6xl' && 'max-w-6xl',
          size === '7xl' && 'max-w-7xl',
          size === 'full' && 'max-w-[95%]',
          className
        )}
        {...contentProps}
      >
        <DialogHeader>
          <DialogTitle className={'mb-0'}>{header}</DialogTitle>
          <DialogDescription className={'hidden'} />
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
