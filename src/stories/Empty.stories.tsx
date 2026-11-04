import type { Meta, StoryObj } from '@storybook/react-vite';
import { MailOpen } from 'lucide-react';
import { Empty } from '../components';

const meta: Meta<typeof Empty> = {
  title: 'Components/Empty',
  component: Empty,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  args: {},
};

export const CustomMessage: Story = {
  args: {
    children: 'No messages found',
  },
};

export const CustomIcon: Story = {
  args: {
    icon: <MailOpen size={48} strokeWidth={1} />,
    children: 'Your inbox is empty',
  },
};
