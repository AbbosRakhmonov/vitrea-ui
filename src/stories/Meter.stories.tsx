import type { Meta, StoryObj } from '@storybook/react-vite';
import { Meter } from '../components/stat';

const meta = {
  title: 'Components/Stat/Meter',
  component: Meter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A labelled magnitude row: name on the left, value on the right, bar beneath. Meters are never tinted with a category colour — a meter reads as magnitude, and colour there would read as identity. Pass `total` to also show each row as a share of the whole.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    value: { control: 'number' },
    maxValue: { control: 'number' },
    total: { control: 'number' },
    size: { control: 'inline-radio', options: ['md', 'lg'] },
    animate: { control: 'boolean' },
    index: { control: false },
    color: { control: false },
    className: { control: 'text' },
  },
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="lq-card w-[360px] p-4">
        <Story />
      </div>
    ),
  ],
  args: { name: 'reads', value: 820, maxValue: 1000 },
};

export const WithShare: Story = {
  decorators: [
    (Story) => (
      <div className="lq-card w-[360px] p-4">
        <Story />
      </div>
    ),
  ],
  args: { name: 'writes', value: 240, maxValue: 1000, total: 1820 },
};

export const List: Story = {
  args: { name: 'reads', value: 820, maxValue: 820 },
  render: () => (
    <div className="lq-card w-[360px] p-4">
      {[
        { name: 'reads', value: 820 },
        { name: 'writes', value: 240 },
        { name: 'shares', value: 96 },
        { name: 'saves', value: 48 },
      ].map((a, i) => (
        <Meter
          key={a.name}
          name={a.name}
          value={a.value}
          maxValue={820}
          total={1204}
          index={i}
        />
      ))}
    </div>
  ),
};

export const Large: Story = {
  decorators: [
    (Story) => (
      <div className="lq-card w-[360px] p-4">
        <Story />
      </div>
    ),
  ],
  args: { name: 'engagement', value: 680, maxValue: 1000, size: 'lg' },
};
