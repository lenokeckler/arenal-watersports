import type { Database } from "@/app/types";

export type BoardUnitDamageRow = Pick<
  Database["public"]["Tables"]["damage_reports"]["Row"],
  "cause" | "created_at" | "description" | "unit_id"
>;

export type BoardUnitJobRow = Pick<
  Database["public"]["Tables"]["maintenance_records"]["Row"],
  | "cost_amount"
  | "cost_currency"
  | "description"
  | "is_external"
  | "performed_at"
  | "unit_id"
  | "work_type"
>;

export interface BoardUnitStatusDetailsRows {
  damages: BoardUnitDamageRow[];
  jobs: BoardUnitJobRow[];
}
