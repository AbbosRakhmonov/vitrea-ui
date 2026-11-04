import { RiSearchLine } from '@remixicon/react';
import get from 'lodash.get';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard } from '../../enums';
import { cn } from '../../lib';
import { Button } from '../../ui/button';
import type { CardProps } from '../../ui/card';
import { Input, type InputProps } from '../../ui/form';

/**
 * Props for the SearchWithCtrl component.
 */
export type SearchWithCtrlProps = Omit<CardProps, 'title'> & {
  /** Custom placeholder text for the input. */
  placeholder?: string;
  /** Callback fired when the search is triggered. */
  onSearchChange: (search?: string) => void;
  inputProps?: InputProps;
};

/**
 * A search input that submits when the user presses Ctrl + Enter or clicks the search button.
 *
 * @param {SearchWithCtrlProps} props - The props for the component.
 * @param {string} [props.placeholder] - Custom placeholder text for the input.
 * @param {Function} props.onSearchChange - Callback fired with the search value.
 * @param {string} [props.className] - Optional class name for the component.
 * @param {InputProps} [props.inputProps] - Optional props to pass to the underlying Input component.
 * @returns {JSX.Element} A search input field with Ctrl+Enter support
 */
export const SearchWithCtrl = ({
  placeholder,
  onSearchChange,
  className,
  inputProps,
  ...props
}: SearchWithCtrlProps) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  return (
    <div {...props} className={cn('relative w-full', className)}>
      <Input
        {...inputProps}
        placeholder={placeholder || t('Type text and press CTRL + Enter')}
        onInput={(evt) => setSearch(get(evt, 'target.value', ''))}
        onKeyUp={(evt) => {
          if (evt.key === Keyboard.ENTER) {
            if (evt.ctrlKey) {
              onSearchChange(search || undefined);
            }
            evt.stopPropagation();
            evt.preventDefault();
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
        <RiSearchLine />
      </Button>
    </div>
  );
};
