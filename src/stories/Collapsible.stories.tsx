import { RiArrowDownSLine } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

const meta = {
  title: 'UI/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px]">
        <div className="flex items-center justify-between space-x-4">
          <h4 className="text-sm font-semibold">
            @peduarte starred 3 repositories
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <RiArrowDownSLine
                className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="mt-2 rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/primitives
        </div>
        <CollapsibleContent className="mt-2 space-y-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            @stitches/react
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-[350px]">
      <div className="flex items-center justify-between space-x-4">
        <h4 className="text-sm font-semibold">Repositories</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            Toggle
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2 space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          repo-1
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          repo-2
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          repo-3
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const FAQ: Story = {
  render: function FAQStory() {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    return (
      <div className="w-[400px] space-y-2">
        <Collapsible open={open1} onOpenChange={setOpen1}>
          <CollapsibleTrigger asChild>
            <div className="hover:bg-muted flex cursor-pointer items-center justify-between rounded-lg border p-4">
              <span className="font-medium">What is a collapsible?</span>
              <RiArrowDownSLine
                className={`size-4 transition-transform ${open1 ? 'rotate-180' : ''}`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="text-muted-foreground px-4 py-2 text-sm">
              A collapsible is a component that can be expanded or collapsed to
              show or hide content. It's commonly used for FAQs, accordions, and
              navigation menus.
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={open2} onOpenChange={setOpen2}>
          <CollapsibleTrigger asChild>
            <div className="hover:bg-muted flex cursor-pointer items-center justify-between rounded-lg border p-4">
              <span className="font-medium">How does it work?</span>
              <RiArrowDownSLine
                className={`size-4 transition-transform ${open2 ? 'rotate-180' : ''}`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="text-muted-foreground px-4 py-2 text-sm">
              The collapsible uses Radix UI primitives under the hood, providing
              accessible keyboard navigation and proper ARIA attributes.
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={open3} onOpenChange={setOpen3}>
          <CollapsibleTrigger asChild>
            <div className="hover:bg-muted flex cursor-pointer items-center justify-between rounded-lg border p-4">
              <span className="font-medium">Is it accessible?</span>
              <RiArrowDownSLine
                className={`size-4 transition-transform ${open3 ? 'rotate-180' : ''}`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="text-muted-foreground px-4 py-2 text-sm">
              Yes! The collapsible component follows WAI-ARIA guidelines and
              supports keyboard navigation out of the box.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

export const NestedContent: Story = {
  render: function NestedStory() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[350px] rounded-lg border"
      >
        <CollapsibleTrigger asChild>
          <div className="hover:bg-muted flex cursor-pointer items-center justify-between p-4">
            <span className="font-medium">Advanced Settings</span>
            <RiArrowDownSLine
              className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-4 p-4 pt-0">
            <div className="flex items-center justify-between">
              <label className="text-sm">Enable notifications</label>
              <input type="checkbox" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm">Dark mode</label>
              <input type="checkbox" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm">Auto-save</label>
              <input type="checkbox" defaultChecked />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
