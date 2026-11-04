import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterWrapper } from '../components';

const meta: Meta<typeof FilterWrapper> = {
  title: 'Components/Filters/FilterWrapper',
  component: FilterWrapper,
  tags: ['autodocs'],
  argTypes: {
    onFilter: { action: 'filter applied' },
    onCancel: { action: 'filter cancelled' },
  },
};

export default meta;
type Story = StoryObj<typeof FilterWrapper>;

export const Default: Story = {
  args: {
    filters: [
      { name: 'status', label: 'Status', placeholder: 'Select status...' },
      { name: 'name', label: 'Name', placeholder: 'Enter name...' },
    ],
    onFilter: (filters) => console.log('filters:', filters),
  },
};

export const WithSelectOptions: Story = {
  args: {
    filters: [
      {
        name: 'status',
        label: 'Status',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
          { value: 'pending', label: 'Pending' },
        ],
      },
      {
        name: 'role',
        label: 'Role',
        options: [
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
          { value: 'viewer', label: 'Viewer' },
        ],
      },
    ],
    onFilter: (filters) => console.log('filters:', filters),
  },
};

export const WithActiveFilters: Story = {
  args: {
    filters: [
      {
        name: 'status',
        label: 'Status',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ],
      },
    ],
    params: { status: 'active' },
    onFilter: (filters) => console.log('filters:', filters),
  },
};
