import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { MyShadcnSelect } from '../components';
import { Form } from '../ui/form';

const meta: Meta<typeof MyShadcnSelect> = {
  title: 'Components/Form/MyShadcnSelect',
  component: MyShadcnSelect,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyShadcnSelect>;

const options = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

const Template = (args: Parameters<typeof MyShadcnSelect>[0]) => {
  const form = useForm();
  return (
    <Form {...form}>
      <MyShadcnSelect {...args} control={form.control} />
    </Form>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'status',
    label: 'Status',
    options,
    placeholder: 'Select status...',
  },
};

export const Required: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'status',
    label: 'Status',
    options,
    required: true,
    placeholder: 'Select status...',
  },
};

export const Disabled: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'status',
    label: 'Status (disabled)',
    options,
    disabled: true,
    placeholder: 'Select status...',
  },
};
