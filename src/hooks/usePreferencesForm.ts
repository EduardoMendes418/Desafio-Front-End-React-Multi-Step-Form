import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PreferencesFormData } from "../types/preferences";
import { useFormStore } from "../store/formStore";
import { preferencesSchema } from "../schemas/preferencesSchema";

interface UsePreferencesFormReturn {
  register: ReturnType<typeof useForm<PreferencesFormData>>["register"];
  handleSubmit: ReturnType<typeof useForm<PreferencesFormData>>["handleSubmit"];
  theme: PreferencesFormData["theme"];
  interests: PreferencesFormData["interests"];
  notifications: PreferencesFormData["notifications"];
  errors: ReturnType<
    typeof useForm<PreferencesFormData>
  >["formState"]["errors"];
  isValid: boolean;
  onSubmit: SubmitHandler<PreferencesFormData>;
}

export const usePreferencesForm = (
  onNext: () => void,
): UsePreferencesFormReturn => {
  const { formData, updateFormData } = useFormStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: formData?.preferences ?? {
      notifications: { email: false, sms: false, push: false },
      theme: "light",
      interests: [],
    },
    mode: "onChange",
  });

  const theme = watch("theme");
  const interests = watch("interests");
  const notifications = watch("notifications");

  const onSubmit: SubmitHandler<PreferencesFormData> = (data) => {
    updateFormData("preferences", data);
    onNext();
  };

  return {
    register,
    handleSubmit,
    theme,
    interests,
    notifications,
    errors,
    isValid,
    onSubmit,
  };
};
