import { MAINTENANCE_USAGE_UNIT } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceUnit } from "../models/MaintenanceUnit.interface";

export const formatUsage = (
  value: number,
  usageMetric: MaintenanceUnit["usageMetric"]
): string =>
  `${value}${usageMetric === null ? "" : MAINTENANCE_USAGE_UNIT[usageMetric]}`;
