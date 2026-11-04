import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../ui/button';
import { Input, Label } from '../ui/form';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

const meta = {
  title: 'UI/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent className="bg-background">
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This is a sheet description. You can add any content here.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <p className="text-muted-foreground text-sm">
            Sheet content goes here. This is a drawer-style dialog.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const Open: Story = {
  render: () => (
    <Sheet defaultOpen>
      <SheetTrigger asChild>
        <Button variant="secondary">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent className="bg-background">
        <SheetHeader>
          <SheetTitle>Opened by Default</SheetTitle>
          <SheetDescription>
            This sheet is open when the story loads.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <p className="text-muted-foreground text-sm">
            This helps in testing the content coverage.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const ExplicitClose: Story = {
  render: () => (
    <Sheet defaultOpen>
      <SheetTrigger asChild>
        <Button variant="secondary">Explicit Close</Button>
      </SheetTrigger>
      <SheetContent className="bg-background">
        <SheetHeader>
          <SheetTitle>Are you sure?</SheetTitle>
          <SheetDescription>
            This sheet requires an explicit action to close.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" variant="secondary">
              Close me
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const LeftSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open Left</Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-background">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Browse through the menu items.</SheetDescription>
        </SheetHeader>
        <nav className="space-y-2 p-4">
          <a href="#" className="hover:bg-muted block rounded px-4 py-2">
            Home
          </a>
          <a href="#" className="hover:bg-muted block rounded px-4 py-2">
            Products
          </a>
          <a href="#" className="hover:bg-muted block rounded px-4 py-2">
            About
          </a>
          <a href="#" className="hover:bg-muted block rounded px-4 py-2">
            Contact
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  ),
};

export const TopSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open Top</Button>
      </SheetTrigger>
      <SheetContent side="top" className="bg-background">
        <SheetHeader className="text-center">
          <SheetTitle>Notification</SheetTitle>
          <SheetDescription>
            You have a new message from the system.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const BottomSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open Bottom</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="bg-background">
        <SheetHeader className="text-center">
          <SheetTitle>Quick Actions</SheetTitle>
          <SheetDescription>Choose an action to perform.</SheetDescription>
        </SheetHeader>
        <div className="flex justify-center gap-4 p-4">
          <Button variant="secondary">Share</Button>
          <Button variant="secondary">Copy Link</Button>
          <Button>Save</Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit Profile</Button>
      </SheetTrigger>
      <SheetContent className="bg-background">
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@johndoe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const CartSheet: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">View Cart (3)</Button>
      </SheetTrigger>
      <SheetContent className="bg-background flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>You have 3 items in your cart</SheetDescription>
        </SheetHeader>
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-4 border-b pb-4">
              <div className="bg-muted size-16 rounded" />
              <div className="flex-1">
                <p className="font-medium">Product {item}</p>
                <p className="text-muted-foreground text-sm">$29.99</p>
              </div>
              <Button variant="ghost" size="sm">
                Remove
              </Button>
            </div>
          ))}
        </div>
        <SheetFooter className="border-t pt-4">
          <div className="w-full space-y-4">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>$89.97</span>
            </div>
            <Button className="w-full">Checkout</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
