import type { Database } from "@/app/types";

export type StockCategoryRow = Pick<
  Database["public"]["Tables"]["equipment_categories"]["Row"],
  "alert_expiry_days" | "id" | "name" | "tracking_mode"
>;
