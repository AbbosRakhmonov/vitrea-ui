import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label, Textarea } from '../ui/form';

const meta = {
  title: 'Form/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'failure'],
      description: 'Visual state of the textarea',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="message">Your Message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    defaultValue:
      'This is some default text in the textarea. You can edit this content as needed.',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'This textarea is disabled',
    disabled: true,
  },
};

export const Failure: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="bio">Bio</Label>
      <Textarea
        id="bio"
        variant="failure"
        placeholder="Tell us about yourself"
        defaultValue="Hi"
      />
      <p className="text-destructive text-sm">
        Bio must be at least 20 characters
      </p>
    </div>
  ),
};

export const WithCharacterCount: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        placeholder="Enter a description..."
        maxLength={200}
        defaultValue="This is a sample description that shows character counting functionality."
      />
      <p className="text-muted-foreground text-right text-sm">
        71/200 characters
      </p>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="w-[400px] space-y-4">
      <div className="grid gap-1.5">
        <Label htmlFor="subject">Subject</Label>
        <input
          id="subject"
          className="h-10 w-full rounded-lg border px-3"
          placeholder="Enter subject"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="body">Message Body</Label>
        <Textarea
          id="body"
          placeholder="Write your message here..."
          className="min-h-[150px]"
        />
      </div>
      <p className="text-muted-foreground text-sm">
        Your message will be reviewed within 24 hours.
      </p>
    </form>
  ),
};
