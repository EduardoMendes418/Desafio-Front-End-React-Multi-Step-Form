import React from "react";
import { usePreferencesForm } from "../../../../hooks/usePreferencesForm";
import { NotificationSection } from "../../../ui/NotificationSection";
import { ThemeSection } from "../../../ui/ThemeSection";
import { InterestsSection } from "../../../ui/InterestsSection";
import { PreferencesNavigation } from "../../../ui/PreferencesNavigation";
import { FormStep4PreferencesProps } from "../../../../types/components";

export const FormStep4Preferences: React.FC<FormStep4PreferencesProps> = ({
  onNext,
  onBack,
}) => {
 const {
  register,
  handleSubmit,
  theme,
  interests,
  notifications,
  errors,
  isValid,
  onSubmit,
} = usePreferencesForm(onNext);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Preferências</h2>
        <p className="text-gray-600 text-sm">
          Personalize sua experiência. Todos os campos são obrigatórios.
        </p>
      </header>

      <div className="space-y-8">
        <NotificationSection
          register={register}
          errors={errors}
          notifications={notifications}
        />

        <ThemeSection
          register={register}
          currentTheme={theme}
          errors={errors}
        />

        <InterestsSection
          register={register}
          errors={errors}
          interests={interests}
        />
      </div>

      <PreferencesNavigation
        onBack={onBack}
        onSubmit={handleSubmit(onSubmit)}
        isValid={isValid}
      />
    </form>
  );
};
