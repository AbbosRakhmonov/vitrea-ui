import type { Meta, StoryObj } from '@storybook/react-vite';
import { MyGallery } from '../components';

const meta: Meta<typeof MyGallery> = {
  title: 'Components/MyGallery',
  component: MyGallery,
  tags: ['autodocs'],
  argTypes: {
    hasInfo: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof MyGallery>;

const sampleImages = [
  {
    id: '1',
    src: 'https://picsum.photos/seed/1/800/600',
    thumbnail: 'https://picsum.photos/seed/1/400/300',
    alt: 'Sample image 1',
    title: 'Mountain Landscape',
  },
  {
    id: '2',
    src: 'https://picsum.photos/seed/2/800/600',
    thumbnail: 'https://picsum.photos/seed/2/400/300',
    alt: 'Sample image 2',
    title: 'Ocean View',
  },
  {
    id: '3',
    src: 'https://picsum.photos/seed/3/800/600',
    thumbnail: 'https://picsum.photos/seed/3/400/300',
    alt: 'Sample image 3',
    title: 'Forest Trail',
  },
  {
    id: '4',
    src: 'https://picsum.photos/seed/4/800/600',
    thumbnail: 'https://picsum.photos/seed/4/400/300',
    alt: 'Sample image 4',
    title: 'Desert Dunes',
  },
];

export const Default: Story = {
  args: {
    images: sampleImages,
  },
};

export const WithInfo: Story = {
  args: {
    images: sampleImages,
    hasInfo: true,
  },
};

export const SingleImage: Story = {
  args: {
    images: [sampleImages[0]],
    hasInfo: true,
  },
};
