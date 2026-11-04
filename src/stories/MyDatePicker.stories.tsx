import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { MyDatePicker } from '../components';
import { Form } from '../ui/form';

const meta: Meta<typeof MyDatePicker> = {
  title: 'Components/Form/MyDatePicker',
  component: MyDatePicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyDatePicker>;

const Template = (args: Parameters<typeof MyDatePicker>[0]) => {
  const form = useForm();
  return (
    <Form {...form}>
      <MyDatePicker {...args} control={form.control} />
    </Form>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'date',
    label: 'Date',
    placeholder: 'Pick a date',
  },
};

export const Required: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'birthdate',
    label: 'Date of Birth',
    placeholder: 'Select your birth date',
    required: true,
  },
};

export const WithTime: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'appointmentDate',
    label: 'Appointment Date & Time',
    placeholder: 'Select date and time',
    showTime: true,
  },
};

export const CustomFormat: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'date',
    label: 'Date (DD/MM/YYYY)',
    format: 'DD/MM/YYYY',
    placeholder: 'DD/MM/YYYY',
  },
};
