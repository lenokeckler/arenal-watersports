import { Database } from "@/app/types";

type EquipmentCategoryUpdate =
  Database["public"]["Tables"]["equipment_categories"]["Update"];

export type CategoryBehaviorRowUpdate = Pick<
  EquipmentCategoryUpdate,
  | "is_reservable"
  | "has_motor"
  | "usage_metric"
  | "consumes_fuel"
  | "can_be_damaged"
  | "has_condition_photos"
  | "guide_only"
  | "default_duration_minutes"
  | "units_are_interchangeable"
  | "updated_by"
>;
