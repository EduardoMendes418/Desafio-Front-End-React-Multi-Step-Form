import React from "react";
import { InputField } from "../../../ui/InputField";
import { usePersonalForm } from "../../../../hooks/usePersonalForm";
import { FormStep1PersonalProps } from "../../../../types/components";

export const FormStep1Personal: React.FC<FormStep1PersonalProps> = ({
  onNext,
}) => {
  const {
    register,
    handleSubmit,
    errors,
    handleDocumentChange,
    handlePhoneChange,
    onSubmit,
  } = usePersonalForm(onNext);

  const formFields = [
    {
      name: "fullName" as const,
      label: "Nome Completo",
      type: "text" as const,
      required: true,
    },
    {
      name: "document" as const,
      label: "CPF/CNPJ",
      type: "text" as const,
      required: true,
      onChange: handleDocumentChange,
    },
    {
      name: "email" as const,
      label: "Email",
      type: "email" as const,
      required: true,
    },
    {
      name: "phone" as const,
      label: "Telefone",
      type: "tel" as const,
      required: true,
      onChange: handlePhoneChange,
    },
    {
      name: "birthDate" as const,
      label: "Data de Nascimento",
      type: "date" as const,
      required: true,
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <header>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Informações Pessoais
        </h2>
        <p className="text-gray-600 text-sm">
          Preencha suas informações pessoais básicas
        </p>
      </header>

      <div className="space-y-4">
        {formFields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            type={field.type}
            error={errors[field.name]}
            register={register(field.name)}
            onChange={field.onChange}
            required={field.required}
          />
        ))}
      </div>

      <footer className="flex justify-end pt-4">
        <button
          type="submit"
          className="
            bg-blue-600 text-white px-6 py-3 rounded-md 
            hover:bg-blue-700 focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:ring-offset-2
            transition-colors duration-200
            font-medium
          "
        >
          Próximo
        </button>
      </footer>
    </form>
  );
};
