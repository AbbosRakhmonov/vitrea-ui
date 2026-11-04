import type { Meta, StoryObj } from '@storybook/react-vite';
import { MyTable } from '../components';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

const meta: Meta<typeof MyTable<User>> = {
  title: 'Components/DataTable/MyTable',
  component: MyTable,
  tags: ['autodocs'],
  argTypes: {
    hasNumbers: { control: 'boolean' },
    hasCheckbox: { control: 'boolean' },
    isStickyHeader: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof MyTable<User>>;

const columns = [
  { key: 'name', name: 'Name', dataIndex: 'name' as const },
  { key: 'email', name: 'Email', dataIndex: 'email' as const },
  { key: 'role', name: 'Role', dataIndex: 'role' as const },
  { key: 'status', name: 'Status', dataIndex: 'status' as const },
];

const rows: User[] = [
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
];

export const Default: Story = {
  args: {
    columns,
    rows,
    rowKey: 'id',
  },
};

export const WithNumbers: Story = {
  args: {
    columns,
    rows,
    rowKey: 'id',
    hasNumbers: true,
  },
};

export const WithCheckboxes: Story = {
  args: {
    columns,
    rows,
    rowKey: 'id',
    hasCheckbox: true,
  },
};

export const WithClickableRows: Story = {
  args: {
    columns,
    rows,
    rowKey: 'id',
    onRowClick: (row: User) => alert(`Clicked: ${row.name}`),
  },
};

export const EmptyTable: Story = {
  args: {
    columns,
    rows: [],
    rowKey: 'id',
  },
};

export const WithSortableColumns: Story = {
  args: {
    columns: [
      { key: 'name', name: 'Name', dataIndex: 'name' as const, sortable: true },
      { key: 'email', name: 'Email', dataIndex: 'email' as const },
      { key: 'role', name: 'Role', dataIndex: 'role' as const, sortable: true },
      { key: 'status', name: 'Status', dataIndex: 'status' as const },
    ],
    rows,
    rowKey: 'id',
    onSortOrderChange: (params) => console.log('sort:', params),
  },
};
