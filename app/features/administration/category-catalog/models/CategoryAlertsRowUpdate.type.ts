import { Database } from "@/app/types";

type EquipmentCategoryUpdate =
  Database["public"]["Tables"]["equipment_categories"]["Update"];

export type CategoryAlertsRowUpdate = Pick<
  EquipmentCategoryUpdate,
  "alert_min_quantity" | "alert_expiry_days" | "updated_by"
>;
