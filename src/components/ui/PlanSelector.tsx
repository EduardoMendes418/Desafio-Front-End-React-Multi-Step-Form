import React from "react";
import { Plan } from "../../services/mockApi";
import { PlanCard } from "./PlanCard";

interface PlanSelectorProps {
  plans: Plan[];
  selectedPlan: string;
  onPlanSelect: (planId: string) => void;
  loading?: boolean;
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({
  plans,
  selectedPlan,
  onPlanSelect,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-gray-600 mt-2">Carregando planos...</p>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum plano disponível no momento.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Selecione um plano
        <span className="text-red-500 ml-1">*</span>
      </label>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan === plan.id}
            onSelect={onPlanSelect}
          />
        ))}
      </div>
    </div>
  );
};
