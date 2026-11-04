import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { MyInput } from '../components';
import { Form } from '../ui/form';

const meta: Meta<typeof MyInput> = {
  title: 'Components/Form/MyInput',
  component: MyInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyInput>;

const Template = (args: Parameters<typeof MyInput>[0]) => {
  const form = useForm();
  return (
    <Form {...form}>
      <MyInput {...args} control={form.control} />
    </Form>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email...',
  },
};

export const Required: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'username',
    label: 'Username',
    placeholder: 'Enter username...',
    required: true,
  },
};

export const Password: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password...',
    required: true,
  },
};

export const NumberInput: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'age',
    label: 'Age',
    type: 'number',
    placeholder: 'Enter age...',
  },
};
