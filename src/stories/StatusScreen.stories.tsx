import { RiLock2Line, RiSearchLine } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusScreen } from '../components/layout';
import { Button } from '../ui/button';

const meta = {
  title: 'Components/Layout/StatusScreen',
  component: StatusScreen,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A full-screen status page — not found, forbidden, a crash. The canvas with its ambient light and one glass card, all on the theme tokens, so it follows light and dark like every other screen.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    code: { control: 'text', description: 'Large status numeral' },
    tone: {
      control: 'inline-radio',
      options: ['accent', 'red', 'orange'],
      description: 'Hue of the icon circle',
    },
    title: { control: 'text' },
    description: { control: 'text' },
    icon: { control: false },
    actions: { control: false },
    hint: { control: false },
  },
} satisfies Meta<typeof StatusScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotFound: Story = {
  args: {
    code: '404',
    tone: 'accent',
    icon: <RiSearchLine />,
    title: 'Page not found',
    description: 'The page you were looking for has moved or never existed.',
  },
  render: (args) => (
    <StatusScreen {...args} actions={<Button>Go home</Button>} />
  ),
};

export const Forbidden: Story = {
  args: {
    code: '403',
    tone: 'red',
    icon: <RiLock2Line />,
    title: 'Access denied',
    description: 'You do not have permission to view this shop.',
  },
  render: (args) => (
    <StatusScreen
      {...args}
      actions={<Button variant="tinted">Back to dashboard</Button>}
      hint="If you believe this is a mistake, contact your shop owner."
    />
  ),
};
