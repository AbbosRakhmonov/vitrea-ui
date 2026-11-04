import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBadge } from '../components/stat';

const meta = {
  title: 'Components/Stat/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A status pill. `children` is required, not optional: status always travels with its word — a bare coloured dot says nothing to a red-green colourblind operator, and in a device fleet that distinction is the whole point.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['neutral', 'green', 'red', 'orange', 'accent'],
    },
    dot: {
      control: 'boolean',
      description: 'Leading dot — on by default for coloured tones',
    },
    children: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { tone: 'green', children: 'Active' },
};

export const AllTones: Story = {
  args: { children: 'Draft' },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <StatusBadge tone="neutral">Draft</StatusBadge>
      <StatusBadge tone="green">Online</StatusBadge>
      <StatusBadge tone="red">Offline</StatusBadge>
      <StatusBadge tone="orange">Pending</StatusBadge>
      <StatusBadge tone="accent">New</StatusBadge>
    </div>
  ),
};

export const WithoutDot: Story = {
  args: { tone: 'green', dot: false, children: 'Completed' },
};
