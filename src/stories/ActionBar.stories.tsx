import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckIcon, SquarePenIcon, Trash2Icon } from 'lucide-react';
import { ActionBar } from '../components/layout';
import { Button } from '../ui/button';

const meta = {
  title: 'Components/Layout/ActionBar',
  component: ActionBar,
  args: { children: null },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A floating glass capsule pinned to the bottom of a detail page scroll area. Buttons inside take the tinted capsule look automatically; give the one main action the primary variant.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text', description: 'Extra classes on the capsule' },
    children: { control: false, description: 'Action buttons' },
  },
} satisfies Meta<typeof ActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ActionBar {...args}>
      <Button variant="tinted">
        <Trash2Icon />
        Delete
      </Button>
      <Button variant="tinted">
        <SquarePenIcon />
        Edit
      </Button>
      <Button>
        <CheckIcon />
        Approve
      </Button>
    </ActionBar>
  ),
};

export const SingleAction: Story = {
  render: () => (
    <ActionBar>
      <Button>
        <CheckIcon />
        Save changes
      </Button>
    </ActionBar>
  ),
};

export const InScrollContext: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="lq-canvas h-[360px] overflow-y-auto p-4">
      <div className="space-y-3 text-[var(--label-2)]">
        {Array.from({ length: 12 }).map((_, i) => (
          <p key={i}>
            Detail row {i + 1} — the page reads in full above the bar.
          </p>
        ))}
      </div>
      <ActionBar>
        <Button variant="tinted">Cancel</Button>
        <Button>Confirm</Button>
      </ActionBar>
    </div>
  ),
};
