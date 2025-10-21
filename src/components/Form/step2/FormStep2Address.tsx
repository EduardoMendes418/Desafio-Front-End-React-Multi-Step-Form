import React from "react";
import { FormStep2AddressProps } from "../../../types/components";
import { useAddressForm } from "../../../hooks/useAddressForm";
import { InputField } from "../../ui/InputField";
import { FieldGrid } from "../../ui/FieldGrid";
import { FormNavigation } from "../../ui/FormNavigation";

export const FormStep2Address: React.FC<FormStep2AddressProps> = ({
  onNext,
  onBack,
}) => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleCEPInputChange,
    onSubmit,
  } = useAddressForm(onNext, onBack);

  const addressFields = [
    {
      name: "cep" as const,
      label: "CEP",
      type: "text" as const,
      required: true,
      onChange: handleCEPInputChange,
      placeholder: "00000-000",
    },

    {
      name: "street" as const,
      label: "Rua",
      type: "text" as const,
      required: true,
    },
    {
      name: "number" as const,
      label: "Número",
      type: "text" as const,
      required: true,
    },

    {
      name: "complement" as const,
      label: "Complemento",
      type: "text" as const,
      required: false,
      placeholder: "Opcional",
    },

    {
      name: "neighborhood" as const,
      label: "Bairro",
      type: "text" as const,
      required: true,
    },
    {
      name: "city" as const,
      label: "Cidade",
      type: "text" as const,
      required: true,
    },

    {
      name: "state" as const,
      label: "Estado",
      type: "text" as const,
      required: true,
      placeholder: "UF",
      maxLength: 2,
    },
  ];

  const renderField = (field: (typeof addressFields)[0]) => (
    <InputField
      key={field.name}
      label={field.label}
      type={field.type}
      error={errors[field.name]}
      register={register(field.name)}
      onChange={field.onChange}
      required={field.required}
      placeholder={field.placeholder}
      maxLength={field.maxLength}
    />
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <header>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Endereço</h2>
        <p className="text-gray-600 text-sm">
          Informe seu endereço completo. O CEP preencherá automaticamente os
          campos.
        </p>
      </header>

      <div className="space-y-6">
        {renderField(addressFields[0])}

        <FieldGrid columns={2} gap="md">
          {renderField(addressFields[1])}
          {renderField(addressFields[2])}
        </FieldGrid>

        {renderField(addressFields[3])}

        <FieldGrid columns={2} gap="md">
          {renderField(addressFields[4])}
          {renderField(addressFields[5])}
        </FieldGrid>

        <div className="max-w-xs">{renderField(addressFields[6])}</div>
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
