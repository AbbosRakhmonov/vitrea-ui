import type { Meta, StoryObj } from '@storybook/react-vite';
import { PLATFORM_KEYS, PlatformMark } from '../components/stat';

const meta = {
  title: 'Components/Stat/PlatformMark',
  component: PlatformMark,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A platform identity for a legend, a card header or a chart key. The dot and the name travel together on purpose: the platform palette is a set of brand colours that fails contrast checks (x reads as grey; instagram vs facebook separate by only ΔE 5.9 under protanopia), so naming the platform is what makes the colour safe — there is no dot-only mode.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    platform: { control: 'select', options: [...PLATFORM_KEYS] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    children: { control: 'text' },
    icon: { control: false },
    className: { control: 'text' },
  },
} satisfies Meta<typeof PlatformMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { platform: 'instagram', children: 'Instagram' },
};

export const AllPlatforms: Story = {
  args: { platform: 'instagram' },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {PLATFORM_KEYS.map((p) => (
        <PlatformMark key={p} platform={p}>
          {p[0].toUpperCase() + p.slice(1)}
        </PlatformMark>
      ))}
    </div>
  ),
};

export const Small: Story = {
  args: { platform: 'telegram', size: 'sm', children: 'Telegram' },
};
