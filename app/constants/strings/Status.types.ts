export const STATUS = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];
