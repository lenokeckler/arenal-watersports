import type { Database } from "@/app/types";

export type StockMovementRow = Pick<
  Database["public"]["Tables"]["equipment_stock_movements"]["Row"],
  | "created_at"
  | "from_available"
  | "from_damaged"
  | "from_in_repair"
  | "id"
  | "reason"
  | "to_available"
  | "to_damaged"
  | "to_in_repair"
>;
