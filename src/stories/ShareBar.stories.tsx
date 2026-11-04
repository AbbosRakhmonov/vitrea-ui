import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShareBar } from '../components/stat';

const meta = {
  title: 'Components/Stat/ShareBar',
  component: ShareBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Part-to-whole for a handful of parts: one bar split into segments, with a legend that carries the numbers. Every segment is named in the legend — identity is never carried by colour alone.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    segments: { control: 'object' },
    bar: {
      control: 'boolean',
      description: 'Hide the bar to show the legend alone',
    },
    emptyLabel: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof ShareBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const segments = [
  { key: 'completed', label: 'Completed', value: 1240, color: 'var(--green)' },
  { key: 'no_show', label: 'No-show', value: 180, color: 'var(--orange)' },
  { key: 'cancelled', label: 'Cancelled', value: 96, color: 'var(--red)' },
];

export const Default: Story = {
  render: (args) => (
    <div className="lq-glass lq-glass--content w-[360px] p-4">
      <ShareBar {...args} />
    </div>
  ),
  args: { segments },
};

export const LegendOnly: Story = {
  render: (args) => (
    <div className="lq-glass lq-glass--content w-[360px] p-4">
      <ShareBar {...args} />
    </div>
  ),
  args: { segments, bar: false },
};

export const Empty: Story = {
  render: (args) => (
    <div className="lq-glass lq-glass--content w-[360px] p-4">
      <ShareBar {...args} />
    </div>
  ),
  args: {
    segments: segments.map((s) => ({ ...s, value: 0 })),
    emptyLabel: 'No bookings yet',
  },
};
