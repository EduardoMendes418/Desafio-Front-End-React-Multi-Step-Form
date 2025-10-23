export const PLAN_NAMES: Record<string, string> = {
  basic: "Básico",
  pro: "Profissional",
  enterprise: "Empresarial",
} as const;

export const getPlanName = (planId: string): string => {
  return PLAN_NAMES[planId] || planId;
};
