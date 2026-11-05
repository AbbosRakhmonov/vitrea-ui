import {
  CircleCheckIcon,
  InfoIcon,
  OctagonAlertIcon,
  SirenIcon,
  XIcon,
} from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Toasts in the Liquid Glass language. The kit ships the look, not the
 * runtime: the app keeps rendering sonner's <Toaster> and calling toast() from
 * its own copy of sonner - a second, bundled sonner would hold a second toast
 * queue and nothing would appear. Spread {@link liquidToasterProps} on the Toaster.
 *
 * A toast is a glass capsule with label-coloured text; the status lives in the
 * icon's colour and its word, never in a coloured slab (the old toasts were
 * solid green / red / orange with white text, 2:1 on green).
 */

/** Matches sonner's ToastClassnames without importing its types. */
export const liquidToastClassNames: Record<string, string> = {
  toast: 'lq-glass lq-toast',
  title: 'lq-toast__title',
  description: 'lq-toast__description',
  content: 'lq-toast__content',
  icon: 'lq-toast__icon',
  closeButton: 'lq-toast__close',
  actionButton: 'lq-btn lq-btn--sm lq-toast__action',
  cancelButton: 'lq-btn lq-btn--sm lq-btn--tinted lq-toast__cancel',
  success: 'lq-toast--success',
  error: 'lq-toast--error',
  warning: 'lq-toast--warning',
  info: 'lq-toast--info',
  loading: 'lq-toast--loading',
};
export const phToastClassNames = liquidToastClassNames;

export const liquidToastIcons: Record<string, ReactNode> = {
  success: <CircleCheckIcon />,
  error: <OctagonAlertIcon />,
  warning: <SirenIcon />,
  info: <InfoIcon />,
  close: <XIcon />,
};
export const phToastIcons = liquidToastIcons;

/** Everything the <Toaster> needs: position, timing, the glass classes. */
export const liquidToasterProps = {
  position: 'top-center' as const,
  expand: true,
  icons: liquidToastIcons,
  gap: 10,
  swipeDirections: ['right', 'left'] as ('right' | 'left')[],
  style: { '--width': '380px' } as CSSProperties,
  toastOptions: {
    duration: 3500,
    unstyled: true,
    closeButton: true,
    classNames: liquidToastClassNames,
  },
};
