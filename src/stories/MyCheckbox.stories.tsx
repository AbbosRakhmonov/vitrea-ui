import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm, type FieldValues } from 'react-hook-form';
import { MyCheckbox } from '../components';
import { Form } from '../ui/form';

const meta: Meta<typeof MyCheckbox> = {
  title: 'Components/Form/MyCheckbox',
  component: MyCheckbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyCheckbox>;

const Template = (args: Parameters<typeof MyCheckbox>[0]) => {
  const form = useForm<FieldValues>({ defaultValues: { agreed: false } });
  return (
    <Form {...form}>
      <MyCheckbox {...args} control={form.control} />
    </Form>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'agreed',
    label: 'I agree to the terms and conditions',
  },
};

export const Checked: Story = {
  render: (args) => {
    const form = useForm<FieldValues>({ defaultValues: { agreed: true } });
    return (
      <Form {...form}>
        <MyCheckbox {...args} control={form.control} />
      </Form>
    );
  },
  args: {
    name: 'agreed',
    label: 'Pre-checked option',
  },
};
