export const VALIDATION_MESSAGES = {
  FULL_NAME: {
    REQUIRED: "Nome completo é obrigatório",
    MIN_LENGTH: "Nome deve ter pelo menos 2 caracteres",
  },
  DOCUMENT: {
    INVALID: "CPF/CNPJ inválido",
    MIN_LENGTH: "CPF deve ter 11 dígitos",
    MAX_LENGTH: "CNPJ deve ter 14 dígitos",
  },
  EMAIL: {
    INVALID: "Email inválido",
    REQUIRED: "Email é obrigatório",
  },
  PHONE: {
    INVALID: "Telefone inválido",
    MIN_LENGTH: "Telefone deve ter pelo menos 10 dígitos",
  },
  BIRTH_DATE: {
    UNDER_AGE: "Você deve ter pelo menos 18 anos",
    REQUIRED: "Data de nascimento é obrigatória",
  },
} as const;

export const MINIMUM_AGE = 18;
