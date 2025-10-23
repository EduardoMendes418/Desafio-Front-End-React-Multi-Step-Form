import React from "react";

interface PreferencesNavigationProps {
  onBack: () => void;
  onSubmit: () => void;
  isValid: boolean;
}

export const PreferencesNavigation: React.FC<PreferencesNavigationProps> = ({
  onBack,
  onSubmit,
  isValid,
}) => {
  return (
    <div className="flex justify-between pt-4 border-t border-gray-200">
      <button
        type="button"
        onClick={onBack}
        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
      >
        Voltar
      </button>
      <button
        type="submit"
        onClick={onSubmit}
        disabled={!isValid}
        className={`
          px-6 py-2 rounded-md focus:outline-none focus:ring-2 transition-colors
          ${
            isValid
              ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }
        `}
      >
        Próximo
      </button>
    </div>
  );
};
