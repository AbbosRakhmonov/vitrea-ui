import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppliedFilters } from '../components/filters/AppliedFilters';

const meta: Meta<typeof AppliedFilters> = {
  title: 'Components/Filters/AppliedFilters',
  component: AppliedFilters,
  tags: ['autodocs'],
  argTypes: {
    onFilter: { action: 'filter removed' },
  },
};

export default meta;
type Story = StoryObj<typeof AppliedFilters>;

const filters = [
  {
    name: 'status',
    label: 'Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
  {
    name: 'role',
    label: 'Role',
    options: [
      { value: 'admin', label: 'Admin' },
      { value: 'user', label: 'User' },
    ],
  },
];

export const SingleFilter: Story = {
  args: {
    filters,
    params: { status: 'active' },
    onFilter: (f) => console.log('filter:', f),
  },
};

export const MultipleFilters: Story = {
  args: {
    filters,
    params: { status: 'active', role: 'admin' },
    onFilter: (f) => console.log('filter:', f),
  },
};

export const MultiValueFilter: Story = {
  args: {
    filters,
    params: { status: ['active', 'inactive'] },
    onFilter: (f) => console.log('filter:', f),
  },
};

export const NoFilters: Story = {
  args: {
    filters,
    params: {},
    onFilter: (f) => console.log('filter:', f),
  },
};
