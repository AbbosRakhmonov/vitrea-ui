import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, Label } from '../ui/form';

const meta = {
  title: 'Form/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'failure'],
      description: 'Visual state of the input',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      description: 'Input type',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
  ),
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Hello World',
  },
};

export const Failure: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="error-input">Username</Label>
      <Input
        id="error-input"
        variant="failure"
        placeholder="Enter username"
        defaultValue="invalid@"
      />
      <p className="text-destructive text-sm">
        Username can only contain letters and numbers
      </p>
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="text">Text</Label>
        <Input id="text" type="text" placeholder="Text input" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="email@example.com" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Password" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="number">Number</Label>
        <Input id="number" type="number" placeholder="0" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="tel">Phone</Label>
        <Input id="tel" type="tel" placeholder="+1 (555) 000-0000" />
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="form-name">Full Name</Label>
        <Input id="form-name" placeholder="John Doe" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="form-email">Email Address</Label>
        <Input id="form-email" type="email" placeholder="john@example.com" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="form-password">Password</Label>
        <Input
          id="form-password"
          type="password"
          placeholder="Create a password"
        />
      </div>
    </form>
  ),
};
