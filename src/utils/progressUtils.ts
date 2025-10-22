import { FormStep } from '../types/form';
import { StepStatus, STEP_STATUS } from '../constants/progress';

export const getStepStatus = (stepNumber: FormStep, currentStep: FormStep): StepStatus => {
  if (stepNumber === currentStep) {
    return STEP_STATUS.CURRENT;
  }
  if (stepNumber < currentStep) {
    return STEP_STATUS.COMPLETED;
  }
  return STEP_STATUS.UPCOMING;
};

export const getStepIndicatorClasses = (status: StepStatus) => {
  const baseClasses = 'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300';
  
  const statusClasses = {
    [STEP_STATUS.CURRENT]: 'bg-blue-600 border-blue-600 text-white scale-110',
    [STEP_STATUS.COMPLETED]: 'bg-green-500 border-green-500 text-white',
    [STEP_STATUS.UPCOMING]: 'bg-gray-200 border-gray-300 text-gray-500',
  };

  return `${baseClasses} ${statusClasses[status]}`;
};

export const getStepLabelClasses = (status: StepStatus) => {
  const baseClasses = 'text-sm mt-2 transition-colors duration-300';
  
  const statusClasses = {
    [STEP_STATUS.CURRENT]: 'text-blue-600 font-medium',
    [STEP_STATUS.COMPLETED]: 'text-green-500',
    [STEP_STATUS.UPCOMING]: 'text-gray-500',
  };

  return `${baseClasses} ${statusClasses[status]}`;
};

export const getConnectorClasses = (stepNumber: FormStep, currentStep: FormStep) => {
  const baseClasses = 'flex-1 h-1 mx-4 transition-colors duration-300';
  const isCompleted = stepNumber < currentStep;
  
  return `${baseClasses} ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`;
};