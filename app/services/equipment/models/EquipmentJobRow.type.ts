import type { Database } from "@/app/types";

export type EquipmentJobRow = Pick<
  Database["public"]["Tables"]["maintenance_records"]["Row"],
  | "id"
  | "unit_id"
  | "work_type"
  | "description"
  | "cost_amount"
  | "cost_currency"
  | "is_external"
  | "performed_at"
> & {
  unit: {
    code: string;
    status: Database["public"]["Enums"]["unit_status"];
  };
};
