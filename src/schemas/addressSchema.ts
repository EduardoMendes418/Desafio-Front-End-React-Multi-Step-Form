import { z } from 'zod';
import { ADDRESS_VALIDATION_MESSAGES, CEP_LENGTH } from '../constants/addressValidation';

export const addressSchema = z.object({
  cep: z.string()
    .min(1, ADDRESS_VALIDATION_MESSAGES.CEP.REQUIRED)
    .min(CEP_LENGTH, ADDRESS_VALIDATION_MESSAGES.CEP.INVALID),

  street: z.string()
    .min(1, ADDRESS_VALIDATION_MESSAGES.STREET.REQUIRED),

  number: z.string()
    .min(1, ADDRESS_VALIDATION_MESSAGES.NUMBER.REQUIRED),

  complement: z.string().optional(),

  neighborhood: z.string()
    .min(1, ADDRESS_VALIDATION_MESSAGES.NEIGHBORHOOD.REQUIRED),

  city: z.string()
    .min(1, ADDRESS_VALIDATION_MESSAGES.CITY.REQUIRED),

  state: z.string()
    .min(1, ADDRESS_VALIDATION_MESSAGES.STATE.REQUIRED)
    .min(2, ADDRESS_VALIDATION_MESSAGES.STATE.INVALID)
    .max(2, ADDRESS_VALIDATION_MESSAGES.STATE.INVALID),
});

export type AddressFormData = z.infer<typeof addressSchema>;