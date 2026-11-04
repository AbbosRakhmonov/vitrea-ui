import type { Meta, StoryObj } from '@storybook/react-vite';
import Loader from '../components/loader/Loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader/Loader',
  component: Loader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {},
};
