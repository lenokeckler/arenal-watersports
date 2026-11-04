export const UNIT_MUTATION_STATUS = {
  ERROR: "error",
  SUCCESS: "success",
} as const;

export type UnitMutationStatus =
  (typeof UNIT_MUTATION_STATUS)[keyof typeof UNIT_MUTATION_STATUS];
