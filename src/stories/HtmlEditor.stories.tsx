import type { Meta, StoryObj } from '@storybook/react-vite';
import { HtmlEditor } from '../ui/form';

const meta = {
  title: 'Form/HtmlEditor',
  component: HtmlEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'failure', 'success'],
    },
    value: {
      control: 'text',
      description: 'The HTML content',
    },
  },
} satisfies Meta<typeof HtmlEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Write something...',
  },
};

export const WithContent: Story = {
  args: {
    value:
      '<h1>Hello World</h1><p>This is a <strong>rich text</strong> editor.</p>',
  },
};

export const Failure: Story = {
  args: {
    variant: 'failure',
    placeholder: 'Error state...',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    placeholder: 'Success state...',
  },
};
