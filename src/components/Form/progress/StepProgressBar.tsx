import React from "react";
import { StepProgressBarProps } from "../../../types/progress";
import { StepIndicator } from "../../ui/StepIndicator";
import { StepConnector } from "../../ui/StepConnector";


export const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStep,
  steps,
}) => {
  return (
    <div className="w-full mb-12">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <StepIndicator step={step} currentStep={currentStep} />

            {index < steps.length - 1 && (
              <StepConnector
                stepNumber={step.number}
                currentStep={currentStep}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Passo {currentStep} de {steps.length}
        </p>
      </div>
    </div>
  );
};
