import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { MyTextarea } from '../components';
import { Form } from '../ui/form';

const meta: Meta<typeof MyTextarea> = {
  title: 'Components/Form/MyTextarea',
  component: MyTextarea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyTextarea>;

const Template = (args: Parameters<typeof MyTextarea>[0]) => {
  const form = useForm();
  return (
    <Form {...form}>
      <MyTextarea {...args} control={form.control} />
    </Form>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'description',
    label: 'Description',
    placeholder: 'Enter description...',
  },
};

export const Required: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'bio',
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    required: true,
  },
};

export const WithValidation: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'message',
    label: 'Message',
    placeholder: 'Enter your message...',
    rules: {
      required: 'Message is required',
      minLength: { value: 10, message: 'Minimum 10 characters' },
    },
  },
};
