import type { Meta, StoryObj } from '@storybook/react-vite';
import { MaskInput } from '../ui/form';

const meta = {
  title: 'Form/MaskInput',
  component: MaskInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mask: {
      control: 'text',
      description: 'The mask pattern',
    },
    variant: {
      control: 'select',
      options: ['default', 'failure', 'success'],
    },
  },
} satisfies Meta<typeof MaskInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Phone: Story = {
  args: {
    mask: '+{7} (000) 000-00-00',
    placeholder: '+7 (___) ___-__-__',
  },
};

export const Date: Story = {
  args: {
    mask: '00.00.0000',
    placeholder: 'DD.MM.YYYY',
  },
};

export const Failure: Story = {
  args: {
    mask: '0000 0000 0000 0000',
    placeholder: 'Credit Card',
    variant: 'failure',
  },
};
