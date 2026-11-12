import type { UnitReading } from "../models/UnitReading.interface";

export const isOilOverdue = (unit: UnitReading): boolean =>
  unit.nextOilChangeAt !== null &&
  unit.usageTotal >= unit.nextOilChangeAt;
