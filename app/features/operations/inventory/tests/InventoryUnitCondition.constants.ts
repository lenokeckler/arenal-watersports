export const INVENTORY_UNIT_CONDITION_TEST = {
  UNIT_ID: "bbbbbbbb-0000-0000-0000-000000000001",
  UNKNOWN_STATUS: "decommissioned",
  UNKNOWN_RESULT: "something_else",
  DATABASE_ERROR: {
    code: "42501",
    message: "permission denied",
  },
} as const;
