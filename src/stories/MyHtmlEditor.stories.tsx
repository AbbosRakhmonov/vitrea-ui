import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { MyHtmlEditor } from '../components';
import { Form } from '../ui/form';

const meta: Meta<typeof MyHtmlEditor> = {
  title: 'Components/Form/MyHtmlEditor',
  component: MyHtmlEditor,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyHtmlEditor>;

const Template = (args: Parameters<typeof MyHtmlEditor>[0]) => {
  const form = useForm();
  return (
    <Form {...form}>
      <MyHtmlEditor {...args} control={form.control} />
    </Form>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'content',
    label: 'Content',
  },
};

export const Required: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'body',
    label: 'Article Body',
    required: true,
  },
};
