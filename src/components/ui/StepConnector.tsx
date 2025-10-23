import React from "react";
import { StepConnectorProps } from "../../types/progress";
import { getConnectorClasses } from "../../utils/progressUtils";

export const StepConnector: React.FC<StepConnectorProps> = ({
  stepNumber,
  currentStep,
}) => {
  const connectorClasses = getConnectorClasses(stepNumber, currentStep);

  return <div className={connectorClasses} />;
};
