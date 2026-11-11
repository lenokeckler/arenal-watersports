import type { Database } from "@/app/types";

type EquipmentUnitUpdate =
  Database["public"]["Tables"]["equipment_units"]["Update"];

export type UnitRowUpdate = Required<
  Pick<
    EquipmentUnitUpdate,
    | "code"
    | "status"
    | "fuel_max"
    | "fuel_level"
    | "usage_total"
    | "next_oil_change_at"
    | "updated_by"
  >
>;
