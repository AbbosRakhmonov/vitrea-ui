import { FileWarning } from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib';

/**
 * Props for the Empty component.
 */
export interface EmptyProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Optional custom icon. Defaults to a file-warning glyph. */
  icon?: ReactNode;
  /**
   * Primary message. Passing any of `title`, `description` or `action`
   * switches to the taller layout for page-level empty states, with room for
   * a call to action. Without them the compact inline layout is kept, so
   * table cells and small panels are unaffected.
   */
  title?: ReactNode;
  /** Secondary line under the title. */
  description?: ReactNode;
  /** Call to action (e.g. a Button) rendered below the text. */
  action?: ReactNode;
}

/**
 * Empty displays an empty state: an icon with a message, either compact
 * (inline, the default) or with a title, description and action.
 *
 * @param children - Message for the compact layout. Defaults to "No results".
 * @param icon - Optional custom icon. Defaults to a file-warning glyph.
 * @param title - Primary message; switches to the taller layout.
 * @param description - Secondary line under the title.
 * @param action - Call to action rendered below the text.
 * @param className - Additional CSS classes.
 * @param props - Additional HTML attributes for the container.
 * @returns {JSX.Element} A centered empty state component.
 */
export const Empty = ({
  children,
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyProps) => {
  const { t } = useTranslation();
  const isRich = Boolean(title || description || action);

  return (
    <div
      {...props}
      className={cn(
        'text-secondary flex flex-col items-center justify-center text-center',
        isRich ? 'gap-2 py-8' : 'h-16',
        className
      )}
    >
      {icon ?? <FileWarning size={48} strokeWidth={1} />}
      {isRich ? (
        <>
          {title && <p className="text-primary text-sm font-medium">{title}</p>}
          {description && (
            <p className="text-secondary max-w-sm text-sm">{description}</p>
          )}
          {action && <div className="mt-2">{action}</div>}
        </>
      ) : (
        (children ?? t('No results'))
      )}
    </div>
  );
};
