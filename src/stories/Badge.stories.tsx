import { RiAlertLine, RiCheckLine } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../ui/badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'status', 'indicator', 'icon'],
      description: 'Type of badge',
    },
    variant: {
      control: 'select',
      options: [
        'default',
        'gray',
        'blue',
        'cyan',
        'green',
        'lime',
        'orange',
        'red',
        'purple',
        'indigo',
        'default-outlined',
        'gray-outlined',
        'blue-outlined',
        'cyan-outlined',
        'green-outlined',
        'lime-outlined',
        'orange-outlined',
        'red-outlined',
        'purple-outlined',
        'indigo-outlined',
      ],
      description: 'Color variant of the badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: 'Size of the badge',
    },
    rounded: {
      control: 'select',
      options: ['default', 'full'],
      description: 'Border radius style',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const StatusBadge: Story = {
  args: {
    children: 'Active',
    type: 'status',
  },
};

export const IndicatorBadge: Story = {
  args: {
    children: 'New',
    type: 'indicator',
    variant: 'green',
  },
};

export const IconBadge: Story = {
  args: {
    children: <RiCheckLine />,
    type: 'icon',
    variant: 'green',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Badge',
    size: 'lg',
  },
};

export const Rounded: Story = {
  args: {
    children: 'Rounded',
    rounded: 'full',
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="gray">Gray</Badge>
      <Badge variant="blue">Blue</Badge>
      <Badge variant="cyan">Cyan</Badge>
      <Badge variant="green">Green</Badge>
      <Badge variant="lime">Lime</Badge>
      <Badge variant="orange">Orange</Badge>
      <Badge variant="red">Red</Badge>
      <Badge variant="purple">Purple</Badge>
      <Badge variant="indigo">Indigo</Badge>
    </div>
  ),
};

export const OutlinedVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default-outlined">Default</Badge>
      <Badge variant="gray-outlined">Gray</Badge>
      <Badge variant="blue-outlined">Blue</Badge>
      <Badge variant="cyan-outlined">Cyan</Badge>
      <Badge variant="green-outlined">Green</Badge>
      <Badge variant="lime-outlined">Lime</Badge>
      <Badge variant="orange-outlined">Orange</Badge>
      <Badge variant="red-outlined">Red</Badge>
      <Badge variant="purple-outlined">Purple</Badge>
      <Badge variant="indigo-outlined">Indigo</Badge>
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge type="default" variant="blue">
        Default
      </Badge>
      <Badge type="status" variant="green">
        Status
      </Badge>
      <Badge type="indicator" variant="orange">
        Indicator
      </Badge>
      <Badge type="icon" variant="red">
        <RiAlertLine />
      </Badge>
    </div>
  ),
};
