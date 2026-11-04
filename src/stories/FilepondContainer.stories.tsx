import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilepondContainer } from '../ui/form';

const meta = {
  title: 'Form/FilepondContainer',
  component: FilepondContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'failure'],
    },
  },
} satisfies Meta<typeof FilepondContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <FilepondContainer {...args} className="w-[400px]">
      <div className="filepond--root">
        <div className="filepond--panel-root"></div>
        <div className="filepond--drip"></div>
        <div className="filepond--drop-label">
          <label>Mock FilePond Label</label>
        </div>
      </div>
    </FilepondContainer>
  ),
};

export const Failure: Story = {
  args: {
    variant: 'failure',
  },
  render: (args) => (
    <FilepondContainer {...args} className="w-[400px]">
      <div className="filepond--root">
        <div className="filepond--panel-root"></div>
        <div className="filepond--drip"></div>
        <div className="filepond--drop-label">
          <label>Mock FilePond Label (Error)</label>
        </div>
      </div>
    </FilepondContainer>
  ),
};
