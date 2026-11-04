import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ReactSelect } from '../ui/form';

const meta = {
  title: 'Form/ReactSelect',
  component: ReactSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'List of available options',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    canAddItem: {
      control: 'boolean',
      description: 'Allow adding new items',
    },
    isMulti: {
      control: 'boolean',
      description: 'Allow multiple selection',
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof ReactSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option...',
  },
};

export const MultiSelect: Story = {
  args: {
    options: defaultOptions,
    isMulti: true,
    value: ['1', '2'],
    placeholder: 'Select multiple options...',
  },
};

export const WithError: Story = {
  args: {
    options: defaultOptions,
    error: true,
    placeholder: 'Error state',
  },
};

export const Creatable: Story = {
  args: {
    options: defaultOptions,
    canAddItem: true,
    placeholder: 'Type to create...',
  },
};

export const MenuOpen: Story = {
  args: {
    options: defaultOptions,
    defaultMenuIsOpen: true,
  },
};

export const MultiSelectMenuOpen: Story = {
  args: {
    options: defaultOptions,
    isMulti: true,
    value: ['1'],
    defaultMenuIsOpen: true,
  },
};
