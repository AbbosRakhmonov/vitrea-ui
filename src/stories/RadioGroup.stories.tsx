import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label, RadioGroup, RadioGroupItem } from '../ui/form';

const meta = {
  title: 'Form/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable" className="flex gap-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="d1" />
        <Label htmlFor="d1">Available</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="d2" />
        <Label htmlFor="d2">Also Available</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="d3" disabled />
        <Label htmlFor="d3" className="opacity-50">
          Not Available
        </Label>
      </div>
    </RadioGroup>
  ),
};

export const PlanSelection: Story = {
  render: () => (
    <div className="w-[350px]">
      <h4 className="mb-4 text-sm font-medium">Select a plan</h4>
      <RadioGroup defaultValue="pro">
        <div className="mb-2 flex items-start space-x-3 rounded-lg border p-4">
          <RadioGroupItem value="free" id="free" className="mt-1" />
          <div className="space-y-1">
            <Label htmlFor="free" className="font-medium">
              Free
            </Label>
            <p className="text-muted-foreground text-sm">
              Get started with basic features
            </p>
          </div>
        </div>
        <div className="border-primary mb-2 flex items-start space-x-3 rounded-lg border p-4">
          <RadioGroupItem value="pro" id="pro" className="mt-1" />
          <div className="space-y-1">
            <Label htmlFor="pro" className="font-medium">
              Pro - $19/mo
            </Label>
            <p className="text-muted-foreground text-sm">
              Advanced features for professionals
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3 rounded-lg border p-4">
          <RadioGroupItem value="enterprise" id="enterprise" className="mt-1" />
          <div className="space-y-1">
            <Label htmlFor="enterprise" className="font-medium">
              Enterprise
            </Label>
            <p className="text-muted-foreground text-sm">
              Custom solutions for large teams
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  ),
};

export const PaymentMethod: Story = {
  render: () => (
    <div className="w-[300px]">
      <h4 className="mb-4 text-sm font-medium">Payment Method</h4>
      <RadioGroup defaultValue="card">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card">Credit Card</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="paypal" id="paypal" />
          <Label htmlFor="paypal">PayPal</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bank" id="bank" />
          <Label htmlFor="bank">Bank Transfer</Label>
        </div>
      </RadioGroup>
    </div>
  ),
};
