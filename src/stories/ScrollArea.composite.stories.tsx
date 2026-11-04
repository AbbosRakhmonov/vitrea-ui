import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollArea } from '../components/scroll';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  args: {
    style: { height: 200, width: 300 },
    children: (
      <div className="space-y-2 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>Item {i + 1} — scrollable content line</p>
        ))}
      </div>
    ),
  },
};

export const HorizontalScroll: Story = {
  args: {
    style: { width: 300, whiteSpace: 'nowrap' },
    children: (
      <div className="flex gap-4 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="inline-block min-w-24 rounded border p-2 text-center"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    ),
  },
};
