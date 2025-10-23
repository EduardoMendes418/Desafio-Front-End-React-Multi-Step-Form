import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FormData, FormStep } from "../types/form";

interface FormStore {
  currentStep: FormStep;
  formData: FormData;
  isSubmitted: boolean;
  setCurrentStep: (step: FormStep) => void;
  updateFormData: (step: keyof FormData, data: any) => void;
  submitForm: () => void;
  resetForm: () => void;
  goToStep: (step: FormStep) => void;
}

const initialFormData: FormData = {
  personal: {
    fullName: "",
    document: "",
    email: "",
    phone: "",
    birthDate: "",
  },
  address: {
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  },
  account: {
    username: "",
    password: "",
    confirmPassword: "",
    plan: "",
  },
  preferences: {
    notifications: {
      email: false,
      sms: false,
      push: false,
    },
    theme: "light",
    interests: [],
  },
};

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      formData: initialFormData,
      isSubmitted: false,

      setCurrentStep: (step) => set({ currentStep: step }),

      updateFormData: (step, data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [step]: { ...state.formData[step], ...data },
          },
        })),

      submitForm: () => {
        console.log("Form submitted:", get().formData);
        set({ isSubmitted: true });

        setTimeout(() => {
          set({ isSubmitted: false });
        }, 2000);
      },

      resetForm: () =>
        set({
          currentStep: 1,
          formData: initialFormData,
          isSubmitted: false,
        }),

      goToStep: (step) => set({ currentStep: step }),
    }),
    {
      name: "form-storage",
    },
  ),
);
