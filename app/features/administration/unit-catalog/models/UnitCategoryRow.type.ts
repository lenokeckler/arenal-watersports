import type { Database } from "@/app/types";

export type UnitCategoryRow = Pick<
  Database["public"]["Tables"]["equipment_categories"]["Row"],
  | "id"
  | "name"
  | "tracking_mode"
  | "has_motor"
  | "usage_metric"
>;
