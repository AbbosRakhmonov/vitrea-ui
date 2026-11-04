import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TimePicker } from '../ui/calendar';

const meta = {
  title: 'UI/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Time in HH:mm format',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '12:00',
  },
};

export const Disabled: Story = {
  args: {
    value: '14:30',
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    value: '09:15',
    error: true,
  },
};

export const InvalidValue: Story = {
  args: {
    value: '99:99',
  },
};
