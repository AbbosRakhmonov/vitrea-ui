import { Copy, Eye, EyeOff } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import { cn } from '../../lib';

export type SecretValueProps = {
  value?: string | null;
  /** Called after the value is on the clipboard (e.g. to show a toast). */
  onCopied?: () => void;
  onCopyError?: () => void;
  showLabel?: string;
  hideLabel?: string;
  copyLabel?: string;
  className?: string;
};

/**
 * A credential shown masked, with a reveal toggle and a copy button - for a
 * login or a password inside a detail list. With no value it is a dash and
 * offers nothing to reveal or copy.
 */
const SecretValueBase = ({
  value,
  onCopied,
  onCopyError,
  showLabel = 'Show',
  hideLabel = 'Hide',
  copyLabel = 'Copy',
  className,
}: SecretValueProps) => {
  const [visible, setVisible] = useState(false);

  const copy = useCallback(async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      onCopied?.();
    } catch {
      onCopyError?.();
    }
  }, [value, onCopied, onCopyError]);

  if (!value) {
    return <span className="font-normal text-[var(--label-3)]">—</span>;
  }

  const action =
    'lq-btn lq-btn--tinted size-6 shrink-0 p-0 text-[var(--label-2)] hover:text-[var(--label)]';

  return (
    <span className={cn('inline-flex min-w-0 items-center gap-1.5', className)}>
      <span className="truncate font-mono text-[12px]">
        {visible ? value : '••••••••'}
      </span>
      <button
        type="button"
        className={action}
        aria-label={visible ? hideLabel : showLabel}
        aria-pressed={visible}
        onClick={(e) => {
          e.stopPropagation();
          setVisible((v) => !v);
        }}
      >
        {visible ? (
          <EyeOff className="size-3.5" />
        ) : (
          <Eye className="size-3.5" />
        )}
      </button>
      <button
        type="button"
        className={action}
        aria-label={copyLabel}
        onClick={(e) => {
          e.stopPropagation();
          void copy();
        }}
      >
        <Copy className="size-3.5" />
      </button>
    </span>
  );
};

export const SecretValue = memo(SecretValueBase);
