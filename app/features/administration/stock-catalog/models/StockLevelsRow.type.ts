import type { Database } from "@/app/types";

export type StockLevelsRow = Pick<
  Database["public"]["Tables"]["equipment_stock"]["Row"],
  | "expiry_date"
  | "quantity_available"
  | "quantity_damaged"
  | "quantity_in_repair"
>;
