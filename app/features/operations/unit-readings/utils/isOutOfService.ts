import { UNIT_READINGS_OUT_OF_SERVICE } from "../constants/UnitReadings.constants";
import type { UnitReading } from "../models/UnitReading.interface";

export const isOutOfService = (
  unit: UnitReading
): boolean =>
  UNIT_READINGS_OUT_OF_SERVICE.includes(unit.status);
