export const EXTERNAL_GUIDE_REGISTRATION_ERROR_CODE = {
  FAILED: "failed",
  INVALID_INPUT: "invalid_input",
  NATIONAL_ID_TAKEN: "national_id_taken",
  NOT_ALLOWED: "not_allowed",
} as const;

export const EXTERNAL_GUIDE_REGISTRATION_RESULT = {
  CREATED: "created",
  INVALID_INPUT: "invalid_input",
  NATIONAL_ID_TAKEN: "national_id_taken",
  NOT_ALLOWED: "not_allowed",
} as const;

export const EXTERNAL_GUIDE_REGISTRATION_INPUT = {
  DATE_PATTERN: /^\d{4}-\d{2}-\d{2}$/,
  MAX_NATIONAL_ID_LENGTH: 40,
  MIN_NATIONAL_ID_LENGTH: 3,
} as const;
