import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { MyTimePicker } from '../components';
import { Form } from '../ui/form';

const meta: Meta<typeof MyTimePicker> = {
  title: 'Components/Form/MyTimePicker',
  component: MyTimePicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyTimePicker>;

const Template = (args: Parameters<typeof MyTimePicker>[0]) => {
  const form = useForm();
  return (
    <Form {...form}>
      <MyTimePicker {...args} control={form.control} />
    </Form>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'startTime',
    label: 'Start Time',
  },
};

export const Required: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'meetingTime',
    label: 'Meeting Time',
    required: true,
  },
};

export const Standalone: Story = {
  args: {},
};
