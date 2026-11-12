import type { UnitRowUpdate } from "../models/UnitRowUpdate.type";
import type { UpdateUnitInput } from "../models/UpdateUnitInput.interface";

export const mapUpdateUnitInputToRow = (
  input: UpdateUnitInput,
  adminWorkerId: string
): UnitRowUpdate => ({
  code: input.code,
  status: input.status,
  fuel_max: input.fuelMax,
  fuel_level: input.fuelLevel ?? null,
  usage_total: input.usageTotal,
  next_oil_change_at: input.nextOilChangeAt ?? null,
  updated_by: adminWorkerId,
});
