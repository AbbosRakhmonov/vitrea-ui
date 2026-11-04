import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLAttributes } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { cn } from '../../lib';
import type { ElementDataType } from '../../types';

/**
 * Input style variants using CVA.
 * @property {'default'|'failure'|'success'} variant - Visual state of the input.
 */ const editorVariants = cva(
  cn(
    'quill-editor w-full rounded-lg bg-transparent transition-all',
    'border border-border-alpha-strong [&_.ql-toolbar]:bg-muted/50 [&_.ql-editor.ql-blank::before]:text-body-sm-light',
    'focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-bg focus-within:ring-offset-2 focus-within:ring-offset-background',
    'disabled:cursor-not-allowed disabled:opacity-50'
  ),
  // Base classes: added 'quill-editor' to trigger global styles

  {
    variants: {
      variant: {
        default: [
          'focus-within:ring-ring focus-within:ring-item-primary',
          '[&_.ql-editor.ql-blank::before]:text-secondary!',
        ],
        failure: [
          'border-destructive text-destructive',
          'focus-within:ring-destructive',
          '[&_.ql-editor.ql-blank::before]:text-destructive/60!',
        ],
        success: [
          'border-success text-success',
          'focus-within:ring-success',
          '[&_.ql-editor.ql-blank::before]:text-success/60!',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Props for the HtmlEditor component.
 * Extends ReactQuill props and supports the editorVariants for visual states.
 *
 * @property {'default'|'failure'|'success'} [variant='default'] - Visual state of the editor container.
 * @property {HTMLAttributes<HTMLDivElement>} [containerProps] - Props for the outer wrapper div.
 */
type HtmlEditorProps = ReactQuill.ReactQuillProps &
  VariantProps<typeof editorVariants> & {
    containerProps?: HTMLAttributes<HTMLDivElement> & ElementDataType;
  };

/**
 * HtmlEditor - Rich text editor built on react-quill-new with consistent styling.
 *
 * Provides an outer styled container that mirrors Input styles and forwards remaining props
 * to ReactQuill. Use the `variant` prop to indicate success/failure states.
 *
 * @component
 * @param containerProps
 * @param className
 * @param variant
 * @param {HtmlEditorProps} props - Component props.
 */
function HtmlEditor({
  containerProps,
  className,
  variant,
  ...props
}: HtmlEditorProps) {
  return (
    <div
      {...containerProps}
      className={cn(editorVariants({ variant }), 'block p-0', className)}
    >
      <ReactQuill theme="snow" {...props} />
    </div>
  );
}

HtmlEditor.displayName = 'HtmlEditor';

export { HtmlEditor, type HtmlEditorProps };
