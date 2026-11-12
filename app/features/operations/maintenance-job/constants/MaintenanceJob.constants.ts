export const MAINTENANCE_JOB_ERROR = {
  INVALID_INPUT: "The maintenance job is not valid.",
  LOAD_UNITS: "load the units for a maintenance job",
  REGISTER_JOB: "register a maintenance job",
} as const;

export const MAINTENANCE_JOB_WORK_TYPE = {
  OIL_CHANGE: "oil_change",
  OTHER: "other",
  PART_CHANGE: "part_change",
  TIRE_CHANGE: "tire_change",
} as const;

export const MAINTENANCE_JOB_CURRENCY = {
  CRC: "CRC",
  USD: "USD",
} as const;

export const MAINTENANCE_JOB_DATABASE_ERROR = {
  INVALID_JOB: "23514",
  INVALID_VALUE: "22023",
  UNIT_RETIRED: "55000",
} as const;

export const MAINTENANCE_JOB_STATUS = {
  INVALID: "invalid",
  REGISTERED: "registered",
  UNIT_RETIRED: "unit_retired",
} as const;

export const MAINTENANCE_JOB_LIMITS = {
  DESCRIPTION_MAX_LENGTH: 500,
  MAX_AMOUNT: 9_999_999_999.99,
  UNITS_MAX: 500,
} as const;

export const MAINTENANCE_JOB_PATTERN = {
  AMOUNT: /^\d+([.,]\d{1,2})?$/,
  DATE: /^\d{4}-\d{2}-\d{2}$/,
} as const;
