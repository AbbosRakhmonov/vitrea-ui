import type { Meta, StoryObj } from '@storybook/react-vite';
import Spin from '../components/loader/Spin';

const meta: Meta<typeof Spin> = {
  title: 'Components/Loader/Spin',
  component: Spin,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Spin>;

export const Default: Story = {
  args: {
    className: 'text-blue-500 size-8',
  },
};

export const Large: Story = {
  args: {
    className: 'text-red-500 size-12',
  },
};
