import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateRangePicker } from '../components';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    format: { control: 'text' },
    onRangeSelected: { action: 'range selected' },
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  args: {
    placeholder: 'Select date range...',
    onRangeSelected: (range) => console.log('range:', range),
  },
};

export const WithValue: Story = {
  args: {
    selected: {
      from: new Date('2024-01-01'),
      to: new Date('2024-01-31'),
    },
    onRangeSelected: (range) => console.log('range:', range),
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled picker',
    disabled: true,
    onRangeSelected: () => {},
  },
};

export const CustomFormat: Story = {
  args: {
    format: 'DD/MM/YYYY',
    placeholder: 'DD/MM/YYYY - DD/MM/YYYY',
    onRangeSelected: (range) => console.log('range:', range),
  },
};
