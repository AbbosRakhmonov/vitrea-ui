import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardContent } from '../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

const meta = {
  title: 'UI/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const WithSize: Story = {
  render: () => (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Carousel
      opts={{
        align: 'start',
      }}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-1 h-[200px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const ImageGallery: Story = {
  render: () => (
    <Carousel className="w-full max-w-md">
      <CarouselContent>
        {[
          'bg-gradient-to-br from-pink-500 to-orange-400',
          'bg-gradient-to-br from-blue-500 to-purple-600',
          'bg-gradient-to-br from-green-400 to-blue-500',
          'bg-gradient-to-br from-yellow-400 to-red-500',
          'bg-gradient-to-br from-indigo-500 to-pink-500',
        ].map((gradient, index) => (
          <CarouselItem key={index}>
            <div
              className={`aspect-video rounded-lg ${gradient} flex items-center justify-center`}
            >
              <span className="text-2xl font-bold text-white">
                Image {index + 1}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const ProductCards: Story = {
  render: () => (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full max-w-2xl"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
          >
            <Card>
              <CardContent className="p-4">
                <div className="bg-muted mb-4 aspect-square rounded-lg" />
                <h3 className="font-semibold">Product {index + 1}</h3>
                <p className="text-muted-foreground text-sm">$99.99</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const Testimonials: Story = {
  render: () => (
    <Carousel className="w-full max-w-lg">
      <CarouselContent>
        {[
          {
            name: 'Alice',
            role: 'Designer',
            text: 'This product changed my workflow completely!',
          },
          {
            name: 'Bob',
            role: 'Developer',
            text: 'Best tool I have ever used. Highly recommend!',
          },
          {
            name: 'Carol',
            role: 'Manager',
            text: 'Our team productivity increased by 50%.',
          },
        ].map((testimonial, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="bg-muted mx-auto mb-4 size-16 rounded-full" />
                <p className="mb-4 text-lg italic">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-muted-foreground text-sm">
                  {testimonial.role}
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};
