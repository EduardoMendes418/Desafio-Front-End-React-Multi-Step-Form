export const ACCOUNT_VALIDATION_MESSAGES = {
  USERNAME: {
    REQUIRED: "Nome de usuário é obrigatório",
    MIN_LENGTH: "Usuário deve ter pelo menos 3 caracteres",
    INVALID_CHARS: "Usuário pode conter apenas letras, números e underscore",
  },
  PASSWORD: {
    REQUIRED: "Senha é obrigatória",
    MIN_LENGTH: "Senha deve ter pelo menos 8 caracteres",
    LOWERCASE: "Senha deve conter pelo menos uma letra minúscula",
    UPPERCASE: "Senha deve conter pelo menos uma letra maiúscula",
    NUMBER: "Senha deve conter pelo menos um número",
    SPECIAL_CHAR: "Senha deve conter pelo menos um caractere especial",
  },
  CONFIRM_PASSWORD: {
    REQUIRED: "Confirmação de senha é obrigatória",
    MISMATCH: "Senhas não coincidem",
  },
  PLAN: {
    REQUIRED: "Selecione um plano",
  },
} as const;

export const USERNAME_PATTERN = /^[a-zA-Z0-9_]+$/;
