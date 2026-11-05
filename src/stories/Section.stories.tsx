import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserRound } from 'lucide-react';
import { Section } from '../components';
import { Input } from '../ui/form';

const meta: Meta<typeof Section> = {
  title: 'Components/Section',
  component: Section,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: {
    title: 'Profile',
    icon: <UserRound />,
    description: 'Shown to everyone in the workspace.',
    children: (
      <>
        <Input placeholder="Name" />
        <Input placeholder="Email" />
      </>
    ),
  },
};

export const Plain: Story = {
  args: {
    title: 'Notes',
    plain: true,
    children: <p className="lq-footnote lq-label-2">Content without a tile.</p>,
  },
};
