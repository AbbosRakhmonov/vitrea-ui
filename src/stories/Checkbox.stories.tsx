import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, Label } from '../ui/form';

const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'select',
      options: [true, false, 'indeterminate'],
      description: 'Checked state of the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the checkbox',
    },
  },
} satisfies Meta<typeof Checkbox>;

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

export const Indeterminate: Story = {
  args: {
    checked: 'indeterminate',
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
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const CheckboxGroup: Story = {
  render: () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">Select your interests:</h4>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="design" defaultChecked />
          <Label htmlFor="design">Design</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="development" />
          <Label htmlFor="development">Development</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="marketing" />
          <Label htmlFor="marketing">Marketing</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="analytics" disabled />
          <Label htmlFor="analytics" className="opacity-50">
            Analytics (Coming soon)
          </Label>
        </div>
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Checkbox />
        <span className="text-muted-foreground text-xs">Unchecked</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Checkbox checked />
        <span className="text-muted-foreground text-xs">Checked</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Checkbox checked="indeterminate" />
        <span className="text-muted-foreground text-xs">Indeterminate</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Checkbox disabled />
        <span className="text-muted-foreground text-xs">Disabled</span>
      </div>
    </div>
  ),
};
