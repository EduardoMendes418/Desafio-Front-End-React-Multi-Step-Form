import React from 'react';
import { getStepIndicatorClasses, getStepLabelClasses, getStepStatus } from '../../utils/progressUtils';
import { StepIndicatorProps } from '../../types/progress';



export const StepIndicator: React.FC<StepIndicatorProps> = ({ step, currentStep }) => {
  const status = getStepStatus(step.number, currentStep);
  const indicatorClasses = getStepIndicatorClasses(status);
  const labelClasses = getStepLabelClasses(status);

  const renderStepContent = () => {
    if (status === 'completed') {
      return <span className="text-sm font-bold">✓</span>;
    }
    return <span className="text-sm font-medium">{step.number}</span>;
  };

  return (
    <div className="flex flex-col items-center">
      <div className={indicatorClasses}>
        {renderStepContent()}
      </div>
      <span className={labelClasses}>
        {step.label}
      </span>
    </div>
  );
};