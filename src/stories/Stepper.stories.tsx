import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Stepper, StepperFooter, StepperItem } from '../ui/stepper';

const meta = {
  title: 'UI/Stepper',
  component: Stepper,
  args: { children: [] },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A multi-step form wizard on the design-system tokens: the current step in the accent fill, finished steps in the green fill with a check, the rest as an outlined numeral; the connector turns green as steps complete. Drive it with `StepperFooter` (reads the stepper context) or control `currentStep` yourself.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: { control: false },
    onStepChange: { control: false },
    className: { control: 'text' },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const Panel = ({ children }: { children: React.ReactNode }) => (
  <div className="lq-tile mb-6 p-6 text-[var(--label-2)]">{children}</div>
);

/** Uncontrolled: the footer drives next / previous through the stepper context. */
export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl">
      <Stepper>
        <StepperItem
          id="account"
          title="Account"
          description="Choose a platform"
        >
          <Panel>Pick the social account to incubate.</Panel>
          <StepperFooter />
        </StepperItem>
        <StepperItem id="plan" title="Plan" description="Set the schedule">
          <Panel>Configure the posting plan and cadence.</Panel>
          <StepperFooter />
        </StepperItem>
        <StepperItem id="review" title="Review" description="Confirm & launch">
          <Panel>Review everything before launch.</Panel>
          <StepperFooter />
        </StepperItem>
      </Stepper>
    </div>
  ),
};

/** Controlled: the parent owns `currentStep` and steps via its own buttons. */
export const Controlled: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    const steps = ['Account', 'Plan', 'Review'];
    return (
      <div className="mx-auto max-w-2xl">
        <Stepper currentStep={step} onStepChange={setStep}>
          {steps.map((title, i) => (
            <StepperItem key={title} id={title} title={title}>
              <Panel>
                Step {i + 1} content — “{title}”.
              </Panel>
            </StepperItem>
          ))}
        </Stepper>
        <div className="flex justify-between gap-2">
          <Button
            variant="tinted"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
          >
            Previous
          </Button>
          <Button
            disabled={step === steps.length - 1}
            onClick={() => setStep((s) => s + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    );
  },
};
