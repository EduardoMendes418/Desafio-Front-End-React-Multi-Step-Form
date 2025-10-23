export const ADDRESS_VALIDATION_MESSAGES = {
  CEP: {
    INVALID: "CEP inválido",
    NOT_FOUND: "CEP não encontrado",
    FETCH_ERROR: "Erro ao buscar CEP",
    REQUIRED: "CEP é obrigatório",
  },
  STREET: {
    REQUIRED: "Rua é obrigatória",
  },
  NUMBER: {
    REQUIRED: "Número é obrigatório",
  },
  NEIGHBORHOOD: {
    REQUIRED: "Bairro é obrigatório",
  },
  CITY: {
    REQUIRED: "Cidade é obrigatória",
  },
  STATE: {
    REQUIRED: "Estado é obrigatório",
    INVALID: "Estado deve ter 2 caracteres",
  },
} as const;

export const CEP_LENGTH = 8;
