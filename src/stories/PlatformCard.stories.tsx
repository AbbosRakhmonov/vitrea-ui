import { RiGroupLine } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlatformCard } from '../components/stat';

const meta = {
  title: 'Components/Stat/PlatformCard',
  component: PlatformCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "One platform's activity: a content-layer card holding recessed stat tiles and per-action meters. It is solid by default — the card repeats across the dashboard, and a row of glass surfaces would hit the spec's five-per-screen cap.",
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    platform: {
      control: 'select',
      options: [
        'youtube',
        'facebook',
        'instagram',
        'threads',
        'telegram',
        'x',
        'tiktok',
      ],
    },
    title: { control: 'text' },
    accounts: { control: 'number' },
    material: { control: 'inline-radio', options: ['solid', 'glass'] },
    animate: { control: 'boolean' },
    stats: { control: false },
    actions: { control: false },
    footer: { control: false },
    icon: { control: false },
    className: { control: 'text' },
  },
} satisfies Meta<typeof PlatformCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const stats = [
  { label: 'Total', value: '1 516' },
  { label: 'Done', value: '1 240', tone: 'green' as const },
  { label: 'Failed', value: '96', tone: 'red' as const },
];

const actions = [
  { name: 'likes', value: 820 },
  { name: 'comments', value: 240 },
  { name: 'shares', value: 96 },
];

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-[340px]">
        <Story />
      </div>
    ),
  ],
  args: {
    platform: 'instagram',
    title: 'Instagram',
    accounts: 12,
    accountsIcon: <RiGroupLine className="size-4" />,
    stats,
    actions,
    footer: (
      <button type="button" className="lq-link lq-footnote">
        See details
      </button>
    ),
  },
};

export const Empty: Story = {
  decorators: [
    (Story) => (
      <div className="w-[340px]">
        <Story />
      </div>
    ),
  ],
  args: {
    platform: 'telegram',
    title: 'Telegram',
    accounts: 3,
    stats,
    actions: actions.map((a) => ({ ...a, value: 0 })),
    emptyLabel: 'No activity yet',
  },
};

export const GlassMaterial: Story = {
  decorators: [
    (Story) => (
      <div className="lq-canvas w-[360px] rounded-2xl p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    platform: 'youtube',
    title: 'YouTube',
    accounts: 5,
    stats,
    actions,
    material: 'glass',
  },
};
