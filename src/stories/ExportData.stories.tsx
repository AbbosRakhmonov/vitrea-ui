import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExportData } from '../components';

const meta: Meta<typeof ExportData> = {
  title: 'Components/ExportData',
  component: ExportData,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ExportData>;

export const Default: Story = {
  args: {
    options: [
      { label: 'Export as CSV', onClick: () => alert('Exporting CSV...') },
      { label: 'Export as Excel', onClick: () => alert('Exporting Excel...') },
      { label: 'Export as PDF', onClick: () => alert('Exporting PDF...') },
    ],
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    options: [
      { label: 'Export as CSV', onClick: () => {} },
      { label: 'Export as Excel', onClick: () => {} },
    ],
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Download Report',
    options: [
      { label: 'Download CSV', onClick: () => alert('CSV download') },
      { label: 'Download XLSX', onClick: () => alert('XLSX download') },
    ],
  },
};
