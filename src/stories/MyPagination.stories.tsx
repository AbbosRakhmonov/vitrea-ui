import type { Meta, StoryObj } from '@storybook/react-vite';
import { MyPagination } from '../components';

const meta: Meta<typeof MyPagination> = {
  title: 'Components/Pagination/MyPagination',
  component: MyPagination,
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 0 } },
    onPageChange: { action: 'page changed' },
  },
};

export default meta;
type Story = StoryObj<typeof MyPagination>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('page:', page),
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('page:', page),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: (page) => console.log('page:', page),
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page) => console.log('page:', page),
  },
};
