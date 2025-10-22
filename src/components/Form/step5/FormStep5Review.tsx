import React from "react";
import { FormStep5ReviewProps } from "../../../types/components";
import {
  formatAccountData,
  formatAddressData,
  formatPersonalData,
  formatPreferencesData,
} from "../../../utils/reviewFormatters";
import { useReviewForm } from "../../../hooks/useReviewForm";
import { ReviewSection } from "../../ui/ReviewSection";
import { ReviewNavigation } from "../../ui/ReviewNavigation";
import { Toast } from "../../Toast";

export const FormStep5Review: React.FC<FormStep5ReviewProps> = ({
  onBack,
  onEdit,
}) => {
  const { formData, isSubmitting, toast, handleSubmit, closeToast } =
    useReviewForm();

  const sections = [
    {
      title: "Informações Pessoais",
      step: 1,
      fields: formatPersonalData(formData.personal),
    },
    {
      title: "Endereço",
      step: 2,
      fields: formatAddressData(formData.address),
    },
    {
      title: "Conta",
      step: 3,
      fields: formatAccountData(formData.account),
    },
    {
      title: "Preferências",
      step: 4,
      fields: formatPreferencesData(formData.preferences),
    },
  ];

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Revisão e Confirmação
        </h2>
        <p className="text-gray-600 text-lg">
          Revise suas informações antes de confirmar o cadastro
        </p>
      </header>

      <div className="space-y-6">
        {sections.map((section) => (
          <ReviewSection
            key={section.title}
            title={section.title}
            step={section.step}
            fields={section.fields}
            onEdit={onEdit}
          />
        ))}
      </div>

      <ReviewNavigation
        onBack={onBack}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </div>
  );
};
