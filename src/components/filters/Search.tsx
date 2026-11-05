import get from 'lodash.get';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard } from '../../enums';
import { cn } from '../../lib';
import { Button } from '../../ui/button';
import type { CardProps } from '../../ui/card';
import { Input, type InputProps } from '../../ui/form';

/**
 * Props for the Search component.
 */
export type SearchProps = Omit<CardProps, 'title'> & {
  /** Custom placeholder text for the input. */
  placeholder?: string;
  /** Callback fired when the search is triggered. */
  onSearchChange: (search?: string) => void;
  inputProps?: InputProps;
};

/**
 * Search input with a submit button that triggers a search action.
 *
 * This component renders a search input field and a search button. The search
 * is triggered when the user presses Enter or clicks the button. The search
 * value is then passed to the `onSearchChange` callback.
 *
 * @param {SearchProps} props - The props for the component.
 * @param {string} [props.placeholder] - Optional placeholder text for the input field.
 * @param {Function} props.onSearchChange - Callback function that is called when a search is performed.
 * @param {string} [props.className] - Optional class name for the component.
 * @param {InputProps} [props.inputProps] - Optional props to pass to the underlying Input component.
 * @returns {JSX.Element} A search input field with submit button
 */
export const Search = ({
  placeholder,
  onSearchChange,
  className,
  inputProps,
  ...props
}: SearchProps) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  return (
    <div {...props} className={cn('relative w-full', className)}>
      <Input
        {...inputProps}
        placeholder={placeholder || t('Type text and press Enter')}
        onInput={(evt) => setSearch(get(evt, 'target.value', ''))}
        onKeyUp={(evt) => {
          if (evt.key === Keyboard.ENTER) {
            onSearchChange(search || undefined);
            evt.stopPropagation();
            evt.preventDefault();
          }
        }}
        onKeyDown={(event) => {
          if (event.key === Keyboard.ENTER) {
            event.stopPropagation();
            event.preventDefault();
          }
        }}
      />
      <Button
        type={'button'}
        variant={'ghost'}
        className={
          'text-foreground absolute top-0 right-0 cursor-pointer rounded-md bg-transparent!'
        }
        onClick={() => onSearchChange(search)}
      >
        <SearchIcon />
      </Button>
    </div>
  );
};
