import React from "react";

interface FormNavigationProps {
  onBack: () => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting?: boolean;
  backButtonLabel?: string;
  nextButtonLabel?: string;
  showBackButton?: boolean;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
  onBack,
  onSubmit,
  isSubmitting = false,
  backButtonLabel = "Voltar",
  nextButtonLabel = "Próximo",
  showBackButton = true,
}) => {
  return (
    <footer className="flex justify-between pt-6 border-t border-gray-200">
      {showBackButton && (
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="
            bg-gray-300 text-gray-700 px-6 py-3 rounded-md 
            hover:bg-gray-400 focus:outline-none focus:ring-2 
            focus:ring-gray-500 focus:ring-offset-2
            transition-colors duration-200
            font-medium disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {backButtonLabel}
        </button>
      )}

      <button
        type="submit"
        onClick={onSubmit}
        disabled={isSubmitting}
        className={`
          bg-blue-600 text-white px-6 py-3 rounded-md 
          hover:bg-blue-700 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:ring-offset-2
          transition-colors duration-200 font-medium
          ml-auto
          ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {isSubmitting ? "Processando..." : nextButtonLabel}
      </button>
    </footer>
  );
};
