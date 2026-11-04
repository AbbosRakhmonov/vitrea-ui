import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { StatTiles } from '../components/stat';

const meta = {
  title: 'Components/Stat/StatTiles',
  component: StatTiles,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A row of recessed tiles inside a card. Tone colours the label, never the number: the word carries the status, and a coloured value would read as a different measurement rather than a state.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tiles: { control: 'object' },
    columns: { control: 'inline-radio', options: [2, 3] },
    className: { control: 'text' },
  },
} satisfies Meta<typeof StatTiles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoColumns: Story = {
  render: (args) => (
    <div className="lq-glass lq-glass--content w-[360px] p-4">
      <StatTiles {...args} />
    </div>
  ),
  args: {
    columns: 2,
    tiles: [
      { label: 'Total', value: '1 516' },
      { label: 'Completed', value: '1 240', tone: 'green' },
      { label: 'Failed', value: '96', tone: 'red' },
    ],
  },
};

export const ThreeColumns: Story = {
  render: (args) => (
    <div className="lq-glass lq-glass--content w-[460px] p-4">
      <StatTiles {...args} />
    </div>
  ),
  args: {
    columns: 3,
    tiles: [
      { label: 'Waiting', value: '12', tone: 'orange' },
      { label: 'Active', value: '3' },
      { label: 'Done', value: '48', tone: 'green' },
    ],
  },
};

export const Interactive: Story = {
  render: (args) => (
    <div className="lq-glass lq-glass--content w-[360px] p-4">
      <StatTiles {...args} />
    </div>
  ),
  args: {
    columns: 2,
    tiles: [
      { label: 'Revenue', value: '12.4M', onClick: fn() },
      { label: 'Visits', value: '842', onClick: fn() },
    ],
  },
};
