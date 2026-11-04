import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeToggle } from '../components';
import { ThemeProvider } from '../providers';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  args: {},
};

export const CustomClass: Story = {
  args: {
    className: 'border border-gray-300',
  },
};
