import { RiInformationLine, RiQuestionLine } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const OnIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon">
          <RiInformationLine className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>More information</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Tooltip on top</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Tooltip on bottom</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Tooltip on left</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Tooltip on right</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <Tooltip delayDuration={700}>
      <TooltipTrigger asChild>
        <Button variant="secondary">Delayed (700ms)</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This tooltip has a 700ms delay</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon">
          <RiQuestionLine className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[200px]">
        <p>
          This is a longer tooltip that contains more detailed information about
          the feature or element being described.
        </p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const InlineText: Story = {
  render: () => (
    <p className="text-sm">
      This is some text with a{' '}
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help underline decoration-dotted">
            technical term
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>An explanation of the technical term</p>
        </TooltipContent>
      </Tooltip>{' '}
      that needs explanation.
    </p>
  ),
};

export const FormHelp: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">API Key</label>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="size-5">
            <RiQuestionLine className="size-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>You can find your API key in the settings page</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};
