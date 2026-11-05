import type { ReactNode } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '../../lib';
import {
  Checkbox,
  type CheckboxProps,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  Label,
} from '../../ui/form';

/**
 * Props for the MyCheckbox component.
 * @template TFieldValues - The type of the form values.
 */
export type MyCheckboxProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    CheckboxProps & {
      /** Helper text under the label (form mode only). */
      helperText?: ReactNode;
    };

/**
 * MyCheckbox is a checkbox with a label, integrated with react-hook-form when
 * `control` and `name` are given, and a plain labelled checkbox otherwise.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the checkbox.
 * @param rules - The `react-hook-form` validation rules.
 * @param helperText - Helper text under the label (form mode only).
 * @param props - Checkbox and form item props.
 * @returns {JSX.Element} A labelled checkbox, bound to the form when control/name are given.
 */
export const MyCheckbox = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  rules,
  helperText,
  ...props
}: MyCheckboxProps<TFieldValues>) => {
  if (!name || !control) {
    return (
      <div className="flex flex-row items-center gap-2">
        <Checkbox {...props} />
        {label && (
          <div className="space-y-1 leading-none">
            <Label htmlFor={props.id}>{label}</Label>
          </div>
        )}
      </div>
    );
  }

  return (
    <FormField<TFieldValues, FieldPath<TFieldValues>>
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start gap-2">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              {...props}
              className={cn('m-0', props.className)}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && <FormLabel>{label}</FormLabel>}
            {helperText && <FormDescription>{helperText}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  );
};
