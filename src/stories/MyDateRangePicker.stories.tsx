import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { MyDateRangePicker } from '../components';
import { Form } from '../ui/form';

const meta: Meta<typeof MyDateRangePicker> = {
  title: 'Components/Form/MyDateRangePicker',
  component: MyDateRangePicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyDateRangePicker>;

const Template = (args: Parameters<typeof MyDateRangePicker>[0]) => {
  const form = useForm();
  return (
    <Form {...form}>
      <MyDateRangePicker {...args} control={form.control} />
    </Form>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'dateRange',
    label: 'Date Range',
    placeholder: 'Select date range...',
  },
};

export const Required: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'reportRange',
    label: 'Report Period',
    placeholder: 'Select report period...',
    required: true,
  },
};
