import React from "react";
import { THEME_OPTIONS } from "../../constants/preferences";
import { FieldErrors } from "react-hook-form";
import { PreferencesFormData } from "../../types/preferences";

interface ThemeSectionProps {
  register: any;
  currentTheme: string;
  errors: FieldErrors<PreferencesFormData>;
}

export const ThemeSection: React.FC<ThemeSectionProps> = ({
  register,
  currentTheme,
  errors,
}) => {
  const isDark = currentTheme === "dark";

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        Tema
        <span className="text-red-500 ml-1">*</span>
      </h3>
      <div className="flex space-x-4">
        {THEME_OPTIONS.map((theme) => (
          <label key={theme.value} className="flex items-center">
            <input
              type="radio"
              value={theme.value}
              {...register("theme")}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">{theme.label}</span>
          </label>
        ))}
      </div>

      {errors.theme && (
        <p className="text-sm text-red-600 mt-2 flex items-center">
          <span className="mr-1">⚠</span>
          {errors.theme.message}
        </p>
      )}

      <div
        className={`mt-4 p-4 rounded-lg border ${
          isDark
            ? "bg-gray-800 text-white border-gray-700"
            : "bg-white text-gray-800 border-gray-300"
        }`}
      >
        <p>Preview do tema selecionado</p>
        <div
          className={`mt-2 p-2 rounded ${
            isDark ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          Exemplo de card
        </div>
      </div>
    </div>
  );
};
