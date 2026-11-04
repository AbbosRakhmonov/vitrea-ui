import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tab';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-muted-foreground text-sm">
          Make changes to your account here.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-muted-foreground text-sm">
          Change your password here.
        </p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-muted-foreground text-sm">
          Adjust your settings here.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const Segmented: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList type="segmented">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-muted-foreground text-sm">
          Overview content goes here.
        </p>
      </TabsContent>
      <TabsContent value="analytics">
        <p className="text-muted-foreground text-sm">
          Analytics content goes here.
        </p>
      </TabsContent>
      <TabsContent value="reports">
        <p className="text-muted-foreground text-sm">
          Reports content goes here.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const Line: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList type="line">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-muted-foreground text-sm">Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-muted-foreground text-sm">Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-muted-foreground text-sm">Content for Tab 3</p>
      </TabsContent>
    </Tabs>
  ),
};

export const Pill: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-[400px]">
      <TabsList rounded="pill" type="segmented">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <p className="text-muted-foreground text-sm">Showing all items</p>
      </TabsContent>
      <TabsContent value="active">
        <p className="text-muted-foreground text-sm">Showing active items</p>
      </TabsContent>
      <TabsContent value="completed">
        <p className="text-muted-foreground text-sm">Showing completed items</p>
      </TabsContent>
    </Tabs>
  ),
};

export const SoftVariant: Story = {
  render: () => (
    <Tabs defaultValue="design" className="w-[400px]">
      <TabsList variant="soft">
        <TabsTrigger value="design">Design</TabsTrigger>
        <TabsTrigger value="develop">Develop</TabsTrigger>
        <TabsTrigger value="deploy">Deploy</TabsTrigger>
      </TabsList>
      <TabsContent value="design">
        <p className="text-muted-foreground text-sm">Design phase content</p>
      </TabsContent>
      <TabsContent value="develop">
        <p className="text-muted-foreground text-sm">
          Development phase content
        </p>
      </TabsContent>
      <TabsContent value="deploy">
        <p className="text-muted-foreground text-sm">
          Deployment phase content
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="profile" className="w-[400px]">
      <TabsList full>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <p className="text-muted-foreground text-sm">Profile settings</p>
      </TabsContent>
      <TabsContent value="notifications">
        <p className="text-muted-foreground text-sm">
          Notification preferences
        </p>
      </TabsContent>
      <TabsContent value="security">
        <p className="text-muted-foreground text-sm">Security settings</p>
      </TabsContent>
    </Tabs>
  ),
};

export const Scrollable: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[300px]">
      <TabsList scrollable>
        {Array.from({ length: 10 }, (_, i) => (
          <TabsTrigger key={i} value={`tab${i + 1}`}>
            Tab {i + 1}
          </TabsTrigger>
        ))}
      </TabsList>
      {Array.from({ length: 10 }, (_, i) => (
        <TabsContent key={i} value={`tab${i + 1}`}>
          Content for Tab {i + 1}
        </TabsContent>
      ))}
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    // Wait for buttons to appear
    await new Promise((resolve) => setTimeout(resolve, 500));
    const rightButton = canvasElement.querySelector(
      'button[aria-label="Scroll right"]'
    );
    if (rightButton instanceof HTMLElement) {
      rightButton.click();
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    const leftButton = canvasElement.querySelector(
      'button[aria-label="Scroll left"]'
    );
    if (leftButton instanceof HTMLElement) {
      leftButton.click();
    }
  },
};
