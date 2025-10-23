import { FormData } from "../types/form";

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export const getPlans = async (): Promise<Plan[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: "basic",
      name: "Básico",
      price: 29.9,
      features: ["5GB Storage", "Suporte Básico", "1 Usuário"],
    },
    {
      id: "pro",
      name: "Profissional",
      price: 79.9,
      features: ["50GB Storage", "Suporte Prioritário", "5 Usuários"],
    },
    {
      id: "enterprise",
      name: "Empresarial",
      price: 149.9,
      features: ["Storage Ilimitado", "Suporte 24/7", "Usuários Ilimitados"],
    },
  ];
};

export const submitForm = async (
  _formData: FormData,
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const success = Math.random() > 0.2;

  return {
    success,
    message: success
      ? "Cadastro realizado com sucesso!"
      : "Erro ao realizar cadastro. Tente novamente.",
  };
};
