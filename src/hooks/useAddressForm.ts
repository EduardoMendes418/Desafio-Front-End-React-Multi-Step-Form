import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "../store/formStore";
import { addressSchema, AddressFormData } from "../schemas/addressSchema";
import { fetchAddressByCEP } from "../services/cepService";
import { formatCEP, cleanCEP, isValidCEP } from "../utils/addressFormatters";
import { ADDRESS_VALIDATION_MESSAGES } from "../constants/addressValidation";

export const useAddressForm = (onNext: () => void, onBack: () => void) => {
  const { formData, updateFormData } = useFormStore();

  const methods = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: formData.address,
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
    clearErrors,
    trigger,
  } = methods;

  const handleCEPChange = async (rawCEP: string) => {
    const cleanedCEP = cleanCEP(rawCEP);

    if (!isValidCEP(cleanedCEP)) {
      return;
    }

    try {
      const addressData = await fetchAddressByCEP(cleanedCEP);

      if (addressData) {
        const fieldsToUpdate = {
          street: addressData.logradouro,
          neighborhood: addressData.bairro,
          city: addressData.localidade,
          state: addressData.uf,
          complement: addressData.complemento || "",
        };

        Object.entries(fieldsToUpdate).forEach(([field, value]) => {
          setValue(field as keyof AddressFormData, value);
        });

        clearErrors(["street", "neighborhood", "city", "state"]);

        await trigger(["street", "neighborhood", "city", "state"]);
      } else {
        setError("cep", {
          message: ADDRESS_VALIDATION_MESSAGES.CEP.NOT_FOUND,
        });
      }
    } catch (error) {
      setError("cep", {
        message: ADDRESS_VALIDATION_MESSAGES.CEP.FETCH_ERROR,
      });
    }
  };

  const handleCEPInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const formattedCEP = formatCEP(e.target.value);
    setValue("cep", formattedCEP);
    await trigger("cep");
    await handleCEPChange(e.target.value);
  };

  const onSubmit = (data: AddressFormData) => {
    updateFormData("address", data);
    onNext();
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleCEPInputChange,
    onSubmit,
    onBack,
  };
};
