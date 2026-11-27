export const DAMAGE_REPORT_OUTCOME = {
  COMPLETE: "complete",
  LATER: "later",
} as const;

export const DAMAGE_REPORT_LIMITS = {
  DESCRIPTION_MAX: 2000,
  HITS_MAX: 9999,
  HITS_MIN: 0,
} as const;
