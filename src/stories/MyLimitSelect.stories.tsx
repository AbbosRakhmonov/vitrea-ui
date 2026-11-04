import type { Meta, StoryObj } from '@storybook/react-vite';
import { MyLimitSelect } from '../components';
import {
  DEFAULT_ITEMS_LIMIT,
  DEFAULT_OPTIONS,
} from '../components/pagination/MyLimitSelect';

const meta: Meta<typeof MyLimitSelect> = {
  title: 'Components/Pagination/MyLimitSelect',
  component: MyLimitSelect,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: { control: 'number' },
    onLimitChange: { action: 'limit changed' },
  },
};

export default meta;
type Story = StoryObj<typeof MyLimitSelect>;

export const Default: Story = {
  args: {
    onLimitChange: (limit) => console.log('limit:', limit),
  },
};

export const CustomDefault: Story = {
  args: {
    defaultValue: DEFAULT_ITEMS_LIMIT,
    onLimitChange: (limit) => console.log('limit:', limit),
  },
};

export const CustomOptions: Story = {
  args: {
    options: [
      ...DEFAULT_OPTIONS,
      { value: 200, label: '200' },
      { value: 500, label: '500' },
    ],
    onLimitChange: (limit) => console.log('limit:', limit),
  },
};
