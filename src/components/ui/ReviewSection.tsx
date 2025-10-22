import React from 'react';

interface ReviewSectionProps {
  title: string;
  step: number;
  fields: {
    label: string;
    value: string;
  }[];
  onEdit: (step: number) => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  title,
  step,
  fields,
  onEdit,
}) => {
  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <button
          onClick={() => onEdit(step)}
          className="
            text-blue-600 hover:text-blue-800 text-sm font-medium
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            rounded px-3 py-1 transition-colors
          "
          aria-label={`Editar ${title.toLowerCase()}`}
        >
          Editar
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {fields.map((field, index) => (
          <div key={index} className="space-y-1">
            <span className="font-medium text-gray-700 block">
              {field.label}:
            </span>
            <span className="text-gray-900 block truncate" title={field.value}>
              {field.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};