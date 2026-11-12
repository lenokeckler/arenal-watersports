import { UNIT_READINGS_COPY } from "../constants/UnitReadingsCopy.constants";
import type { UnitReading } from "../models/UnitReading.interface";

export const getUsageText = (unit: UnitReading): string =>
  unit.usageMetric === null
    ? UNIT_READINGS_COPY.USAGE_NONE
    : `${unit.usageTotal}${UNIT_READINGS_COPY.USAGE_UNIT[unit.usageMetric]}`;
