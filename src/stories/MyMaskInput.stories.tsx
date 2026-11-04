import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { MyMaskInput } from '../components';
import { Form } from '../ui/form';

const meta: Meta<typeof MyMaskInput> = {
  title: 'Components/Form/MyMaskInput',
  component: MyMaskInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyMaskInput>;

const Template = (args: Parameters<typeof MyMaskInput>[0]) => {
  const form = useForm();
  return (
    <Form {...form}>
      <MyMaskInput {...args} control={form.control} />
    </Form>
  );
};

export const PhoneNumber: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'phone',
    label: 'Phone Number',
    mask: '+{1} (000) 000-0000',
    placeholder: '+1 (___) ___-____',
  },
};

export const CreditCard: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'card',
    label: 'Credit Card',
    mask: '0000 0000 0000 0000',
    placeholder: '____ ____ ____ ____',
  },
};

export const Date: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'birthdate',
    label: 'Birth Date',
    mask: '00/00/0000',
    placeholder: 'MM/DD/YYYY',
    required: true,
  },
};
