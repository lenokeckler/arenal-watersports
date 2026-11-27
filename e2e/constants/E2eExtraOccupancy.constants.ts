export const E2E_OCCUPIED_CATEGORY_NAME = "Tabla de wake";

export const E2E_EXTRA_OCCUPANCY_SCENARIO = {
  BLANK: "occupancy_blank",
  CHARGE_ONLY: "occupancy_charge_only",
  CREATE: "occupancy_create",
  EDIT: "occupancy_edit",
  USED: "occupancy_used",
} as const;

export const E2E_EXTRA_OCCUPANCY_QUANTITY = {
  CREATED: 2,
  EDITED: 3,
  REFUSED: 5,
  SEEDED: 2,
} as const;

export const E2E_EXTRA_OCCUPANCY_RENAME_SUFFIX = "_renamed";
