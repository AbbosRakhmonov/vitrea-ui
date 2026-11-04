import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SecretValue } from '../components/layout';

const meta = {
  title: 'Components/Layout/SecretValue',
  component: SecretValue,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A credential shown masked, with a reveal toggle and a copy button — for a login or a password inside a detail list. With no value it is a dash and offers nothing to reveal or copy.',
      },
    },
  },
  tags: ['autodocs'],
  args: { onCopied: fn(), onCopyError: fn() },
  argTypes: {
    value: { control: 'text' },
    showLabel: { control: 'text' },
    hideLabel: { control: 'text' },
    copyLabel: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof SecretValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 'S3cr3t-Pa55w0rd!' },
};

export const Empty: Story = {
  args: { value: null },
};

export const InContext: Story = {
  render: (args) => (
    <div className="lq-glass lq-glass--content flex w-[360px] items-center justify-between gap-4 p-4">
      <span className="lq-footnote lq-label-2">Password</span>
      <SecretValue {...args} />
    </div>
  ),
  args: { value: 'hunter2-glass-token' },
};
