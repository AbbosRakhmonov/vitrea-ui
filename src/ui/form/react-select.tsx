import {
  type ComponentPropsWithoutRef,
  type JSX,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Select, {
  components,
  type ControlProps,
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
              '!border-border-alpha-strong focus-within:!ring-offset-bg focus-within:!ring-item-primary !min-h-10 !rounded-lg !bg-transparent !ring-0 !outline-none focus-within:!ring-2 focus-within:!ring-offset-2',
              error &&
                'focus-within:!ring-item-destructive placeholder:!text-item-destructive !border-item-destructive !text-item-destructive'
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
            'text-body-sm-regular !rounded-md border-blue-200 !bg-blue-100 !py-0 !text-blue-700',
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
