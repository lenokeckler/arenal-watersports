import type { CreateUnitInput } from "../models/CreateUnitInput.interface";
import type { UnitRowInsert } from "../models/UnitRowInsert.type";

export const mapCreateUnitInputToRow = (
  input: CreateUnitInput,
  adminWorkerId: string
): UnitRowInsert => ({
  category_id: input.categoryId,
  code: input.code,
  status: input.status,
  fuel_max: input.fuelMax,
  fuel_level: input.fuelLevel ?? null,
  usage_total: input.usageTotal,
  next_oil_change_at: input.nextOilChangeAt ?? null,
  created_by: adminWorkerId,
  updated_by: adminWorkerId,
});
