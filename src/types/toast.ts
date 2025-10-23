export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export interface ToastStyleConfig {
  bgColor: string;
  textColor: string;
  icon: string;
}
