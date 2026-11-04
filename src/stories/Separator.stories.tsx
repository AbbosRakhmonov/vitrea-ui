import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '../ui/separator';

const meta = {
  title: 'UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the separator',
    },
    decorative: {
      control: 'boolean',
      description: 'Whether the separator is decorative',
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Radix Primitives</h4>
        <p className="text-muted-foreground text-sm">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <span className="font-medium">Total</span>
        <span className="font-bold">$129.00</span>
      </div>
      <Separator className="my-4" />
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>$99.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>$10.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>$20.00</span>
        </div>
      </div>
    </div>
  ),
};

export const InMenu: Story = {
  render: () => (
    <div className="w-[200px] rounded-lg border p-2">
      <div className="hover:bg-muted cursor-pointer rounded px-2 py-1.5 text-sm">
        Profile
      </div>
      <div className="hover:bg-muted cursor-pointer rounded px-2 py-1.5 text-sm">
        Settings
      </div>
      <Separator className="my-2" />
      <div className="hover:bg-muted cursor-pointer rounded px-2 py-1.5 text-sm">
        Help
      </div>
      <div className="hover:bg-muted text-destructive cursor-pointer rounded px-2 py-1.5 text-sm">
        Log out
      </div>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">
            Or continue with
          </span>
        </div>
      </div>
    </div>
  ),
};
