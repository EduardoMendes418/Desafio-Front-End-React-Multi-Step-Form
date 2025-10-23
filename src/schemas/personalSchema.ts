import { z } from "zod";
import { VALIDATION_MESSAGES, MINIMUM_AGE } from "../constants/validation";
import { calculateAge } from "../utils/formatting";

export const personalSchema = z.object({
  fullName: z
    .string()
    .min(1, VALIDATION_MESSAGES.FULL_NAME.REQUIRED)
    .min(2, VALIDATION_MESSAGES.FULL_NAME.MIN_LENGTH),

  document: z
    .string()
    .min(11, VALIDATION_MESSAGES.DOCUMENT.INVALID)
    .max(18, VALIDATION_MESSAGES.DOCUMENT.INVALID),

  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.EMAIL.REQUIRED)
    .email(VALIDATION_MESSAGES.EMAIL.INVALID),

  phone: z.string().min(10, VALIDATION_MESSAGES.PHONE.INVALID),

  birthDate: z
    .string()
    .min(1, VALIDATION_MESSAGES.BIRTH_DATE.REQUIRED)
    .refine((date) => calculateAge(date) >= MINIMUM_AGE, {
      message: VALIDATION_MESSAGES.BIRTH_DATE.UNDER_AGE,
    }),
});

export type PersonalFormData = z.infer<typeof personalSchema>;
