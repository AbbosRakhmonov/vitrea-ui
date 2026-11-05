import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlobeIcon, MapPinIcon, UserIcon } from 'lucide-react';
import { DetailList } from '../components/layout';

const meta = {
  title: 'Components/Layout/DetailList',
  component: DetailList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A titled group of label / value rows — the inset grouped list of a settings screen. A missing value renders as a quiet dash; identifier values can be shown in a monospaced face.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Optional group heading' },
    items: { control: 'object', description: 'Label / value rows' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof DetailList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="lq-glass lq-glass--content w-[460px] p-4">
      <DetailList {...args} />
    </div>
  ),
  args: {
    title: 'Персона',
    items: [
      { label: 'Full name', value: 'Abbos Rakhmonov', icon: <UserIcon /> },
      { label: 'Country', value: 'Uzbekistan', icon: <GlobeIcon /> },
      { label: 'City', value: 'Tashkent', icon: <MapPinIcon /> },
      { label: 'Token', value: 'ph_8f21c0a9', mono: true },
      { label: 'Latitude', value: undefined },
    ],
  },
};

export const WithoutTitle: Story = {
  render: (args) => (
    <div className="lq-glass lq-glass--content w-[460px] p-4">
      <DetailList {...args} />
    </div>
  ),
  args: {
    items: [
      { label: 'Status', value: 'Active' },
      { label: 'Plan', value: 'free_launch' },
      { label: 'Created', value: '2026-11-02' },
    ],
  },
};
