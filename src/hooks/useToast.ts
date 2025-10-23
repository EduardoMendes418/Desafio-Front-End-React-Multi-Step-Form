import { useEffect } from "react";
import { ToastProps } from "../types/toast";

export const useToast = ({
  isVisible,
  onClose,
  duration = 3000,
}: Pick<ToastProps, "isVisible" | "onClose" | "duration">) => {
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(onClose, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [isVisible, duration, onClose]);

  return {
    shouldRender: isVisible,
  };
};
