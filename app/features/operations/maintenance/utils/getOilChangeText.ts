import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceUnit } from "../models/MaintenanceUnit.interface";
import { formatUsage } from "./formatUsage";

export const getOilChangeText = (
  unit: MaintenanceUnit
): string => {
  const overage = unit.oilOverage ?? 0;
  const overageText =
    overage > 0
      ? `${MAINTENANCE_COPY.OIL_OVERAGE_PREFIX}${formatUsage(overage, unit.usageMetric)}`
      : MAINTENANCE_COPY.OIL_OVERAGE_NONE;

  return [
    `${MAINTENANCE_COPY.OIL_ACCUMULATED}${formatUsage(unit.usageTotal, unit.usageMetric)}`,
    `${MAINTENANCE_COPY.OIL_THRESHOLD}${formatUsage(unit.nextOilChangeAt ?? 0, unit.usageMetric)}`,
    overageText,
  ].join(MAINTENANCE_COPY.PART_SEPARATOR);
};
