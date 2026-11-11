import type { EquipmentUnitRow } from "./EquipmentUnitRow.type";

export type UnitRow = Pick<
  EquipmentUnitRow,
  | "id"
  | "category_id"
  | "code"
  | "status"
  | "fuel_max"
  | "fuel_level"
  | "usage_total"
  | "next_oil_change_at"
  | "decommissioned_at"
  | "decommission_reason"
>;
