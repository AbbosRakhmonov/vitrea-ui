import type { Meta, StoryObj } from '@storybook/react-vite';
import { Actions } from '../components';

const meta: Meta<typeof Actions> = {
  title: 'Components/Actions',
  component: Actions,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Actions>;

export const Default: Story = {
  args: {
    actions: [
      { label: 'Action 1', onClick: () => alert('Action 1 clicked') },
      { label: 'Action 2', onClick: () => alert('Action 2 clicked') },
      { label: 'Action 3', onClick: () => alert('Action 3 clicked') },
    ],
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Custom Actions',
    actions: [
      { label: 'Edit', onClick: () => alert('Edit clicked') },
      { label: 'Delete', onClick: () => alert('Delete clicked') },
    ],
  },
};
