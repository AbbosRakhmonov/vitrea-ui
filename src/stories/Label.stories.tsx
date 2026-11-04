import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, Input, Label } from '../ui/form';

const meta = {
  title: 'Form/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label text',
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="name">
        Full Name <span className="text-destructive">*</span>
      </Label>
      <Input id="name" placeholder="Enter your full name" />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="username">Username</Label>
      <Input id="username" placeholder="Choose a username" />
      <p className="text-muted-foreground text-sm">
        This will be your public display name.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="disabled-input" className="opacity-50">
        Disabled Field
      </Label>
      <Input
        id="disabled-input"
        disabled
        placeholder="This field is disabled"
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="w-87.5 space-y-4">
      <div className="grid gap-1.5">
        <Label htmlFor="form-firstname">
          First Name <span className="text-destructive">*</span>
        </Label>
        <Input id="form-firstname" placeholder="John" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="form-lastname">
          Last Name <span className="text-destructive">*</span>
        </Label>
        <Input id="form-lastname" placeholder="Doe" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="form-company">Company (Optional)</Label>
        <Input id="form-company" placeholder="Acme Inc." />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="form-newsletter" />
        <Label htmlFor="form-newsletter" className="font-normal">
          Subscribe to newsletter
        </Label>
      </div>
    </form>
  ),
};
