import React, { useId } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  RadioGroupItem,
} from '../../ui/form';

type RadioItemProps = React.ComponentPropsWithoutRef<typeof RadioGroupItem>;

/**
 * Props for the MyRadio component.
 * @template TFieldValues - The type of the form values.
 */
export type MyRadioProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> & RadioItemProps;

/**
 * MyRadio is a radio input that can integrate with react-hook-form when control and name are provided.
 * Falls back to an uncontrolled radio item when not used inside a form.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the radio input.
 * @param rules - The `react-hook-form` validation rules.
 * @param value - The value of the radio input.
 * @param props - Radio item and form item props.
 * @returns {JSX.Element | null} A radio button item with form integration, or null if name/control are missing
 */
const MyRadio = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  rules,
  value,
  ...props
}: MyRadioProps<TFieldValues>) => {
  const id = useId();
  return (
    (name && control && (
      <FormField<TFieldValues, FieldPath<TFieldValues>>
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <FormLabel className={'block'} htmlFor={props.id || id}>
            <FormItem className="flex flex-row items-start gap-3">
              <FormControl>
                <RadioGroupItem
                  id={props.id || id}
                  value={value}
                  checked={field.value === value}
                  onClick={() => {
                    if (field.value !== value) {
                      field.onChange(value);
                    }
                  }}
                  {...props}
                />
              </FormControl>
              {label && <div className={'mt-0.5'}>{label}</div>}
            </FormItem>
          </FormLabel>
        )}
      />
    )) ||
    null
  );
};

export { MyRadio };
