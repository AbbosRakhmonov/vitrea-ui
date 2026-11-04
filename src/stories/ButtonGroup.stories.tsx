import {
  RiAddLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiSubtractLine,
} from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '../ui/button';

const meta = {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the button group',
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Left</Button>
      <Button variant="secondary">Middle</Button>
      <Button variant="secondary">Right</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="secondary">Top</Button>
      <Button variant="secondary">Middle</Button>
      <Button variant="secondary">Bottom</Button>
    </ButtonGroup>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary" size="icon">
        <RiArrowLeftLine />
      </Button>
      <Button variant="secondary" size="icon">
        <RiArrowRightLine />
      </Button>
    </ButtonGroup>
  ),
};

export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Copy</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary">Cut</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary">Paste</Button>
    </ButtonGroup>
  ),
};

export const WithText: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>Quantity:</ButtonGroupText>
      <Button variant="secondary" size="icon">
        <RiSubtractLine />
      </Button>
      <ButtonGroupText className="w-12 justify-center">5</ButtonGroupText>
      <Button variant="secondary" size="icon">
        <RiAddLine />
      </Button>
    </ButtonGroup>
  ),
};

export const Pagination: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary" size="icon">
        <RiArrowLeftLine />
      </Button>
      <Button variant="secondary">1</Button>
      <Button variant="default">2</Button>
      <Button variant="secondary">3</Button>
      <Button variant="secondary" size="icon">
        <RiArrowRightLine />
      </Button>
    </ButtonGroup>
  ),
};

export const ToggleGroup: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="default">Day</Button>
      <Button variant="secondary">Week</Button>
      <Button variant="secondary">Month</Button>
      <Button variant="secondary">Year</Button>
    </ButtonGroup>
  ),
};

export const MixedSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <ButtonGroup>
        <Button variant="secondary" size="sm">
          Small
        </Button>
        <Button variant="secondary" size="sm">
          Group
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary">Default</Button>
        <Button variant="secondary">Group</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary" size="lg">
          Large
        </Button>
        <Button variant="secondary" size="lg">
          Group
        </Button>
      </ButtonGroup>
    </div>
  ),
};

export const EditorToolbar: Story = {
  render: () => (
    <div className="flex gap-2">
      <ButtonGroup>
        <Button variant="secondary" size="sm">
          B
        </Button>
        <Button variant="secondary" size="sm">
          I
        </Button>
        <Button variant="secondary" size="sm">
          U
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary" size="sm">
          L
        </Button>
        <Button variant="secondary" size="sm">
          C
        </Button>
        <Button variant="secondary" size="sm">
          R
        </Button>
      </ButtonGroup>
    </div>
  ),
};
