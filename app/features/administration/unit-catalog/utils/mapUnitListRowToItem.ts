import { UNIT_STATUS } from "../constants/UnitStatus.constants";
import type { UnitListItem } from "../models/UnitListItem.interface";
import type { UnitListRow } from "../models/UnitListRow.type";
import { resolveUnitEffectiveStatus } from "./resolveUnitEffectiveStatus";

export const mapUnitListRowToItem = (
  unitRow: UnitListRow,
  viewStatusById: Map<string, string>
): UnitListItem => ({
  id: unitRow.id,
  code: unitRow.code,
  recordedStatus: unitRow.status,
  effectiveStatus: resolveUnitEffectiveStatus(
    unitRow.status,
    viewStatusById.get(unitRow.id)
  ),
  fuelLevel: unitRow.fuel_level,
  fuelMax: unitRow.fuel_max,
  usageTotal: unitRow.usage_total,
  nextOilChangeAt: unitRow.next_oil_change_at,
  decommissioned:
    unitRow.status === UNIT_STATUS.DECOMMISSIONED,
});
