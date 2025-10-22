import { FormStep } from './form';

export interface Step {
  number: FormStep;
  label: string;
}

export interface StepProgressBarProps {
  currentStep: FormStep;
  steps: Step[];
}

export interface StepIndicatorProps {
  step: Step;
  currentStep: FormStep;
}

export interface StepConnectorProps {
  stepNumber: FormStep;
  currentStep: FormStep;
}