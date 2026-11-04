import type { Meta, StoryObj } from '@storybook/react-vite';
import { Confirm } from '../components';
import { Button } from '../ui/button';

const meta: Meta<typeof Confirm> = {
  title: 'Components/Confirm',
  component: Confirm,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    onConfirm: { action: 'confirmed' },
  },
};

export default meta;
type Story = StoryObj<typeof Confirm>;

export const Default: Story = {
  args: {
    children: <Button>Open Confirmation</Button>,
    title: 'Are you sure?',
    description: 'This will delete the selected items forever.',
    onConfirm: () => alert('Confirmed'),
  },
};

export const CustomContent: Story = {
  args: {
    children: <Button variant="destructive">Delete Item</Button>,
    title: 'Delete Item',
    description: 'Are you absolutely sure you want to delete this item?',
    onConfirm: () => alert('Deleted'),
  },
};
