import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from '../ui/progress';

const meta = {
  title: 'UI/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
  },
  render: (args) => (
    <div className="w-[300px]">
      <Progress {...args} />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="w-[300px]">
      <Progress value={0} />
    </div>
  ),
};

export const Quarter: Story = {
  render: () => (
    <div className="w-[300px]">
      <Progress value={25} />
    </div>
  ),
};

export const Half: Story = {
  render: () => (
    <div className="w-[300px]">
      <Progress value={50} />
    </div>
  ),
};

export const Complete: Story = {
  render: () => (
    <div className="w-[300px]">
      <Progress value={100} />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[300px]">
      <Progress value={75}>75%</Progress>
    </div>
  ),
};

export const MultipleProgress: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Storage</span>
          <span>45%</span>
        </div>
        <Progress value={45} />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Bandwidth</span>
          <span>78%</span>
        </div>
        <Progress value={78} />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>API Calls</span>
          <span>23%</span>
        </div>
        <Progress value={23} />
      </div>
    </div>
  ),
};

export const DownloadProgress: Story = {
  render: () => (
    <div className="w-[350px] space-y-2">
      <div className="flex justify-between text-sm">
        <span>Downloading file.zip</span>
        <span>2.5 MB / 5 MB</span>
      </div>
      <Progress value={50} />
      <p className="text-muted-foreground text-xs">
        Estimated time remaining: 30 seconds
      </p>
    </div>
  ),
};

export const StepsProgress: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <div className="flex justify-between text-sm">
        <span className="font-medium">Step 2 of 4</span>
        <span className="text-muted-foreground">Account Setup</span>
      </div>
      <Progress value={50} />
      <div className="text-muted-foreground flex justify-between text-xs">
        <span>Personal Info</span>
        <span>Account</span>
        <span>Preferences</span>
        <span>Complete</span>
      </div>
    </div>
  ),
};
