import type { Database } from "@/app/types";

export type EquipmentReportRow = Pick<
  Database["public"]["Tables"]["damage_reports"]["Row"],
  | "id"
  | "unit_id"
  | "cause"
  | "description"
  | "impact_delta"
  | "detail_pending"
  | "reservation_id"
  | "created_at"
> & {
  unit: {
    category: { has_condition_photos: boolean };
    code: string;
    status: Database["public"]["Enums"]["unit_status"];
  };
};
