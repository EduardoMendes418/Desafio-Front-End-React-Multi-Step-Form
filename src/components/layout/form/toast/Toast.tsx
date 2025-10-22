import React from "react";
import { ToastProps } from "../../../../types/toast";
import { useToast } from "../../../../hooks/useToast";
import { ToastContainer } from "../../../ui/ToastContainer";
import { ToastContent } from "../../../ui/ToastContent";


export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 3000,
  position = "top-right",
}) => {
  const { shouldRender } = useToast({
    isVisible,
    onClose,
    duration,
  });

  if (!shouldRender) return null;

  return (
    <ToastContainer position={position} isVisible={isVisible}>
      <ToastContent message={message} type={type} onClose={onClose} />
    </ToastContainer>
  );
};
