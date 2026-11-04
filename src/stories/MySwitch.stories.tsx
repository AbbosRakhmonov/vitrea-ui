import type { Meta, StoryObj } from '@storybook/react-vite';
import { useForm, type FieldValues } from 'react-hook-form';
import { MySwitch } from '../components';
import { Form } from '../ui/form';

const meta: Meta<typeof MySwitch> = {
  title: 'Components/Form/MySwitch',
  component: MySwitch,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MySwitch>;

const Template = (args: Parameters<typeof MySwitch>[0]) => {
  const form = useForm<FieldValues>({ defaultValues: { enabled: false } });
  return (
    <Form {...form}>
      <MySwitch {...args} control={form.control} />
    </Form>
  );
};

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'enabled',
    label: 'Enable notifications',
  },
};

export const EnabledByDefault: Story = {
  render: (args) => {
    const form = useForm<FieldValues>({ defaultValues: { darkMode: true } });
    return (
      <Form {...form}>
        <MySwitch {...args} control={form.control} />
      </Form>
    );
  },
  args: {
    name: 'darkMode',
    label: 'Dark mode',
  },
};
