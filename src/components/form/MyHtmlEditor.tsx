import type { FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '../../lib';
import {
  FormControl,
  FormField,
  FormItem,
  type FormItemProps,
  FormLabel,
  FormMessage,
  HtmlEditor,
  type HtmlEditorProps,
} from '../../ui/form';

/**
 * Props for the MyHtmlEditor component.
 * @template TFieldValues - The type of the form values.
 */
export type MyHtmlEditorProps<TFieldValues extends FieldValues> =
  FormItemProps<TFieldValues> &
    HtmlEditorProps & {
      /** Whether the field is required. */
      required?: boolean;
    };

/**
 * MyHtmlEditor is a rich-text HTML editor with optional react-hook-form integration.
 * Works in both controlled (with control/name) and uncontrolled modes.
 *
 * @template TFieldValues - Form values type used by react-hook-form.
 * @param control - The `react-hook-form` control object.
 * @param name - The name of the field in `react-hook-form`.
 * @param label - The label to display for the HTML editor.
 * @param rules - The `react-hook-form` validation rules.
 * @param required - Whether the field is required.
 * @param floatingError - Whether to show the error message in a floating container.
 * @param props - HtmlEditor and form item props.
 * @returns {JSX.Element | null} An HtmlEditor component with label, helper text, and validation message, or null if name/control are missing
 */
export const MyHtmlEditor = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  rules,
  required,
  floatingError,
  ...props
}: MyHtmlEditorProps<TFieldValues>) => {
  return (
    (name && control && (
      <FormField<TFieldValues, FieldPath<TFieldValues>>
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <FormItem>
            {label && (
              <FormLabel className={'block'}>
                {label} {required && <span className={'text-red-600'}>*</span>}
              </FormLabel>
            )}
            <div>
              <FormControl>
                <HtmlEditor {...field} {...props} />
              </FormControl>
              <FormMessage
                className={cn(floatingError && 'absolute -bottom-5')}
              />
            </div>
          </FormItem>
        )}
      />
    )) ||
    null
  );
};
