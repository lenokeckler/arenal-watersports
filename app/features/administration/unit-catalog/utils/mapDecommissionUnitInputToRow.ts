import { UNIT_STATUS } from "../constants/UnitStatus.constants";
import type { DecommissionUnitInput } from "../models/DecommissionUnitInput.interface";
import type { UnitDecommissionRowUpdate } from "../models/UnitDecommissionRowUpdate.type";

export const mapDecommissionUnitInputToRow = (
  input: DecommissionUnitInput,
  adminWorkerId: string,
  decommissionedAt: Date
): UnitDecommissionRowUpdate => ({
  status: UNIT_STATUS.DECOMMISSIONED,
  decommissioned_at: decommissionedAt.toISOString(),
  decommission_reason: input.reason.trim(),
  updated_by: adminWorkerId,
});
