import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../../hooks/use-mobile';
import { cn } from '../../lib';
import { Button } from '../button';

/**
 * Stepper - a multi-step form wizard. Moved from the app (it was an app-local
 * copy outside the design system) and put on the tokens: the current step in
 * the accent fill, finished steps in the green fill with a check, the rest as
 * an outlined numeral; the connector turns green as steps complete.
 */

interface StepperItemProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  /** Runs before leaving the step; returning false keeps the user on it. */
  validate?: () => boolean | Promise<boolean>;
}

interface StepperProps {
  currentStep?: number;
  onStepChange?: (step: number) => void;
  className?: string;
  children:
    | React.ReactElement<StepperItemProps>
    | React.ReactElement<StepperItemProps>[];
}

interface StepData {
  id: string;
  title: string;
  description?: string;
  validate?: () => boolean | Promise<boolean>;
}

interface StepperContextType {
  currentStep: number;
  totalSteps: number;
  goToStep: (step: number) => void;
  nextStep: () => Promise<void>;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  steps: StepData[];
}

const StepperContext = React.createContext<StepperContextType | undefined>(
  undefined
);

function useStepper() {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error('useStepper must be used within a Stepper');
  }
  return context;
}

function StepperItem({ children }: StepperItemProps) {
  return <>{children}</>;
}

function isStepperItem(
  element: React.ReactElement
): element is React.ReactElement<StepperItemProps> {
  return element.type === StepperItem;
}

function Stepper({
  currentStep = 0,
  onStepChange,
  className,
  children,
}: StepperProps) {
  const [activeStep, setActiveStep] = React.useState(currentStep);

  const steps = React.useMemo(() => {
    return React.Children.toArray(children)
      .map((child) => {
        if (React.isValidElement(child) && isStepperItem(child)) {
          return {
            id: child.props.id,
            title: child.props.title,
            description: child.props.description,
            validate: child.props.validate,
          };
        }
        return null;
      })
      .filter(Boolean) as StepData[];
  }, [children]);

  const currentStepElement = React.useMemo(() => {
    return React.Children.toArray(children)[activeStep] || null;
  }, [children, activeStep]);

  const goToStep = React.useCallback(
    (step: number) => {
      if (step >= 0 && step < steps.length) {
        setActiveStep(step);
        onStepChange?.(step);
      }
    },
    [steps.length, onStepChange]
  );

  const nextStep = React.useCallback(async () => {
    const currentStepData = steps[activeStep];
    if (currentStepData?.validate) {
      try {
        if (!(await currentStepData.validate())) return;
      } catch (error) {
        console.error('Step validation failed:', error);
        return;
      }
    }
    goToStep(activeStep + 1);
  }, [activeStep, goToStep, steps]);

  const prevStep = React.useCallback(() => {
    goToStep(activeStep - 1);
  }, [activeStep, goToStep]);

  // Follow a controlled currentStep.
  React.useEffect(() => {
    if (currentStep !== activeStep) {
      setActiveStep(currentStep);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const contextValue: StepperContextType = React.useMemo(
    () => ({
      currentStep: activeStep,
      totalSteps: steps.length,
      goToStep,
      nextStep,
      prevStep,
      isFirstStep: activeStep === 0,
      isLastStep: activeStep === steps.length - 1,
      steps,
    }),
    [activeStep, goToStep, nextStep, prevStep, steps]
  );

  return (
    <StepperContext.Provider value={contextValue}>
      <div className={cn('w-full', className)}>
        <StepperHeader />
        <div className="min-h-[200px]">{currentStepElement}</div>
      </div>
    </StepperContext.Provider>
  );
}

const StepperHeader = React.memo(() => {
  const { currentStep, steps } = useStepper();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between text-sm font-medium text-[var(--label-2)]">
          <span className="tabular-nums">
            {currentStep + 1} / {steps.length}
          </span>
          <span className="truncate">{steps[currentStep]?.title}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-[var(--fill-3)]">
          <div
            className="h-1.5 rounded-full bg-[var(--accent)] transition-all duration-[var(--duration-base)] ease-[var(--ease-liquid)]"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        {steps[currentStep]?.description && (
          <p className="mt-3 text-center text-sm text-[var(--label-2)]">
            {steps[currentStep].description}
          </p>
        )}
      </div>
    );
  }

  return (
    <ol className="mb-8 flex items-center justify-between">
      {steps.map((step, index) => {
        const done = index < currentStep;
        const current = index === currentStep;
        return (
          <React.Fragment key={step.id}>
            <li
              className="flex flex-col items-center"
              aria-current={current ? 'step' : undefined}
            >
              <span
                className={cn(
                  'flex size-10 items-center justify-center rounded-full border-2 text-sm font-semibold tabular-nums transition-colors',
                  done
                    ? 'border-[var(--green-fill)] bg-[var(--green-fill)] text-[var(--on-green)]'
                    : current
                      ? 'border-[var(--accent-fill)] bg-[var(--accent-fill)] text-[var(--on-accent)]'
                      : 'border-[var(--separator)] text-[var(--label-2)]'
                )}
              >
                {done ? <Check className="size-5" /> : index + 1}
              </span>
              <span className="mt-2 text-center">
                <span
                  className={cn(
                    'block text-sm font-medium',
                    index <= currentStep
                      ? 'text-[var(--label)]'
                      : 'text-[var(--label-2)]'
                  )}
                >
                  {step.title}
                </span>
                {step.description && (
                  <span className="mt-1 block text-xs text-[var(--label-2)]">
                    {step.description}
                  </span>
                )}
              </span>
            </li>
            {index < steps.length - 1 && (
              <li
                aria-hidden
                className={cn(
                  'mx-4 h-0.5 flex-1 rounded-full transition-colors',
                  done ? 'bg-[var(--green-fill)]' : 'bg-[var(--separator)]'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </ol>
  );
});
StepperHeader.displayName = 'StepperHeader';

function StepperFooter({
  children,
  nextLabel,
  prevLabel,
  showNext = true,
  showPrev = true,
  onNext,
  onPrev,
}: {
  children?: React.ReactNode;
  nextLabel?: string;
  prevLabel?: string;
  showNext?: boolean;
  showPrev?: boolean;
  onNext?: () => void | Promise<void>;
  onPrev?: () => void;
}) {
  const { t } = useTranslation();
  const { nextStep, prevStep, isFirstStep, isLastStep } = useStepper();
  const isMobile = useIsMobile();

  const handleNext = React.useCallback(async () => {
    if (onNext) await onNext();
    else await nextStep();
  }, [onNext, nextStep]);

  const handlePrev = React.useCallback(() => {
    if (onPrev) onPrev();
    else prevStep();
  }, [onPrev, prevStep]);

  return (
    <div className="flex items-center justify-between gap-4 border-t border-[var(--separator)] pt-6">
      {showPrev ? (
        <Button
          type="button"
          variant="tinted"
          onClick={handlePrev}
          disabled={isFirstStep}
          size={isMobile ? 'sm' : 'default'}
        >
          <ChevronLeft className="size-4" />
          {!isMobile && (prevLabel || t('Previous'))}
        </Button>
      ) : (
        <div />
      )}

      {children}

      {showNext ? (
        <Button
          type="button"
          onClick={handleNext}
          disabled={isLastStep}
          size={isMobile ? 'sm' : 'default'}
        >
          {!isMobile && (nextLabel || (isLastStep ? t('Finish') : t('Next')))}
          <ChevronRight className="size-4" />
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
}

function useStepData() {
  const { steps, currentStep } = useStepper();
  return React.useMemo(
    () => ({ currentStepData: steps[currentStep], allSteps: steps }),
    [steps, currentStep]
  );
}

export { Stepper, StepperFooter, StepperItem, useStepData, useStepper };
export type { StepData, StepperContextType, StepperItemProps, StepperProps };
