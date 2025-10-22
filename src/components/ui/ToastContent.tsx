import React from "react";
import { getToastStyles } from "../../utils/toastUtils";
import { ToastType } from "../../types/toast";

interface ToastContentProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export const ToastContent: React.FC<ToastContentProps> = ({
  message,
  type,
  onClose,
}) => {
  const styles = getToastStyles(type);

  return (
    <div
      className={`
        ${styles.bgColor} ${styles.textColor} 
        px-6 py-4 rounded-lg shadow-xl 
        flex items-center space-x-3 
        min-w-80 max-w-md
        transform transition-all duration-300
        hover:shadow-2xl
      `}
      role="alert"
      aria-live="polite"
    >
      <span className="text-lg flex-shrink-0" aria-hidden="true">
        {styles.icon}
      </span>

      <span className="flex-1 text-sm font-medium leading-5">{message}</span>

      <button
        onClick={onClose}
        className={`
          flex-shrink-0 
          ${styles.textColor} 
          hover:opacity-70 
          focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-current
          transition-opacity duration-200
          text-lg font-bold
          w-6 h-6 flex items-center justify-center rounded
        `}
        aria-label="Fechar notificação"
      >
        ×
      </button>
    </div>
  );
};
