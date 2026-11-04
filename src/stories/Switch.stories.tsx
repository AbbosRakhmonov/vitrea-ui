import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label, Switch } from '../ui/form';

const meta = {
  title: 'Form/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Checked state of the switch',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the switch',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

export const SettingsExample: Story = {
  render: () => (
    <div className="w-[350px] space-y-4">
      <h4 className="mb-4 text-sm font-medium">Notification Settings</h4>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="emails">Email Notifications</Label>
          <p className="text-muted-foreground text-sm">
            Receive email updates about your account.
          </p>
        </div>
        <Switch id="emails" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="push">Push Notifications</Label>
          <p className="text-muted-foreground text-sm">
            Receive push notifications on your device.
          </p>
        </div>
        <Switch id="push" />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="marketing">Marketing Emails</Label>
          <p className="text-muted-foreground text-sm">
            Receive emails about new products and features.
          </p>
        </div>
        <Switch id="marketing" disabled />
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Switch />
        <span className="text-muted-foreground text-xs">Off</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch checked />
        <span className="text-muted-foreground text-xs">On</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch disabled />
        <span className="text-muted-foreground text-xs">Disabled Off</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch disabled checked />
        <span className="text-muted-foreground text-xs">Disabled On</span>
      </div>
    </div>
  ),
};
