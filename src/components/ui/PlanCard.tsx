import React from "react";
import { Plan } from "../../services/mockApi";

interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: (planId: string) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  isSelected,
  onSelect,
}) => {
  const cardClasses = `
    border rounded-lg p-6 cursor-pointer transition-all duration-200
    hover:shadow-md hover:border-blue-400
    ${
      isSelected
        ? "border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-200"
        : "border-gray-300 bg-white"
    }
  `;

  return (
    <div
      className={cardClasses}
      onClick={() => onSelect(plan.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(plan.id);
        }
      }}
    >
      <div className="text-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">{plan.name}</h3>
        <p className="text-2xl font-bold text-blue-600 my-2">
          R$ {plan.price.toFixed(2)}
          <span className="text-sm font-normal text-gray-600">/mês</span>
        </p>
      </div>

      <ul className="space-y-2">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            <span className="text-green-500 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-4 text-center">
        <div
          className={`inline-flex items-center justify-center w-6 h-6 rounded-full border ${
            isSelected
              ? "bg-blue-500 border-blue-500"
              : "bg-white border-gray-300"
          }`}
        >
          {isSelected && <span className="text-white text-sm">✓</span>}
        </div>
      </div>
    </div>
  );
};
