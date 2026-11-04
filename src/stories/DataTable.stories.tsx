import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable } from '../components';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    hasPagination: { control: 'boolean' },
    hasSearch: { control: 'boolean' },
    hasColumnsVisibilityDropdown: { control: 'boolean' },
    showAppliedFilters: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

const columns = [
  { key: 'name', name: 'Name', dataIndex: 'name' as const },
  { key: 'email', name: 'Email', dataIndex: 'email' as const },
  { key: 'role', name: 'Role', dataIndex: 'role' as const },
  { key: 'status', name: 'Status', dataIndex: 'status' as const },
];

const dataSource = {
  docs: [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'Editor',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Carol White',
      email: 'carol@example.com',
      role: 'Viewer',
      status: 'Inactive',
    },
    {
      id: '4',
      name: 'David Brown',
      email: 'david@example.com',
      role: 'Editor',
      status: 'Pending',
    },
    {
      id: '5',
      name: 'Eve Adams',
      email: 'eve@example.com',
      role: 'Admin',
      status: 'Active',
    },
  ],
  page: 1,
  limit: 10,
  totalPages: 3,
  total: 25,
};

export const Default: Story = {
  args: {
    tableKey: 'users-table',
    columns,
    rowKey: 'id',
    dataSource,
  },
};

export const WithSearch: Story = {
  args: {
    tableKey: 'users-search-table',
    columns,
    rowKey: 'id',
    dataSource,
    hasSearch: true,
    onParamChange: (params) => console.log('params:', params),
  },
};

export const WithPagination: Story = {
  args: {
    tableKey: 'users-paged-table',
    columns,
    rowKey: 'id',
    dataSource,
    hasPagination: true,
    onParamChange: (params) => console.log('params:', params),
  },
};

export const WithFilters: Story = {
  args: {
    tableKey: 'users-filtered-table',
    columns,
    rowKey: 'id',
    dataSource,
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
          { value: 'editor', label: 'Editor' },
          { value: 'viewer', label: 'Viewer' },
        ],
      },
    ],
    onParamChange: (params) => console.log('params:', params),
  },
};

export const FullFeatured: Story = {
  args: {
    tableKey: 'users-full-table',
    columns,
    rowKey: 'id',
    dataSource,
    hasSearch: true,
    hasPagination: true,
    hasColumnsVisibilityDropdown: true,
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
    exportOptions: [
      { label: 'Export CSV', onClick: () => alert('Exporting CSV') },
      { label: 'Export Excel', onClick: () => alert('Exporting Excel') },
    ],
    actions: [
      { label: 'Add User', onClick: () => alert('Add User') },
      { label: 'Import', onClick: () => alert('Import') },
    ],
    onParamChange: (params) => console.log('params:', params),
  },
};

export const Loading: Story = {
  args: {
    tableKey: 'users-loading-table',
    columns,
    rowKey: 'id',
    dataSource,
    loading: true,
  },
};
