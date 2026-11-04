import type { Meta, StoryObj } from '@storybook/react-vite';
import { MyModal } from '../components';
import { Button } from '../ui/button';

const meta: Meta<typeof MyModal> = {
  title: 'Components/MyModal',
  component: MyModal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyModal>;

export const Default: Story = {
  args: {
    header: 'Modal Title',
    trigger: <Button>Open Modal</Button>,
    children: <p>This is the modal content area.</p>,
  },
};

export const WithFooter: Story = {
  args: {
    header: 'Confirm Action',
    trigger: <Button>Open with Footer</Button>,
    children: <p>Are you sure you want to proceed with this action?</p>,
    footer: (
      <div className="flex gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button>Confirm</Button>
      </div>
    ),
  },
};

export const Large: Story = {
  args: {
    header: 'Large Modal',
    size: '3xl',
    trigger: <Button>Open Large Modal</Button>,
    children: (
      <div className="space-y-4">
        <p>This is a larger modal dialog with more content.</p>
        <p>It supports multiple paragraphs and rich content.</p>
      </div>
    ),
  },
};

export const Fullscreen: Story = {
  args: {
    header: 'Fullscreen Modal',
    size: 'full',
    trigger: <Button>Open Fullscreen</Button>,
    children: <p>This modal takes up most of the screen.</p>,
  },
};
