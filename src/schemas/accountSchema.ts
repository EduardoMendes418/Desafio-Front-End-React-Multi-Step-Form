import { z } from "zod";
import {
  ACCOUNT_VALIDATION_MESSAGES,
  USERNAME_PATTERN,
} from "../constants/accountValidation";

export const accountSchema = z
  .object({
    username: z
      .string()
      .min(1, ACCOUNT_VALIDATION_MESSAGES.USERNAME.REQUIRED)
      .min(3, ACCOUNT_VALIDATION_MESSAGES.USERNAME.MIN_LENGTH)
      .regex(
        USERNAME_PATTERN,
        ACCOUNT_VALIDATION_MESSAGES.USERNAME.INVALID_CHARS,
      ),

    password: z
      .string()
      .min(1, ACCOUNT_VALIDATION_MESSAGES.PASSWORD.REQUIRED)
      .min(8, ACCOUNT_VALIDATION_MESSAGES.PASSWORD.MIN_LENGTH)
      .regex(/[a-z]/, ACCOUNT_VALIDATION_MESSAGES.PASSWORD.LOWERCASE)
      .regex(/[A-Z]/, ACCOUNT_VALIDATION_MESSAGES.PASSWORD.UPPERCASE)
      .regex(/[0-9]/, ACCOUNT_VALIDATION_MESSAGES.PASSWORD.NUMBER)
      .regex(/[^a-zA-Z0-9]/, ACCOUNT_VALIDATION_MESSAGES.PASSWORD.SPECIAL_CHAR),

    confirmPassword: z
      .string()
      .min(1, ACCOUNT_VALIDATION_MESSAGES.CONFIRM_PASSWORD.REQUIRED),

    plan: z.string().min(1, ACCOUNT_VALIDATION_MESSAGES.PLAN.REQUIRED),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ACCOUNT_VALIDATION_MESSAGES.CONFIRM_PASSWORD.MISMATCH,
    path: ["confirmPassword"],
  });

export type AccountFormData = z.infer<typeof accountSchema>;
