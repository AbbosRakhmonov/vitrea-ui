import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>A simple card with just content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-blue-500" />
            <span className="text-sm">New comment on your post</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-green-500" />
            <span className="text-sm">Your order has shipped</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-orange-500" />
            <span className="text-sm">Payment received</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">Mark all as read</Button>
        <Button>View all</Button>
      </CardFooter>
    </Card>
  ),
};

export const ProfileCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader className="items-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-2xl font-bold text-white">
          JD
        </div>
        <CardTitle className="mt-4">John Doe</CardTitle>
        <CardDescription>Software Engineer</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground text-sm">
          Building great user experiences with React and TypeScript.
        </p>
      </CardContent>
      <CardFooter className="justify-center gap-2">
        <Button variant="secondary" size="sm">
          Follow
        </Button>
        <Button size="sm">Message</Button>
      </CardFooter>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card className="w-[180px]">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl">$45,231.89</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-green-600">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card className="w-[180px]">
        <CardHeader>
          <CardDescription>Active Users</CardDescription>
          <CardTitle className="text-2xl">2,350</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-green-600">+180 this week</p>
        </CardContent>
      </Card>
      <Card className="w-[180px]">
        <CardHeader>
          <CardDescription>Sales</CardDescription>
          <CardTitle className="text-2xl">12,234</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-red-600">-4.5% from last month</p>
        </CardContent>
      </Card>
    </div>
  ),
};
