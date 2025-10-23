import { z } from "zod";

export const preferencesSchema = z
  .object({
    notifications: z.object({
      email: z.boolean().default(false),
      sms: z.boolean().default(false),
      push: z.boolean().default(false),
    }),
    theme: z
      .enum(["light", "dark"])
      .refine((val) => !!val, { message: "Selecione um tema" }),
    interests: z
      .array(z.string())
      .min(1, "Selecione pelo menos um interesse")
      .max(5, "Selecione no máximo 5 interesses"),
  })
  .refine(
    (data) =>
      data.notifications.email ||
      data.notifications.sms ||
      data.notifications.push,
    {
      message: "Selecione pelo menos um tipo de notificação",
      path: ["notifications"],
    },
  );

export type PreferencesFormData = z.infer<typeof preferencesSchema>;
