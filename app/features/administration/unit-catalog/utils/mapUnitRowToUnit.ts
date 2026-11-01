import type { Unit } from "../models/Unit.interface";
import type { UnitRow } from "../models/UnitRow.type";

export const mapUnitRowToUnit = (
  unitRow: UnitRow
): Unit => ({
  id: unitRow.id,
  categoryId: unitRow.category_id,
  code: unitRow.code,
  status: unitRow.status,
  fuelMax: unitRow.fuel_max,
  fuelLevel: unitRow.fuel_level,
  usageTotal: unitRow.usage_total,
  nextOilChangeAt: unitRow.next_oil_change_at,
  decommissionedAt: unitRow.decommissioned_at,
  decommissionReason: unitRow.decommission_reason,
});
