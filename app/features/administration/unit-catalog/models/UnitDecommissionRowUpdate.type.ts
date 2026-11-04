import type { Database } from "@/app/types";

type EquipmentUnitUpdate =
  Database["public"]["Tables"]["equipment_units"]["Update"];

export type UnitDecommissionRowUpdate = Required<
  Pick<
    EquipmentUnitUpdate,
    | "status"
    | "decommissioned_at"
    | "decommission_reason"
    | "updated_by"
  >
>;
