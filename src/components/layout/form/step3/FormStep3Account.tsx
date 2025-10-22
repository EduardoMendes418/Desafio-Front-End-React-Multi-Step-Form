import React from "react";
import { InputField } from "../../../ui/InputField";
import { PasswordStrengthMeter } from "../../../ui/PasswordStrengthMeter";
import { PlanSelector } from "../../../ui/PlanSelector";
import { FormNavigation } from "../../../ui/FormNavigation";
import { useAccountForm } from "../../../../hooks/useAccountForm";
import { FormStep3AccountProps } from "../../../../types/components";

export const FormStep3Account: React.FC<FormStep3AccountProps> = ({
  onNext,
  onBack,
}) => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    plans,
    loading,
    selectedPlan,
    passwordStrength,
    handlePlanSelect,
    onSubmit,
  } = useAccountForm(onNext, onBack);

  const accountFields = [
    {
      name: "username" as const,
      label: "Nome de Usuário",
      type: "text" as const,
      required: true,
      placeholder: "seu_usuario",
    },
    {
      name: "password" as const,
      label: "Senha",
      type: "password" as const,
      required: true,
      placeholder: "Digite sua senha",
    },
    {
      name: "confirmPassword" as const,
      label: "Confirmar Senha",
      type: "password" as const,
      required: true,
      placeholder: "Confirme sua senha",
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <header>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Configuração da Conta
        </h2>
        <p className="text-gray-600 text-sm">
          Crie suas credenciais de acesso e escolha um plano.
        </p>
      </header>

      <div className="space-y-6">
        <div className="space-y-4">
          {accountFields.map((field) => (
            <InputField
              key={field.name}
              label={field.label}
              type={field.type}
              error={errors[field.name]}
              register={register(field.name)}
              required={field.required}
              placeholder={field.placeholder}
            />
          ))}
        </div>

        {passwordStrength.strength > 0 && (
          <PasswordStrengthMeter passwordStrength={passwordStrength} />
        )}

        <PlanSelector
          plans={plans}
          selectedPlan={selectedPlan}
          onPlanSelect={handlePlanSelect}
          loading={loading}
        />

        {errors.plan && (
          <p className="text-sm text-red-600 mt-2" role="alert">
            ⚠ {errors.plan.message}
          </p>
        )}
      </div>

      <FormNavigation
        onBack={onBack}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        backButtonLabel="Voltar"
        nextButtonLabel="Próximo"
      />
    </form>
  );
};
