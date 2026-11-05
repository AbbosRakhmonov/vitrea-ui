import { ChevronDownIcon, ListVideoIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../ui/button';
import {
  type DropdownContainerProps,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown';

/**
 * Interface representing a single action item.
 */
export interface ActionInterface {
  /** The content to display for the action item. */
  label: ReactNode;
  /** Callback function to execute when the action is clicked. */
  onClick: () => void;
  access?: string[];
}

/**
 * Props for the Actions component.
 */
export interface ActionsProps extends DropdownContainerProps {
  /** Array of action items to be displayed in the dropdown. */
  actions: ActionInterface[];
  /** Title for the actions button. */
  title?: ReactNode;
}

/**
 * Actions renders a dropdown menu with a list of action items.
 *
 * @param actions - Array of actions with label and onClick handler.
 * @param triggerProps - Props passed to the dropdown trigger.
 * @param contentProps - Props passed to the dropdown content.
 * @param title - Optional title for the actions button.
 * @returns {JSX.Element} React element rendering the actions dropdown.
 */
export const Actions = ({
  actions,
  triggerProps,
  contentProps,
  title,
}: ActionsProps) => {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={'grow'} {...triggerProps}>
        <Button
          variant="secondary"
          size={'sm'}
          className={'ml-auto rounded-lg px-3'}
        >
          <ListVideoIcon />{' '}
          <span className={'hidden md:inline!'}>{title || t('Actions')}</span>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" {...contentProps}>
        {actions.map((action, index) => {
          return (
            <DropdownMenuItem key={index} onClick={() => action.onClick()}>
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
