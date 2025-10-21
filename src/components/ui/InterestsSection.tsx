import React from "react";
import { INTERESTS_OPTIONS } from "../../constants/preferences";
import { FieldErrors } from "react-hook-form";
import { PreferencesFormData } from "../../types/preferences";

interface InterestsSectionProps {
  register: any;
  errors: FieldErrors<PreferencesFormData>;
  interests: string[];
}

export const InterestsSection: React.FC<InterestsSectionProps> = ({
  register,
  errors,
  interests = [],
}) => {
  const selectedCount = interests.length;
  const maxInterests = 5;

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        Interesses
        <span className="text-red-500 ml-1">*</span>
      </h3>

      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-gray-600">
          Selecione seus interesses ({selectedCount}/{maxInterests}{" "}
          selecionados)
        </p>
        {selectedCount > 0 && (
          <span
            className={`text-xs px-2 py-1 rounded ${
              selectedCount >= maxInterests
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {selectedCount}/{maxInterests}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {INTERESTS_OPTIONS.map((interest) => (
          <label
            key={interest}
            className={`
              flex items-center p-2 rounded border transition-colors
              ${
                interests.includes(interest)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }
            `}
          >
            <input
              type="checkbox"
              value={interest}
              {...register("interests")}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              disabled={
                !interests.includes(interest) && selectedCount >= maxInterests
              }
            />
            <span
              className={`
              ml-2 text-sm
              ${
                interests.includes(interest)
                  ? "text-blue-700 font-medium"
                  : "text-gray-700"
              }
              ${
                !interests.includes(interest) && selectedCount >= maxInterests
                  ? "opacity-50"
                  : ""
              }
            `}
            >
              {interest}
            </span>
          </label>
        ))}
      </div>

      {errors.interests && (
        <p className="text-sm text-red-600 mt-2 flex items-center">
          <span className="mr-1">⚠</span>
          {errors.interests.message}
        </p>
      )}

      {!errors.interests && selectedCount === 0 && (
        <p className="text-sm text-gray-500 mt-2">
          Selecione pelo menos um interesse
        </p>
      )}
    </div>
  );
};
