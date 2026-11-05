import { RiAddLine } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { PageHeader } from '../components/layout';
import { Button } from '../ui/button';

const meta = {
  title: 'Components/Layout/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "The title row of a page: an optional back button, the title, and the page's own controls at the far end, all on one line.",
      },
    },
  },
  tags: ['autodocs'],
  args: { onBack: fn() },
  argTypes: {
    title: { control: 'text' },
    backLabel: { control: 'text' },
    onBack: { description: 'Shown as a back button when provided' },
    actions: { control: false, description: 'End-of-row controls' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Monitoring', onBack: undefined },
};

export const WithBackButton: Story = {
  args: { title: 'Activity log', backLabel: 'Back' },
};

export const WithActions: Story = {
  render: (args) => (
    <PageHeader
      {...args}
      actions={
        <Button>
          <RiAddLine />
          New shop
        </Button>
      }
    />
  ),
  args: { title: 'Shops', onBack: undefined },
};
