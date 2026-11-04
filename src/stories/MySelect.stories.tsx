import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from 'react-hook-form';
import { MySelect } from '../components';
import { Form } from '../ui/form';

const meta: Meta<typeof MySelect> = {
  title: 'Components/Form/MySelect',
  component: MySelect,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MySelect>;

const options = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
];

const Template = (args: Parameters<typeof MySelect>[0]) => {
  const form = useForm();
  return (
    <Form {...form}>
      <MySelect {...args} control={form.control} />
    </Form>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'role',
    label: 'Role',
    options,
    placeholder: 'Select a role...',
  },
};

export const Required: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'role',
    label: 'Role',
    options,
    required: true,
    placeholder: 'Select a role...',
  },
};

export const MultiSelect: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'permissions',
    label: 'Permissions',
    options,
    isMulti: true,
    placeholder: 'Select permissions...',
  },
};

export const Searchable: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'country',
    label: 'Country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
      { value: 'jp', label: 'Japan' },
    ],
    isSearchable: true,
    placeholder: 'Search and select...',
  },
};
