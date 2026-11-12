import type { EquipmentCategoryRow } from "./EquipmentCategoryRow.type";

export type CategoryAlertsRow = Pick<
  EquipmentCategoryRow,
  "id" | "alert_min_quantity" | "alert_expiry_days"
>;
