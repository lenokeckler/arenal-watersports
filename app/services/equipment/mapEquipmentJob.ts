import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import type { EquipmentJob } from "./models/EquipmentJob.interface";
import type { EquipmentJobRow } from "./models/EquipmentJobRow.type";

export const mapEquipmentJob = (
  row: EquipmentJobRow
): EquipmentJob => ({
  costAmount: row.cost_amount,
  currency: row.cost_currency,
  date: row.performed_at,
  description: row.description,
  id: row.id,
  isExternal: row.is_external,
  isRetired:
    row.unit.status ===
    INVENTORY_UNIT_STATUS.DECOMMISSIONED,
  unitCode: row.unit.code,
  unitId: row.unit_id,
  workType: row.work_type,
});
