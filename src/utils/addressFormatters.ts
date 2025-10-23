export const formatCEP = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  return cleaned.replace(/(\d{5})(\d)/, "$1-$2");
};

export const cleanCEP = (cep: string): string => {
  return cep.replace(/\D/g, "");
};

export const isValidCEP = (cep: string): boolean => {
  return cleanCEP(cep).length === 8;
};
