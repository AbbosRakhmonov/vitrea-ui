import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm, type FieldValues } from 'react-hook-form';
import { MyRadio } from '../components';
import { Form, RadioGroup } from '../ui/form';

const meta: Meta<typeof MyRadio> = {
  title: 'Components/Form/MyRadio',
  component: MyRadio,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyRadio>;

export const Default: Story = {
  render: (args) => {
    const form = useForm<FieldValues>({ defaultValues: { plan: 'basic' } });
    return (
      <Form {...form}>
        <RadioGroup>
          <MyRadio
            {...args}
            control={form.control}
            name="plan"
            value="basic"
            label="Basic"
          />
          <MyRadio
            {...args}
            control={form.control}
            name="plan"
            value="pro"
            label="Pro"
          />
          <MyRadio
            {...args}
            control={form.control}
            name="plan"
            value="enterprise"
            label="Enterprise"
          />
        </RadioGroup>
      </Form>
    );
  },
  args: {},
};
