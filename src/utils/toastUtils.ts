import { ToastType, ToastStyleConfig } from "../types/toast";
import { TOAST_STYLES } from "../constants/toast";

export const getToastStyles = (type: ToastType): ToastStyleConfig => {
  return TOAST_STYLES[type];
};

export const getPositionClasses = (position: string): string => {
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  return (
    positionClasses[position as keyof typeof positionClasses] || "top-4 right-4"
  );
};

export const getToastAnimation = (isVisible: boolean): string => {
  return isVisible
    ? "animate-in slide-in-from-right-full duration-300"
    : "animate-out slide-out-to-right-full duration-300";
};
