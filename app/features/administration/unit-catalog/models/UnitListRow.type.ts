import type { EquipmentUnitRow } from "./EquipmentUnitRow.type";

export type UnitListRow = Pick<
  EquipmentUnitRow,
  | "id"
  | "code"
  | "status"
  | "fuel_max"
  | "fuel_level"
  | "usage_total"
  | "next_oil_change_at"
>;
