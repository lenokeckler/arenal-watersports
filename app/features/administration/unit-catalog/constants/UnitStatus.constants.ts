export const UNIT_STATUS = {
  AVAILABLE: "available",
  DAMAGED: "damaged",
  DECOMMISSIONED: "decommissioned",
  IN_MAINTENANCE: "in_maintenance",
  IN_REPAIR: "in_repair",
} as const;

export type UnitStatus =
  (typeof UNIT_STATUS)[keyof typeof UNIT_STATUS];

export const UNIT_EDITABLE_STATUS = {
  AVAILABLE: UNIT_STATUS.AVAILABLE,
  DAMAGED: UNIT_STATUS.DAMAGED,
  IN_MAINTENANCE: UNIT_STATUS.IN_MAINTENANCE,
  IN_REPAIR: UNIT_STATUS.IN_REPAIR,
} as const;

export type UnitEditableStatus =
  (typeof UNIT_EDITABLE_STATUS)[keyof typeof UNIT_EDITABLE_STATUS];

export const UNIT_EFFECTIVE_STATUS = {
  ...UNIT_STATUS,
  OCCUPIED: "occupied",
} as const;

export type UnitEffectiveStatus =
  (typeof UNIT_EFFECTIVE_STATUS)[keyof typeof UNIT_EFFECTIVE_STATUS];
