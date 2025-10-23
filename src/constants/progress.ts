export const STEP_STATUS = {
  CURRENT: "current",
  COMPLETED: "completed",
  UPCOMING: "upcoming",
} as const;

export type StepStatus = (typeof STEP_STATUS)[keyof typeof STEP_STATUS];
