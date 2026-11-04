import { useId } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  Switch,
  type SwitchProps,
} from '../../ui/form';

/**
 * Props for the MySwitch component.
 * @template TFieldValues - The type of the form values.
 */
export type MySwitchProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> & SwitchProps;

/**
 * MySwitch is a toggle switch with optional react-hook-form integration.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the switch.
 * @param rules - The `react-hook-form` validation rules.
 * @param props - Switch and form item props.
 * @returns A toggle switch component, or null if name or control are missing.
 */
export const MySwitch = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  rules,
  ...props
}: MySwitchProps<TFieldValues>) => {
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
                <Switch
                  id={props.id || id}
                  className={'m-0'}
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
