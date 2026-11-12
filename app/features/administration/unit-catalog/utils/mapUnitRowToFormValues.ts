import { safeString } from "@/app/utils/safe-value/SafeValue";
import type { Unit } from "../models/Unit.interface";
import type { UnitFormValues } from "../models/UnitFormValues.interface";

export const mapUnitRowToFormValues = (
  unit: Unit
): UnitFormValues => ({
  code: unit.code,
  status: unit.status,
  fuelMax: unit.fuelMax.toString(),
  fuelLevel: safeString(unit.fuelLevel?.toString()),
  usageTotal: unit.usageTotal.toString(),
  nextOilChangeAt: safeString(
    unit.nextOilChangeAt?.toString()
  ),
});
