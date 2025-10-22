import React from "react";
import { getPositionClasses, getToastAnimation } from "../../utils/toastUtils";

interface ToastContainerProps {
  children: React.ReactNode;
  position: string;
  isVisible: boolean;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  children,
  position,
  isVisible,
}) => {
  const positionClasses = getPositionClasses(position);
  const animationClasses = getToastAnimation(isVisible);

  return (
    <div className={`fixed z-50 ${positionClasses} ${animationClasses}`}>
      {children}
    </div>
  );
};
