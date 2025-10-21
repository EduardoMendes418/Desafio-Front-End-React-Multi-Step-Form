import React from 'react';
import { FormStep } from '../types/form';

interface StepProgressBarProps {
  currentStep: FormStep;
  steps: { number: FormStep; label: string }[];
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step.number === currentStep
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : step.number < currentStep
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'bg-gray-200 border-gray-300 text-gray-500'
                }`}
              >
                {step.number < currentStep ? (
                  <span>✓</span>
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <span
                className={`text-sm mt-2 ${
                  step.number === currentStep
                    ? 'text-blue-600 font-medium'
                    : step.number < currentStep
                    ? 'text-green-500'
                    : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-4 ${
                  step.number < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};