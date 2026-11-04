import type { Meta, StoryObj } from '@storybook/react-vite';
import { MyTooltip } from '../components';
import { Button } from '../ui/button';

const meta: Meta<typeof MyTooltip> = {
  title: 'Components/MyTooltip',
  component: MyTooltip,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    show: { control: 'boolean' },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyTooltip>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const Hidden: Story = {
  args: {
    content: 'This tooltip is hidden',
    show: false,
    children: <Button>No tooltip here</Button>,
  },
};

export const TopSide: Story = {
  args: {
    content: 'Tooltip on top',
    side: 'top',
    children: <Button>Top tooltip</Button>,
  },
};

export const BottomSide: Story = {
  args: {
    content: 'Tooltip on bottom',
    side: 'bottom',
    children: <Button>Bottom tooltip</Button>,
  },
};
