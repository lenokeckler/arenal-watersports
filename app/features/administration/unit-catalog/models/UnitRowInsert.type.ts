import type { Database } from "@/app/types";

type EquipmentUnitInsert =
  Database["public"]["Tables"]["equipment_units"]["Insert"];

export type UnitRowInsert = Required<
  Pick<
    EquipmentUnitInsert,
    | "category_id"
    | "code"
    | "status"
    | "fuel_max"
    | "fuel_level"
    | "usage_total"
    | "next_oil_change_at"
    | "created_by"
    | "updated_by"
  >
>;
