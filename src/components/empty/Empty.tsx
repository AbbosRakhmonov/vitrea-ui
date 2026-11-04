import { FolderOpen } from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib';

/**
 * Props for the Empty component.
 */
export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional custom icon. Defaults to a folder icon. */
  icon?: ReactNode;
}

/**
 * Empty displays a simple empty state with an optional icon and message.
 *
 * @param children - Optional custom message/content.
 * @param icon - Optional custom icon. Defaults to a folder icon.
 * @param className - Additional CSS classes.
 * @param props - Additional HTML attributes for the container.
 * @returns {JSX.Element} A centered empty state component.
 */
export const Empty = ({ children, icon, className, ...props }: EmptyProps) => {
  const { t } = useTranslation();

  return (
    <div
      {...props}
      className={cn(
        'flex h-16 flex-col items-center justify-center text-center text-base',
        className
      )}
    >
      {icon || <FolderOpen size={48} strokeWidth={1} />}
      {children || t('No results')}
    </div>
  );
};
