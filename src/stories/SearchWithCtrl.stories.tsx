import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchWithCtrl } from '../components';

const meta: Meta<typeof SearchWithCtrl> = {
  title: 'Components/Filters/SearchWithCtrl',
  component: SearchWithCtrl,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    onSearchChange: { action: 'search changed' },
  },
};

export default meta;
type Story = StoryObj<typeof SearchWithCtrl>;

export const Default: Story = {
  args: {
    onSearchChange: (value) => console.log('search:', value),
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Search and press CTRL+Enter...',
    onSearchChange: (value) => console.log('search:', value),
  },
};
