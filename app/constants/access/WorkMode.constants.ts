export const WORK_MODE_RESULT = {
  CHOSEN: "chosen",
  FAILED: "failed",
  NOT_ALLOWED: "not_allowed",
  NOT_ENABLED: "not_enabled",
} as const;

export type WorkModeResult =
  (typeof WORK_MODE_RESULT)[keyof typeof WORK_MODE_RESULT];

export const WORK_MODE_FIELD = {
  AREA: "area",
} as const;

export const MULTI_AREA_MINIMUM = 2;

export const WORK_MODE_REVALIDATE_SCOPE = "layout";
