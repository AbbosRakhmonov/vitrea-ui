import { type ReactNode, useCallback } from 'react';
import { toast } from 'react-toastify/unstyled';
import { Confirm, PasswordConfirm } from '../components';
import type { ConfirmPasswordDto } from '../schemas';

/**
 * useConfirm provides helpers to prompt the user for confirmation.
 * It renders toast-based dialogs for simple confirm and password-confirm.
 *
 * @returns {Object} Confirmation functions
 * @returns {(options: { onConfirm: () => void }) => void} confirm - Shows a simple confirmation dialog
 * @returns {(options: { onSubmit: (data: ConfirmPasswordDto) => void }) => void} confirmPassword - Shows a password confirmation dialog
 */
export const useConfirm = () => {
  const confirm = useCallback(({ onConfirm }: { onConfirm: () => void }) => {
    const toastId = crypto.randomUUID();
    toast.warning(<></>, {
      toastId: toastId,
      autoClose: false,
    });
    toast.update(toastId, {
      position: 'bottom-left',
      render: (
        <Confirm
          defaultOpen
          onConfirm={() => {
            onConfirm();
            toast.dismiss(toastId);
          }}
        />
      ),
    });
  }, []);

  const confirmPassword = useCallback(
    ({
      onSubmit,
      title,
      description,
    }: {
      onSubmit: (data: ConfirmPasswordDto) => void;
      title?: ReactNode;
      description?: ReactNode;
    }) => {
      const toastId = crypto.randomUUID();
      toast.warning(<></>, {
        position: 'bottom-left',
        toastId: toastId,
        autoClose: false,
      });
      toast.update(toastId, {
        render: (
          <PasswordConfirm
            defaultOpen
            title={title}
            description={description}
            onSubmit={(data) => {
              onSubmit(data);
              toast.dismiss(toastId);
            }}
          />
        ),
      });
    },
    []
  );

  return {
    confirm,
    confirmPassword,
  };
};
