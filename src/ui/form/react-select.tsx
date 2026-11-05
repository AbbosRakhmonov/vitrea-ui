import { ChevronDown, X } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type JSX,
  type ReactNode,
} from 'react';
import Select, {
  components,
  type ClearIndicatorProps,
  type ControlProps,
  type DropdownIndicatorProps,
  type GroupBase,
  type InputProps,
  type MenuProps,
  type MultiValueProps,
  type OptionProps,
  type PlaceholderProps,
  type SingleValueProps,
} from 'react-select';
import CreatableSelect, { type CreatableProps } from 'react-select/creatable';
import { twMerge } from 'tailwind-merge';
import type { ElementDataType } from '../../types';

/**
 * Option shape for ReactSelect component.
 *
 * @property {ReactNode} label - Rendered label.
 * @property {string|number} value - Primitive value emitted on selection.
 */
export type Option = {
  label: ReactNode;
  value: string | number;
};

/**
 * Helper to create a new option from free text.
 * Lowercases and strips non-word characters for the value.
 */
const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

/**
 * Props for ReactSelect component.
 * Based on react-select CreatableProps but simplified to always accept Option[] for options.
 * Extends standard div props for the container.
 *
 * @property {Option[]} options - List of available options.
 * @property {ReactNode} [label] - Optional label to render externally.
 * @property {boolean} [error] - When true, applies error styles.
 * @property {boolean} [canAddItem=false] - If true, allows creating new options inline.
 */
export interface ReactSelectProps
  extends Omit<
    CreatableProps<
      Option | Option['value'],
      boolean,
      GroupBase<Option | Option['value']>
    >,
    'options'
  > {
  options: Option[];
  label?: ReactNode;
  error?: boolean;
  canAddItem?: boolean;
  containerProps?: ComponentPropsWithoutRef<'div'> & ElementDataType;
}

/**
 * Enhanced select input built on react-select with optional creatable mode and tailored styles.
 *
 * @component
 * @param {ReactSelectProps} props - Props to configure behavior and appearance.
 * @returns {JSX.Element}
 */
export const ReactSelect = ({
  options = [],
  label,
  required,
  error,
  className,
  onChange = () => {},
  placeholder = '',
  canAddItem = false,
  containerProps,
  ...computedProps
}: ReactSelectProps): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState<Option | Option[] | null>(
    null
  );
  const [computedOptions, setComputedOptions] = useState<Option[]>([]);
  const Component = useMemo(
    () => (canAddItem ? CreatableSelect : Select),
    [canAddItem]
  );

  useEffect(() => {
    const values: Option | Option[] = [];

    if (computedProps.value instanceof Array) {
      computedProps.value.forEach((value) => {
        let tmpOption: Option | null;
        if (
          typeof value === 'string' ||
          typeof value === 'number' ||
          typeof value === 'boolean'
        ) {
          tmpOption =
            computedOptions.find((option) => value == option.value) || null;
        } else {
          tmpOption = value;
        }
        if (tmpOption) {
          values.push(tmpOption);
        }
      });
      setSelectedValue(values);
    } else if (
      typeof computedProps.value === 'string' ||
      typeof computedProps.value === 'number'
    ) {
      setSelectedValue(
        computedOptions.find((option) => computedProps.value == option.value) ||
          null
      );
    } else {
      setSelectedValue(computedProps.value || null);
    }
  }, [JSON.stringify([computedProps.value, computedOptions])]);

  useEffect(() => {
    setComputedOptions([...options]);
  }, [JSON.stringify(options)]);

  const handleAddItem = useCallback(
    (inputValue: string) => {
      if (inputValue) {
        const newOption = createOption(inputValue);
        setComputedOptions((prevOptions) => [newOption, ...prevOptions]);
        setTimeout(() => {
          if (
            computedProps.isMulti &&
            selectedValue &&
            selectedValue instanceof Array
          ) {
            setSelectedValue([...selectedValue, newOption]);
          } else {
            setSelectedValue(newOption);
          }
        }, 500);
      }
    },
    [computedProps.isMulti, selectedValue]
  );

  const memorizedComponents = useMemo(() => {
    return {
      Control: (
        props: ControlProps<
          string | number | Option,
          boolean,
          GroupBase<string | number | Option>
        >
      ) => (
        <div {...containerProps}>
          <components.Control
            {...props}
            className={twMerge(
              props.className,
              className,
              '!min-h-10 !rounded-[10px] !border !border-[var(--field-stroke)] !bg-[var(--field-bg)] !shadow-none !outline-none focus-within:!border-[var(--accent)] focus-within:!shadow-[0_0_0_3px_var(--accent-soft)] hover:!border-[var(--field-stroke-hover)]',
              error &&
                'placeholder:!text-item-destructive !text-item-destructive !border-[var(--red)] focus-within:!border-[var(--red)] focus-within:!shadow-[0_0_0_3px_var(--red-soft)]'
            )}
          />
        </div>
      ),
      Menu: (
        props: MenuProps<
          string | number | Option,
          boolean,
          GroupBase<string | number | Option>
        >
      ) => <components.Menu {...props} className={props.className} />,
      Option: ({
        ...props
      }: OptionProps<
        string | number | Option,
        boolean,
        GroupBase<string | number | Option>
      >) => <components.Option {...props} className={props.className} />,
      Placeholder: (
        props: PlaceholderProps<
          string | number | Option,
          boolean,
          GroupBase<string | number | Option>
        >
      ) => (
        <components.Placeholder
          {...props}
          className={twMerge(
            props.className,
            'text-secondary! text-body-sm-regular!',
            error && 'text-item-destructive!'
          )}
        />
      ),
      SingleValue: (
        props: SingleValueProps<
          string | number | Option,
          boolean,
          GroupBase<string | number | Option>
        >
      ) => (
        <components.SingleValue
          {...props}
          className={twMerge([
            props.className,
            'text-body-sm-regular !text-primary',
          ])}
        />
      ),
      MultiValue: (
        props: MultiValueProps<
          string | number | Option,
          boolean,
          GroupBase<string | number | Option>
        >
      ) => (
        <components.MultiValue
          {...props}
          className={twMerge([
            props.className,
            'text-body-sm-regular !rounded-full !border-0 !bg-[var(--accent-soft)] !py-0 !text-[var(--accent)]',
          ])}
        />
      ),
      Input: (
        props: InputProps<
          string | number | Option,
          boolean,
          GroupBase<string | number | Option>
        >
      ) => (
        <components.Input
          {...props}
          className={twMerge([props.className, '!text-primary'])}
        />
      ),
      // Thin Lucide glyphs in the secondary label colour; the defaults took
      // the page's text colour and drew a heavy black cross and caret.
      DropdownIndicator: (
        props: DropdownIndicatorProps<
          string | number | Option,
          boolean,
          GroupBase<string | number | Option>
        >
      ) => (
        <components.DropdownIndicator {...props} className="!px-2 !py-0">
          <ChevronDown className="size-4 text-[var(--label-2)]" />
        </components.DropdownIndicator>
      ),
      ClearIndicator: (
        props: ClearIndicatorProps<
          string | number | Option,
          boolean,
          GroupBase<string | number | Option>
        >
      ) => (
        <components.ClearIndicator {...props} className="!px-1 !py-0">
          <X className="size-3.5 text-[var(--label-2)]" />
        </components.ClearIndicator>
      ),
      IndicatorSeparator: () => null,
    };
  }, [className, containerProps, error]);

  return (
    <Component
      onCreateOption={handleAddItem}
      components={memorizedComponents}
      placeholder={placeholder}
      className={twMerge('w-full', className)}
      classNamePrefix="selectform"
      isClearable={true}
      hideSelectedOptions={true}
      {...computedProps}
      value={selectedValue}
      options={computedOptions}
      onChange={(values, actionMeta) => {
        if (values instanceof Array) {
          onChange(
            values
              .filter((item) => typeof item === 'object')
              .map((item: Option) => item.value),
            actionMeta
          );
          setSelectedValue(values as Option[]);
        } else {
          onChange((values as Option)?.value || null, actionMeta);
          setSelectedValue(values as Option);
        }
      }}
    />
  );
};
