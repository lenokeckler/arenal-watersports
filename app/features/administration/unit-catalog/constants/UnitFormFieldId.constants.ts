export const UNIT_FORM_FIELD_ID = {
  CODE: "unit-code",
  FUEL_LEVEL: "unit-fuel-level",
  FUEL_MAX: "unit-fuel-max",
  NEXT_OIL_CHANGE_AT: "unit-next-oil-change-at",
  REASON: "unit-decommission-reason",
  STATUS: "unit-status",
  USAGE_TOTAL: "unit-usage-total",
} as const;

export type UnitFormFieldId =
  (typeof UNIT_FORM_FIELD_ID)[keyof typeof UNIT_FORM_FIELD_ID];
