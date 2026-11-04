import {
  RiAlertLine,
  RiErrorWarningLine,
  RiInformationLine,
} from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'warning', 'destructive'],
      description: 'Visual style variant of the alert',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <RiInformationLine className="size-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is a default alert message with some important information.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'default',
  },
};

export const Warning: Story = {
  render: (args) => (
    <Alert {...args}>
      <RiAlertLine className="size-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        This action may have unintended consequences. Please proceed with
        caution.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'warning',
  },
};

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args}>
      <RiErrorWarningLine className="size-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Something went wrong. Please try again or contact support.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'destructive',
  },
};

export const WithoutIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>This is an alert without an icon.</AlertDescription>
    </Alert>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-100 flex-col gap-4">
      <Alert variant="default">
        <RiInformationLine className="size-4" />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is a default alert.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <RiAlertLine className="size-4" />
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>This is a warning alert.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <RiErrorWarningLine className="size-4" />
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>This is a destructive alert.</AlertDescription>
      </Alert>
    </div>
  ),
};
