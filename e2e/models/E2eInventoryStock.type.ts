import type { Database } from "@/app/types";

export type E2eInventoryStock = Pick<
  Database["public"]["Tables"]["equipment_stock"]["Row"],
  | "quantity_available"
  | "quantity_damaged"
  | "quantity_in_repair"
>;
