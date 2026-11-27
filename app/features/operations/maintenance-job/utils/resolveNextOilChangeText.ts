import type { NullableRef } from "@/app/types";
import { MAINTENANCE_JOB_COPY } from "../constants/MaintenanceJobCopy.constants";
import type { MaintenanceJobUnit } from "../models/MaintenanceJobUnit.interface";
import { parseMaintenanceAmount } from "./parseMaintenanceAmount";

const DECIMAL_PLACES = 2;

export const resolveNextOilChangeText = (
  unit: NullableRef<MaintenanceJobUnit>,
  intervalText: string
): NullableRef<string> => {
  const interval = parseMaintenanceAmount(intervalText);

  if (
    unit === null ||
    unit.usageMetric === null ||
    interval === null
  ) {
    return null;
  }

  const next = Number(
    (unit.usageTotal + interval).toFixed(DECIMAL_PLACES)
  );

  return MAINTENANCE_JOB_COPY.NEXT_OIL_CHANGE_RESULT(
    `${next}${MAINTENANCE_JOB_COPY.USAGE_UNIT[unit.usageMetric]}`
  );
};
