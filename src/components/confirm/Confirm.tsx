import { type AlertDialogProps } from '@radix-ui/react-alert-dialog';
import { type JSX, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../ui/alert-dialog';

/**
 * Props for the Confirm component.
 */
export type ConfirmProps = AlertDialogProps & {
  /** The content to trigger the dialog (optional). */
  children?: ReactNode;
  /** Custom title for the dialog. */
  title?: ReactNode;
  /** Custom description for the dialog. */
  description?: ReactNode;
  /** Callback function when the confirm action is triggered. */
  onConfirm: () => void;
};

/**
 * Confirm renders a confirmation dialog and calls onConfirm when user confirms.
 *
 * @param title
 * @param description
 * @param children
 * @param onConfirm
 * @param props - Radix AlertDialog props plus content and onConfirm callback.
 * @returns {JSX.Element} A confirmation dialog component
 */
export const Confirm = ({
  title,
  description,
  children,
  onConfirm,
  ...props
}: ConfirmProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <AlertDialog {...props}>
      {children && <AlertDialogTrigger>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title || t('Are you absolutely sure?')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ||
              t(
                'This action cannot be undone. This will permanently delete your data from our servers.'
              )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={'mt-0'}>
            {t('Cancel')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {t('Confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
