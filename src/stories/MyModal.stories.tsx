import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileText } from 'lucide-react';
import { MyModal, Section } from '../components';
import { Button } from '../ui/button';
import { Input } from '../ui/form';

const meta: Meta<typeof MyModal> = {
  title: 'Components/MyModal',
  component: MyModal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: [
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
        'full',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyModal>;

export const Default: Story = {
  args: {
    title: 'Modal title',
    trigger: <Button>Open modal</Button>,
    children: <p className="lq-subheadline">This is the modal content area.</p>,
  },
};

export const WithFooter: Story = {
  args: {
    title: 'New document',
    description: 'Fill in the details and save.',
    icon: <FileText />,
    trigger: <Button>Open with footer</Button>,
    children: (
      <Section title="Details">
        <Input placeholder="Name" />
        <Input placeholder="Owner" />
      </Section>
    ),
    footer: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button>Save</Button>
      </>
    ),
  },
};

export const Large: Story = {
  args: {
    title: 'Large modal',
    size: '3xl',
    trigger: <Button>Open large modal</Button>,
    children: (
      <>
        <p className="lq-subheadline">A larger dialog with more content.</p>
        <p className="lq-subheadline">The body scrolls on its own.</p>
      </>
    ),
  },
};

export const Fullscreen: Story = {
  args: {
    title: 'Fullscreen modal',
    size: 'full',
    trigger: <Button>Open fullscreen</Button>,
    children: (
      <p className="lq-subheadline">This modal takes up most of the screen.</p>
    ),
  },
};
