import React from 'react';

interface ReviewNavigationProps {
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const ReviewNavigation: React.FC<ReviewNavigationProps> = ({
  onBack,
  onSubmit,
  isSubmitting,
}) => {
  return (
    <div className="flex justify-between pt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={onBack}
        disabled={isSubmitting}
        className="
          bg-gray-300 text-gray-700 px-8 py-3 rounded-md 
          hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 
          transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        Voltar
      </button>
      
      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="
          bg-green-600 text-white px-8 py-3 rounded-md 
          hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500
          transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center space-x-2
        "
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Enviando...</span>
          </>
        ) : (
          <>
            <span>✓</span>
            <span>Confirmar Cadastro</span>
          </>
        )}
      </button>
    </div>
  );
};