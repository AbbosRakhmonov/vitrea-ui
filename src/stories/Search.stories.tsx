import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search } from '../components';

const meta: Meta<typeof Search> = {
  title: 'Components/Filters/Search',
  component: Search,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    onSearchChange: { action: 'search changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {
  args: {
    onSearchChange: (value) => console.log('search:', value),
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Search users by name...',
    onSearchChange: (value) => console.log('search:', value),
  },
};
