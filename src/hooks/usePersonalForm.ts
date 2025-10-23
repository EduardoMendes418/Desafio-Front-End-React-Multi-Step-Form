import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "../store/formStore";
import { personalSchema, PersonalFormData } from "../schemas/personalSchema";
import { formatCPFCNPJ, formatPhone } from "../utils/formatting";

export const usePersonalForm = (onNext: () => void) => {
  const { formData, updateFormData } = useFormStore();

  const methods = useForm<PersonalFormData>({
    resolver: zodResolver(personalSchema),
    defaultValues: formData.personal,
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = methods;

  const handleDocumentChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const formatted = formatCPFCNPJ(e.target.value);
    setValue("document", formatted);
    await trigger("document");
  };

  const handlePhoneChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue("phone", formatted);
    await trigger("phone");
  };

  const onSubmit = (data: PersonalFormData) => {
    updateFormData("personal", data);
    onNext();
  };

  return {
    register,
    handleSubmit,
    errors,
    handleDocumentChange,
    handlePhoneChange,
    onSubmit,
  };
};
