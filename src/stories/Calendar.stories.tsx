import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { dayjs } from '../lib/day';
import { Calendar, DATE } from '../ui/calendar';

const meta: Meta<typeof Calendar> = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'date',
      description: 'The selected date',
    },
    format: {
      control: 'text',
      description: 'Date format for string values',
    },
    showOutsideDays: {
      control: 'boolean',
      description: 'Show days from outside months',
    },
  },
  args: { onSelect: fn() },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    selected: new Date(),
  },
};

export const WithFormat: Story = {
  args: {
    format: DATE,
    selected: dayjs().format(DATE),
  },
};

export const VisualRange: Story = {
  args: {
    selectedFromDate: dayjs().subtract(7, 'day').toDate(),
    selectedToDate: dayjs().add(7, 'day').toDate(),
  },
};

export const OutsideDaysHidden: Story = {
  args: {
    showOutsideDays: false,
  },
};

export const MonthYearSelection: Story = {
  args: {
    selected: new Date(2025, 0, 1),
  },
  play: async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Try to find and click month button
    const buttons = Array.from(canvasElement.querySelectorAll('button'));
    const monthButton = buttons.find((b) => b.textContent?.includes('Jan'));
    if (monthButton) {
      monthButton.click();
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Try to find and click year button
    const yearButton = buttons.find((b) => b.textContent === '2025');
    if (yearButton) {
      yearButton.click();
    }
  },
};
