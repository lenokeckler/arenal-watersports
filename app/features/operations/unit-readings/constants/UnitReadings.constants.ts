export const UNIT_READINGS_ERROR = {
  CORRECT_UNIT: "correct the readings of the unit",
  INVALID_INPUT: "The correction of the unit is not valid",
  LOAD_UNIT: "load the unit to correct",
  LOAD_UNITS: "load the units with a motor",
} as const;

export const UNIT_READINGS_LIMITS = {
  FUEL_MAX_MAX: 20,
  FUEL_MAX_MIN: 1,
  IMPACTS_MAX: 100_000,
  UNITS_MAX: 200,
  USAGE_MAX: 9_999_999_999.99,
} as const;

export const UNIT_READINGS_PATTERN = {
  DECIMAL: /^\d+(?:[.,]\d{1,2})?$/,
  INTEGER: /^\d+$/,
} as const;

export const UNIT_READINGS_DATABASE_ERROR = {
  INVALID_VALUE: "22023",
  NOTHING_TO_CORRECT: "23514",
  UNIT_NOT_CORRECTABLE: "55000",
} as const;

export const UNIT_READINGS_RESULT = {
  CORRECTED: "corrected",
  INVALID: "invalid",
  NOT_CORRECTABLE: "not-correctable",
  UNCHANGED: "unchanged",
} as const;

export const UNIT_READINGS_STATUS = {
  AVAILABLE: "available",
  DAMAGED: "damaged",
  IN_MAINTENANCE: "in_maintenance",
  IN_REPAIR: "in_repair",
} as const;

export const UNIT_READINGS_OUT_OF_SERVICE: readonly string[] =
  [
    UNIT_READINGS_STATUS.DAMAGED,
    UNIT_READINGS_STATUS.IN_MAINTENANCE,
    UNIT_READINGS_STATUS.IN_REPAIR,
  ];

export const UNIT_READINGS_DECIMAL_SEPARATOR = {
  COMMA: ",",
  POINT: ".",
} as const;
