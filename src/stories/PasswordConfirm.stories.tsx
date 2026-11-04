import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordConfirm } from '../components';
import { Button } from '../ui/button';

const meta: Meta<typeof PasswordConfirm> = {
  title: 'Components/Confirm/PasswordConfirm',
  component: PasswordConfirm,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    onSubmit: { action: 'submitted' },
  },
};

export default meta;
type Story = StoryObj<typeof PasswordConfirm>;

export const Default: Story = {
  args: {
    children: <Button>Confirm with Password</Button>,
    onSubmit: (data) => alert(`Password: ${data.password}`),
  },
};

export const CustomContent: Story = {
  args: {
    children: <Button variant="destructive">Delete Account</Button>,
    title: 'Delete Account',
    description: 'Enter your password to permanently delete your account.',
    onSubmit: (data) => alert(`Submitted: ${data.password}`),
  },
};
