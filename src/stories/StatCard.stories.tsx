import {
  RiCalendarCheckLine,
  RiMoneyDollarCircleLine,
  RiUserLine,
} from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { StatCard } from '../components/stat';

const meta = {
  title: 'Components/Stat/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A KPI tile: icon chip, label, and the number the screen is about. A tile sitting directly on the canvas takes the glass material; anywhere it sits on another surface it must be solid (glass is never stacked on glass). Numeric values count up on change unless reduced motion is requested.',
      },
    },
  },
  tags: ['autodocs'],
  args: { onClick: undefined },
  argTypes: {
    title: { control: 'text' },
    value: { control: 'text' },
    material: { control: 'inline-radio', options: ['glass', 'solid'] },
    animate: { control: 'boolean' },
    icon: { control: false },
    className: { control: 'text' },
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** On the canvas, a KPI tile takes the glass material. */
export const Glass: Story = {
  decorators: [
    (Story) => (
      <div className="lq-canvas w-[240px] rounded-2xl p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    icon: <RiUserLine />,
    title: 'Clients',
    value: 1240,
    material: 'glass',
  },
};

/** On another surface, it must be solid. */
export const Solid: Story = {
  decorators: [
    (Story) => (
      <div className="lq-glass lq-glass--content w-[260px] p-4">
        <Story />
      </div>
    ),
  ],
  args: {
    icon: <RiMoneyDollarCircleLine />,
    title: 'Revenue',
    value: '12.4M',
    material: 'solid',
  },
};

export const Interactive: Story = {
  decorators: [
    (Story) => (
      <div className="lq-canvas w-[240px] rounded-2xl p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    icon: <RiCalendarCheckLine />,
    title: 'Bookings today',
    value: 48,
    material: 'glass',
    onClick: fn(),
  },
};
