export const MAINTENANCE_ERROR = {
  LOAD_UNITS: "load the machines that need maintenance",
} as const;

export const MAINTENANCE_AVAILABLE_STATUS = "available";

export const MAINTENANCE_OIL_STATE = {
  PASSED: "PASSED",
  REACHED: "REACHED",
} as const;

export const DAMAGE_REPORTS_LINK = {
  QUERY_SEPARATOR: "?",
  UNIT_QUERY_KEY: "unidad",
} as const;
